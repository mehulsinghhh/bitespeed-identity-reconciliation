export{};
import express, { Request, Response } from "express";
import { initDb } from "./db";

const app = express();
const PORT = process.env.PORT || 8000;

app.use(express.json());
app.use((req, res, next) => {
  console.log(`${req.method} ${req.path}`);
  next();
});


let db: any;

async function initializeApp() {
  db = await initDb();
  
  app.get("/", (req, res) => {
  res.send(`
    <h1>Bitespeed Identity Reconciliation API</h1>

    <h2>POST /identify</h2>

    <h3>Sample Request</h3>
    <pre>
{
  "email": "test@example.com",
  "phoneNumber": "1234567890"
}
    </pre>

    <h3>Sample Response</h3>
    <pre>
{
  "contact": {
    "primaryContactId": 1,
    "emails": ["test@example.com"],
    "phoneNumbers": ["1234567890"],
    "secondaryContactIds": []
  }
}
    </pre>
  `);
});

  app.get("/contacts", async (req: Request, res: Response) => {
    const contacts = await db.all("SELECT * FROM Contact");
    res.json(contacts);
  });




app.post("/identify", async (req: Request, res: Response) => {
  console.log('🚀 POST /identify HIT!');
  console.error('🔥 REQUEST BODY:', req.body);  // console.error always shows

  const { email, phoneNumber } = req.body;
  console.log('Received:', { email, phoneNumber });

  if (!email && !phoneNumber) {
    return res.status(400).json({ error: "email or phoneNumber required" });
  }

  try {
    console.log('Querying database...');
    
    const emailContacts: any[] = email ? await db.all("SELECT * FROM Contact WHERE email = ?", [email]) : [];
    const phoneMatch = await db.get('SELECT * FROM Contact WHERE phoneNumber = ?', [phoneNumber]);
    const emailMatch = await db.get('SELECT * FROM Contact WHERE email = ?', [email]);
    console.log('[phone match]', phoneMatch ? 'found' : 'no', phoneMatch?.id);
    console.log('[email match]', emailMatch ? 'found' : 'no', emailMatch?.id);

    if (phoneMatch || emailMatch) {
  const primaryId = phoneMatch?.id || emailMatch!.id;
  
  // Create secondary record
  await db.run(`
    INSERT INTO Contact (phoneNumber, email, linkedId, linkPrecedence, createdAt, updatedAt) 
    VALUES (?, ?, ?, 'secondary', datetime('now'), datetime('now'))
  `, [phoneNumber, email, primaryId]);
  
  // Return MERGED BLOCK (primary + all secondaries)
  const contacts = await db.all(`
    SELECT * FROM Contact 
    WHERE id = ? OR linkedId = ?
    ORDER BY id ASC
  `, [primaryId, primaryId]);
  
  console.log('MERGED BLOCK:', contacts.length, 'contacts');
  return {contacts};
}

    
    console.log('Email matches:', emailContacts.length, 'Phone matches:', phoneNumber.length);
    
    const allMatches = [...emailContacts, ...phoneNumber];
    
    console.log('Total matches:', allMatches.length);
    
   if (allMatches.length === 0) {
  console.log('Creating new primary contact');
  
  const result = await db.run(
    `INSERT INTO Contact (phoneNumber, email, linkedId, linkPrecedence) 
     VALUES (?, ?, NULL, 'primary')`,
    [phoneNumber || null, email || null]
  );
  
  console.log('INSERT SUCCESS:', result.lastID);
  
  return res.json({
    contact: {
      primaryContactId: result.lastID!,
      emails: email ? [email] : [],
      phoneNumbers: phoneNumber ? [phoneNumber] : [],
      secondaryContactIds: []
    }
  });
}


    
    res.json({ 
      debug: { 
        emailContacts: emailContacts.length, 
        phoneNumber: phoneNumber.length, 
        totalMatches: allMatches.length 
      }
    });
  } catch (error) {
    console.error('ERROR:', error);
    res.status(500).json({ error: "Database error" });
  }
});







  app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
  });
}

initializeApp().catch(console.error);
