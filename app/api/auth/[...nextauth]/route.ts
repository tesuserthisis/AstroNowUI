import NextAuth, {NextAuthOptions, Session, User} from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import {JWT} from "next-auth/jwt";
import axios from "axios";

interface MappedUser {
    id: string;
    userName: string | null;
    dateOfBirth: string | null;
    placeOfBirth: string | null;
    timeOfBirth: string | null;
    gender: string | null;
    latitude: number | null;
    longitude: number | null;
    email: string;
    createdAt: string;
    updatedAt: string;
}

declare module "next-auth" {
    interface User {
        mappedUser?: MappedUser;
    }

    interface Session {
        user: {
            email: string;
            mappedUser?: MappedUser;
            profileComplete?: boolean;
        };
    }
}

declare module "next-auth/jwt" {
    interface JWT {
        email?: string;
        mappedUser?: MappedUser;
        profileComplete?: boolean;
    }
}

const authOptions: NextAuthOptions = {
    providers: [
        GoogleProvider({
            clientId: process.env.GOOGLE_CLIENT_ID!,
            clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
        }),
    ],
    callbacks: {
        async signIn({user}: { user: User }) {
            try {
                const response = await axios.post("https://astronowai.fly.dev/user-info/setup", {
                    email: user.email,
                });

                const userInfo = response.data;

                user.mappedUser = {
                    id: userInfo.id,
                    userName: userInfo.user_name,
                    dateOfBirth: userInfo.date_of_birth,
                    placeOfBirth: userInfo.place_of_birth,
                    timeOfBirth: userInfo.time_of_birth,
                    gender: userInfo.gender,
                    latitude: userInfo.lat,
                    longitude: userInfo.long,
                    email: userInfo.email,
                    createdAt: userInfo.created_at,
                    updatedAt: userInfo.updated_at,
                };
            } catch (error) {
                console.error("Error saving user info:", error);
                return false;
            }

            return true;
        },

        async jwt({token, user}: { token: JWT; user?: User }) {
            if (user) {
                token.email = user.email ?? "";
                if (user.mappedUser) {
                    token.mappedUser = user.mappedUser;

                    const {userName, dateOfBirth, placeOfBirth, timeOfBirth, gender} = user.mappedUser;

                    // Set profileComplete flag based on profile data
                    token.profileComplete = !!(userName && dateOfBirth && placeOfBirth && timeOfBirth && gender);
                }
            }
            return token;
        },

        async session({session, token}: { session: Session; token: JWT }) {
            session.user.email = token.email ?? "";
            if (token.mappedUser) {
                session.user.mappedUser = token.mappedUser;
            }

            session.user.profileComplete = token.profileComplete;
            return session;
        },

        async redirect({url, baseUrl}: { url: string; baseUrl: string }) {
            return url.includes("signout") ? baseUrl : `${baseUrl}/redirect/`;
        },
    },
    secret: process.env.NEXTAUTH_SECRET,
    session: {
        strategy: "jwt",
    },
};

const handler = NextAuth(authOptions);
export {handler as GET, handler as POST};
