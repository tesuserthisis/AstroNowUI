"use client";

import { useState, ChangeEvent, FormEvent } from "react";
import { FiUser, FiMail } from "react-icons/fi";

export default function UserInputPage() {
    const [formData, setFormData] = useState({ name: "", email: "" });
    const [submitted, setSubmitted] = useState(false);

    const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        console.log("User Input:", formData);

        // Simulate API call delay
        setTimeout(() => setSubmitted(true), 1000);
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-blue-500 to-purple-600 p-6">
            <div className="bg-white p-8 rounded-xl shadow-lg w-full max-w-md">
                <h2 className="text-2xl font-bold text-center text-gray-700 mb-6">
                    User Input Form
                </h2>

                {!submitted ? (
                    <form onSubmit={handleSubmit} className="space-y-4">
                        {/* Name Input */}
                        <div className="relative">
                            <FiUser className="absolute left-3 top-3 text-gray-400" />
                            <input
                                type="text"
                                name="name"
                                value={formData.name}
                                onChange={handleChange}
                                placeholder="Enter your name"
                                className="w-full p-3 pl-10 border rounded-lg focus:ring-2 focus:ring-blue-400 outline-none"
                                required
                            />
                        </div>

                        {/* Email Input */}
                        <div className="relative">
                            <FiMail className="absolute left-3 top-3 text-gray-400" />
                            <input
                                type="email"
                                name="email"
                                value={formData.email}
                                onChange={handleChange}
                                placeholder="Enter your email"
                                className="w-full p-3 pl-10 border rounded-lg focus:ring-2 focus:ring-blue-400 outline-none"
                                required
                            />
                        </div>

                        {/* Submit Button */}
                        <button
                            type="submit"
                            className="w-full bg-blue-500 hover:bg-blue-600 text-white font-semibold py-3 rounded-lg transition duration-300"
                        >
                            Submit
                        </button>
                    </form>
                ) : (
                    <div className="text-center text-green-600 font-medium">
                        ✅ Thank you, {formData.name}! Your response has been submitted.
                    </div>
                )}
            </div>
        </div>
    );
}
