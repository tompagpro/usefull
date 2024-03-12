import { handleError } from "../helpers/ErrorHandler";

const api: string = import.meta.env.VITE_LOCAL_BACKEND_URL;

export const loginAPI = async (username: string, password: string) => {
  try {
    const response = await fetch(`${api}/auth/signin`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ username, password }),
    });
    const data = await response.json();
    return data;
  } catch (error) {
    handleError(error);
  }
};

export const registerAPI = async (username: string, password: string, email: string) => {
  try {
    const response = await fetch(`${api}/auth/signup`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ username, password, email }),
    });
    const data = await response.json();
    return data;
  } catch (error) {
    handleError(error);
  }
};
