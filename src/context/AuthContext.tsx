import { createContext, useContext, useState } from "react";
import { jwtDecode } from "jwt-decode";
import { Navigate, Outlet } from "react-router-dom";

interface AuthContextType {
  isAuthenticated: boolean;
  login: (accessToken: string) => void;
  logout: () => void;
}

interface AuthProviderProps {
  children: React.ReactNode;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const isTokenExpired = (exp: any) => {
    const currentTime = Date.now() / 1000;
    return exp < currentTime;
  };
  const isTokenValid = (token: string) => {
    try {
      const decodedToken = jwtDecode(token);

      return decodedToken && !isTokenExpired(decodedToken.exp);
    } catch (error) {
      return false;
    }
  };

  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(() => {
    const storedToken = localStorage.getItem("accessToken");
    return !!storedToken && isTokenValid(storedToken);
  });

  const login = (accessToken: string) => {
    const isValidToken = accessToken && isTokenValid(accessToken);

    if (!isValidToken) {
      localStorage.removeItem("accessToken");
      return <Navigate to="/login" />;
    }

    setIsAuthenticated(true);
    return <Outlet />;
  };

  const logout = () => {
    localStorage.removeItem("accessToken");
    sessionStorage.removeItem("cartItems")
    setIsAuthenticated(false);
  };

  return (
    <AuthContext.Provider value={{ isAuthenticated, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
