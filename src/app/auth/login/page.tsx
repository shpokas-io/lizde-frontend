"use client";
import { useAuth } from '@/contexts/AuthContext';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';

export default function LoginPage() {
  const { signInWithGoogle, user } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (user) {
      router.push('/courses');
    }
  }, [user, router]);

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
            Welcome to Takade
          </h1>
          
          <p className="text-gray-400 text-center mb-6">
            Sign in with your Google account to access our courses
          </p>

          <button
            onClick={signInWithGoogle}
            className="w-full py-3 px-4 bg-white hover:bg-gray-100 
                     text-gray-800 rounded-lg transition-colors duration-200
                     font-medium focus:outline-none focus:ring-2 
                     focus:ring-gray-500 focus:ring-offset-2 
                     focus:ring-offset-[#1a1a1a] flex items-center justify-center gap-2"
          >
            <Image
              src="/images/google-logo.png"
              alt="Google Logo"
              width={20}
              height={20}
            />
            Sign in with Google
          </button>
        </div>
      </div>
    </div>
  );
} 