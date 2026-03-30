"use client";
import React, { useState } from "react";
import { Star, Play, X } from "lucide-react";

const SuccessStoriesSection = () => {
  const [selectedVideo, setSelectedVideo] = useState(null);

  const testimonials = [
    {
      id: 1,
      type: "image",
      media: "https://images.unsplash.com/photo-1556742044-3c52d6e88c62?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      quote: "Zayaka POS doubled our checkout speed in just one month. A total game changer for our business.",
      author: "Sarah Jenkins",
      role: "CEO of Urban Bites",
      rating: 5,
    },
    {
      id: 2,
      type: "video",
      media: "https://images.unsplash.com/photo-1441986300917-64674bd600d8?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      videoUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ", // Placeholder video
      quote: "Inventory tracking is finally automated and stress-free. Highly recommend Zayaka POS for modern retail.",
      author: "Marcus Vong",
      role: "Founder of Mode Retail",
      rating: 5,
    },
    {
      id: 3,
      type: "image",
      media: "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      quote: "The interface is so intuitive, our staff picked it up in hours. Exceptional support too!",
      author: "Elena Rodriguez",
      role: "Owner of La Luna Bistro",
      rating: 5,
    },
    {
      id: 4,
      type: "video",
      media: "https://images.unsplash.com/photo-1587502537745-84b86da1204f?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      videoUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ", // Placeholder video
      quote: "Zayaka POS analytics helped us identify our most profitable dishes within weeks.",
      author: "David Chen",
      role: "Manager of Golden Dragon",
      rating: 5,
    },
  ];

  return (
    <section id="testimonials" className="py-12 sm:py-16 lg:py-20 px-4 sm:px-6 lg:px-8 bg-[#F8F9FB] dark:bg-black overflow-hidden">
      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <div className="text-center mb-16" data-aos="fade-up">
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-black text-[#111827] dark:text-white leading-tight mb-4 tracking-tight">
            Customer Success Stories
          </h2>
          <p className="text-[#6B7280] dark:text-gray-400 text-lg sm:text-xl max-w-2xl mx-auto font-medium">
            See how businesses around the globe are transforming <br className="hidden sm:block" /> their operations with Zayaka POS.
          </p>
        </div>

        {/* Testimonials Grid / Mobile Slider */}
        <div className="flex overflow-x-auto md:grid md:grid-cols-2 gap-6 md:gap-8 lg:gap-10 items-stretch snap-x snap-mandatory pb-8 md:pb-0 -mx-4 px-4 sm:-mx-6 sm:px-6 lg:mx-0 lg:px-0 [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]">
          {testimonials.map((item) => (
            <div 
              key={item.id}
              className="group flex-none w-[85vw] sm:w-[380px] md:w-auto snap-center flex flex-col bg-white dark:bg-[#111827] rounded-2xl overflow-hidden shadow-sm hover:shadow-2xl transition-all duration-500 hover:-translate-y-2 border border-black/5 dark:border-white/10"
              data-aos="fade-up"
              data-aos-delay={item.id * 100}
            >
              {/* Media Section */}
              <div 
                className={`relative aspect-[16/9] overflow-hidden cursor-pointer ${item.type === 'video' ? 'group/video' : ''}`}
                onClick={() => item.type === 'video' && setSelectedVideo(item.videoUrl)}
              >
                <img 
                  src={item.media} 
                  alt={item.author}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                
                {item.type === "video" && (
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="w-16 h-16 sm:w-20 sm:h-20 bg-[#F02E8E] text-white rounded-full flex items-center justify-center shadow-2xl transition-all duration-300 group-hover/video:scale-125 group-hover/video:bg-[#D41D7D]">
                      <Play size={32} className="fill-current translate-x-1" />
                    </div>
                  </div>
                )}
              </div>

              {/* Content Section */}
              <div className="p-6 sm:p-8 flex flex-col flex-grow">
                {/* Star Rating */}
                <div className="flex gap-1 mb-4">
                  {[...Array(item.rating)].map((_, i) => (
                    <Star key={i} size={18} className="fill-[#F02E8E] text-[#F02E8E]" />
                  ))}
                </div>

                {/* Testimonial Text */}
                <p className="text-[#111827] dark:text-white text-lg sm:text-xl font-bold leading-snug mb-6 opacity-90">
                  "{item.quote}"
                </p>

                {/* Footer Info */}
                <div className="mt-auto pt-6 border-t border-black/5 dark:border-white/5 flex items-center justify-between">
                  <div>
                    <h4 className="font-black text-[#111827] dark:text-white text-base">
                      {item.author}
                    </h4>
                    <p className="text-[#6B7280] dark:text-gray-400 text-sm font-medium">
                      {item.role}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Video Modal */}
      {selectedVideo && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-8 bg-black/90 backdrop-blur-sm animate-in fade-in duration-300">
          <div className="relative w-full max-w-5xl aspect-video bg-black rounded-2xl overflow-hidden shadow-2xl">
            <button 
              onClick={() => setSelectedVideo(null)}
              className="absolute top-4 right-4 z-10 w-10 h-10 bg-white/20 hover:bg-white/40 text-white rounded-full flex items-center justify-center transition-colors"
            >
              <X size={24} />
            </button>
            <iframe 
              src={`${selectedVideo}?autoplay=1`}
              className="w-full h-full border-none"
              allow="autoplay; encrypted-media"
              allowFullScreen
            />
          </div>
        </div>
      )}
    </section>
  );
};

export default SuccessStoriesSection;
