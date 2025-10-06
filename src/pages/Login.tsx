import { useState } from "react";
import type { User } from "../types";
import { Link, useNavigate } from "react-router-dom";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();

    const storedUsers = localStorage.getItem("users");
    const users: User[] = storedUsers ? JSON.parse(storedUsers) : [];

    const foundUser = users.find(
      (user) => user.email === email && user.password === password
    );

    if (foundUser) {
      localStorage.setItem("currentUser", JSON.stringify(foundUser));
      navigate("/");
    } else {
      alert("Email hoặc mật khẩu không chính xác.");
    }
  };

  return (
    <form
      onSubmit={handleLogin}
      className="max-w-sm min-h-screen mx-auto mt-20 space-y-4 "
    >
      <h2 className="text-xl font-semibold text-center">Đăng nhập</h2>

      <input
        type="email"
        placeholder="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        className="w-full border p-2 rounded"
        required
      />
      <input
        type="password"
        placeholder="Mật khẩu"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        className="w-full border p-2 rounded"
        required
      />

      <button
        type="submit"
        className="w-full bg-blue-500 text-white py-2 rounded hover:bg-blue-600 cursor-pointer"
      >
        Đăng nhập
      </button>

      <p className="text-center text-gray-600">
        Chưa có tài khoản?{" "}
        <Link to="/register" className="text-blue-600 hover:underline">
          Đăng ký
        </Link>
      </p>
    </form>
  );
}
