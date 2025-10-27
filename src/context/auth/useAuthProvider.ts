import { useEffect, useRef, useState } from "react";
import * as authAPI from "../../services/authService";
import { toast } from "react-toastify";

// ==== Interfaces ====
interface APIResponse<T> {
  success: boolean;
  message?: string;
  user?: T;
  token?: string;
}

interface User {
  _id: string;
  name: string;
  email: string;
}

interface Credentials {
  email: string;
  password?: string;
  name?: string;
  confirmPassword?: string;
}

// ==== Hook useAuthProvider ===
export const useAuthProvider = () => {
  const [user, setUser] = useState<User | null>(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  const justSignedOut = useRef(false);

  useEffect(() => {
    if (justSignedOut.current) {
      justSignedOut.current = false;
      setIsAuthenticated(false);
      setUser(null);
      setIsLoading(false);
      return;
    }

    const fetchAuth = async () => {
      try {
        setIsLoading(true);
        const data: APIResponse<User> = await authAPI.validate();
        if (data.success && data.user) {
          setIsAuthenticated(true);
          setUser(data.user);
        } else {
          setIsAuthenticated(false);
          setUser(null);
        }
      } catch (error) {
        console.error(error);
        toast.error("User not authenticated");
        setIsAuthenticated(false);
        setUser(null);
      } finally {
        setIsLoading(false);
      }
    };

    fetchAuth();
  }, []);

  const validate = async (): Promise<User | null> => {
    try {
      setIsLoading(true);
      const data: APIResponse<User> = await authAPI.validate();
      if (data.success && data.user) {
        setUser(data.user);
        setIsAuthenticated(true);
        return data.user;
      } else {
        setUser(null);
        setIsAuthenticated(false);
        return null;
      }
    } catch (error) {
      console.error(error);
      toast.error("Validate failed");
      setIsAuthenticated(false);
      setUser(null);
      return null;
    } finally {
      setIsLoading(false);
    }
  };

  const signup = async (credentials: Credentials) => {
    try {
      const data: APIResponse<User> = await authAPI.signup(credentials);
      if (!data.success) {
        toast.error(data.message || "Signup failed.");
        return { success: false, message: data.message || "Signup failed." };
      }

      toast.success("SignUp successful. Please signin");
      return { success: true };
    } catch (error) {
      console.error("SignUp error:", error);
      toast.error("Signup failed. Please try again.");
      return { success: false, message: "Signup failed. Please try again." };
    }
  };

  const signin = async (credentials: Credentials) => {
    try {
      const data: APIResponse<User> = await authAPI.signin(credentials);

      if (!data.success) {
        toast.error(data.message || "Signin failed.");
        return { success: false, message: data.message || "Signin failed." };
      }

      // Gọi validate sau khi đăng nhập đẻ lấy user chuẩn nhất
      const validated = await authAPI.validate();
      if (validated.success && validated.user) {
        setUser(validated.user);
        setIsAuthenticated(true);
        toast.success("SignIn successful");
        return { success: true };
      }

      return { success: false, message: "Failed to validate user." };
    } catch (error) {
      console.error("SignIn error:", error);
      toast.error("Signin failed. Please try again.");
      return { success: false, message: "Signin failed. Please try again." };
    }
  };

  const signout = async () => {
    try {
      const data: APIResponse<User> = await authAPI.signout();

      if (!data.success) {
        toast.error(data.message || "Signout failed.");
        return data.message;
      }

      justSignedOut.current = true; // Đánh giấu vừa signout
      setIsAuthenticated(false);
      setUser(null);
      toast.success("SignOut successful");
    } catch (error) {
      console.error("SignOut error:", error);
      toast.error("Signout failed. Please try again.");
      return "Signout failed.";
    }
  };

  return {
    user,
    isAuthenticated,
    isLoading,
    actions: {
      validate,
      signup,
      signin,
      signout,
    },
  };
};
