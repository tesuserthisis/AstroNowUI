"use client";

import { useSearchParams } from "next/navigation";
import { Suspense } from "react";

function ChatPageContent() {
    const params = useSearchParams();
    const chat_id = params.get("chat_id");

    return (
        <div className="min-h-screen flex flex-col items-center justify-center p-8 text-black">
            <h1 className="text-4xl font-bold mb-4">🔮 Chat Initialized</h1>
            <p><strong>Chat ID:</strong> {chat_id}</p>
        </div>
    );
}

export default function ChatPage() {
    return (
        <Suspense fallback={<div className="text-white">Loading chat...</div>}>
            <ChatPageContent />
        </Suspense>
    );
}
