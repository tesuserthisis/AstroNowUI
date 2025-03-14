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
        <div id="blog" className="text-white p-10 space-y-6">
            <h2 className="text-3xl font-semibold text-center">Recent Blog Posts</h2>
            <div className="grid md:grid-cols-3 gap-6">
                <div className="md:col-span-2 relative bg-gray-800 p-4 rounded-lg">
                    <img
                        src={blogPosts[0].image}
                        alt={blogPosts[0].title}
                        className="w-full h-64 object-cover rounded-lg"
                    />
                    <div className="p-4">
                        <p className="text-sm opacity-75">{blogPosts[0].author} • {blogPosts[0].date}</p>
                        <h3 className="text-xl font-semibold mt-2">{blogPosts[0].title}</h3>
                        <p className="text-sm mt-1 opacity-75">{blogPosts[0].description}</p>
                        <div className="mt-2 space-x-2">
                            {blogPosts[0].tags.map((tag) => (
                                <span key={tag} className="bg-gray-700 text-white px-2 py-1 text-xs rounded">
                  {tag}
                </span>
                            ))}
                        </div>
                    </div>
                </div>
                <div className="space-y-4">
                    {blogPosts.slice(1).map((post, index) => (
                        <div key={index} className="bg-gray-800 p-4 rounded-lg flex gap-2">
                            <img
                                src={post.image}
                                alt={post.title}
                                className="w-24 h-24 object-cover rounded-lg"
                            />
                            <div>
                                <p className="text-sm opacity-75">{post.author} • {post.date}</p>
                                <h3 className="text-lg font-semibold">{post.title}</h3>
                                <p className="text-sm opacity-75">{post.description}</p>
                                <div className="mt-2 space-x-2">
                                    {post.tags.map((tag) => (
                                        <span key={tag} className="bg-gray-700 text-white px-2 py-1 text-xs rounded">
                      {tag}
                    </span>
                                    ))}
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}
