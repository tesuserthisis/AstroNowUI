"use client";

import {useState, ChangeEvent, FormEvent} from "react";
import {FiUser, FiCalendar, FiClock} from "react-icons/fi";
import {motion} from "framer-motion";
import LocationPicker from "@/components/locationpicker";
import ProtectedRoute from "@/components/ProtectedRoute";
import {useSession} from "next-auth/react";

export default function InputPage() {
    type FormErrors = {
        name: string;
        dob: string;
        tob: string;
        gender: string;
        pob: string;
    };

    const [formData, setFormData] = useState({name: "", dob: "", tob: "", gender: "", pob: ""});
    const [errors, setErrors] = useState({name: "", dob: "", tob: "", gender: "", pob: ""});
    const [coordinates, setCoordinates] = useState<{ lat: number; lng: number } | null>(null);
    const {data: session} = useSession();


    const formatDOB = (value: string) => {
        value = value.replace(/\D/g, ""); // Remove non-numeric characters
        if (value.length >= 2) value = value.substring(0, 2) + "/" + value.substring(2);
        if (value.length >= 5) value = value.substring(0, 5) + "/" + value.substring(5, 9);
        return value;
    };

    const formatTOB = (value: string) => {
        value = value.replace(/\D/g, ""); // Remove non-numeric characters
        if (value.length >= 2) value = value.substring(0, 2) + ":" + value.substring(2);
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
                if (!/^\d{2}:\d{2}$/.test(value)) {
                    error = "Invalid time format (HH:MM)";
                } else {
                    const [hours, minutes] = value.split(":").map(Number);
                    if (hours > 23 || minutes > 59) {
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
        const {name, value} = e.target;
        let formattedValue = value;

        if (name === "dob") formattedValue = formatDOB(value);
        if (name === "tob") formattedValue = formatTOB(value);

        setFormData({...formData, [name]: formattedValue});

        // Validate live while typing
        setErrors({...errors, [name]: validateField(name, formattedValue)});
    };

    const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        const newErrors: FormErrors = {name: "", dob: "", tob: "", gender: "", pob: ""};

        (Object.keys(formData) as Array<keyof FormErrors>).forEach((key) => {
            newErrors[key] = validateField(key, formData[key]);
        });

        setErrors(newErrors);

        if (Object.values(newErrors).some((error) => error)) return; // Stop if errors exist

        const userEmail = session?.user?.email;

        if (!userEmail) {
            console.log("Unable to get user id")
            alert("Unable to get email id")
        }

        if (!coordinates) {
            alert("Please select a location");
            return;
        }

        const formatDateForAPI = (dob: string) => {
            const [day, month, year] = dob.split("/");
            return `${day}-${month}-${year}`;
        };

        const payload = {
            user_name: formData.name,
            date_of_birth: formatDateForAPI(formData.dob),
            time_of_birth: `${formData.tob}:00`,
            gender: formData.gender,
            place_of_birth: formData.pob,
            lat: coordinates.lat,
            long: coordinates.lng,
            email: 'mohakpuri1712@gmail.com',
        };

        try {
            console.log(JSON.stringify(payload));
            const res = await fetch("https://astronowai.fly.dev/user-info", {
                method: "PATCH",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(payload),
            });

            if (!res.ok) throw new Error("Failed to submit user data");

            alert("User data submitted successfully!");
        } catch (error) {
            console.error(error);
            alert("There was an error submitting your data.");
        }

    };

    return (
        <ProtectedRoute>
            <div className="min-h-screen flex items-center justify-center p-6">
                <motion.div
                    initial={{opacity: 0, scale: 0.9}}
                    animate={{opacity: 1, scale: 1}}
                    transition={{duration: 0.4}}
                    className="bg-white/10 backdrop-blur-md p-8 rounded-2xl shadow-lg w-full max-w-lg border border-white/20"
                >
                    <h2 className="text-3xl font-bold text-center text-white mb-6">
                        Enter Your Details
                    </h2>

                    <motion.form
                        onSubmit={handleSubmit}
                        className="space-y-6"
                        initial={{opacity: 0}}
                        animate={{opacity: 1}}
                        transition={{delay: 0.2}}
                    >
                        {/* Full Name */}
                        <div className="relative">
                            <FiUser className="absolute left-4 top-1/2 transform -translate-y-1/2 text-white/60"/>
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
                            <FiCalendar className="absolute left-4 top-1/2 transform -translate-y-1/2 text-white/60"/>
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
                            <FiClock className="absolute left-4 top-1/2 transform -translate-y-1/2 text-white/60"/>
                            <input
                                type="text"
                                name="tob"
                                value={formData.tob}
                                onChange={handleChange}
                                placeholder="HH:MM (24hr)"
                                maxLength={5}
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
                            </select>
                            {errors.gender && <p className="text-red-400 text-sm mt-1">{errors.gender}</p>}
                        </div>

                        <LocationPicker
                            value={formData.pob}
                            onChange={(location) => {
                                setFormData({...formData, pob: location});
                                setErrors({...errors, pob: validateField('pob', location)});
                            }}
                            onCoordinatesChange={(coords) => setCoordinates(coords)}
                        />
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
        </ProtectedRoute>
    );
}
