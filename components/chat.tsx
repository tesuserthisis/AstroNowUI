"use client";

import {useEffect, useRef, useState} from "react";
import Image from "next/image";
import {useParams} from "next/navigation";
import {useSession} from "next-auth/react";

const getCurrentTime = () =>
    new Date().toLocaleTimeString([], {hour: "2-digit", minute: "2-digit"});

interface Message {
    from: "user" | "bot";
    text: string;
    time: string;
}

export default function Chat() {
    const {id} = useParams<{ id: string }>();
    const {data: session} = useSession();

    const [messages, setMessages] = useState<Message[]>([
        {
            from: "bot",
            text: "🔮 Welcome, seeker. What question do you have for the stars today?",
            time: getCurrentTime(),
        },
    ]);

    const [input, setInput] = useState("");
    const [isTyping, setIsTyping] = useState(false);
    const messagesEndRef = useRef<HTMLDivElement | null>(null);

    useEffect(() => {
        messagesEndRef.current?.scrollIntoView({behavior: "smooth"});
    }, [messages]);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!input.trim()) return;

        const userMessage: Message = {
            from: "user",
            text: input.trim(),
            time: getCurrentTime(),
        };

        setMessages((prev) => [...prev, userMessage]);
        setInput("");
        setIsTyping(true);
        try {
            const response = await fetch("https://astronowai.fly.dev/chat", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    chat_id: id,
                    user_id: session?.user?.mappedUser?.id,
                    query: userMessage.text,
                }),
            });

            const data = await response.json();
            const fullText: string = data.reply || "🌟 The cosmos are silent for now...";
            let index = 0;
            let animatedText = "";

            const animateTyping = () => {
                if (index < fullText.length) {
                    animatedText += fullText[index];
                    index++;
                    setMessages((prev) => [
                        ...prev.slice(0, -1),
                        {
                            from: "bot",
                            text: animatedText,
                            time: getCurrentTime(),
                        },
                    ]);
                    setTimeout(animateTyping, 30);
                } else {
                    setIsTyping(false);
                }
            };

            // Add empty bot message first for animation
            setMessages((prev) => [
                ...prev,
                {
                    from: "bot",
                    text: "",
                    time: getCurrentTime(),
                },
            ]);

            animateTyping();
        } catch (error) {
            console.error(error);
            setMessages((prev) => [
                ...prev,
                {
                    from: "bot",
                    text: "⚠️ Something went wrong while consulting the cosmos.",
                    time: getCurrentTime(),
                },
            ]);
            setIsTyping(false);
        }
    };

    return (
        <div className="flex h-screen bg-white text-gray-900">
            {/* Sidebar */}
            <aside className="hidden md:flex flex-col items-center w-80 bg-white border-r shadow p-6 space-y-4">
                <Image
                    src="/astrologer-avatar.png"
                    alt="Astrologer Profile"
                    width={96}
                    height={96}
                    className="rounded-full"
                />
                <h2 className="text-xl font-bold">Luna Starseer</h2>
                <p className="text-center text-gray-600 text-sm">
                    Your celestial guide through the mysteries of the universe.
                </p>
            </aside>

            <main className="flex-1 flex flex-col">
                <div className="flex-1 overflow-y-auto p-6 flex flex-col gap-4">
                    {messages.map((msg, idx) => (
                        <div
                            key={idx}
                            className={`max-w-sm md:max-w-md px-4 py-3 rounded-xl shadow ${
                                msg.from === "user"
                                    ? "bg-indigo-500 text-white self-end"
                                    : "bg-indigo-100 text-indigo-900 self-start"
                            }`}
                        >
                            <div className="text-sm">{msg.text}</div>
                            <div className="text-xs text-gray-500 mt-1 text-right">{msg.time}</div>
                        </div>
                    ))}

                    {isTyping && (
                        <div
                            className="self-start bg-gray-100 text-gray-800 px-4 py-3 rounded-xl shadow max-w-xs flex items-center gap-1"
                        >
                            <span className="dot animate-bounce" />
                            <span className="dot animate-bounce delay-200" />
                            <span className="dot animate-bounce delay-400" />
                        </div>
                    )}

                    <div ref={messagesEndRef} />
                </div>

                {/* Input */}
                <form onSubmit={handleSubmit} className="p-4 border-t flex gap-2 bg-white">
                    <input
                        type="text"
                        value={input}
                        onChange={(e) => setInput(e.target.value)}
                        placeholder="Ask your question..."
                        className="flex-1 px-4 py-2 border border-gray-300 rounded-full focus:outline-none focus:ring-2 focus:ring-indigo-500"
                    />
                    <button
                        type="submit"
                        className="px-5 py-2 bg-indigo-500 text-white font-semibold rounded-full hover:bg-indigo-600 transition"
                    >
                        Send
                    </button>
                </form>
            </main>

            {/* Typing animation style */}
            <style jsx>{`
                .dot {
                    width: 8px;
                    height: 8px;
                    background-color: #6366f1;
                    border-radius: 50%;
                }

                .animate-bounce {
                    animation: bounce 1s infinite ease-in-out;
                }

                .animate-bounce.delay-200 {
                    animation-delay: 0.2s;
                }

                .animate-bounce.delay-400 {
                    animation-delay: 0.4s;
                }

                @keyframes bounce {
                    0%, 80%, 100% {
                        transform: scale(0);
                    }
                    40% {
                        transform: scale(1);
                    }
                }
            `}</style>
        </div>
    );
}
