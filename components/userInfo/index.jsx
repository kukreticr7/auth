"use client";
import React, { useState, useEffect } from "react";
import { signOut } from "next-auth/react";
import { useSession } from "next-auth/react";
import "./styles.css";

const UserInfo = () => {
  const [users, setUsers] = useState([]);

  const { data: session } = useSession();

  useEffect(() => {
    fetch("/api/user")
      .then((response) => response.json())
      .then((data) => {
        setUsers(data.users);
      })
      .catch((error) => {
        console.error("Error fetching user data:", error);
      });
  }, []);

  return (
    <div className="container">
      <h1>User Information</h1>
      <div className="user-info">
        <div>
          Name: <span>{session?.user?.name}</span>
        </div>
        <div>
          Email: <span>{session?.user?.email}</span>
        </div>
        <button onClick={() => signOut()}>Log Out</button>
      </div>
      <ul>
        {users.map((user) => (
          <li key={user._id}>
            <div>
              <strong>Name:</strong> <span>{user.name}</span>
            </div>
            <div>
              <strong>Email:</strong> <span>{user.email}</span>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default UserInfo;
