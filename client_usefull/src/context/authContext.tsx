import { createContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { loginAPI, registerAPI } from "../services/AuthService";
import React from "react";
import { toast } from "react-toastify";

type UserContextType = {
  user: UserProfile | null;
  token: string | null;
  registerUser: (email: string, username: string, password: string) => void;
  loginUser: (username: string, password: string) => void;
  logout: () => void;
  isLoggedIn: () => boolean;
};

type UserProfile = {
  username: string;
  email: string;
};

type Props = { children: React.ReactNode };

export const UserContext = createContext<UserContextType>(
  {} as UserContextType
);

export const UserProvider = ({ children }: Props) => {
  const navigate = useNavigate();
  const [token, setToken] = useState<string | null>(null);
  const [user, setUser] = useState<UserProfile | null>(null);
  const [isReady, setIsReady] = useState(false);

  useEffect(() => {
    const user = localStorage.getItem("user");
    const token = localStorage.getItem("token");

    if (user && token) {
      setUser(JSON.parse(user));
      setToken(token);
    }
    setIsReady(true);
  }, []);

  const registerUser = async (
    email: string,
    username: string,
    password: string
  ) => {
    await registerAPI(username, password, email)
      .then((res) => {
        if (res?.message) {
          toast.success(res.message, { position: "bottom-right" });
          navigate("/login", { state: { user: username } });
        }
      })
      .catch((error) => {
        console.error(error);
        toast.warning("Une erreur en provenance du serveur est apparue!", {
          position: "bottom-right",
        });
        navigate("/500");
      });
  };
  const loginUser = async (username: string, password: string) => {
    await loginAPI(username, password)
      .then((res) => {
        if (res) {
          localStorage.setItem("token", res?.accessToken);
          const userObj = {
            username: res?.username,
            email: res?.email,
          };
          localStorage.setItem("user", JSON.stringify(userObj));
          setToken(res?.accessToken || null);
          setUser(userObj);
          toast.success("Connexion réussie!", { position: "bottom-right" });
          navigate("/usr/welcome");
        }
      })
      .catch((error) => {
        console.error(error);
        toast.warning("Une erreur en provenance du serveur est apparue!", {
          position: "bottom-right",
        });
        navigate("/500");
      });
  };

  const isLoggedIn = () => {
    return !!user;
  };

  const logout = () => {
    localStorage.removeItem("user");
    localStorage.removeItem("token");
    setUser(null);
    setToken("");
    toast.success("Déconnexion réussie!", { position: "bottom-right" })
    navigate("/");
  };
  return (
    <UserContext.Provider
      value={{ loginUser, user, token, logout, isLoggedIn, registerUser }}
    >
      {isReady ? children : null}
    </UserContext.Provider>
  );
};
