
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

These files are consumed using GitHub RAW URLs inside the server environment variables.

The server consumes JSON files from this repository:

👉 https://github.com/ShreyaPandeyyyy/propall-assignment-data

This repository contains:

- `users.json` — user records
- `roles.json` — role-based access control

The backend **never stores** this data locally.

---

## ⚙️ Features Implemented

- Fetch data from external cloud JSON (GitHub RAW URLs)
- Role-based access (Admin / Viewer)
- Login using email → role fetched from cloud JSON
- Real-time dashboard updates using Socket.io
- Admin can edit phone and credits
- Viewer sees updates instantly (no refresh)
- Decoupled data layer from application layer.

---

## ⚙️ Features Implemented
- Fetch data from external cloud JSON (GitHub RAW URLs)
- Role-based access (Admin / Viewer)
- Login using email → role fetched from cloud JSON
- Real-time dashboard updates using Socket.io
- Admin can edit phone and credits
- Viewer sees updates instantly (no refresh)
- Decoupled data layer from application layer

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


```
For Example:
PORT=5000
CLIENT_ORIGIN=http://localhost:3000
USERS_URL=<GitHub RAW users.json URL>
ROLES_URL=<GitHub RAW roles.json URL>
```

---


## ▶️ How to Run the Project

### Backend (Server)

```bash
cd server
npm install
npm run dev
```

Server runs at: http://localhost:5000

---

### Frontend (Client)

Open a new terminal:

```bash
cd client
npm install
npm run dev
```

Client runs at: http://localhost:3000

---

## 🧪 How to Test

### Step 1 — Open the Login Page
You can find test emails inside roles.json in the data repository.

Go to:

http://localhost:3000

Enter an email present in `roles.json`.

- If the email is in the **admin list** → redirected to `/admin`
- If the email is in the **viewer list** → redirected to `/viewer`

---

### Step 2 — Open Two Tabs for Real-Time Demo

| Tab | URL | Role |
|-----|-----|------|
| Tab 1 | http://localhost:3000/admin | Admin |
| Tab 2 | http://localhost:3000/viewer | Viewer |

---

### Step 3 — Verify Real-Time Updates

1. Edit any user's phone or credits in the **Admin** tab.
2. Click **Save**.
3. Observe the **Viewer** tab updating instantly without refresh.

---

## 👩‍💻 Author

Shreya Pandey  
B.E. Electronics & Communication Engineering  
BMS College of Engineering


