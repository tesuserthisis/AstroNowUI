import React from "react";

export default function Feature() {
    return <section id="features" className="text-white text-center relative py-10">
        {/* Background with stars effect */}
        <div className="absolute inset-0 bg-[url('/stars-bg.png')] bg-cover bg-center opacity-30"></div>

        {/* Title and description */}
        <h2 style={{letterSpacing: '0.2px'}} className="text-[48px] font-playfair font-normal relative z-10">What is
            AstroNow.AI?</h2>
        <p className="mt-4 text-lg max-w-2xl mx-auto relative z-10 font-dm-sans">
            AstroNowAl is a revolutionary AI-powered astrology platform designed to bring you accurate and
            personalized astrological insights anytime, anywhere. Using your unique birth chart, our AI
            astrologers decode the cosmic patterns that shape your life, giving you clarity and confidence
            in your decisions.
        </p>

        {/* Features grid */}
        <div className="mt-12 flex flex-wrap justify-center gap-8 relative z-10">
            {/* Feature 1 */}
            <div className="max-w-xs text-center">
                <img src="/feat1.png" alt="AI-driven accuracy" className="rounded-full w-40 h-40 mx-auto"/>
                <p className="mt-4 font-inter">AI-driven accuracy with no human intervention</p>
            </div>

            {/* Feature 2 */}
            <div className="max-w-xs text-center">
                <img src="/feat1.png" alt="24/7 Support" className="rounded-full w-40 h-40 mx-auto"/>
                <p className="mt-4 font-inter">Available 24/7 whenever you need guidance</p>
            </div>

            {/* Feature 3 */}
            <div className="max-w-xs text-center">
                <img src="/feat1.png" alt="Private Readings" className="rounded-full w-40 h-40 mx-auto"/>
                <p className="mt-4 font-inter">Private, judgment-free astrology readings</p>
            </div>
        </div>
    </section>;
}
