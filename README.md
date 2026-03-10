# 🚀 Bitespeed Identity Reconciliation API

[![Status](https://img.shields.io/badge/status-production-green?style=flat&logo=vercel)](https://github.com/mehulsinghhh/bitespeed-identity-reconciliation)

Complete **identity reconciliation system** that merges contacts sharing **same email OR phone number**.

## ✨ Features
- ✅ **Duplicate Detection** - Email + Phone matching
- ✅ **Primary/Secondary Linking** - `linkedId` + `linkPrecedence`
- ✅ **Merged Response Block** - Primary record + all secondaries
- ✅ **Production Ready** - TypeScript + SQLite + Express

## 🔗 Live Demo
**[Deploying on Render.com - Available in 15 mins]**

## 📋 API Endpoints

| Method | Endpoint | Description |
|--------|----------|-------------|
| `POST` | `/identify` | Create/link contacts (JSON body) |
| `GET` | `/contacts` | View all contacts |
| `GET` | `/` | Project info |

## 🧪 Test /identify (Copy-paste)

**cURL:**
```bash
curl -X POST http://localhost:8000/identify \
  -H "Content-Type: application/json" \
  -d '{"email":"john@example.com","phoneNumber":"1234567890"}'

