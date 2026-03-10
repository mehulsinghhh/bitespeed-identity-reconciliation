Bitespeed Identity Reconciliation API
Live Deployment
Demo: https://bitespeed-identity-mehul.onrender.com

Contacts: https://bitespeed-identity-mehul.onrender.com/contacts

API Endpoints
Method	Endpoint	Description
POST	/identify	Create or link contacts
GET	/contacts	View all contacts
Quick Test
bash
curl -X POST https://bitespeed-identity-mehul.onrender.com/identify \
  -H "Content-Type: application/json" \
  -d '{"email":"john@example.com","phoneNumber":"1234567890"}'
Features
✅ Email & phone duplicate detection

✅ Primary/secondary contact linking

✅ Merged contact blocks in response

✅ Production TypeScript build

✅ SQLite database persistence

Tech Stack
text
TypeScript + Express.js + SQLite
Deployed on Render.com (Free tier)
Local Setup
bash
npm install
npm run dev
# http://localhost:8000
Production-ready identity reconciliation system
