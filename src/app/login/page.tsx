'use client';

import { useState, useEffect, Suspense } from 'react';
import Image from 'next/image';
import { useAuth } from '@/hooks/useAuth';
import { useRouter, useSearchParams } from 'next/navigation';
import { validatePassword, validatePasswordMatch } from '@/utils/password-validation';

function LoginForm() {
  const [isLogin, setIsLogin] = useState(true);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [passwordErrors, setPasswordErrors] = useState<string[]>([]);
  const [passwordMatchError, setPasswordMatchError] = useState('');
  const { signIn, signUp, user, loading } = useAuth();
  const router = useRouter();
  const searchParams = useSearchParams();

  useEffect(() => {
    if (!loading && user) {
      const redirectTo = searchParams.get('redirectTo');
      const destination = redirectTo && redirectTo.startsWith('/courses') ? redirectTo : '/courses';
      router.replace(destination);
    }
  }, [user, loading, router, searchParams]);

  useEffect(() => {
    if (!isLogin && password) {
      const validation = validatePassword(password);
      setPasswordErrors(validation.errors);
    } else {
      setPasswordErrors([]);
    }
  }, [password, isLogin]);

  useEffect(() => {
    if (!isLogin && confirmPassword && password !== confirmPassword) {
      setPasswordMatchError('Slaptažodžiai nesutampa');
    } else {
      setPasswordMatchError('');
    }
  }, [password, confirmPassword, isLogin]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    
    try {
      if (isLogin) {
        await signIn({ email, password });
      } else {
        const passwordValidation = validatePassword(password);
        const passwordsMatch = validatePasswordMatch(password, confirmPassword);
        
        if (!passwordValidation.isValid || !passwordsMatch) {
          return;
        }
        
        const result = await signUp({ email, password, confirmPassword });
        
        if (!result.error) {
          setEmail('');
          setPassword('');
          setConfirmPassword('');
          setIsLogin(true);
        }
      }
    } catch (err) {
      // Error handling is done by the auth service
    } finally {
      setIsLoading(false);
    }
  };

  const handleModeSwitch = () => {
    setIsLogin(!isLogin);
    setPassword('');
    setConfirmPassword('');
    setPasswordErrors([]);
    setPasswordMatchError('');
  };

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
              {!isLogin && passwordErrors.length > 0 && (
                <div className="mt-2 space-y-1">
                  {passwordErrors.map((error, index) => (
                    <p key={index} className="text-red-400 text-sm">{error}</p>
                  ))}
                </div>
              )}
            </div>

            {!isLogin && (
              <div>
                <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-300">
                  Pakartokite slaptažodį
                </label>
                <input
                  id="confirmPassword"
                  type="password"
                  required
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  disabled={isLoading}
                  className="mt-1 block w-full px-4 py-3 bg-white/5 border border-orange-500/20 rounded-lg 
                           text-white placeholder-gray-400 focus:outline-none focus:ring-2 
                           focus:ring-orange-500 focus:border-transparent disabled:opacity-50"
                  placeholder="••••••••"
                />
                {passwordMatchError && (
                  <p className="mt-2 text-red-400 text-sm">{passwordMatchError}</p>
                )}
              </div>
            )}

            <button
              type="submit"
              disabled={isLoading || (!isLogin && (passwordErrors.length > 0 || !!passwordMatchError))}
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
              onClick={handleModeSwitch}
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

function LoginFallback() {
  return (
    <section className="relative min-h-screen bg-[#121212] overflow-hidden flex items-center justify-center">
      <div className="text-white text-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-orange-500 mx-auto mb-4"></div>
        <p>Loading...</p>
      </div>
    </section>
  );
}

export default function LoginPage() {
  return (
    <Suspense fallback={<LoginFallback />}>
      <LoginForm />
    </Suspense>
  );
} 