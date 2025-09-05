import { useState } from "react";
import { useAuth } from "../context/AuthContext";
import Sidebar from "../components/Sidebar";

export default function Profile() {
  const { user, updateProfile, changePassword } = useAuth();

  const [name, setName] = useState(user.name || "");
  const [contact, setContact] = useState(user.contact || "");
  const [address, setAddress] = useState(user.address || "");
  const [photoDataUrl, setPhotoDataUrl] = useState(user.photoDataUrl || "");

  const [current, setCurrent] = useState("");
  const [next, setNext] = useState("");
  const [confirm, setConfirm] = useState("");
  const [msg, setMsg] = useState("");

  function pickPhoto(e) {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = () => setPhotoDataUrl(String(reader.result));
    reader.readAsDataURL(file);
  }

  function saveProfile(e) {
    e.preventDefault();
    updateProfile({ name, contact, address, photoDataUrl });
    setMsg("Profile saved.");
  }

  function savePassword(e) {
    e.preventDefault();
    if (next !== confirm) { setMsg("Passwords do not match."); return; }
    const res = changePassword(current, next);
    setMsg(res.ok ? "Password updated." : res.error);
    setCurrent(""); setNext(""); setConfirm("");
  }

  return (
    <div className="app-shell">
      <Sidebar />
      <div className="navbar"><strong>Profile</strong></div>
      <main className="main">
        <div className="profile">
          <div style={{display:"flex", alignItems:"center", gap:12}}>
            <img src={photoDataUrl || "https://via.placeholder.com/72?text=PF"} alt="avatar" className="avatar" />
            <div>
              <div style={{fontWeight:700, fontSize:18}}>{user.name || "User"}</div>
              <div style={{color:"var(--muted)"}}>{user.email}</div>
            </div>
          </div>

          <form onSubmit={saveProfile} style={{marginTop:16}}>
            <div className="form-row">
              <label className="label">Change photo</label>
              <input type="file" accept="image/*" onChange={pickPhoto} />
            </div>

            <div className="form-row">
              <label className="label">Name</label>
              <input className="input" value={name} onChange={e=>setName(e.target.value)} />
            </div>

            <div className="form-row">
              <label className="label">Contact</label>
              <input className="input" value={contact} onChange={e=>setContact(e.target.value)} />
            </div>

            <div className="form-row">
              <label className="label">Address</label>
              <textarea rows="2" value={address} onChange={e=>setAddress(e.target.value)} />
            </div>

            <button className="btn primary" type="submit">Save profile</button>
          </form>

          <hr style={{margin:"20px 0", borderColor:"var(--border)"}} />

          <form onSubmit={savePassword}>
            <div className="form-row">
              <label className="label">Current password</label>
              <input className="input" type="password" value={current} onChange={e=>setCurrent(e.target.value)} />
            </div>
            <div className="form-row">
              <label className="label">New password</label>
              <input className="input" type="password" value={next} onChange={e=>setNext(e.target.value)} />
            </div>
            <div className="form-row">
              <label className="label">Confirm new password</label>
              <input className="input" type="password" value={confirm} onChange={e=>setConfirm(e.target.value)} />
            </div>
            <button className="btn" type="submit">Change password</button>
          </form>

          {msg && <div style={{marginTop:10, color:"var(--muted)"}}>{msg}</div>}
        </div>
      </main>
    </div>
  );
}
