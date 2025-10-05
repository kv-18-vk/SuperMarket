import { createContext, useState, useContext, useEffect } from "react";

const AuthContext = createContext();


export function AuthProvider({ children }) {

    const [authenticated, setAuthenticated] = useState(false);
    const [userName, setUserName] = useState("");
    const [userid, setuserid] =  useState(0);
    const [designation, setDesignation] = useState("");

    useEffect(() => {
        const storedAuth = localStorage.getItem('auth');
        if (storedAuth) {
            const { auth_id,auth_name, auth_role } = JSON.parse(storedAuth);
            setAuthenticated(true);
            setuserid(auth_id);
            setUserName(auth_name);
            setDesignation(auth_role);
        }   
    }, []);

  const login = (id,name, role) => {
    setAuthenticated(true);
    setuserid(id);
    setUserName(name);
    setDesignation(role);
    localStorage.setItem('auth',JSON.stringify({auth_id:id,auth_name:name, auth_role:role}));
  };

  const logout = () => {
    setAuthenticated(false);
    setuserid();
    setUserName("");
    setDesignation("");
    localStorage.removeItem('auth');
  };


  return (
    <AuthContext.Provider value={{ authenticated,userid, userName, designation, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}


export function useAuth() {
  return useContext(AuthContext);
}
