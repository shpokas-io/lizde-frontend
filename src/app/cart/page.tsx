"use client";

import Image from "next/image";
import Link from "next/link";
import { FaLock, FaArrowLeft } from "react-icons/fa";

export default function CartPage() {
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
                      <FaLock className="w-4 h-4 mr-3 text-orange-500" />
                      Access to all course materials
                    </li>
                    <li className="flex items-center text-gray-300">
                      <FaLock className="w-4 h-4 mr-3 text-orange-500" />
                      Lifetime updates
                    </li>
                    <li className="flex items-center text-gray-300">
                      <FaLock className="w-4 h-4 mr-3 text-orange-500" />
                      Community access
                    </li>
                    <li className="flex items-center text-gray-300">
                      <FaLock className="w-4 h-4 mr-3 text-orange-500" />
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
                    className="w-full py-4 px-6 rounded-full bg-orange-500 hover:bg-orange-600 text-white font-semibold text-lg
                    transition-all duration-200 transform hover:scale-105 shadow-[0_0_20px_rgba(249,115,22,0.3)]"
                  >
                    Proceed to Checkout
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