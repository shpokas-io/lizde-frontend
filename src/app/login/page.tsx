'use client';

import { FcGoogle } from 'react-icons/fc';
import Image from 'next/image';

export default function LoginPage() {
  return (
    <section className="relative min-h-screen bg-[#121212] overflow-hidden">
      {/* Background Image with Overlays */}
      <div className="absolute inset-0 z-0">
        {/* Main Background Image */}
        <Image
          src="/images/background.jpg"
          alt="Music Studio Setup"
          fill
          className="object-cover object-center"
          priority
          quality={100}
        />
        
        {/* Gradient Overlays */}
        <div className="absolute inset-0 bg-gradient-to-r from-[#121212] via-transparent to-[#121212]/80" />
        <div className="absolute inset-0 bg-gradient-to-t from-[#121212] via-[#121212]/50 to-transparent" />
        
        {/* Optional: Texture Overlay */}
        <div className="absolute inset-0 bg-[#121212]/30" />
      </div>

      {/* Main Content */}
      <div className="relative z-10 min-h-screen flex items-center justify-center">
        <div className="max-w-md w-full mx-4 p-8 bg-[#121212]/80 backdrop-blur-lg rounded-2xl border border-orange-500/10 shadow-[0_0_20px_rgba(249,115,22,0.1)]">
          <div className="text-center space-y-4">
            <h2 className="text-4xl font-bold">
              <span className="bg-gradient-to-r from-orange-500 to-orange-300 bg-clip-text text-transparent">
                Sveiki atvykę
              </span>
            </h2>
            <p className="text-gray-300">
              Prašome prisijungti norėdami tęsti
            </p>
          </div>
          
          <div className="mt-8">
            <button
              className="w-full flex items-center justify-center px-6 py-4 
                       bg-white/5 hover:bg-white/10 border border-orange-500/20 
                       rounded-full shadow-lg text-base font-medium text-white 
                       hover:text-orange-500 transition-all duration-300 
                       transform hover:scale-105 focus:outline-none 
                       focus:ring-2 focus:ring-orange-500 focus:ring-offset-2 
                       focus:ring-offset-[#121212]"
              onClick={() => {
                // Google login logic will be implemented later
                console.log('Google login clicked');
              }}
            >
              <FcGoogle className="h-6 w-6 mr-3" />
              Sign in with Google
            </button>
          </div>
        </div>
      </div>
    </section>
  );
} 