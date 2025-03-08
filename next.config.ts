import type { NextConfig } from "next";

const nextConfig: NextConfig = {
    reactStrictMode: true,
    output: "export", // Enables static export
    trailingSlash: true, // Ensures proper routing
};

export default nextConfig;
