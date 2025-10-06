import { useState } from "react";
import type { User } from "../types";
import { Link, useNavigate } from "react-router-dom";

export default function RegisterPage() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleRegister = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const storedUsers = localStorage.getItem("users");
    const users: User[] = storedUsers ? JSON.parse(storedUsers) : [];

    const isEmailTaken = users.some((user) => user.email === email);
    if (isEmailTaken) {
      alert("Email đã được sử dụng.");
      return;
    }

    const newUser: User = {
      name,
      email,
      password,
      avatar: "/default-avatar.png",
    };

    users.push(newUser);
    localStorage.setItem("users", JSON.stringify(users));

    alert("Đăng ký thành công!");
    navigate("/login");
  };

  return (
    <form
      onSubmit={handleRegister}
      className="max-w-sm min-h-screen mx-auto mt-20 space-y-4"
    >
      <h2 className="text-xl font-semibold text-center">Đăng ký tài khoản</h2>

      <input
        type="text"
        placeholder="Họ và tên"
        value={name}
        onChange={(e) => setName(e.target.value)}
        className="w-full border p-2 rounded"
        required
      />
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
        className="w-full bg-green-600 text-white py-2 rounded hover:bg-green-700 cursor-pointer"
      >
        Đăng ký
      </button>

      <p className="text-center text-gray-600">
        Đã có tài khoản?{" "}
        <Link to="/login" className="text-blue-600 hover:underline">
          Đăng nhập
        </Link>
      </p>
    </form>
  );
}
