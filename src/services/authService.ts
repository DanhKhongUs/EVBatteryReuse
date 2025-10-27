import httpRequest from "../utils/httpRequest";

interface Data {
  email: string;
  name?: string;
  password?: string;
  confirmPassword?: string;
  newPassword?: string;
}

export const signup = async (data: Data) => {
  return (
    await httpRequest.post("/auth/signup", data, { withCredentials: true })
  ).data;
};

export const signin = async (data: Data) => {
  return (
    await httpRequest.post("/auth/signin", data, { withCredentials: true })
  ).data;
};

export const signout = async () => {
  const { data } = await httpRequest.post(
    "auth/signout",
    {},
    { withCredentials: true }
  );
  return data;
};
