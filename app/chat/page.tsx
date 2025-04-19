"use client";

import { useSearchParams } from "next/navigation";

export default function ChatPage() {
    const params = useSearchParams();
    const chat_type = params.get("chat_type");
    const chat_id = params.get("chat_id");
    const user_id = params.get("user_id");

    console.log(chat_type);
    console.log(chat_id);
    console.log(user_id);

    return (
        <div className="min-h-screen flex flex-col items-center justify-center p-8 text-black">
            <h1 className="text-4xl font-bold mb-4">🔮 Chat Initialized</h1>
            <p><strong>Chat Type:</strong> {chat_type}</p>
            <p><strong>Chat ID:</strong> {chat_id}</p>
            <p><strong>User ID:</strong> {user_id}</p>
        </div>
    );
}
