import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

export default function Signup() {
  const { register } = useAuth();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirm, setConfirm] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  function submit(e) {
    e.preventDefault();
    if (!name.trim() || !email.trim() || !password) {
      setError("Please fill all fields"); return;
    }
    if (password !== confirm) { setError("Passwords do not match"); return; }
    register({ name: name.trim(), email: email.trim(), password });
    navigate("/login", { replace: true });
  }

  return (
    <div className="center">
      {/* full logo on auth screens */}
      <img src="/taskflow.png" alt="TaskFlow" className="auth-logo" />
      <h2 style={{marginTop:8}}>Create your account</h2>

      <form onSubmit={submit}>
        <div className="form-row">
          <label className="label">Name</label>
          <input className="input" value={name} onChange={e=>setName(e.target.value)} />
        </div>
        <div className="form-row">
          <label className="label">Email</label>
          <input className="input" value={email} onChange={e=>setEmail(e.target.value)} />
        </div>
        <div className="form-row">
          <label className="label">Password</label>
          <input className="input" type="password" value={password} onChange={e=>setPassword(e.target.value)} />
        </div>
        <div className="form-row">
          <label className="label">Confirm password</label>
          <input className="input" type="password" value={confirm} onChange={e=>setConfirm(e.target.value)} />
        </div>
        {error && <div style={{color:"var(--danger)", marginBottom:10}}>{error}</div>}
        <button className="btn primary" type="submit" style={{width:"100%"}}>Sign up</button>
      </form>

      <small style={{display:"block", marginTop:12, color:"var(--muted)"}}>
        Already have an account? <Link to="/login">Log in</Link>
      </small>
    </div>
  );
}
