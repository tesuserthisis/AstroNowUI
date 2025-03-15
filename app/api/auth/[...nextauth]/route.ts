import NextAuth, { NextAuthOptions } from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import { JWT } from "next-auth/jwt";
import { Session, User } from "next-auth";

 const authOptions: NextAuthOptions = {
    providers: [
        GoogleProvider({
            clientId: process.env.GOOGLE_CLIENT_ID!,
            clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
        }),
    ],
    callbacks: {
        async signIn({ user }: { user: User }) {
            console.log("User signed in:", user);
            return true;
        },
        async redirect({ url, baseUrl }: { url: string; baseUrl: string }) {
            return url.includes("signout") ? baseUrl : `${baseUrl}`;
        },
        async jwt({ token, user }: { token: JWT; user?: User }) {
            if (user) {
                token.email = user.email;
            }
            return token;
        },
        async session({ session, token }: { session: Session; token: JWT }) {
            if (!session.user) {
                session.user = {} as User;
            }
            session.user.email = token.email ?? "";
            return session;
        },
    },
    secret: process.env.NEXTAUTH_SECRET,
    session: {
        strategy: "jwt",
    },
};

const handler = NextAuth(authOptions);
export { handler as GET, handler as POST };