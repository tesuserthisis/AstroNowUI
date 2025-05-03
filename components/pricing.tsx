"use client";

import { useEffect, useState } from "react";
import { signIn } from "next-auth/react";

const plans = [
    {
        name: "Basic plan",
        image: "./basic_price.svg",
        price: "$10/mth",
        priceINR: "₹800/mth",
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
        priceINR: "₹800/mth",
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
        priceINR: "₹800/mth",
        features: [
            "Everything in the Premium Plan",
            "AI-generated detailed birth chart reading",
            "Weekly career, love, and health predictions"
        ],
    },
];

export default function PricingPlans() {
    const [currency, setCurrency] = useState<"USD" | "INR">("USD");

    useEffect(() => {
        async function fetchCurrency() {
            try {
                const response = await fetch(`https://ipinfo.io/json?token=67b26babace921`);
                if (!response.ok) throw new Error("Failed to fetch location");

                const data = await response.json();
                setCurrency(data.country === "IN" ? "INR" : "USD");
            } catch (error) {
                console.error("Error fetching currency:", error);
                setCurrency("USD");
            }
        }

        fetchCurrency();
    }, []);

    return (
        <section id="pricing" className="text-white py-12 px-4 md:py-16 md:px-8 text-center">
            <h2 className="text-3xl md:text-[48px] font-playfair mb-4">Pricing Plans</h2>
            <p className="mb-8 max-w-2xl mx-auto font-poppins text-sm md:text-base font-medium">
                At AstroNow.AI, we offer flexible plans designed to provide you with AI-powered astrological insights
                tailored to your needs.
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 md:gap-8 max-w-6xl mx-auto">
                {plans.map((plan, index) => (
                    <div
                        key={index}
                        className="border-2 border-white text-white p-6 rounded-2xl shadow-lg flex flex-col justify-between h-full"
                    >
                        <div>
                            <img
                                className="mx-auto my-4 max-h-28 w-auto"
                                src={plan.image}
                                alt={plan.name}
                            />
                            <h3 className="text-lg md:text-xl font-semibold mb-2 font-inter">{plan.name}</h3>
                            <p className="text-xl md:text-2xl font-bold mb-4 font-inter">
                                {currency === "INR" ? plan.priceINR : plan.price}
                            </p>
                            <ul className="mb-6 text-left font-inter text-sm md:text-base">
                                {plan.features.map((feature, i) => (
                                    <li key={i} className="flex items-start gap-2 mb-2">
                                        ✅ {feature}
                                    </li>
                                ))}
                            </ul>
                        </div>
                        <button
                            onClick={() => signIn("google")}
                            className="w-full bg-white text-black font-semibold rounded-xl py-2 md:py-2.5 mt-auto transition hover:bg-gray-200"
                        >
                            Get started
                        </button>
                    </div>
                ))}
            </div>
        </section>
    );
}
