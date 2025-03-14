/** @type {import('next').NextConfig} */
const nextConfig = {
    reactStrictMode: true,
    output: "standalone", // For SSR support
    trailingSlash: false,
    experimental: {
        appDir: true, // Ensure App Router is enabled
    },
};

export default nextConfig;
