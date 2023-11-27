import React, { useEffect } from "react";
import { Axios } from "../service/axiosConfig";
import { useNavigate } from "react-router-dom";
import Login from "../pages/login";
import { getSavedSession, openLogin, saveSession } from "../service/authService";

const initialUser = {        
  firstName: "",
  lastName: "",
  email: "",
  isAuth: false   
};

export const authContext = React.createContext(initialUser);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = React.useState(initialUser);  
  const [loading, setLoading] = React.useState(false);

  useEffect(() => {
    const token = getSavedSession();

    if (!token) {
      setLoading(true);

      Axios("/auth")
        .then((response) => {
          const userData = response.data;
            console.log(userData)
          if (userData?.isAuth) {
            setUser(userData);            
            saveSession(userData);
          }
        })
        .catch(() => {})
        .finally(() => {
          setLoading(false);
        });
    } else {
      
      setUser(token);      
      setLoading(false);
    }
  }, []);

  const login = () => {
    openLogin().then((userData) => {
        setUser(userData);       
        saveSession(userData)
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
    <authContext.Provider value={{userData: user}}>
      {children}
    </authContext.Provider>
  );
};
