import React, {useState} from "react";
import {motion} from "framer-motion";
import {ChevronLeft, ChevronRight} from "lucide-react";

const astrologers = [
    {
        name: "Celestia",
        role: "The Love & Relationships Guru",
        description: "Celestia deciphers your romantic and personal connections, guiding you toward fulfilling relationships and emotional harmony.",
        image: "/feat1.png"
    },
    {
        name: "Orion",
        role: "The Career & Success Guide",
        description: "Orion provides insight into your professional journey, helping you make informed career decisions and achieve success.",
        image: "/feat1.png"
    },
    {
        name: "Luna",
        role: "The Emotional Well-being Mentor",
        description: "Luna offers guidance for inner peace, emotional balance, and mental clarity in life's journey.",
        image: "/feat1.png"
    }
];

export default function AstrologersSection() {
    const [current, setCurrent] = useState(0);

    const nextSlide = () => {
        setCurrent((prev) => (prev + 1) % astrologers.length);
    };

    const prevSlide = () => {
        setCurrent((prev) => (prev - 1 + astrologers.length) % astrologers.length);
    };

    return (
        <section id="astrologers" className="p-12 text-white">
            <h3 className="text-[48px] font-playfair font-regular text-center">Meet Our AI Astrologers</h3>
            <div className="mt-8 flex flex-col items-center relative max-w-4xl mx-auto py-4">
                <motion.div
                    key={current}
                    initial={{opacity: 0, x: 50}}
                    animate={{opacity: 1, x: 0}}
                    exit={{opacity: 0, x: -50}}
                    transition={{duration: 0.5, ease: "easeInOut"}}
                    className="flex items-center relative border-2 border-gray-600 py-20 px-10"
                >
                    <img
                        src={astrologers[current].image}
                        alt={astrologers[current].name}
                        className="rounded-lg w-48 h-48 object-cover"
                    />
                    <div className="px-24">
                        <h4 className="text-4xl font-dm-sans font-regular">{astrologers[current].name}</h4>
                        <p className="text-gray-300 font-inter">{astrologers[current].role}</p>
                        <p className="mt-2 font-inter">{astrologers[current].description}</p>
                    </div>
                </motion.div>
                <div className="mt-4 flex space-x-4">
                    <button
                        onClick={prevSlide}
                        className="p-2 bg-gray-800 rounded-full transition-all duration-300 ease-in-out hover:bg-gray-600"
                    >
                        <ChevronLeft size={32}/>
                    </button>
                    <button
                        onClick={nextSlide}
                        className="p-2 bg-gray-800 rounded-full transition-all duration-300 ease-in-out hover:bg-gray-600"
                    >
                        <ChevronRight size={32}/>
                    </button>
                </div>
            </div>
        </section>
    );
}