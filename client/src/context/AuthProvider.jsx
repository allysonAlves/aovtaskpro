import React, { useEffect } from "react";
import { Axios } from "../service/axiosConfig";
import { useNavigate } from "react-router-dom";
import Login from "../pages/login";
import {
  checkAuth,
  getSavedSession,
  openLogin,
  saveSession,
} from "../service/auth.service";

const initialUser = {
  firstName: "",
  lastName: "",
  email: "",
  isAuth: false,
};

export const authContext = React.createContext(initialUser);
authContext.displayName = 'authContext';

export const AuthProvider = ({ children }) => {
  const [user, setUser] = React.useState(initialUser);
  const [loading, setLoading] = React.useState(false);

  useEffect(() => {
    setLoading(true);
    checkAuth()
    .then(user => setUser(user))
    .finally(() => setLoading(false));
  }, []);

  const login = () => {
    openLogin().then((userData) => {
      setUser(userData);
      saveSession(userData);
    });
  };

  if (loading)
    return (
      <img
        src="images/splash.png"
        style={{
          height: "100vh",
          width: "100vw",
          overflow: "hidden",
          objectFit: "cover",
        }}
      />
    );

  if (!user.isAuth) return <Login onLogin={login} />;

  return (
    <authContext.Provider value={{ userData: user }}>
      {children}
    </authContext.Provider>
  );
};
