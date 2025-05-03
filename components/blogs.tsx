import React from "react";

const blogPosts = [
    {
        title: "UX review presentations",
        author: "Olivia Rhye",
        date: "20 Jan 2024",
        description: "How do you create compelling presentations that wow your colleagues and impress your managers?",
        image: "/path/to/your-image1.jpg",
        tags: ["Software", "Research"],
    },
    {
        title: "Migrating to Linear 101",
        author: "Phoenix Baker",
        date: "19 Jan 2024",
        description: "Linear helps streamline software projects, sprints, tasks, and bu...",
        image: "/path/to/your-image2.jpg",
        tags: ["Design", "Research"],
    },
    {
        title: "Building your API stack",
        author: "Unknown Author",
        date: "Unknown Date",
        description: "The rise of RESTful APIs has been met by a rise in tools for c...",
        image: "/path/to/your-image3.jpg",
        tags: [],
    },
];

export default function RecentBlogPosts() {
    return (
        <section id="blog" className="text-white px-4 py-10 md:px-10 space-y-6">
            <h2 className="text-2xl md:text-3xl font-semibold text-center">Recent Blog Posts</h2>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {/* Main Blog Highlight */}
                <div className="md:col-span-2 bg-gray-800 rounded-lg overflow-hidden">
                    <img
                        src={blogPosts[0].image}
                        alt={blogPosts[0].title || "Blog cover image"}
                        className="w-full h-64 object-cover"
                    />
                    <div className="p-4">
                        <p className="text-sm opacity-70">
                            {blogPosts[0].author || "Unknown Author"} • {blogPosts[0].date || "Unknown Date"}
                        </p>
                        <h3 className="text-lg md:text-xl font-semibold mt-2">{blogPosts[0].title}</h3>
                        <p className="text-sm mt-2 opacity-75">{blogPosts[0].description}</p>
                        <div className="mt-3 flex flex-wrap gap-2">
                            {blogPosts[0].tags.length > 0 ? (
                                blogPosts[0].tags.map((tag) => (
                                    <span
                                        key={tag}
                                        className="bg-gray-700 text-white px-2 py-1 text-xs rounded"
                                    >
                                        {tag}
                                    </span>
                                ))
                            ) : (
                                <span className="text-xs opacity-50">No tags</span>
                            )}
                        </div>
                    </div>
                </div>

                {/* Secondary Blog Cards */}
                <div className="space-y-4">
                    {blogPosts.slice(1).map((post, index) => (
                        <div key={index} className="bg-gray-800 p-4 rounded-lg flex flex-col sm:flex-row gap-3">
                            <img
                                src={post.image}
                                alt={post.title || "Blog image"}
                                className="w-full sm:w-24 h-24 object-cover rounded-lg"
                            />
                            <div className="flex-1">
                                <p className="text-xs opacity-70">
                                    {post.author || "Unknown Author"} • {post.date || "Unknown Date"}
                                </p>
                                <h3 className="text-base font-semibold mt-1">{post.title}</h3>
                                <p className="text-sm mt-1 opacity-75">{post.description}</p>
                                <div className="mt-2 flex flex-wrap gap-2">
                                    {post.tags.length > 0 ? (
                                        post.tags.map((tag) => (
                                            <span
                                                key={tag}
                                                className="bg-gray-700 text-white px-2 py-1 text-xs rounded"
                                            >
                                                {tag}
                                            </span>
                                        ))
                                    ) : (
                                        <span className="text-xs opacity-50">No tags</span>
                                    )}
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
