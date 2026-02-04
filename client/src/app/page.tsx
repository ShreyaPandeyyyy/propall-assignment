"use client";

import { useEffect, useState } from "react";
import { io } from "socket.io-client";

type User = {
  id: string;
  name: string;
  phone: string;
  credits: number;
};

export default function Home() {
  const [users, setUsers] = useState<User[]>([]);

  // 1️⃣ Initial fetch
  const fetchUsers = async () => {
    const res = await fetch("http://localhost:5000/api/users");
    const data = await res.json();
    setUsers(data);
  };

  useEffect(() => {
    fetchUsers();

    // 2️⃣ Socket connection
    const socket = io("http://localhost:5000");

    socket.on("usersUpdated", (updatedUsers: User[]) => {
      console.log("Realtime update received");
      setUsers(updatedUsers);
    });

    return () => {
      socket.disconnect();
    };
  }, []);

  // 3️⃣ Add credits
  const addCredits = async (user: User) => {
    await fetch(`http://localhost:5000/api/users/${user.id}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        phone: user.phone,
        credits: user.credits + 10,
      }),
    });
  };

  return (
    <div style={{ padding: 20 }}>
      <h1>User Dashboard</h1>

      {users.map((u) => (
        <div
          key={u.id}
          style={{
            border: "1px solid gray",
            margin: "10px 0",
            padding: "10px",
            borderRadius: "6px",
          }}
        >
          <h2>{u.name}</h2>
          <p>Phone: {u.phone}</p>
          <p>Credits: {u.credits}</p>
          <button onClick={() => addCredits(u)}>+10 Credits</button>
        </div>
      ))}
    </div>
  );
}
