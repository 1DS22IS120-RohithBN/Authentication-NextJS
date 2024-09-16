"use client";
import React, { useState } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";
import Link from "next/link";
import toast from "react-hot-toast";

export default function SignupPage() {
  const router = useRouter();
  const [user, setUser] = useState({
    email: "",
    password: "",
    username: "",
  });
  const [loading, setLoading] = useState(false);

  const onSignup = async () => {
    try {
      setLoading(true);
      const response = await axios.post("/api/users/singup", user);
      console.log(response.data);
      toast.success("Signup Successful");
      router.push("/login");
    } catch (error: any) {
      toast.error(error.response?.data?.error || "An error occurred");
      console.log(error);
    } finally {
      setLoading(false);

    }
  };

  return (
    <div className="flex items-center justify-center">
      <div className="flex flex-col items-center p-6 justify-center h-96 w-96 border-slate-500 border mt-36 rounded-2xl shadow-lg shadow-purple-500">
        <h1>{loading ? "Processing" : "SignUp"}</h1>
        <hr />
        <label className="mt-4" htmlFor="username">
          Username:
        </label>
        <input
          type="text"
          id="username"
          value={user.username}
          onChange={(e) => setUser({ ...user, username: e.target.value })}
          className="p-2 h-8 border-gray-500 rounded-lg shadow-md shadow-slate-400 text-black focus:outline-none focus:border-gray-900"
        />
        <label className="mt-4" htmlFor="email">
          Email:
        </label>
        <input
          type="email"
          id="email"
          value={user.email}
          onChange={(e) => setUser({ ...user, email: e.target.value })}
          className="p-2 h-8 border-gray-500 rounded-lg shadow-md shadow-slate-400 text-black focus:outline-none focus:border-gray-900"
        />
        <label className="mt-4" htmlFor="password">
          Password:
        </label>
        <input
          type="password"
          id="password"
          value={user.password}
          onChange={(e) => setUser({ ...user, password: e.target.value })}
          className="p-2 h-8 border-gray-500 rounded-lg shadow-md shadow-slate-400 text-black focus:outline-none focus:border-gray-900"
        />
        <div className="flex flex-col items-center justify-center">
          <button
            className="p-2 border shadow-md shadow-slate-500 rounded-lg mb-4 align-middle focus:outline-none w-28 h-10 text-center mt-5"
            onClick={onSignup}
          >
            SignUp
          </button>
          <Link href="/login">
            Click here to <u className="text-slate-500 hover:text-slate-800">login</u>
          </Link>
        </div>
      </div>
    </div>
  );
}
