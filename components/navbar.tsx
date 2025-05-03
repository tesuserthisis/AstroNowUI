"use client";
import React, { useState } from "react";
import { signIn, signOut, useSession } from "next-auth/react";
import { HiOutlineMenu, HiOutlineX } from "react-icons/hi";

export default function NavBar() {
    const { data: session } = useSession();
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    return (
        <nav className="flex items-center justify-between px-4 py-4 bg-transparent text-white relative z-50">
            {/* Left - Logo */}
            <div>
                <img src="/logo.svg" alt="AstroNow.AI" className="h-12 md:h-20" />
            </div>

            {/* Mobile Menu Button */}
            <button
                className="md:hidden text-2xl"
                onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
                {isMenuOpen ? <HiOutlineX /> : <HiOutlineMenu />}
            </button>

            {/* Center - Links */}
            <div
                className={`
                    flex-col md:flex md:flex-row md:space-x-6 
                    text-sm font-semibold font-inter items-center 
                    bg-[#28282A] md:bg-transparent 
                    rounded-xl md:rounded-none px-6 py-4 md:p-0 
                    absolute md:static top-full left-0 right-0 
                    transition-all duration-300 ease-in-out 
                    ${isMenuOpen ? "flex" : "hidden"}
                `}
                style={{ letterSpacing: "0.2px" }}
            >
                <a href="#home" onClick={(e) => handleScroll(e, "home")} className="py-2 md:py-0">Home</a>
                <a href="#features" onClick={(e) => handleScroll(e, "features")} className="py-2 md:py-0">Features</a>
                <a href="#pricing" onClick={(e) => handleScroll(e, "pricing")} className="py-2 md:py-0">Pricing</a>
                <a href="#faqs" onClick={(e) => handleScroll(e, "faqs")} className="py-2 md:py-0">FAQs</a>
                <a href="#blog" onClick={(e) => handleScroll(e, "blog")} className="py-2 md:py-0">Blog</a>
            </div>

            {/* Right - Login/Logout Button */}
            <div className="hidden md:block">
                {session ? (
                    <button
                        onClick={() => signOut({ callbackUrl: "/signout" })}
                        className="border px-6 py-1 rounded-full text-white text-sm font-inter font-semibold"
                        style={{ borderColor: "#d3d3d3" }}
                    >
                        Sign Out
                    </button>
                ) : (
                    <button
                        onClick={() => signIn("google")}
                        className="border px-6 py-1 rounded-full text-white text-sm font-inter font-semibold"
                        style={{ borderColor: "#d3d3d3" }}
                    >
                        Login
                    </button>
                )}
            </div>
        </nav>
    );
}

const handleScroll = (
    e: React.MouseEvent<HTMLAnchorElement>,
    targetId: string
) => {
    e.preventDefault();
    const target = document.getElementById(targetId);
    if (target) {
        target.scrollIntoView({ behavior: "smooth", block: "start" });
    }
};
