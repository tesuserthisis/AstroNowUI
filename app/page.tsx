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
        <h2 style={{letterSpacing: '0.2px'}} className="text-[64px] font-playfair max-w-5xl">
            AstroNow.AI – Your Cosmic Guide, Instantly
        </h2>
        <p style={{letterSpacing: '0.2px'}} className="mt-4 text-[16px] max-w-5xl font-poppins font-medium">
            AstroNow.AI provides 24/7 AI-driven astrology readings, offering deep insights into your health,
            career, finances, and love life. No human bias, no fear-mongering—just accurate, private, and
            personalized cosmic guidance at your fingertips!
        </p>
    </header>;
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
                    At AstroNow.AI, we believe in harnessing the power of AI to provide accurate, unbiased,
                    and deeply insightful astrological guidance. Our mission is to empower individuals
                    with clarity and confidence, helping them navigate their lifes journey with wisdom.
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
