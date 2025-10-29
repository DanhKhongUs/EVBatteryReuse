import httpRequest, { setAccessToken } from "../utils/httpRequest";

interface Data {
  email: string;
  name?: string;
  password?: string;
  confirmPassword?: string;
  newPassword?: string;
}

export const signup = async (data: Data) => {
  const res = await httpRequest.post("/auth/signin", data);
  setAccessToken(res.data.accessToken);
  return res.data;
};

export const signin = async (data: Data) => {
  return (await httpRequest.post("/auth/signin", data)).data;
};

export const signout = async () => {
  const { data } = await httpRequest.post("auth/signout", {});
  setAccessToken(null);
  return data;
};
