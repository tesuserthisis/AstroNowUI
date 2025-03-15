import React from "react";
import {signIn, signOut, useSession} from "next-auth/react";

export default function NavBar() {
    const {data: session} = useSession();

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
            {session ? (
                <button style={{borderColor: "#d3d3d3"}}
                        onClick={() => signOut({callbackUrl: "/signout"})} // Trigger Google login
                        className="border bordcol px-6 py-1 rounded-full text-white text-sm font-inter font-semibold mx-16 cursor-pointer">
                    Sign Out
                </button>
            ) : (
                <button style={{borderColor: "#d3d3d3"}}
                        onClick={() => signIn("google")} // Trigger Google login
                        className="border bordcol px-6 py-1 rounded-full text-white text-sm font-inter font-semibold mx-16 cursor-pointer">
                    Login
                </button>
            )}
        </div>
    </nav>;
}

const handleScroll = (e: React.MouseEvent<HTMLAnchorElement>, targetId: string) => {
    e.preventDefault();
    const target = document.getElementById(targetId);
    if (target) {
        target.scrollIntoView({behavior: "smooth", block: "start"});
    }
};

