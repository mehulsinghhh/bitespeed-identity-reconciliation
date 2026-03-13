# Identity Reconciliation API

A backend API that links customer contacts using email and phone numbers.
It identifies whether different records belong to the same person and returns a unified identity.

This project was built as part of the **Bitespeed backend task**.

---

## Live API

POST endpoint:

https://bitespeed-identity-mehul.onrender.com/identify

---

## Tech Stack

* Node.js
* Express.js
* TypeScript
* SQLite
* REST API

---

## API Endpoint

### POST /identify

Example request:

```json
{
  "email": "john@example.com",
  "phoneNumber": "1234567890"
}
```

Example response:

```json
{
  "contact": {
    "primaryContactId": 1,
    "emails": ["john@example.com"],
    "phoneNumbers": ["1234567890"],
    "secondaryContactIds": [2]
  }
}
```

---

## How It Works

The API checks existing contacts using the provided email or phone number.

* If no match is found → a new **primary contact** is created
* If a match exists → the contact is linked as a **secondary contact**
* The system always keeps the **oldest contact as the primary identity**

This ensures each user has a **single consolidated identity**.

---

## Running Locally

Clone the repository

```
git clone https://github.com/mehulsinghhh/bitespeed-identity-reconciliation.git
```

Install dependencies

```
npm install
```

Start the server

```
npm run dev
```

---

## Author

Mehul Singh
LinkedIn: https://www.linkedin.com/in/mehulsinghhh/

