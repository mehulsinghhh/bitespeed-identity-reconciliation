 Bitespeed Identity Reconciliation API
Live Demo: https://bitespeed-identity-mehul.onrender.com
Contacts: https://bitespeed-identity-mehul.onrender.com/contacts

📋 API Endpoints
Method	Endpoint	Description
POST	/identify	Create/link contacts
GET	/contacts	View all contacts
 Test /identify
bash
curl -X POST https://bitespeed-identity-mehul.onrender.com/identify \
  -H "Content-Type: application/json" \
  -d '{"email":"test@example.com","phoneNumber":"1234567890"}'
🛠 Tech Stack
text
TypeScript + Express + SQLite
Deployed on Render.com
 Local Setup
bash
npm install
npm run dev
