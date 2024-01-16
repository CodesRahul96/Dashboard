import { createContext, useContext, useEffect, useState } from "react";

export const AuthContext = createContext();
// const API = import.meta.env.VITE_APP_URI_API;
const API = "http://localhost:5000";

// eslint-disable-next-line react/prop-types
export const AuthProvider = ({ children }) => {
  const [token, setToken] = useState(localStorage.getItem("token"));
  const [user, setUser] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const [project, setProject] = useState([]);
  const authentication = `Bearer ${token}`;

  const storeTokenInLS = (serverToken) => {
    setToken(serverToken);
    return localStorage.setItem("token", serverToken);
  };

  let isLoggedIn = !!token;
  // console.log(isLoggedIn);

  const LogOutUser = () => {
    setToken("");
    return localStorage.removeItem("token");
  };

  // Authenticaton with jwt - to get user data
  const userAuthentication = async () => {
    try {
      setIsLoading(true);
      const response = await fetch(`${API}/auth/user`, {
        method: "GET",
        headers: {
          Authorization: authentication,
        },
      });

      if (response.ok) {
        // console.log(response);
        const data = await response.json();
        // console.log("user data", data.userData);
        setUser(data.userData);
        setIsLoading(false);
      }
    } catch (error) {
      // console.log("Error, fetching user data");
    }
  };

  // fetching service data from backend

  const getProjects = async () => {
    try {
      setIsLoading(true);
      const response = await fetch(`${API}/api/projects`, {
        method: "POST",
      });
      if (response.ok) {
        // console.log(response);
        const data = await response.json();
        console.log("user data", data.msg);
        setProject(data.msg);
        setIsLoading(false);
      }
    } catch (error) {
      console.log(`Fetching Services from server: ${error}`);
    }
  };

  useEffect(() => {
    getProjects();
    userAuthentication();
  }, []);

  return (
    <AuthContext.Provider
      value={{
        storeTokenInLS,
        LogOutUser,
        isLoggedIn,
        user,
        project,
        authentication,
        isLoading,
        API
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

// eslint-disable-next-line react-refresh/only-export-components
export const useAuth = () => {
  const authContextValue = useContext(AuthContext);
  if (!authContextValue) {
    throw new Error("useAuth is used outside of the Provider");
  }

  return authContextValue;
};
