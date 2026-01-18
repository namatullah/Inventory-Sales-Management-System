import {
  createContext,
  useContext,
  useEffect,
  useState,
  type ReactNode,
} from "react";
import { useNavigate } from "react-router-dom";
import { me, signin, signup } from "../lib/auth";
import type { UserType } from "../helpers/types";
interface AuthContextType {
  user: UserType | null;
  loading: boolean;
  login: (data: UserType) => Promise<any>;
  register: (data: UserType) => Promise<any>;
  logout: () => void;
  isAuthenticated: boolean;
  adminAuth: () => boolean;
}
const AuthContext = createContext<AuthContextType | null>(null);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const navigate = useNavigate();
  const [user, setUser] = useState<UserType | any>(null);
  const [loading, setLoading] = useState(true);

  const checkAuthStatus = async () => {
    try {
      const token = localStorage.getItem("token");
      if (!token) {
        setUser(null);
        return;
      }
      const { data } = await me(token);
      setUser(data);
    } catch (error) {
      console.error("Auth check failed");
      setUser(null);
      localStorage.removeItem("token");
    } finally {
      setLoading(false);
    }
  };
  useEffect(() => {
    checkAuthStatus();
  }, []);

  const login = async (credentials: UserType) => {
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

  const register = async (userData: UserType) => {
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
  const adminAuth = () => {
    return user?.role === "admin";
  };
  const value = {
    user,
    login,
    logout,
    register,
    loading,
    adminAuth,
    isAuthenticated: !!user,
  };
  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = () => {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be inside AuthProvider");
  return ctx;
};
