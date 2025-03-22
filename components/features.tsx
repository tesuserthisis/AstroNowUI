import React from "react";

const features = [
    {
        imgSrc: "/whatis_one.jpg",
        altText: "AI-driven accuracy",
        subtext: "24/7 Cosmic Guidance",
        description: "Get instant, AI-powered astrology readings whenever you need them—no waiting, no limits!"
    },
    {
        imgSrc: "/whatis_two.jpeg",
        altText: "Clear, Insightful Predictions",
        subtext: "Always Available",
        description: "AI-driven astrology that deciphers the stars and delivers straightforward, empowering answers in real-time."
    },
    {
        imgSrc: "/whatis_three.jpeg",
        altText: "Private Readings",
        subtext: "Four Expert Virtual Astrologers",
        description: "Choose from AI agents specializing in health & well-being, career, finance, and relationships, each offering deep, insightful predictions."
    }
];

export default function Feature() {
    return (
        <section id="features" className="text-white text-center relative py-10">
            {/* Background with stars effect */}
            <div className="absolute inset-0 opacity-30"></div>

            {/* Title and description */}
            <h2 style={{ letterSpacing: '0.2px' }} className="text-[48px] font-playfair font-normal relative z-10">
                What is AstroNow.AI?
            </h2>
            <p className="mt-4 text-lg max-w-2xl mx-auto relative z-10 font-dm-sans">
                AstroNowAI is a revolutionary AI-powered astrology platform designed to bring you accurate and
                personalized astrological insights anytime, anywhere. Using your unique birth chart, our AI
                astrologers decode the cosmic patterns that shape your life, giving you clarity and confidence
                in your decisions.
            </p>

            {/* Features grid */}
            <div className="mt-12 flex flex-wrap justify-center gap-8 relative z-10">
                {features.map((feature, index) => (
                    <div key={index} className="max-w-xs text-center">
                        <img src={feature.imgSrc} alt={feature.altText} className="rounded-full w-40 h-40 mx-auto" />
                        <p className="mt-4 font-inter font-bold">{feature.subtext}</p>
                        <p className="mt-2 font-inter">{feature.description}</p>
                    </div>
                ))}
            </div>
        </section>
    );
}
