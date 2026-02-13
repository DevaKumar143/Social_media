// src/components/AuthForm.jsx
import React, { useState } from "react";

const AuthForm = ({ type, onSubmit }) => {
  const [form, setForm] = useState({
    email: "",
    password: "",
    name: "",
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  return (
    <form onSubmit={(e)=>{e.preventDefault(); onSubmit(form);}}>
      {type === "signup" && (
        <input name="name" placeholder="Name" onChange={handleChange} />
      )}

      <input name="email" placeholder="Email" onChange={handleChange} />
      <input
        name="password"
        type="password"
        placeholder="Password"
        onChange={handleChange}
      />

      <button>{type === "login" ? "Login" : "Signup"}</button>
    </form>
  );
};

export default AuthForm;
