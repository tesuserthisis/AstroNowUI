"use client";

import StarsBackground from "@/components/StarsBackground";
import AstrologerSelector from "@/components/astro_selector";
import ProtectedRoute from "@/components/ProtectedRoute";

export default function AstroAgents() {
    return (
        <div>
            <ProtectedRoute>
                <StarsBackground/>
                <AstrologerSelector/>
            </ProtectedRoute>
        </div>
    );
}
