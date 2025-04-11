"use client";
import { useState } from "react";
import Link from "next/link";
import Image from "next/image";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    // TODO: Implement login logic
    console.log("Login attempt:", { email, password });
  };

  return (
    <div className="min-h-screen bg-[#121212] flex flex-col justify-center">
      <div className="container mx-auto px-4 py-8 max-w-md">
        <div className="text-center mb-8">
          <Link href="/" className="inline-block">
            <Image
              src="/images/logo-white.png"
              alt="Takade Logo"
              width={120}
              height={40}
              className="mx-auto"
            />
          </Link>
        </div>

        <div className="bg-[#1a1a1a] rounded-2xl p-8 border border-gray-800">
          <h1 className="text-2xl font-bold text-white mb-6 text-center">
            Welcome back
          </h1>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-300 mb-2">
                Email
              </label>
              <input
                id="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full px-4 py-3 bg-[#232323] border border-gray-800 rounded-lg 
                         text-white focus:outline-none focus:border-orange-500 
                         transition-colors"
                required
              />
            </div>

            <div>
              <label htmlFor="password" className="block text-sm font-medium text-gray-300 mb-2">
                Password
              </label>
              <input
                id="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full px-4 py-3 bg-[#232323] border border-gray-800 rounded-lg 
                         text-white focus:outline-none focus:border-orange-500 
                         transition-colors"
                required
              />
            </div>

            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <input
                  id="remember"
                  type="checkbox"
                  className="h-4 w-4 bg-[#232323] border-gray-800 rounded 
                           text-orange-500 focus:ring-orange-500"
                />
                <label htmlFor="remember" className="ml-2 text-sm text-gray-300">
                  Remember me
                </label>
              </div>
              <Link
                href="/auth/forgot-password"
                className="text-sm text-orange-500 hover:text-orange-400"
              >
                Forgot password?
              </Link>
            </div>

            <button
              type="submit"
              className="w-full py-3 px-4 bg-orange-500 hover:bg-orange-600 
                       text-white rounded-lg transition-colors duration-200
                       font-medium focus:outline-none focus:ring-2 
                       focus:ring-orange-500 focus:ring-offset-2 
                       focus:ring-offset-[#1a1a1a]"
            >
              Sign in
            </button>
          </form>

          <div className="mt-6 text-center">
            <p className="text-gray-400">
              Don't have an account?{" "}
              <Link
                href="/auth/register"
                className="text-orange-500 hover:text-orange-400 font-medium"
              >
                Sign up
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
} 