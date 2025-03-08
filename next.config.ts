import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
    reactStrictMode: true,
    output: "export", // Required for Netlify
    trailingSlash: true, // Fixes static routing issues
};

export default nextConfig;
