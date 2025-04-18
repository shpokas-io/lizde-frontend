"use client";
import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { FaCheck, FaPlay } from "react-icons/fa";

export default function BuyPage() {
  const [selectedPlan, setSelectedPlan] = useState<"basic" | "pro">("pro");

  const features = [
    "Access to all course materials",
    "Lifetime updates",
    "Community access",
    "Personal feedback from mentors",
    "Project reviews",
    "Certificate upon completion",
    "1-on-1 mentoring sessions",
    "Priority support",
  ];

  const plans = {
    basic: {
      name: "Muzikos kursas",
      price: "€250",
      features: features.slice(0, 4),
    },
  };

  return (
    <div className="min-h-screen bg-[#121212] text-white">
      {/* Hero Section */}
      <div className="relative bg-[#1a1a1a] border-b border-gray-800">
        <div className="container mx-auto px-4 py-16">
          <div className="max-w-3xl mx-auto text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-6 bg-gradient-to-r from-orange-500 to-orange-300 bg-clip-text text-transparent">
              Start Your Music Production Journey Today
            </h1>
            <p className="text-xl text-gray-400 mb-8">
              Join thousands of successful producers who have transformed their
              music career with our comprehensive course
            </p>
          </div>
        </div>
      </div>

      {/* Pricing Section */}
      <div className="container mx-auto px-4 py-16">
        <div className="max-w-5xl mx-auto">
          {/* Course Preview */}
          <div className="bg-[#1a1a1a] rounded-2xl p-8 mb-12 border border-gray-800">
            <div className="grid md:grid-cols-2 gap-8">
              <div className="relative aspect-video rounded-xl overflow-hidden">
                <Image
                  src="/images/course-preview.jpg"
                  alt="Course Preview"
                  fill
                  className="object-cover"
                />
                <div className="absolute inset-0 bg-black bg-opacity-40 flex items-center justify-center">
                  <button className="bg-orange-500 hover:bg-orange-600 text-white p-4 rounded-full transition-colors">
                    <FaPlay className="w-6 h-6" />
                  </button>
                </div>
              </div>
              <div className="space-y-4">
                <h3 className="text-2xl font-bold">What you'll learn:</h3>
                <ul className="space-y-3">
                  <li className="flex items-start">
                    <FaCheck className="w-5 h-5 text-orange-500 mt-1 mr-3" />
                    <span>Professional music production techniques</span>
                  </li>
                  <li className="flex items-start">
                    <FaCheck className="w-5 h-5 text-orange-500 mt-1 mr-3" />
                    <span>Sound design and mixing mastery</span>
                  </li>
                  <li className="flex items-start">
                    <FaCheck className="w-5 h-5 text-orange-500 mt-1 mr-3" />
                    <span>Industry-standard workflows</span>
                  </li>
                  <li className="flex items-start">
                    <FaCheck className="w-5 h-5 text-orange-500 mt-1 mr-3" />
                    <span>Marketing and business strategies</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>

          {/* Pricing Plans */}
          <div className="flex justify-center">
            {Object.entries(plans).map(([key, plan]) => (
              <div
                key={key}
                className={`
                  relative bg-[#1a1a1a] rounded-2xl p-8 border-2 
                  transition-all duration-200 cursor-pointer
                  ${
                    selectedPlan === key
                      ? "border-orange-500 shadow-[0_0_20px_rgba(249,115,22,0.2)]"
                      : "border-gray-800 hover:border-gray-700"
                  }
                `}
                onClick={() => setSelectedPlan(key as "basic" | "pro")}
              >
                <div className="text-center mb-8">
                  <h3 className="text-xl font-bold mb-2">{plan.name}</h3>
                  <div className="text-3xl font-bold text-orange-500">
                    {plan.price}
                  </div>
                </div>

                <ul className="space-y-4 mb-8">
                  {plan.features.map((feature, index) => (
                    <li key={index} className="flex items-start">
                      <FaCheck className="w-5 h-5 text-orange-500 mt-1 mr-3" />
                      <span className="text-gray-300">{feature}</span>
                    </li>
                  ))}
                </ul>

                <Link
                  href="/auth/register"
                  className={`
                    block w-full py-4 px-6 rounded-full text-center font-semibold text-lg
                    transition-all duration-200 transform hover:scale-105
                    ${
                      selectedPlan === key
                        ? "bg-orange-500 hover:bg-orange-600 text-white shadow-[0_0_20px_rgba(249,115,22,0.3)]"
                        : "bg-[#232323] hover:bg-[#2a2a2a] text-gray-300"
                    }
                  `}
                >
                  Get Started
                </Link>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
