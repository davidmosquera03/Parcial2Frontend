import { useState } from "react";
import { useAuth } from "../../../context/AuthContext";
import React from "react";

function LoginForm({ login_url }) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const { setIsLoggedIn } = useAuth();

  const logIn = async () => {
    const body = { username, password };

    try {
      console.log(login_url);
      //log in with api
      const response = await fetch(login_url, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      });

      const responseData = await response.json();
      const token = responseData.data.token;
      const name = responseData.data.name;

      //store name
      localStorage.setItem("name", name);
      //store token
      localStorage.setItem("token", token);

      setIsLoggedIn(true);
      console.log(`Logged in ${token}`);
    } catch (err) {
      alert("Login Failed. Check for missing fields");
      return;
    }
  };

  return (
    <div>
      <form>
        <label htmlFor="username">Username</label>
        <br />
        <input
          type="text"
          id="username"
          placeholder="Enter your username"
          required
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
        <br />
        <label htmlFor="password">Password</label>
        <br />
        <input
          type="password"
          id="password"
          placeholder="Enter your password"
          required
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <br />
        <button type="button" onClick={logIn}>
          Sign In
        </button>
      </form>
    </div>
  );
}

export default LoginForm;
