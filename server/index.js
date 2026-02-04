const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const http = require("http");
const { Server } = require("socket.io");

dotenv.config();

const app = express();
const server = http.createServer(app);

// ✅ Config from .env
const PORT = process.env.PORT || 5000;
const CLIENT_ORIGIN = process.env.CLIENT_ORIGIN || "*";
const USERS_URL = process.env.USERS_URL;
const ROLES_URL = process.env.ROLES_URL;

const io = new Server(server, {
  cors: { origin: CLIENT_ORIGIN },
});

app.use(
  cors({
    origin: CLIENT_ORIGIN,
  })
);
app.use(express.json());

// ----------------------
// In-memory data stores
// ----------------------
let usersData = [];
let rolesData = { users: { admin: [], viewer: [] } };

// ----------------------
// Fetchers (cloud JSON)
// ----------------------
const fetchUsersFromCloud = async () => {
  if (!USERS_URL) throw new Error("Missing USERS_URL in .env");

  const response = await fetch(USERS_URL);
  const data = await response.json();

  usersData = Array.isArray(data?.users) ? data.users : [];
  console.log(`✅ Loaded ${usersData.length} users from cloud JSON`);
};

const fetchRolesFromCloud = async () => {
  if (!ROLES_URL) throw new Error("Missing ROLES_URL in .env");

  const response = await fetch(ROLES_URL);
  const data = await response.json();

  rolesData = data && typeof data === "object" ? data : { users: { admin: [], viewer: [] } };

  const a = rolesData?.users?.admin?.length || 0;
  const v = rolesData?.users?.viewer?.length || 0;
  console.log(`✅ Loaded roles from cloud JSON (admin:${a}, viewer:${v})`);
};

// Call once when server starts
(async () => {
  try {
    await fetchUsersFromCloud();
    await fetchRolesFromCloud();
    console.log(`✅ Allowed client origin: ${CLIENT_ORIGIN}`);
  } catch (err) {
    console.error("❌ Startup fetch failed:", err.message);
  }
})();

// ----------------------
// USERS APIs
// ----------------------
app.get("/api/users", (req, res) => {
  res.json(usersData);
});

// ✅ FIXED: update only fields that exist (so phone never becomes undefined)
app.post("/api/users/:id", (req, res) => {
  const { id } = req.params;
  const { phone, credits } = req.body;

  usersData = usersData.map((u) => {
    if (u.id !== id) return u;

    return {
      ...u,
      ...(phone !== undefined ? { phone } : {}),
      ...(credits !== undefined ? { credits } : {}),
    };
  });

  // 🔥 Real-time update
  io.emit("usersUpdated", usersData);

  res.json({ message: "User updated successfully", users: usersData });
});

// ----------------------
// ROLES APIs
// ----------------------

// 1) Get roles JSON (admin/viewer email lists)
app.get("/api/roles", (req, res) => {
  res.json(rolesData);
});

// 2) Check role for a given email
app.get("/api/role", (req, res) => {
  const email = (req.query.email || "").toLowerCase().trim();

  const admins = (rolesData?.users?.admin || []).map((e) => e.toLowerCase());
  const viewers = (rolesData?.users?.viewer || []).map((e) => e.toLowerCase());

  let role = "none";
  if (admins.includes(email)) role = "admin";
  else if (viewers.includes(email)) role = "viewer";

  res.json({ email, role });
});

// 3) Refresh roles from cloud + broadcast
app.post("/api/roles/refresh", async (req, res) => {
  try {
    await fetchRolesFromCloud();
    io.emit("rolesUpdated", rolesData);
    res.json({ message: "Roles refreshed from cloud JSON", roles: rolesData });
  } catch (err) {
    res.status(500).json({ message: "Failed to refresh roles", error: err.message });
  }
});

// ----------------------
// Socket connection
// ----------------------
io.on("connection", (socket) => {
  console.log("🔌 Client connected:", socket.id);

  // send latest snapshot on connect
  socket.emit("usersUpdated", usersData);
  socket.emit("rolesUpdated", rolesData);

  socket.on("disconnect", () => {
    console.log("❌ Client disconnected:", socket.id);
  });
});

server.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
});
