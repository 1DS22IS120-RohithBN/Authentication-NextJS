"use client";
import { useEffect, useState } from "react";
import axios from "axios";
import Link from "next/link";
import toast from "react-hot-toast";

const VerifyEmailPage = () => {
  const [token, setToken] = useState("");
  const [isVerified, setIsVerified] = useState(false);
  const [error, setError] = useState(false);

  const verifyEmail = async () => {
    try {
      await axios.post("/api/users/verifyEmail", { token });
      setIsVerified(true);
      toast.success("Email verified successfully!");
    } catch (error: any) {
      setError(true);
      console.log(error)
      toast.error("Verification failed. Invalid token.");
    }
  };

  useEffect(() => {
    const urlToken = window.location.search.split("=")[1];
    setToken(urlToken || "")
  }, []);

  useEffect(() => {
    if (token.length > 0) {
      verifyEmail();
    }
  }, [token]);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen">
      <div className=" shadow-lg rounded-lg p-6 max-w-lg w-full">
        <h1 className="text-2xl font-bold mb-4 text-center ">Verify Your Email</h1>

        {isVerified ? (
          <div className="text-center">
            <p className="text-green-600">Your email has been verified!</p>
            <Link href="/login">
              <button className="mt-4 inline-block bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600">
                Login here
              </button>
            </Link>
          </div>
        ) : (
          <div className="text-center">
            <p>Click <a href="#" onClick={verifyEmail} className="text-blue-500 underline">here</a> to verify your email.</p>
          </div>
        )}

        {error && <p className="text-red-600 mt-4">Invalid token.Please try again.</p>}
      </div>
    </div>
  );
};

export default VerifyEmailPage;
