import React, { useRef } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { EffectCoverflow } from "swiper/modules";
import "swiper/css";
import "swiper/css/effect-coverflow";
import { ChevronLeft, ChevronRight } from "lucide-react";
import SwiperCore from "swiper";

const astrologers = [
    {
        name: "Vedica",
        role: "The Life Harmonizer",
        description: "Vedika offers personalized insights on your physical and mental well-being. Using your unique birth chart, she guides you toward balanced health and harmony, tailored specifically to your needs.",
        image: "/vedica_astro.png"
    },
    {
        name: "Rudra",
        role: "The Wealth Strategist",
        description: "Rudra specializes in finance and prosperity-related predictions. With deep astrological insights, Rudra helps you understand financial trends, uncover investment opportunities, and navigate prosperity cycles based on your unique birth chart.",
        image: "/rudra_astro.png"
    },
    {
        name: "Vyom",
        role: "The Career Navigator",
        description: "Vyom specializes in predictions related to career growth and opportunities. With Vyom’s astrological expertise, you can find clarity on professional advancement, job transitions, and new career paths.",
        image: "/vyom_astro.png"
    },
    {
        name: "Meher",
        role: "The Heart Alchemist",
        description: "Meher specializes in relationships and emotional connections, providing personalized, intuitive guidance to navigate your love life with clarity and confidence.",
        image: "/meher_astro.png"
    }
];

export default function AstrologersSection() {
    const swiperRef = useRef<SwiperCore | null>(null);

    return (
        <section id="astrologers" className="p-12 text-white text-center">
            <h3 className="text-4xl font-playfair mb-8">Connect with Your Expert AI Astrologers</h3>
            <div>
                <Swiper
                    modules={[EffectCoverflow]}
                    effect="coverflow"
                    centeredSlides={true}
                    loop={true}
                    slidesPerView={2}
                    spaceBetween={100}
                    coverflowEffect={{
                        rotate: 0,
                        depth: 200,
                    }}
                    breakpoints={{
                        640: { slidesPerView: 1 },
                        1024: { slidesPerView: 2 }
                    }}
                    onSwiper={(swiper) => (swiperRef.current = swiper)} // Store swiper instance
                    className="pb-12" // Adds space for navigation buttons
                >
                    {astrologers.map((astro, index) => (
                        <SwiperSlide key={index} className="transform transition-transform duration-300">
                            <div className="relative flex flex-col items-center bg-gray-900 p-4 rounded-xl shadow-lg">
                                <img src={astro.image} alt={astro.name}
                                     className="w-40 h-40 md:w-56 md:h-56 rounded-full shadow-lg"/>
                                <div className="mt-4">
                                    <h4 className="text-2xl font-dm-sans">{astro.name}</h4>
                                    <p className="text-gray-300 font-inter">{astro.role}</p>
                                    <p className="mt-2 font-inter max-w-lg">{astro.description}</p>
                                </div>
                            </div>
                        </SwiperSlide>
                    ))}
                </Swiper>

                {/* Custom Navigation Buttons */}
                <div className="flex justify-center mt-6 space-x-4">
                    <button
                        onClick={() => swiperRef.current?.slidePrev()}
                        className="p-3 bg-gray-800 bg-opacity-50 rounded-full transition-all hover:bg-gray-600"
                    >
                        <ChevronLeft size={32} />
                    </button>
                    <button
                        onClick={() => swiperRef.current?.slideNext()}
                        className="p-3 bg-gray-800 bg-opacity-50 rounded-full transition-all hover:bg-gray-600"
                    >
                        <ChevronRight size={32} />
                    </button>
                </div>
            </div>
        </section>
    );
}
