import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

export default function Login() {
  const { login } = useAuth();
  const [email, setEmail] = useState("demo@taskflow.app");
  const [password, setPassword] = useState("demo123");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  function submit(e) {
    e.preventDefault();
    const res = login(email.trim(), password);
    if (res.ok) navigate("/", { replace: true });
    else setError(res.error || "Login failed");
  }

  return (
    <div className="center">
      {/* full logo on auth screens */}
      <img src="/taskflow.png" alt="TaskFlow" className="auth-logo" />
      <h2 style={{marginTop:8}}>Sign in to TaskFlow</h2>

      <form onSubmit={submit}>
        <div className="form-row">
          <label className="label">Email</label>
          <input className="input" value={email} onChange={e=>setEmail(e.target.value)} />
        </div>
        <div className="form-row">
          <label className="label">Password</label>
          <input className="input" type="password" value={password} onChange={e=>setPassword(e.target.value)} />
        </div>
        {error && <div style={{color:"var(--danger)", marginBottom:10}}>{error}</div>}
        <button className="btn primary" type="submit" style={{width:"100%"}}>Login</button>
      </form>

      <small style={{display:"block", marginTop:12, color:"var(--muted)"}}>
        Don’t have an account? <Link to="/signup">Create one</Link>
      </small>
    </div>
  );
}
