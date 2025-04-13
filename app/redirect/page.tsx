"use client";

import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function Redirect() {
    const { data: session, status } = useSession();
    const router = useRouter();

    useEffect(() => {
        if (status === "authenticated") {
            // Check if profile is complete
            const profileComplete = session?.user.mappedUser &&
                session.user.mappedUser.userName &&
                session.user.mappedUser.dateOfBirth &&
                session.user.mappedUser.placeOfBirth &&
                session.user.mappedUser.timeOfBirth &&
                session.user.mappedUser.gender &&
                session.user.mappedUser.latitude &&
                session.user.mappedUser.longitude;

            if (!profileComplete) {
                router.replace("/user-details");
            } else {
                router.replace("/");
            }
        }
    }, [session, status, router]);

    return null; // Added a return statement as components should return something
}