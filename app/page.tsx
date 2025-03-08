"use client"; // Mark this as a Client Component
import React, {useState} from "react";
import Head from "next/head";
import {ChevronLeft, ChevronRight} from "lucide-react";
import StarsBackground from "../components/StarsBackground";
import {motion} from "framer-motion";
import {CheckCircle} from "lucide-react";

const blogPosts = [
    {
        title: "UX review presentations",
        author: "Olivia Rhye",
        date: "20 Jan 2024",
        description: "How do you create compelling presentations that wow your colleagues and impress your managers?",
        image: "/path/to/your-image1.jpg",
        tags: ["Software", "Research"],
    },
    {
        title: "Migrating to Linear 101",
        author: "Phoenix Baker",
        date: "19 Jan 2024",
        description: "Linear helps streamline software projects, sprints, tasks, and bu...",
        image: "/path/to/your-image2.jpg",
        tags: ["Design", "Research"],
    },
    {
        title: "Building your API stack",
        author: "Unknown Author",
        date: "Unknown Date",
        description: "The rise of RESTful APIs has been met by a rise in tools for c...",
        image: "/path/to/your-image3.jpg",
        tags: [],
    },
];

const plans = [
    {
        name: "Basic plan",
        image: "./basic_price.svg",
        price: "$10/mth",
        features: [
            "Daily horoscope based on your zodiac sign",
            "General astrology updates and forecasts",
            "Access to selected blog articles",
        ],
    },
    {
        name: "Premium plan",
        image: "./prem_price.svg",
        price: "$9.99/mth",
        features: [
            "Everything in the Starter Plan",
            "Personalized daily horoscope",
            "AI-powered insights for love, career",
        ],
    },
    {
        name: "Elite plan",
        image: "./elite_price.svg",
        price: "$19.99/mth",
        features: [
            "Everything in the Premium Plan",
            "AI-generated detailed birth chart reading",
            "Weekly career, love, and health predictions"
        ],
    },
];

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

export default function Home() {
    return (
        <div className="bg-black">
            <Head>
                <title>AstroNowAI - Your Cosmic Guide</title>
            </Head>

            <StarsBackground/>
            <NavBar/>
            <Hero/>
            <Feature/>
            <Mission/>
            <AstrologersSection/>
            <PricingPlans/>
            <RecentBlogPosts/>
            <Footer/>
        </div>

    );
}

function NavBar() {
    return <nav className="flex items-center justify-between ">
        {/* Left - Logo */}
        <div>
            <img src="/logo.svg" alt="AstroNow.AI" className="h-48"/>
        </div>

        {/* Center - Navbar (Smaller but still readable) */}
        <div style={{letterSpacing: '0.2px'}}
             className="-mt-10 space-x-6 text-[14px] font-semibold text-white px-6 py-3 rounded-full font-inter bg-[#28282A]">
            <a href="#home" onClick={(e) => handleScroll(e, "home")} className="text-white">Home</a>
            <a href="#features" onClick={(e) => handleScroll(e, "features")}
               className="text-white">Features</a>
            <a href="#pricing" onClick={(e) => handleScroll(e, "pricing")}
               className="text-white">Pricing</a>
            <a href="#faqs" onClick={(e) => handleScroll(e, "faqs")} className="text-white">FAQs</a>
            <a href="#blog" onClick={(e) => handleScroll(e, "blog")} className="text-white">Blog</a>
        </div>

        {/* Right - Login Button (Compact) */}
        <div className="-mt-10">
            <button style={{borderColor: "#d3d3d3"}}
                    className="border bordcol px-6 py-1 rounded-full text-white text-sm font-inter font-semibold mx-16">
                Login
            </button>
        </div>
    </nav>;
}

function Hero() {
    return <header className="h-screen flex flex-col items-center justify-center text-center">
        <h2 style={{letterSpacing: '0.2px'}} className="text-[64px] font-playfair max-w-5xl">
            AstroNowAI – Your Cosmic Guide, Instantly
        </h2>
        <p style={{letterSpacing: '0.2px'}} className="mt-4 text-[16px] max-w-5xl font-poppins font-medium">
            AstroNowAI provides 24/7 AI-driven astrology readings, offering deep insights into your health,
            career, finances, and love life. No human bias, no fear-mongering—just accurate, private, and
            personalized cosmic guidance at your fingertips!
        </p>
    </header>;
}

function Feature() {
    return <section id="features" className="text-white text-center relative py-10">
        {/* Background with stars effect */}
        <div className="absolute inset-0 bg-[url('/stars-bg.png')] bg-cover bg-center opacity-30"></div>

        {/* Title and description */}
        <h2 style={{letterSpacing: '0.2px'}} className="text-[48px] font-playfair font-normal relative z-10">What is
            AstroNowAI?</h2>
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

function Mission() {
    return <section id="mission" className="text-white py-24 px-6 flex justify-center">
        <div className="max-w-5xl flex flex-col md:flex-row items-start justify-center gap-16">
            {/* Left Side - Logo */}
            <div className="flex-shrink-0 self-start px-24">
                <img src="/feat1.png" alt="Our Mission" className="w-48 h-48 md:w-56 md:h-56"/>
            </div>

            {/* Right Side - Mission Statement */}
            <div className="md:w-3/5">
                <h2 style={{letterSpacing: '0.2px'}} className="text-[48px] font-playfair font-regular">Our Mission</h2>
                <p className="mt-4 text-lg font-inter font-medium">
                    At AstroNowAI, we believe in harnessing the power of AI to provide accurate, unbiased,
                    and deeply insightful astrological guidance. Our mission is to empower individuals
                    with clarity and confidence, helping them navigate their life's journey with wisdom.
                </p>
            </div>
        </div>
    </section>;
}

function AstrologersSection() {
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

function Footer() {
    return (
        <footer className="p-6 text-center">
            <p>© 2025 AstroNowAI. All rights reserved.</p>
            <div className="mt-4 space-x-4">
                <a href="#">Privacy Policy</a>
                <a href="#">Terms</a>
                <a href="#">Contact Us</a>
            </div>
        </footer>
    );
}

function PricingPlans() {
    return (
        <section id="pricing" className="text-white py-16 px-8 text-center">
            <h2 className="text-[48px] font-playfair regular mb-4">Pricing Plans</h2>
            <p className="mb-8 max-w-2xl mx-auto font-poppins font-medium">
                At AstroNowAI, we offer flexible plans designed to provide you with AI-powered astrological insights
                tailored to your needs.
            </p>
            <div className="grid md:grid-cols-3 gap-8 max-w-4xl mx-auto">
                {plans.map((plan, index) => (
                    <div
                        key={index}
                        className="border-2 border-white text-white p-6 rounded-2xl shadow-lg flex flex-col justify-between h-full"
                    >
                        <div>
                            <img className="mx-auto my-4" src={plan.image} alt={plan.name}/>
                            <h3 className="text-xl font-semibold mb-2 font-inter">{plan.name}</h3>
                            <p className="text-2xl font-bold mb-4 font-inter">{plan.price}</p>
                            <ul className="mb-6 text-left font-inter font-regular">
                                {plan.features.map((feature, i) => (
                                    <li key={i} className="flex items-center gap-2 mb-2">
                                        <CheckCircle className="text-green-400" size={18}/> {feature}
                                    </li>
                                ))}
                            </ul>
                        </div>
                        <button className="w-full bg-white text-black font-semibold rounded-xl py-2 mt-auto">
                            Get started
                        </button>
                    </div>
                ))}
            </div>
        </section>
    );
}


function RecentBlogPosts() {
    return (
        <div id="blog" className="text-white p-10 space-y-6">
            <h2 className="text-3xl font-semibold text-center">Recent Blog Posts</h2>
            <div className="grid md:grid-cols-3 gap-6">
                <div className="md:col-span-2 relative bg-gray-800 p-4 rounded-lg">
                    <img
                        src={blogPosts[0].image}
                        alt={blogPosts[0].title}
                        className="w-full h-64 object-cover rounded-lg"
                    />
                    <div className="p-4">
                        <p className="text-sm opacity-75">{blogPosts[0].author} • {blogPosts[0].date}</p>
                        <h3 className="text-xl font-semibold mt-2">{blogPosts[0].title}</h3>
                        <p className="text-sm mt-1 opacity-75">{blogPosts[0].description}</p>
                        <div className="mt-2 space-x-2">
                            {blogPosts[0].tags.map((tag) => (
                                <span key={tag} className="bg-gray-700 text-white px-2 py-1 text-xs rounded">
                  {tag}
                </span>
                            ))}
                        </div>
                    </div>
                </div>
                <div className="space-y-4">
                    {blogPosts.slice(1).map((post, index) => (
                        <div key={index} className="bg-gray-800 p-4 rounded-lg flex gap-2">
                            <img
                                src={post.image}
                                alt={post.title}
                                className="w-24 h-24 object-cover rounded-lg"
                            />
                            <div>
                                <p className="text-sm opacity-75">{post.author} • {post.date}</p>
                                <h3 className="text-lg font-semibold">{post.title}</h3>
                                <p className="text-sm opacity-75">{post.description}</p>
                                <div className="mt-2 space-x-2">
                                    {post.tags.map((tag) => (
                                        <span key={tag} className="bg-gray-700 text-white px-2 py-1 text-xs rounded">
                      {tag}
                    </span>
                                    ))}
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}

const handleScroll = (e, targetId) => {
    e.preventDefault();
    const target = document.getElementById(targetId);
    if (target) {
        target.scrollIntoView({behavior: "smooth", block: "start"});
    }
};
