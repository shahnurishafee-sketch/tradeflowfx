"use client";
import { useState } from "react";
import { supabase } from "@/lib/supabaseClient";

export default function SignupPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");

  const handleSignup = async () => {
    const { data, error } = await supabase.auth.signUp({
      email,
      password,
    });

    if (error) {
      setMessage(error.message);
    } else {
      setMessage("Signup successful! Check your email to verify your account.");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-black text-white">
      <div className="w-full max-w-md p-6 bg-neutral-900 rounded-xl border border-neutral-700">
        <h1 className="text-2xl font-bold mb-4">Create Account</h1>

        <input
          type="email"
          placeholder="Email"
          className="w-full p-3 mb-3 rounded bg-neutral-800 border border-neutral-700"
          onChange={(e) => setEmail(e.target.value)}
        />

        <input
          type="password"
          placeholder="Password"
          className="w-full p-3 mb-3 rounded bg-neutral-800 border border-neutral-700"
          onChange={(e) => setPassword(e.target.value)}
        />

        <button
          onClick={handleSignup}
          className="w-full p-3 bg-blue-600 rounded hover:bg-blue-700"
        >
          Sign Up
        </button>

        {message && <p className="mt-4 text-sm">{message}</p>}
      </div>
    </div>
  );
}
