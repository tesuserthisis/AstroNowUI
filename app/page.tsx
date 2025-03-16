"use client"; // Mark this as a Client Component
import React from "react";
import Head from "next/head";
import StarsBackground from "../components/StarsBackground";
import { FaInstagram, FaXTwitter } from "react-icons/fa6";
import PricingPlansWrapper from "@/components/pricing";
import AstrologersSection from "@/components/astrologers";
import RecentBlogPosts from "@/components/blogs";
import NavBar from "@/components/navbar";
import Feature from "@/components/features";

export default function Home() {
    return (
        <div>
            <Head>
                <title>AstroNow.AI - Your Cosmic Guide</title>
            </Head>
            <StarsBackground/>
            <NavBar/>
            <Hero/>
            <Feature/>
            <Mission/>
            <AstrologersSection/>
            <PricingPlansWrapper/>
            <RecentBlogPosts/>
            <Footer/>
        </div>

    );
}

function Hero() {
    return <header className="h-screen flex flex-col items-center justify-center text-center">
        <h2 style={{letterSpacing: '0.2px'}} className="text-[64px] text-white font-playfair max-w-5xl">
            AstroNow.AI: AI-Powered Cosmic Clarity
        </h2>
        <p style={{letterSpacing: '0.2px'}} className="mt-4 text-[16px] max-w-5xl text-white font-poppins font-medium">
            AstroNowAI delivers 24/7 AI-powered astrology, offering personalized insights into your health, career, finance, and relationships through your unique birth chart.
            With four expert virtual astrologers, we provide accurate, confidential guidance in a private, judgment-free space—no fear-mongering or human intervention, just pure cosmic wisdom whenever you need it. Start your cosmic journey today and uncover your personalized path!
        </p>
    </header>;
}

function Mission() {
    return <section id="mission" className="text-white py-24 px-6 flex justify-center">
        <div className="max-w-5xl flex flex-col md:flex-row items-start justify-center gap-16">
            {/* Left Side - Logo */}
            <div className="flex-shrink-0 self-start px-24">
                <img src="/mission.jpeg" alt="Our Mission" className="w-80 h-80 rounded-full"/>
            </div>

            {/* Right Side - Mission Statement */}
            <div className="md:w-3/5">
                <h2 style={{letterSpacing: '0.2px'}} className="text-[48px] font-playfair font-regular">Our Mission</h2>
                <p className="mt-4 text-lg font-inter font-medium">
                    To bridge the gap between cosmic wisdom and cutting-edge AI, offering personalized astrological insights that empower you to navigate health, career, finance, and relationships with clarity and confidence. We are committed to creating a private, judgment-free sanctuary where you can explore your destiny, ask any question, and receive accurate, uplifting guidance—anytime, anywhere. No fear, no limits—just pure, AI-powered astrology, unlocking the universe’s secrets just for you.
                </p>
            </div>
        </div>
    </section>;
}

function Footer() {
    return (
        <footer className="bg-black text-white py-6 px-4">
            <div className=" mx-auto flex flex-col md:flex-row justify-between items-start">
                {/* Left Side - Logo and Social Media */}
                <div className="flex flex-col items-center md:items-start">
                    <img src="/logo.svg" alt="AstroNow.AI" />
                    <div className="flex gap-4 mx-10">
                        <a href="#" className="text-xl hover:text-gray-400">
                            <FaInstagram />
                        </a>
                        <a href="#" className="text-xl hover:text-gray-400">
                            <FaXTwitter />
                        </a>
                    </div>
                </div>

                {/* Right Side - Navigation Links */}
                <nav className="flex flex-wrap justify-center gap-4 my-10 mx-10 text-sm">
                    <a href="#" className="hover:text-gray-400 font-poppins font-semibold">Home</a>
                    <a href="#" className="hover:text-gray-400 font-poppins font-semibold">About us</a>
                    <a href="#" className="hover:text-gray-400 font-poppins font-semibold">Privacy and policy</a>
                    <a href="#" className="hover:text-gray-400 font-poppins font-semibold">FAQs</a>
                    <a href="#" className="hover:text-gray-400 font-poppins font-semibold">Terms and condition</a>
                    <a href="#" className="hover:text-gray-400 font-poppins font-semibold">Contact us</a>
                </nav>
            </div>

            {/* Bottom Section - Copyright and Links */}
            <div className="border-t border-gray-700 mt-6 pt-4 text-center text-sm">
                <p className="font-poppins font-semibold">&copy; 2025 astronow.ai All rights reserved.</p>
            </div>
        </footer>
    );
}
