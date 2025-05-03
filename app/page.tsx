"use client"; // Mark this as a Client Component
import React from "react";
import Head from "next/head";
import StarsBackground from "../components/StarsBackground";
import {FaInstagram, FaXTwitter} from "react-icons/fa6";
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
    return (
        <header className="min-h-screen flex flex-col items-center justify-center text-center px-4">
            <h2 className="text-[32px] md:text-[64px] text-white font-playfair max-w-5xl">
                AstroNow.AI: AI-Powered Cosmic Clarity
            </h2>
            <p className="mt-4 text-[16px] md:text-[18px] max-w-5xl text-white font-poppins font-medium">
                AstroNowAI delivers 24/7 AI-powered astrology, offering personalized insights into your health, career,
                finance, and relationships through your unique birth chart.
                With four expert virtual astrologers, we provide accurate, confidential guidance in a private, judgment-free
                space—no fear-mongering or human intervention, just pure cosmic wisdom whenever you need it. Start your
                cosmic journey today and uncover your personalized path!
            </p>
        </header>
    );
}


function Mission() {
    return (
        <section id="mission" className="text-white py-16 px-4 flex justify-center">
            <div className="max-w-5xl flex flex-col md:flex-row items-center md:items-start justify-center gap-10">
                {/* Image */}
                <div className="flex-shrink-0">
                    <img src="/mission.jpeg" alt="Our Mission" className="w-60 h-60 md:w-80 md:h-80 rounded-full" />
                </div>

                {/* Text */}
                <div className="md:w-3/5">
                    <h2 className="text-[32px] md:text-[48px] font-playfair">Our Mission</h2>
                    <p className="mt-4 text-base md:text-lg font-inter font-medium">
                        To bridge the gap between cosmic wisdom and cutting-edge AI, offering personalized astrological
                        insights that empower you to navigate health, career, finance, and relationships with clarity and
                        confidence...
                    </p>
                </div>
            </div>
        </section>
    );
}


function Footer() {
    return (
        <footer className="bg-black text-white py-6 px-4">
            <div className="mx-auto flex flex-col md:flex-row justify-between items-center md:items-start gap-8">
                {/* Logo & Social */}
                <div className="flex flex-col items-center md:items-start">
                    <img src="/logo.svg" alt="AstroNow.AI" className="w-32" />
                    <div className="flex gap-4 mt-4">
                        <a href="#" className="text-xl hover:text-gray-400"><FaInstagram /></a>
                        <a href="#" className="text-xl hover:text-gray-400"><FaXTwitter /></a>
                    </div>
                </div>

                {/* Nav */}
                <nav className="flex flex-wrap justify-center md:justify-start gap-4 text-sm font-poppins font-semibold">
                    <a href="#" className="hover:text-gray-400">Home</a>
                    <a href="#" className="hover:text-gray-400">About us</a>
                    <a href="#" className="hover:text-gray-400">Privacy and policy</a>
                    <a href="#" className="hover:text-gray-400">FAQs</a>
                    <a href="#" className="hover:text-gray-400">Terms and condition</a>
                    <a href="#" className="hover:text-gray-400">Contact us</a>
                </nav>
            </div>

            <div className="border-t border-gray-700 mt-6 pt-4 text-center text-sm font-poppins font-semibold">
                &copy; 2025 astronow.ai All rights reserved.
            </div>
        </footer>
    );
}

