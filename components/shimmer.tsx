export const Shimmer = ({ className = "" }: { className?: string }) => (
    <div className={`bg-gray-200 animate-pulse rounded ${className}`} />
);
