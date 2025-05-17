"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { FaLock, FaArrowLeft, FaCheck } from "react-icons/fa";
import { useAuth } from "@/contexts/AuthContext";
import { useRouter } from "next/navigation";
import { toast } from "react-hot-toast";
import { createClient } from '@supabase/supabase-js';
import { Database } from '@/types/database';

const supabase = createClient<Database>(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
);

export default function CartPage() {
  const { user, updateCourseAccess, checkCourseAccess } = useAuth();
  const router = useRouter();
  const [isProcessing, setIsProcessing] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);

  const handlePurchase = async () => {
    if (!user) {
      router.push('/auth/login');
      return;
    }

    setIsProcessing(true);
    try {
      console.log('Starting purchase process for user:', user.id);
      await updateCourseAccess(true);
      console.log('Successfully updated course access');
      
      // Force a refresh of the auth state
      const { data: { session } } = await supabase.auth.getSession();
      if (session?.user) {
        const hasAccess = await checkCourseAccess();
        // The user state will be updated by the AuthContext's onAuthStateChange
      }
      
      setShowSuccess(true);
      // Show success message for 2 seconds before redirecting
      setTimeout(() => {
        router.push('/courses');
      }, 2000);
    } catch (error) {
      console.error('Detailed error processing purchase:', error);
      toast.error(error instanceof Error ? error.message : 'Failed to process purchase. Please try again.');
    } finally {
      setIsProcessing(false);
    }
  };

  if (showSuccess) {
    return (
      <div className="min-h-screen bg-[#121212] text-white flex items-center justify-center">
        <div className="text-center">
          <div className="mb-6">
            <div className="w-16 h-16 bg-green-500 rounded-full mx-auto flex items-center justify-center">
              <FaCheck className="w-8 h-8 text-white" />
            </div>
          </div>
          <h2 className="text-2xl font-bold mb-4">Purchase Successful!</h2>
          <p className="text-gray-400 mb-8">Redirecting you to the course...</p>
          <div className="w-8 h-8 border-4 border-t-orange-500 border-r-orange-500 border-b-gray-700 border-l-gray-700 rounded-full animate-spin mx-auto"></div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#121212] text-white">
      <div className="container mx-auto px-4 py-16">
        <div className="max-w-4xl mx-auto">
          <Link 
            href="/courses" 
            className="flex items-center text-gray-400 hover:text-white mb-8"
          >
            <FaArrowLeft className="mr-2" />
            Back to Courses
          </Link>

          <div className="bg-[#1a1a1a] rounded-2xl p-8 border border-gray-800">
            <h1 className="text-3xl font-bold mb-8">Your Cart</h1>
            
            <div className="flex flex-col md:flex-row gap-8">
              <div className="flex-1">
                <div className="bg-[#232323] rounded-xl p-6 mb-4">
                  <h2 className="text-xl font-semibold mb-4">Muzikos kursas</h2>
                  <div className="flex items-center justify-between mb-4">
                    <span className="text-gray-400">Price</span>
                    <span className="text-2xl font-bold text-orange-500">€250</span>
                  </div>
                  <ul className="space-y-3 mb-6">
                    <li className="flex items-center text-gray-300">
                      <FaCheck className="w-4 h-4 mr-3 text-orange-500" />
                      Access to all course materials
                    </li>
                    <li className="flex items-center text-gray-300">
                      <FaCheck className="w-4 h-4 mr-3 text-orange-500" />
                      Lifetime updates
                    </li>
                    <li className="flex items-center text-gray-300">
                      <FaCheck className="w-4 h-4 mr-3 text-orange-500" />
                      Community access
                    </li>
                    <li className="flex items-center text-gray-300">
                      <FaCheck className="w-4 h-4 mr-3 text-orange-500" />
                      Personal feedback from mentors
                    </li>
                  </ul>
                </div>
              </div>

              <div className="md:w-80">
                <div className="bg-[#232323] rounded-xl p-6 sticky top-8">
                  <h3 className="text-lg font-semibold mb-4">Order Summary</h3>
                  <div className="space-y-4 mb-6">
                    <div className="flex justify-between">
                      <span className="text-gray-400">Subtotal</span>
                      <span>€250</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-400">Tax</span>
                      <span>€0</span>
                    </div>
                    <div className="border-t border-gray-700 pt-4">
                      <div className="flex justify-between font-bold">
                        <span>Total</span>
                        <span className="text-orange-500">€250</span>
                      </div>
                    </div>
                  </div>
                  <button
                    onClick={handlePurchase}
                    disabled={isProcessing}
                    className={`w-full py-4 px-6 rounded-full text-white font-semibold text-lg
                    transition-all duration-200 transform hover:scale-105 shadow-[0_0_20px_rgba(249,115,22,0.3)]
                    ${isProcessing 
                      ? 'bg-gray-600 cursor-not-allowed' 
                      : 'bg-orange-500 hover:bg-orange-600'}`}
                  >
                    {isProcessing ? 'Processing...' : 'Proceed to Checkout'}
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
} 