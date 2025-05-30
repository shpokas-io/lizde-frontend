"use client";
import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { FaCheck, FaPlay } from "react-icons/fa";

const features = [
  "Prieiga prie visų vaizdo pamokų be laiko ribojimo",
  "Visi atnaujinimai ateityje – nemokamai",
  "Prisijungimas prie mokinių bendruomenės",
  "Live Q&A kas savaitę, viso kurso metu",
];

const courseFeatures = [
  "Aiškūs ir praktiški paaiškinimai",
  "Viskas rodoma realiuose pavyzdžiuose",
  "Tinka tiek pradedantiems, tiek pažengusiems",
  "Naudojami tik nemokami 'stock' įrankiai",
  "Apimta visa kūrybos eiga - nuo A iki Z",
];

export default function BuyPage() {
  const [selectedPlan, setSelectedPlan] = useState("basic");

  return (
    <div className="min-h-screen bg-[#121212] text-white">
      {/* Hero Section */}
      <div className="bg-[#1a1a1a] border-b border-gray-800 pt-24">
        <div className="container mx-auto px-4 py-16">
          <div className="max-w-3xl mx-auto text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-6 bg-gradient-to-r from-orange-500 to-orange-300 bg-clip-text text-transparent">
              Atrask muzikos kūrimo pagrindus – žingsnis po žingsnio
            </h1>
            <p className="text-xl text-gray-400 mb-8">
              Šis kursas padės tau išmokti viską, ko reikia norint kurti, įrašyti ir sumiksuoti savo muziką nuo nulio, per 7 savaites
            </p>
          </div>
        </div>
      </div>

      {/* Main Content */}
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
                  <button className="bg-orange-500 hover:bg-orange-600 text-white p-4 rounded-full">
                    <FaPlay className="w-6 h-6" />
                  </button>
                </div>
              </div>
              <div className="space-y-4">
                <h3 className="text-2xl font-bold">Kodėl verta įsigyti šį kursą?</h3>
                <ul className="space-y-3">
                  {courseFeatures.map((feature, index) => (
                    <li key={index} className="flex items-start">
                      <FaCheck className="w-5 h-5 text-orange-500 mt-1 mr-3" />
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>

          {/* Pricing Card */}
          <div className="flex justify-center">
            <div
              className={`
                bg-[#1a1a1a] rounded-2xl p-8 border-2 
                ${selectedPlan === "basic" ? "border-orange-500 shadow-[0_0_20px_rgba(249,115,22,0.2)]" : "border-gray-800"}
              `}
            >
              <div className="text-center mb-8">
                <h3 className="text-xl font-bold mb-2">Muzikos kursas</h3>
                <div className="text-3xl font-bold text-orange-500">€250</div>
              </div>

              <ul className="space-y-3 pb-6">
                {features.map((feature, index) => (
                  <li key={index} className="flex items-start">
                    <FaCheck className="w-5 h-5 text-orange-500 mt-1 mr-3" />
                    <span>{feature}</span>
                  </li>
                ))}
              </ul>

              <Link
                href="/auth/register"
                className="block w-full py-4 px-6 rounded-full text-center font-semibold text-lg bg-orange-500 hover:bg-orange-600 text-white"
              >
                Pradėk dabar
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
