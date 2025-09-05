import { createContext, useContext } from "react";
import useLocalStorage from "../hooks/useLocalStorage";
import { seedUser } from "../data/seed";

const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [user, setUser] = useLocalStorage("taskflow_user", seedUser);
  const [session, setSession] = useLocalStorage("taskflow_session", { isAuthenticated: false });

  function login(email, password) {
    if (email === user.email && password === user.password) {
      setSession({ isAuthenticated: true });
      return { ok: true };
    }
    return { ok: false, error: "Invalid email or password" };
  }


  function register({ name, email, password }) {
    setUser({
      ...user,
      name,
      email,
      password,

    });
    setSession({ isAuthenticated: false });
    return { ok: true };
  }

  function logout() {
    setSession({ isAuthenticated: false });
  }

  function updateProfile(updates) {
    setUser({ ...user, ...updates });
  }

  function changePassword(current, next) {
    if (current !== user.password) return { ok: false, error: "Current password is wrong" };
    setUser({ ...user, password: next });
    return { ok: true };
  }

  return (
    <AuthContext.Provider
      value={{ user, session, login, register, logout, updateProfile, changePassword }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => useContext(AuthContext);
