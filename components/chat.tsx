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

interface ChatApiMessage {
    actor: "AI" | "HUMAN";
    chat_id: string;
    created_at: string;
    id: string;
    message: string;
    updated_at: string;
}

export default function Chat() {
    const rawParams = useParams();
    const id = typeof rawParams?.id === "string" ? rawParams.id : "";
    const {data: session} = useSession();
    const [messages, setMessages] = useState<Message[]>([]);
    const [input, setInput] = useState("");
    const [isTyping, setIsTyping] = useState(false);
    const [loading, setLoading] = useState(false);
    const messagesEndRef = useRef<HTMLDivElement | null>(null);

    useEffect(() => {
        setLoading(true);
        const fetchChat = async () => {
            try {
                const response = await fetch(`https://astronowai.fly.dev/chat/${id}`);
                const data = await response.json();

                if (!Array.isArray(data.chat)) throw new Error("Invalid format");

                const formattedMessages: Message[] = data.chat.map((item: ChatApiMessage) => ({
                    from: item.actor === "HUMAN" ? "user" : "bot",
                    text: item.message,
                    time: new Date(item.created_at).toLocaleTimeString([], {
                        hour: "2-digit",
                        minute: "2-digit",
                    }),
                }));

                setMessages(formattedMessages);
            } catch (error) {
                console.error("Failed to fetch chat history:", error);
                setMessages([
                    {
                        from: "bot",
                        text: "⚠️ Could not load previous chat history.",
                        time: getCurrentTime(),
                    },
                ]);
            } finally {
                setLoading(false);
            }
        };

        fetchChat();

    }, [id]);

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
                    user_id: session?.user?.mappedUser?.id ?? "anonymous",
                    query: userMessage.text,
                }),
            });

            const data = await response.json();
            const fullText: string = data.next_message || "🌟 The cosmos are silent for now...";
            let index = 0;
            let animatedText = "";
            let botMsgIndex = 0;

            setMessages((prev) => {
                const updated = [
                    ...prev,
                    {
                        from: "bot" as const,
                        text: "",
                        time: getCurrentTime(),
                    },
                ];
                botMsgIndex = updated.length - 1;
                return updated;
            });

            const animateTyping = () => {
                if (index < fullText.length) {
                    animatedText += fullText[index++];
                    setMessages((prev) => {
                        const updated = [...prev];
                        updated[botMsgIndex] = {
                            ...updated[botMsgIndex],
                            text: animatedText,
                        };
                        return updated;
                    });
                    setTimeout(animateTyping, 30);
                } else {
                    setIsTyping(false);
                }
            };

            animateTyping();
        } catch (error) {
            console.error("Chat error:", error);
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
                    {loading ? (
                        <div className="text-center text-gray-500 mt-4">🔄 Loading your previous messages...</div>
                    ) : (
                        messages.map((msg, idx) => (
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
                        ))
                    )}

                    {isTyping && !loading && (
                        <div
                            className="self-start bg-gray-100 text-gray-800 px-4 py-3 rounded-xl shadow max-w-xs flex items-center gap-1">
                            <span className="dot animate-bounce"/>
                            <span className="dot animate-bounce delay-200"/>
                            <span className="dot animate-bounce delay-400"/>
                        </div>
                    )}

                    <div ref={messagesEndRef}/>
                </div>

                {/* Input Field */}
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

            {/* Typing Animation Styles */}
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
