"use client";

import Link from "next/link";
import {useEffect, useRef, useState} from "react";
import {useParams} from "next/navigation";

type ChatPageProps = {
    params: Promise<{
        id: string;
    }>;
};

const chatHistory = [
    {id: "1", title: "Alice", avatar: "🧑‍🦰"},
    {id: "2", title: "Bob", avatar: "🧔"},
    {id: "3", title: "Support", avatar: "🎧"},
];

const messages = [
    {from: "user", text: "Hello!", time: "10:00 AM"},
    {from: "bot", text: "Hi there! How can I help you today?", time: "10:01 AM"},
    {from: "user", text: "I need help with my account.", time: "10:02 AM"},
    {from: "bot", text: "Sure, I can assist with that.", time: "10:03 AM"},
];

export default function ChatPage({params}: ChatPageProps) {
    const {id} = useParams<{ id: string }>();
    console.log(id);
    console.log(params);


    const [sidebarOpen, setSidebarOpen] = useState(false);
    const messagesEndRef = useRef<HTMLDivElement | null>(null);

    useEffect(() => {
        messagesEndRef.current?.scrollIntoView({behavior: "smooth"});
    }, []);

    return (
        <div className="flex flex-col md:flex-row h-screen bg-white text-gray-900">
            {/* Top bar for mobile */}
            <div className="md:hidden flex justify-between items-center px-4 py-3 border-b shadow-sm">
                <h1 className="text-xl font-semibold">Chat</h1>
                <button
                    onClick={() => setSidebarOpen(!sidebarOpen)}
                    className="text-sm px-3 py-1 bg-gray-200 rounded"
                >
                    {sidebarOpen ? "Hide" : "Chats"}
                </button>
            </div>

            {/* Sidebar */}
            <aside
                className={`${
                    sidebarOpen ? "block" : "hidden"
                } md:block md:w-72 bg-gray-50 border-r p-4 overflow-y-auto`}
            >
                <h2 className="text-lg font-semibold mb-4">Chats</h2>
                <ul className="space-y-2">
                    {chatHistory.map((chat) => (
                        <li key={chat.id}>
                            <Link
                                href={`/chat/${chat.id}`}
                                className={`flex items-center gap-3 px-4 py-3 rounded-lg transition hover:bg-gray-200 ${
                                    id === chat.id ? "bg-gray-300 font-semibold" : ""
                                }`}
                            >
                                <div className="text-2xl">{chat.avatar}</div>
                                <span>{chat.title}</span>
                            </Link>
                        </li>
                    ))}
                </ul>
            </aside>

            {/* Chat Window */}
            <main className="flex-1 flex flex-col">
                {/* Messages */}
                <div className="flex-1 overflow-y-auto p-6 flex flex-col-reverse gap-4 bg-gray-50">
                    <div ref={messagesEndRef}/>
                    {messages
                        .slice()
                        .reverse()
                        .map((msg, idx) => (
                            <div
                                key={idx}
                                className={`max-w-sm md:max-w-md px-4 py-3 rounded-xl shadow-sm ${
                                    msg.from === "user"
                                        ? "bg-blue-500 text-white self-end"
                                        : "bg-gray-200 text-gray-900 self-start"
                                }`}
                            >
                                <div className="text-sm">{msg.text}</div>
                                <div className="text-xs text-gray-300 mt-1 text-right">
                                    {msg.time}
                                </div>
                            </div>
                        ))}
                </div>

                {/* Input Box */}
                <form className="p-4 border-t bg-white flex gap-2">
                    <input
                        type="text"
                        placeholder="Type your message..."
                        className="flex-1 px-4 py-2 border border-gray-300 rounded-full focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                    <button
                        type="submit"
                        className="px-5 py-2 bg-blue-500 text-white font-semibold rounded-full hover:bg-blue-600 transition"
                    >
                        Send
                    </button>
                </form>
            </main>
        </div>
    );
}