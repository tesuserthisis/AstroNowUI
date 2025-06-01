"use client";
import Chat from "@/components/chat";
import ProtectedRoute from "@/components/ProtectedRoute";


export default function ChatPage() {
    return (<div>
        <ProtectedRoute>
            <Chat/>
        </ProtectedRoute>
    </div>)
}