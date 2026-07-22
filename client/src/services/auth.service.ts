import api from "../api/axios";

export const login = async (
  email: string,
  password: string
) => {
  const response = await api.post("/auth/login", {
    email,
    password,
  });

  return response.data;
};

export const signup = async (
  username: string,
  email: string,
  password: string
) => {
  const response = await api.post("/auth/signup", {
    username,
    email,
    password,
  });

  return response.data;
};