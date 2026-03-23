"use client";
import React from "react";
import { useParams } from "next/navigation";
import CTASection from "../../components/Home/CTASection"; // Fixed import path
import { useFeatures } from "@/context/FeatureContext";

export default function FeatureDetailPage() {
  const params = useParams();
  const { features, isLoading: loading } = useFeatures();
  
  const feature = features.find(f => f.slug === params.slug);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-black">
        <div className="w-12 h-12 border-4 border-pink-500 border-t-transparent rounded-full animate-spin"></div>
      </div>
    );
  }

  if (!feature) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50 dark:bg-black text-black dark:text-white">
        <h1 className="text-4xl font-bold mb-4">Feature not found</h1>
        <p className="text-gray-500">The feature you are looking for does not exist or is currently inactive.</p>
      </div>
    );
  }

  // Fallback hero if no image is provided from admin
  const heroImage = feature.image || "https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80";

  return (
    <div className="bg-white dark:bg-black w-full min-h-screen">
      {/* Hero Section */}
      <section className="pt-32 pb-20 px-6 md:px-12 lg:px-24 max-w-7xl mx-auto flex flex-col-reverse lg:flex-row items-center gap-12">
        <div className="w-full lg:w-1/2">
          {feature.highlight && (
            <div className="inline-block px-3 py-1 bg-pink-100 text-[#E80F88] text-xs font-bold rounded-full mb-6 uppercase tracking-wider">
              Featured Solution
            </div>
          )}
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-black text-gray-900 dark:text-white leading-tight mb-6">
            {feature.title}
          </h1>
          <p className="text-lg md:text-xl text-gray-600 dark:text-gray-300 leading-relaxed mb-8">
            {feature.shortDescription || (feature.description ? feature.description.substring(0, 150) + "..." : "")}
          </p>
          <div className="flex gap-4">
            <button className="bg-[#111827] text-white px-8 py-4 rounded-full font-bold shadow-[0_10px_20px_rgba(17,24,39,0.2)] hover:bg-[#E80F88] hover:shadow-[0_10px_20px_rgba(232,15,136,0.3)] transition-all duration-300 transform hover:-translate-y-1">
              Book a Demo
            </button>
            <button className="bg-transparent border border-gray-200 dark:border-gray-800 text-gray-900 dark:text-white px-8 py-4 rounded-full font-bold hover:border-gray-300 dark:hover:border-gray-700 transition-all duration-300">
              Contact Sales
            </button>
          </div>
        </div>
        
        <div className="w-full lg:w-1/2">
          <div className="rounded-3xl overflow-hidden shadow-2xl aspect-video md:aspect-[4/3] relative">
            <div className="absolute inset-0 bg-gradient-to-tr from-gray-900/10 to-transparent z-10 pointer-events-none" />
            <img src={heroImage} alt={feature.title} className="w-full h-full object-cover" />
          </div>
        </div>
      </section>

      {/* Description Content */}
      <section className="py-20 bg-gray-50 dark:bg-gray-900/50 px-6 md:px-12 lg:px-24">
        <div className="max-w-4xl mx-auto">
          <div className="bg-white dark:bg-[#111827] rounded-3xl p-8 md:p-12 shadow-xl border border-gray-100 dark:border-gray-800">
            <h2 className="text-2xl md:text-3xl font-black mb-8 text-black dark:text-white flex items-center gap-3">
              <span className="w-8 h-1 bg-[#E80F88] rounded-full inline-block"></span>
              Overview
            </h2>
            <div 
              className="text-gray-700 dark:text-gray-300 leading-relaxed text-lg whitespace-pre-line"
              dangerouslySetInnerHTML={{ __html: feature.description }}
            />
          </div>
        </div>
      </section>

      {/* Call to action */}
      <div className="mt-10">
        <CTASection />
      </div>
    </div>
  );
}
