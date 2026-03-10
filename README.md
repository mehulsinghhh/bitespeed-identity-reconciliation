# Bitespeed Identity Reconciliation API

## Live Demo
**[Add Render URL here after Step 3]**

## Endpoints
- `POST /identify` - Create/link contacts
- `GET /contacts`  - View all contacts

## Test API
```bash
curl -X POST http://localhost:8000/identify \
  -H "Content-Type: application/json" \
  -d '{"email":"test@example.com","phoneNumber":"1234567890"}'
