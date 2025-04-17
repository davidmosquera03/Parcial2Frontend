import React from "react";
import { useState } from "react";

function RegisterForm({ register_url }) {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    username: "",
    password: "",
    passwordConfirmation: "",
  });

  const handleChange = (e) => {
    const { id, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [id]: value,
    }));
  };

  const register = async () => {
    if (formData.password !== formData.passwordConfirmation) {
      alert("Passwords do not match!");
      return;
    }
    try {
      const response = await fetch(register_url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();
      console.log(data);
      console.log("registrado");
    } catch (err) {
      alert("Register Failed. Check for missing fields");
      return;
    }
  };
  return (
    <div>
      <form>
        <label htmlFor="name">Name</label>
        <br />
        <input
          type="text"
          id="name"
          placeholder="Enter name"
          value={formData.name}
          onChange={handleChange}
          required
        />
        <br />

        <label htmlFor="email">Email</label>
        <br />
        <input
          type="email"
          id="email"
          placeholder="Enter your email"
          value={formData.email}
          onChange={handleChange}
          required
        />
        <br />

        <label htmlFor="username">Username</label>
        <br />
        <input
          type="text"
          id="username"
          placeholder="Enter your username"
          value={formData.username}
          onChange={handleChange}
          required
        />
        <br />

        <label htmlFor="password">Password</label>
        <br />
        <input
          type="password"
          id="password"
          placeholder="Enter your password"
          value={formData.password}
          onChange={handleChange}
          required
        />
        <br />

        <label htmlFor="passwordConfirmation">Confirm Password</label>
        <br />
        <input
          type="password"
          id="passwordConfirmation"
          placeholder="Confirm password"
          value={formData.passwordConfirmation}
          onChange={handleChange}
          required
        />
        <br />
        <button type="button" onClick={register}>
          Register
        </button>
      </form>
    </div>
  );
}

export default RegisterForm;
