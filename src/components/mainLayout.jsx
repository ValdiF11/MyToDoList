import { Outlet, useNavigate } from "react-router-dom";
import { createContext, useEffect, useState, useContext } from "react";
import { auth } from "../config/firebase";

export const UserContext = createContext({ user: null, setUser: () => {} });

export default function MainLayout() {
  const navigate = useNavigate();
  const [user, setUser] = useState(undefined);

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      setUser(user ? user : null);
    });

    return () => unsubscribe();
  }, []);

  useEffect(() => {
    if (user === null) {
      navigate("/login");
    }
  }, [user, navigate]);

  return (
    <UserContext.Provider value={{ user, setUser }}>
      <Outlet />
    </UserContext.Provider>
  );
}
