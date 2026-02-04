## How to Test

1. Open two tabs:
   - http://localhost:3000/admin
   - http://localhost:3000/viewer
2. Edit any user in admin.
3. Viewer updates in real-time.

---

# 🚀 Propall Full-Stack Assignment

This project demonstrates a real-world full-stack architecture where the application **does not store user data locally**.

Instead, the backend fetches user and role data from a **separate cloud JSON repository** hosted on GitHub.

---

## 🧠 Architecture Overview

GitHub JSON (Cloud Data Repository)  
⬇  
Express Server (fetches data using RAW URLs)  
⬇  
Socket.io (real-time updates)  
⬇  
Next.js Client Dashboard

---

## 🌐 Cloud Data Source

The server consumes JSON files from this repository:

👉 https://github.com/ShreyaPandeyyyy/propall-assignment-data

This repository contains:

- `users.json` — user records
- `roles.json` — role-based access control

---

## ⚙️ Features Implemented

- Fetch data from external cloud JSON (GitHub RAW URLs)
- Role-based access (admin / viewer)
- Real-time dashboard updates using Socket.io
- Decoupled data layer from application layer
- Production-like architecture pattern

---

## 🛠 Tech Stack

**Frontend**: Next.js, TypeScript  
**Backend**: Node.js, Express, Socket.io  
**Data Source**: GitHub hosted JSON files

---

## Environment Files

This project uses separate environment configurations:

- `.env.dev` → for development
- `.env.production` → for production

Both files define:
PORT
CLIENT_ORIGIN
USERS_URL
ROLES_URL

---


## 👩‍💻 Author

Shreya Pandey  
B.E. Electronics & Communication Engineering  
BMS College of Engineering


