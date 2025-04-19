"use client";

import StarsBackground from "@/components/StarsBackground";
import InputPage from "@/components/user_input";
import ProtectedRoute from "@/components/ProtectedRoute";

export default function UserInputPage() {
    return (
        <div>
            <ProtectedRoute>
                <StarsBackground/>
                <InputPage/>
            </ProtectedRoute>
        </div>
    );
}
