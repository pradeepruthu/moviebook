import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useAuth } from "./AuthContext";
function Login() {
  const navigate = useNavigate();
  const location = useLocation();

  const { login } = useAuth();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const from = location.state?.from?.pathname || "/movies";

  function handleSubmit(event) {
    event.preventDefault();

    const success = login(email, password);

    if (success) {
      navigate(from, { replace: true });
    } else {
      alert("Please enter email and password");
    }
  }

  return (
    <section className="page-section login-section">
      <div className="form-card">
        <h2>Login</h2>

        <form onSubmit={handleSubmit}>
          <input
            type="email"
            placeholder="Enter email"
            value={email}
            onChange={(event) => setEmail(event.target.value)}
            required
          />
          <input
            type="password"
            placeholder="Enter password"
            value={password}
            onChange={(event) => setPassword(event.target.value)}
            required
          />
          <button type="submit">Login</button>
        </form>
      </div>
    </section>
  );
}
export default Login;