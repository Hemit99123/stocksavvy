"use client"

import { useNavigate } from "react-router";
import type { Forum } from "../../../types/forum"

interface PostProps {
  post: Forum;
}

export function Post({ post }: PostProps) {
  const navigate = useNavigate()

  const handleClick = () => {
    navigate(`/forum/${post.id}`);
  };

  return (
    <div 
      className="bg-white p-4 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-200 mb-4 cursor-pointer" 
      onClick={handleClick}
    >
      <div className="flex">
        <div className="flex-1">
          <h2 className="text-xl font-semibold mb-2">
            <span className="text-green-800 hover:text-green-600">{post.question}</span>
          </h2>
          <p className="text-sm text-gray-500 mb-2">
            Posted by {post.email}
          </p>
        </div>
      </div>
    </div>
  );
}
