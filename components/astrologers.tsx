import React, {useState} from "react";
import {motion} from "framer-motion";
import {ChevronLeft, ChevronRight} from "lucide-react";

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
    const [current, setCurrent] = useState(0);

    const nextSlide = () => {
        setCurrent((prev) => (prev + 1) % astrologers.length);
    };

    const prevSlide = () => {
        setCurrent((prev) => (prev - 1 + astrologers.length) % astrologers.length);
    };

    return (
        <section id="astrologers" className="p-12 text-white">
            <h3 className="text-[48px] font-playfair font-regular text-center">Connect with Your Expert AI Astrologers</h3>
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
                        className="w-48 h-48 rounded-full"
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