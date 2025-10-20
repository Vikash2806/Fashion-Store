import { useState, useEffect } from "react";

export default function useAuth() {
  const [token, setToken] = useState(null);

  useEffect(() => {
    const t = localStorage.getItem("admin_token");
    if (t) setToken(t);
  }, []);

  const login = (t) => {
    localStorage.setItem("admin_token", t);
    setToken(t);
  };

  const logout = () => {
    localStorage.removeItem("admin_token");
    setToken(null);
  };

  return { token, login, logout };
}
