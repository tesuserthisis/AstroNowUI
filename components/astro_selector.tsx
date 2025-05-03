"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";

const astrologers = [
    { name: "Vedika", role: "The Life Harmonizer", image: "/vedica_astro.png", chat_type: "HEALTH" },
    { name: "Rudra", role: "The Wealth Strategist", image: "/rudra_astro.png", chat_type: "WEALTH" },
    { name: "Vyom", role: "The Career Navigator", image: "/vyom_astro.png", chat_type: "CAREER" },
    { name: "Meher", role: "The Heart Alchemist", image: "/meher_astro.png", chat_type: "LOVE" },
];

export default function AstrologerSelector() {
    const [selected, setSelected] = useState<string | null>(null);
    const [loading, setLoading] = useState(false);
    const [progress, setProgress] = useState(0);
    const [apiError, setApiError] = useState<string | null>(null);
    const { data: session } = useSession();

    const router = useRouter();

    useEffect(() => {
        if (!selected) return;

        const selectedAstro = astrologers.find((a) => a.name === selected);
        setLoading(true);
        setProgress(0);

        const progressInterval = setInterval(() => {
            setProgress((prev) => (prev >= 90 ? 90 : prev + 10));
        }, 300);

        const reqBody = JSON.stringify({
            user_id: session?.user?.mappedUser?.id,
            chat_type: selectedAstro?.chat_type,
        });

        const initializeChat = async () => {
            try {
                const response = await fetch("https://astronowai.fly.dev/chat/initialize", {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: reqBody,
                });

                const data = await response.json();

                if (!response.ok) {
                    throw new Error(data.message || "Failed to initialize chat");
                }

                clearInterval(progressInterval);
                setProgress(100);
                setLoading(false);

                router.push(`/chat?chat_id=${data.chat.id}`);
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
        };

        initializeChat();
    }, [selected]);

    const selectedAstro = astrologers.find((a) => a.name === selected);

    return (
        <div className="min-h-screen flex flex-col items-center justify-center px-4 py-8 sm:py-12">
            {!selected && (
                <h1 className="text-3xl sm:text-4xl font-bold text-white mb-10 sm:mb-12 text-center">
                    Choose Your Astrologer
                </h1>
            )}

            {!selected && (
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6 sm:gap-10 w-full max-w-5xl">
                    {astrologers.map((astro) => (
                        <div
                            key={astro.name}
                            onClick={() => !loading && setSelected(astro.name)}
                            className="cursor-pointer rounded-2xl shadow-xl p-4 sm:p-6 flex flex-col items-center text-center transition-all duration-300 transform hover:scale-105 active:scale-95 border border-transparent bg-white hover:shadow-indigo-300"
                        >
                            <img
                                src={astro.image}
                                alt={astro.name}
                                className="w-28 h-28 sm:w-32 sm:h-32 md:w-36 md:h-36 object-cover rounded-full mb-4 sm:mb-6 border-4 border-indigo-200"
                            />
                            <h2 className="text-xl sm:text-2xl font-bold text-indigo-800 break-words">
                                {astro.name}
                            </h2>
                            <p className="text-sm sm:text-base text-gray-600 mt-1">{astro.role}</p>
                        </div>
                    ))}
                </div>
            )}

            {selectedAstro && (
                <div className="flex flex-col items-center justify-center animate-fade-in transition-all duration-500 mt-8">
                    <div
                        className={`rounded-3xl shadow-2xl p-6 sm:p-8 bg-white border-4 border-purple-600 flex flex-col items-center text-center max-w-xs transition-all duration-500 transform ${
                            selected ? "scale-105" : "scale-100"
                        }`}
                    >
                        <img
                            src={selectedAstro.image}
                            alt={selectedAstro.name}
                            className="w-32 h-32 sm:w-40 sm:h-40 object-cover rounded-full mb-6 border-4 border-indigo-200"
                        />
                        <h2 className="text-2xl sm:text-3xl font-bold text-indigo-800">{selectedAstro.name}</h2>
                        <p className="text-base sm:text-lg text-gray-600 mt-2">{selectedAstro.role}</p>
                    </div>

                    {loading && (
                        <div className="w-full mt-6 sm:mt-10 max-w-sm sm:max-w-md text-center">
                            <p className="text-white text-lg sm:text-xl mb-2 sm:mb-4">
                                🔮 Setting up your agent...
                            </p>
                            <div className="w-full bg-purple-200 rounded-full h-3 overflow-hidden">
                                <div
                                    className="bg-purple-600 h-3 transition-all duration-300"
                                    style={{ width: `${progress}%` }}
                                />
                            </div>
                        </div>
                    )}

                    {apiError && (
                        <div className="text-red-500 mt-4 text-center">
                            <p>{apiError}</p>
                        </div>
                    )}
                </div>
            )}
        </div>
    );
}
