import React, { useRef } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { EffectCoverflow } from "swiper/modules";
import "swiper/css";
import "swiper/css/effect-coverflow";
import { ChevronLeft, ChevronRight } from "lucide-react";
import SwiperCore from "swiper";
import {astrologers} from "@/components/utils/const";

export default function AstrologersSection() {
    const swiperRef = useRef<SwiperCore | null>(null);

    return (
        <section id="astrologers" className="px-4 py-8 md:p-12 text-white text-center">
            <h3 className="text-2xl md:text-4xl font-playfair mb-6 md:mb-8">
                Connect with Your Expert AI Astrologers
            </h3>

            <Swiper
                modules={[EffectCoverflow]}
                effect="coverflow"
                centeredSlides={true}
                loop={true}
                slidesPerView={1}
                spaceBetween={50}
                coverflowEffect={{
                    rotate: 0,
                    depth: 200,
                }}
                breakpoints={{
                    768: { slidesPerView: 2 }
                }}
                onSwiper={(swiper) => (swiperRef.current = swiper)}
                className="pb-12"
            >
                {astrologers.map((astro, index) => (
                    <SwiperSlide key={index} className="transform transition-transform duration-300 px-2">
                        <div className="relative flex flex-col items-center bg-gray-900 p-4 rounded-xl shadow-lg">
                            <img
                                src={astro.image}
                                alt={astro.name}
                                className="w-32 h-32 md:w-56 md:h-56 rounded-full shadow-lg object-cover"
                            />
                            <div className="mt-4">
                                <h4 className="text-xl md:text-2xl font-dm-sans">{astro.name}</h4>
                                <p className="text-gray-300 font-inter text-sm md:text-base">{astro.role}</p>
                                <p className="mt-2 font-inter text-sm md:text-base max-w-md mx-auto">
                                    {astro.description}
                                </p>
                            </div>
                        </div>
                    </SwiperSlide>
                ))}
            </Swiper>

            {/* Navigation Buttons */}
            <div className="flex justify-center mt-6 space-x-4">
                <button
                    onClick={() => swiperRef.current?.slidePrev()}
                    className="p-3 bg-gray-800 bg-opacity-50 rounded-full transition-all hover:bg-gray-600"
                >
                    <ChevronLeft size={28} />
                </button>
                <button
                    onClick={() => swiperRef.current?.slideNext()}
                    className="p-3 bg-gray-800 bg-opacity-50 rounded-full transition-all hover:bg-gray-600"
                >
                    <ChevronRight size={28} />
                </button>
            </div>
        </section>
    );
}
