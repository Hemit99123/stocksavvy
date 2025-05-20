import type { Forum } from "../../../../types/forum"
import PostActions from "./PostActions"


function PostContent({ post }: { post: Forum | undefined }) {
  return (
    <div className="bg-green-100 rounded-lg p-4 mb-4">
      <div className="flex">
        <div className="flex-1 space-y-4">
          {post?.content.split("\n\n").map((paragraph, index) => (
            <p key={index}>{paragraph}</p>
          ))}
        </div>
      </div>
      <PostActions />
    </div>
  )
}

export default PostContent
