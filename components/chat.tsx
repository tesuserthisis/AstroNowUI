"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { useParams } from "next/navigation";
import { useSession } from "next-auth/react";
import { astrologers } from "@/components/utils/const";
import { Shimmer } from "@/components/shimmer";
import ReactMarkdown from "react-markdown";

const getCurrentTime = () =>
    new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });

interface Message {
    from: "user" | "bot";
    text: string;
    time: string;
}

interface ChatApiMessage {
    actor: "AI" | "HUMAN";
    chat_id: string;
    chat_type: string;
    created_at: string;
    id: string;
    message: string;
    updated_at: string;
}

interface PastChats {
    chat_id: string;
    chat_type: string;
    related_chats: { id: string }[];
    user_id: string;
}

export default function Chat() {
    const rawParams = useParams();
    const id = typeof rawParams?.id === "string" ? rawParams.id : "";
    const { data: session } = useSession();
    const [messages, setMessages] = useState<Message[]>([]);
    const [input, setInput] = useState("");
    const [isTyping, setIsTyping] = useState(false);
    const [loading, setLoading] = useState(false);
    const [astrologer, setAstrologer] = useState<typeof astrologers[0] | null>(null);
    const [chatHistory, setChatHistory] = useState<PastChats | null>(null);
    const [loadingHistory, setLoadingHistory] = useState(true);
    const [showAstroInfo, setShowAstroInfo] = useState(false);
    const [showChatHistory, setShowChatHistory] = useState(false);
    const messagesEndRef = useRef<HTMLDivElement | null>(null);

    useEffect(() => {
        const fetchChat = async () => {
            setLoading(true);
            try {
                const response = await fetch(`https://astronowai.fly.dev/chat/${id}/history/`);
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

                const matched = getAstrologerByChatType(data.chat_type);
                if (matched) setAstrologer(matched);

            } catch (error) {
                console.error("Failed to fetch chat:", error);
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

        const fetchChatHistory = async () => {
            try {
                // session?.user?.mappedUser?.id='674e6a93-0729-412f-adad-6a27eb697cdb';
                // if (!session?.user?.mappedUser?.id) return;
                setLoadingHistory(true)
                const res = await fetch(
                    `https://astronowai.fly.dev/chats/${id}?user_id=${'674e6a93-0729-412f-adad-6a27eb697cdb'}`
                );

                const data: PastChats = await res.json();
                setChatHistory(data);
            } catch (err) {
                console.error("Failed to fetch chat history", err);
            } finally {
                setLoadingHistory(false);
            }
        };

        fetchChat();
        fetchChatHistory();
    }, [id, session?.user?.mappedUser?.id]);


    useEffect(() => {
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
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
                headers: { "Content-Type": "application/json" },
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
                const updated = [...prev, { from: "bot" as const, text: "", time: getCurrentTime() }];
                botMsgIndex = updated.length - 1;
                return updated;
            });

            const animateTyping = () => {
                if (index < fullText.length) {
                    animatedText += fullText[index++];
                    setMessages((prev) => {
                        const updated = [...prev];
                        updated[botMsgIndex].text = animatedText;
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
        <div className="flex flex-col h-screen bg-white text-gray-900 md:flex-row">
            {/* Mobile Toggle Buttons */}
            <div className="md:hidden flex gap-2 p-4 border-b">
                <button
                    onClick={() => setShowAstroInfo((prev) => !prev)}
                    className="flex-1 px-3 py-2 text-sm bg-indigo-500 text-white rounded-md"
                >
                    {showAstroInfo ? "Hide Info" : "View Astrologer"}
                </button>
                <button
                    onClick={() => setShowChatHistory((prev) => !prev)}
                    className="flex-1 px-3 py-2 text-sm bg-indigo-500 text-white rounded-md"
                >
                    {showChatHistory ? "Hide History" : "View History"}
                </button>
            </div>

            {/* Sidebar (Astrologer Info + Chat History) */}
            <aside className={`w-full md:w-80 border-r shadow p-4 md:block ${showAstroInfo || showChatHistory ? "block" : "hidden"} md:!block`}>
                {showAstroInfo || !showChatHistory ? (
                    loading || !astrologer ? (
                        <>
                            <Shimmer className="w-24 h-24 rounded-full mx-auto" />
                            <Shimmer className="w-3/4 h-6 mt-4 mx-auto" />
                            <Shimmer className="w-full h-20 mt-2" />
                        </>
                    ) : (
                        <>
                            <Image src={astrologer.image} alt={astrologer.name} width={96} height={96} className="rounded-full mx-auto" />
                            <h2 className="text-xl font-bold text-center mt-2">{astrologer.role}</h2>
                            <p className="text-center text-sm text-gray-600 mt-1">{astrologer.description}</p>
                        </>
                    )
                ) : null}

                {(showChatHistory || !showAstroInfo) && (
                    <div className="mt-6">
                        {loadingHistory ? (
                            <div className="space-y-2 max-h-64 overflow-y-auto">
                                {Array.from({ length: 4 }).map((_, i) => (
                                    <Shimmer key={i} className="w-full h-5 rounded-md" />
                                ))}
                            </div>
                        ) : chatHistory && chatHistory.related_chats.length > 0 ? (
                            <>
                                <h3 className="text-sm font-semibold text-gray-700 mb-2">Past Chats</h3>
                                <div className="space-y-2 max-h-64 overflow-y-auto">
                                    {chatHistory.related_chats.map((chat) => (
                                        <div
                                            key={chat.id}
                                            className="text-sm text-gray-800 bg-gray-100 hover:bg-gray-200 cursor-pointer p-2 rounded-md"
                                            onClick={() => (window.location.href = `/chat/${chat.id}`)}
                                        >
                                            {chat.id.slice(0, 40)}...
                                        </div>
                                    ))}
                                </div>
                            </>
                        ) : null}
                    </div>
                )}
            </aside>

            {/* Chat Area */}
            <main className="flex-1 flex flex-col">
                <div className="flex-1 overflow-y-auto p-4 space-y-4">
                    {loading ? (
                        <>
                            <Shimmer className="w-2/3 h-6 rounded-xl self-start" />
                            <Shimmer className="w-1/2 h-6 rounded-xl self-end" />
                        </>
                    ) : messages.map((msg, idx) => (
                        <div
                            key={idx}
                            className={`flex ${msg.from === "user" ? "justify-end" : "justify-start"}`}
                        >
                            <div
                                className={`max-w-xs sm:max-w-sm md:max-w-md px-4 py-3 rounded-xl shadow
                                 ${msg.from === "user"
                                    ? "bg-indigo-500 text-white"
                                    : "bg-indigo-100 text-indigo-900"
                                }`}
                            >
                                <div className="prose prose-sm max-w-none text-sm">
                                    <ReactMarkdown>{msg.text}</ReactMarkdown>
                                </div>
                                <div className="text-xs text-gray-500 mt-1 text-right">{msg.time}</div>
                            </div>
                        </div>
                    ))
                    }

                    {isTyping && !loading && (
                        <div className="self-start bg-gray-100 text-gray-800 px-4 py-3 rounded-xl shadow max-w-xs flex items-center gap-1">
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

            {/* Bouncing dots */}
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
                .delay-200 {
                    animation-delay: 0.2s;
                }
                .delay-400 {
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

const getAstrologerByChatType = (chatType: string) =>
    astrologers.find((a) => a.key === chatType);
