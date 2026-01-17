import {
  createContext,
  useContext,
  useLayoutEffect,
  useState,
  type ReactNode,
} from "react";
import { useNavigate } from "react-router-dom";
import { me, signin, signup } from "../lib/auth";

const AuthContext = createContext<any>(null);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  const checkAuthStatus = async () => {
    try {
      const token = localStorage.getItem("token");
      if (!token) throw new Error("No token");
      const { data } = await me(token);
      setUser(data);
    } catch (error) {
      setUser(null);
      navigate("/signin");
    } finally {
      setLoading(false);
    }
  };
  useLayoutEffect(() => {
    checkAuthStatus();
  }, []);

  const login = async (credentials: any) => {
    try {
      const { data } = await signin(credentials);
      setUser(data);
      localStorage.setItem("token", data.token);
      return { success: true, data };
    } catch (error: any) {
      return {
        success: false,
        error: error?.response?.data?.message || "Login failed",
      };
    }
  };

  const register = async (userData: any) => {
    try {
      const { data } = await signup(userData);
      setUser(data);
      localStorage.setItem("token", data.token);
      return { success: true, data };
    } catch (error: any) {
      return {
        success: false,
        error: error.response?.data?.message || "Registration failed",
      };
    }
  };

  const logout = async () => {
    localStorage.removeItem("token");
    setUser(null);
    navigate("/signin");
  };
  const value = {
    user,
    login,
    logout,
    register,
    loading,
    isAuthenticated: !!user,
  };
  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = () => useContext(AuthContext);
