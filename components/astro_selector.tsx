"use client";
import {useState, useEffect} from "react";
import {useRouter} from "next/navigation"; // <-- App Router (Next.js 13+)

const astrologers = [
    {name: "Vedika", role: "The Life Harmonizer", image: "/vedica_astro.png"},
    {name: "Rudra", role: "The Wealth Strategist", image: "/rudra_astro.png"},
    {name: "Vyom", role: "The Career Navigator", image: "/vyom_astro.png"},
    {name: "Meher", role: "The Heart Alchemist", image: "/meher_astro.png"},
];

export default function AstrologerSelector() {
    const [selected, setSelected] = useState<string | null>(null);
    const [loading, setLoading] = useState(false);
    const [progress, setProgress] = useState(0);
    const [apiError, setApiError] = useState<string | null>(null);

    const router = useRouter();

    useEffect(() => {
        if (!selected) return;

        setLoading(true);
        setProgress(0);

        // Progress simulation
        const progressInterval = setInterval(() => {
            setProgress((prev) => (prev >= 90 ? 90 : prev + 10));
        }, 300);

        const userId = "9ae21183-d79d-4ce8-84ab-0db3bf948d41";
        const chatType = "LOVE";

        const initializeChat = async () => {
            try {
                const response = await fetch("https://astronowai.fly.dev/chat/initialize", {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify({
                        user_id: userId,
                        chat_type: chatType,
                    }),
                });

                const data = await response.json();

                if (!response.ok) {
                    throw new Error(data.message || "Failed to initialize chat");
                }

                clearInterval(progressInterval);
                setProgress(100);
                setLoading(false);

                // Redirect to /chat page with query params
                router.push(
                    `/chat?chat_type=${data.chat.chat_type}&chat_id=${data.chat.id}&user_id=${data.chat.user_id}`
                );
            } catch (error: unknown) {
                clearInterval(progressInterval);
                setProgress(100);
                setLoading(false);

                if (error instanceof Error) {
                    setApiError(error.message);
                    console.error("Error initializing chat:", error);
                } else {
                    setApiError("An unexpected error occurred.");
                    console.error("Unknown error initializing chat:", error);
                }
            }
        }

        initializeChat();
    }, [selected]);

    const selectedAstro = astrologers.find((a) => a.name === selected);

    return (
        <div className="min-h-screen flex flex-col items-center justify-center px-4 py-12">
            {!selected && (
                <h1 className="text-4xl font-bold text-white mb-12">
                    Choose Your Astrologer
                </h1>
            )}

            {!selected && (
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-10">
                    {astrologers.map((astro) => (
                        <div
                            key={astro.name}
                            onClick={() => setSelected(astro.name)}
                            className="cursor-pointer rounded-3xl shadow-2xl p-6 flex flex-col items-center text-center transition-all duration-300 transform hover:scale-110 border border-transparent bg-white hover:shadow-indigo-300"
                        >
                            <img
                                src={astro.image}
                                alt={astro.name}
                                className="w-36 h-36 object-cover rounded-full mb-6 border-4 border-indigo-200"
                            />
                            <h2 className="text-2xl font-bold text-indigo-800">{astro.name}</h2>
                            <p className="text-base text-gray-600 mt-1">{astro.role}</p>
                        </div>
                    ))}
                </div>
            )}

            {selectedAstro && (
                <div
                    className="flex flex-col items-center justify-center animate-fade-in transition-all duration-500 mt-8">
                    <div
                        className={`rounded-3xl shadow-2xl p-8 bg-white border-4 border-purple-600 flex flex-col items-center text-center max-w-xs transition-all duration-500 transform ${
                            selected ? "scale-110 translate-y-0" : "scale-100"
                        }`}
                    >
                        <img
                            src={selectedAstro.image}
                            alt={selectedAstro.name}
                            className="w-40 h-40 object-cover rounded-full mb-6 border-4 border-indigo-200"
                        />
                        <h2 className="text-3xl font-bold text-indigo-800">{selectedAstro.name}</h2>
                        <p className="text-lg text-gray-600 mt-2">{selectedAstro.role}</p>
                    </div>

                    {loading && (
                        <div className="w-full mt-10 max-w-md text-center">
                            <p className="text-white text-xl mb-4">🔮 Setting up your agent...</p>
                            <div className="w-full bg-purple-200 rounded-full h-3 overflow-hidden">
                                <div
                                    className="bg-purple-600 h-3 transition-all duration-300"
                                    style={{width: `${progress}%`}}
                                />
                            </div>
                        </div>
                    )}

                    {apiError && (
                        <div className="text-red-500 mt-4">
                            <p>{apiError}</p>
                        </div>
                    )}
                </div>
            )}
        </div>
    );
}
