"use client";

import { useState, ChangeEvent, FormEvent } from "react";
import { FiUser, FiCalendar, FiClock } from "react-icons/fi";
import { motion } from "framer-motion";
import LocationPicker from "@/components/locationpicker";

export default function InputPage() {
    const [formData, setFormData] = useState({ name: "", dob: "", tob: "", gender: "", pob: "" });
    const [errors, setErrors] = useState({ name: "", dob: "", tob: "", gender: "", pob: "" });

    const formatDOB = (value: string) => {
        value = value.replace(/\D/g, ""); // Remove non-numeric characters
        if (value.length >= 2) value = value.substring(0, 2) + "/" + value.substring(2);
        if (value.length >= 5) value = value.substring(0, 5) + "/" + value.substring(5, 9);
        return value;
    };

    const formatTOB = (value: string) => {
        value = value.replace(/\D/g, ""); // Remove non-numeric characters
        if (value.length >= 2) value = value.substring(0, 2) + ":" + value.substring(2);
        if (value.length >= 5) value = value.substring(0, 5) + ":" + value.substring(5, 7);
        return value;
    };

    const validateField = (name: string, value: string) => {
        let error = "";

        switch (name) {
            case "name":
                if (!value.trim()) error = "Name is required.";
                break;

            case "dob":
                if (!/^\d{2}\/\d{2}\/\d{4}$/.test(value)) {
                    error = "Invalid date format (DD/MM/YYYY)";
                } else {
                    const [day, month, year] = value.split("/").map(Number);
                    const date = new Date(year, month - 1, day);
                    if (date.getFullYear() !== year || date.getMonth() + 1 !== month || date.getDate() !== day) {
                        error = "Invalid date";
                    }
                }
                break;

            case "tob":
                if (!/^\d{2}:\d{2}:\d{2}$/.test(value)) {
                    error = "Invalid time format (HH:MM:SS)";
                } else {
                    const [hours, minutes, seconds] = value.split(":").map(Number);
                    if (hours > 23 || minutes > 59 || seconds > 59) {
                        error = "Invalid time";
                    }
                }
                break;

            case "gender":
                if (!value) error = "Gender is required.";
                break;

            case "pob":
                if (!value.trim()) error = "Location is required.";
                break;
        }

        return error;
    };

    const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const { name, value } = e.target;
        let formattedValue = value;

        if (name === "dob") formattedValue = formatDOB(value);
        if (name === "tob") formattedValue = formatTOB(value);

        setFormData({ ...formData, [name]: formattedValue });

        // Validate live while typing
        setErrors({ ...errors, [name]: validateField(name, formattedValue) });
    };

    const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        let newErrors: any = {};
        Object.keys(formData).forEach((key) => {
            newErrors[key] = validateField(key, formData[key as keyof typeof formData]);
        });

        setErrors(newErrors);

        if (Object.values(newErrors).some((error) => error)) return; // Stop if errors exist

        console.log("User Input:", formData);
        alert("Form submitted successfully!");
    };

    return (
        <div className="min-h-screen flex items-center justify-center p-6">
            <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.4 }}
                className="bg-white/10 backdrop-blur-md p-8 rounded-2xl shadow-lg w-full max-w-lg border border-white/20"
            >
                <h2 className="text-3xl font-bold text-center text-white mb-6">
                    User Input Form
                </h2>

                <motion.form
                    onSubmit={handleSubmit}
                    className="space-y-6"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.2 }}
                >
                    {/* Full Name */}
                    <div className="relative">
                        <FiUser className="absolute left-4 top-4 text-white/60" />
                        <input
                            type="text"
                            name="name"
                            value={formData.name}
                            onChange={handleChange}
                            placeholder="Full Name"
                            className="w-full p-4 pl-12 bg-white/10 text-white border border-white/30 rounded-xl focus:ring-2 focus:ring-blue-400 outline-none backdrop-blur-md placeholder-white/50"
                        />
                        {errors.name && <p className="text-red-400 text-sm mt-1">{errors.name}</p>}
                    </div>

                    {/* Date of Birth (DOB) */}
                    <div className="relative">
                        <FiCalendar className="absolute left-4 top-4 text-white/60" />
                        <input
                            type="text"
                            name="dob"
                            value={formData.dob}
                            onChange={handleChange}
                            placeholder="DD/MM/YYYY"
                            maxLength={10}
                            className="w-full p-4 pl-12 bg-white/10 text-white border border-white/30 rounded-xl focus:ring-2 focus:ring-blue-400 outline-none backdrop-blur-md placeholder-white/50"
                        />
                        {errors.dob && <p className="text-red-400 text-sm mt-1">{errors.dob}</p>}
                    </div>

                    {/* Time of Birth (TOB) */}
                    <div className="relative">
                        <FiClock className="absolute left-4 top-4 text-white/60" />
                        <input
                            type="text"
                            name="tob"
                            value={formData.tob}
                            onChange={handleChange}
                            placeholder="HH:MM:SS (24hr)"
                            maxLength={8}
                            className="w-full p-4 pl-12 bg-white/10 text-white border border-white/30 rounded-xl focus:ring-2 focus:ring-blue-400 outline-none backdrop-blur-md placeholder-white/50"
                        />
                        {errors.tob && <p className="text-red-400 text-sm mt-1">{errors.tob}</p>}
                    </div>

                    {/* Gender Selection */}
                    <div className="relative">
                        <select
                            name="gender"
                            value={formData.gender}
                            onChange={handleChange}
                            className="w-full p-4 bg-white/10 text-white border border-white/30 rounded-xl focus:ring-2 focus:ring-blue-400 outline-none backdrop-blur-md"
                        >
                            <option value="" disabled>Select Gender</option>
                            <option value="male">Male</option>
                            <option value="female">Female</option>
                            <option value="other">Other</option>
                        </select>
                        {errors.gender && <p className="text-red-400 text-sm mt-1">{errors.gender}</p>}
                    </div>

                    {/* Place of Birth (POB) */}
                    <LocationPicker />
                    {errors.pob && <p className="text-red-400 text-sm mt-1">{errors.pob}</p>}

                    {/* Submit Button */}
                    <button
                        type="submit"
                        className="w-full bg-blue-500 hover:bg-blue-600 text-white font-semibold py-3 rounded-lg transition duration-300"
                    >
                        Submit
                    </button>
                </motion.form>
            </motion.div>
        </div>
    );
}
