'use client';

import { useState, useEffect } from 'react';
import { FcGoogle } from 'react-icons/fc';
import Image from 'next/image';
import { useAuth } from '@/contexts/AuthContext';
import { useRouter, useSearchParams } from 'next/navigation';
import toast from 'react-hot-toast';

export default function LoginPage() {
  const [isLogin, setIsLogin] = useState(true);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const { signIn, signUp, error, user, loading } = useAuth();
  const router = useRouter();
  const searchParams = useSearchParams();

  // Redirect if user is already logged in
  useEffect(() => {
    console.log('Login page - user state changed:', { 
      user: user?.email, 
      loading, 
      userExists: !!user 
    });
    
    if (!loading && user) {
      console.log('User is logged in, redirecting...');
      // Check for redirectTo parameter
      const redirectTo = searchParams.get('redirectTo');
      const destination = redirectTo && redirectTo.startsWith('/courses') ? redirectTo : '/courses';
      console.log('Redirecting to:', destination);
      // Use replace instead of push to prevent back navigation to login
      router.replace(destination);
    }
  }, [user, loading, router, searchParams]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    
    try {
      if (isLogin) {
        console.log('Attempting sign in...');
        console.log('Attempting to sign in with:', { email, passwordLength: password.length });
        
        const { error: signInError } = await signIn(email, password);
        
        if (signInError) {
          console.log('Sign in failed:', signInError.message);
          toast.error('Invalid email or password');
          return;
        }
        
        console.log('Sign in successful:', { userId: user?.id });
        console.log('Sign in successful, showing success toast...');
        toast.success('Successfully logged in!');
        
        // Don't manually redirect here - let the useEffect handle it
        // The useEffect will trigger when the user state updates
        
      } else {
        console.log('Attempting sign up...');
        const { error: signUpError } = await signUp(email, password);
        if (signUpError) {
          if (signUpError.message.includes('already registered')) {
            toast.error('This email is already registered. Please sign in instead.');
            setIsLogin(true);
          } else {
            toast.error(signUpError.message || 'Failed to create account');
          }
          return;
        }
        console.log('Sign up successful, showing success toast...');
        toast.success('Account created successfully! You can now access the courses.');
        
        // Don't manually redirect here - let the useEffect handle it
        // The useEffect will trigger when the user state updates
      }
    } catch (err) {
      console.error('Unexpected error during authentication:', err);
      toast.error('An unexpected error occurred');
    } finally {
      setIsLoading(false);
    }
  };

  // Show loading state while checking authentication
  if (loading) {
    return (
      <section className="relative min-h-screen bg-[#121212] overflow-hidden flex items-center justify-center">
        <div className="text-white text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-orange-500 mx-auto mb-4"></div>
          <p>Checking authentication...</p>
        </div>
      </section>
    );
  }

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
                {isLogin ? 'Sveiki atvykę' : 'Registracija'}
              </span>
            </h2>
            <p className="text-gray-300">
              {isLogin ? 'Prašome prisijungti norėdami tęsti' : 'Sukurkite naują paskyrą'}
            </p>
          </div>
          
          <form onSubmit={handleSubmit} className="mt-8 space-y-6">
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-300">
                El. paštas
              </label>
              <input
                id="email"
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                disabled={isLoading}
                className="mt-1 block w-full px-4 py-3 bg-white/5 border border-orange-500/20 rounded-lg 
                         text-white placeholder-gray-400 focus:outline-none focus:ring-2 
                         focus:ring-orange-500 focus:border-transparent disabled:opacity-50"
                placeholder="jusu@pastas.lt"
              />
            </div>

            <div>
              <label htmlFor="password" className="block text-sm font-medium text-gray-300">
                Slaptažodis
              </label>
              <input
                id="password"
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                disabled={isLoading}
                className="mt-1 block w-full px-4 py-3 bg-white/5 border border-orange-500/20 rounded-lg 
                         text-white placeholder-gray-400 focus:outline-none focus:ring-2 
                         focus:ring-orange-500 focus:border-transparent disabled:opacity-50"
                placeholder="••••••••"
              />
            </div>

            <button
              type="submit"
              disabled={isLoading}
              className="w-full px-6 py-4 bg-gradient-to-r from-orange-500 to-orange-400 
                       rounded-full text-white font-medium shadow-lg 
                       hover:from-orange-600 hover:to-orange-500 
                       focus:outline-none focus:ring-2 focus:ring-orange-500 
                       focus:ring-offset-2 focus:ring-offset-[#121212] 
                       transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isLoading ? 'Palaukite...' : (isLogin ? 'Prisijungti' : 'Registruotis')}
            </button>
          </form>

          <div className="mt-6 text-center">
            <button
              onClick={() => setIsLogin(!isLogin)}
              disabled={isLoading}
              className="text-orange-500 hover:text-orange-400 text-sm font-medium disabled:opacity-50"
            >
              {isLogin ? 'Neturite paskyros? Registruokitės' : 'Jau turite paskyrą? Prisijunkite'}
            </button>
          </div>
        </div>
      </div>
    </section>
  );
} 