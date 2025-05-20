import type { Forum } from "../../../../types/forum";
import { FaArrowLeft } from "react-icons/fa";

function PostHeader({ post }: { post: Forum | undefined }) {
    return (
      <div className="flex items-center gap-2 mb-4">
        <a href="/forum" className="text-zinc-400 hover:text-white">
          <FaArrowLeft />
        </a>
        <div className="flex-1">
          <h1 className="text-xl font-semibold">{post?.question}</h1>
          <div className="flex items-center gap-2 text-sm text-zinc-400">
            <span>Posted by {post?.email}</span>
          </div>
        </div>
      </div>
    )
}

export default PostHeader