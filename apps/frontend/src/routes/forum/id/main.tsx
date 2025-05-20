import { useNavigate } from "react-router";
import { useParams } from "react-router";
import SharePopUp from "../components/SharePopUp";
import PostHeader from "../components/post-detail/PostHeader";
import PostContent from "../components/post-detail/PostContent";
import CommentSection from "../components/post-detail/CommentSection";
import { useEffect, useState } from "react";
import type { Forum, Comment } from "../../../types/forum";
import httpHeader from "../../../services/httpHeader";
import { useShowCommentStore } from "../../../store/comment";
import Loading from "../../../components/common/Loading";

const ID = () => {
  const params = useParams();
  const [post, setPost] = useState<Forum>();
  const [comments, setComments] = useState<Comment[]>();
  const [isCommentLoading, setCommentLoading] = useState(false)
  const id = params.id;
  const {showComment, setShowComment} = useShowCommentStore()

  useEffect(() => {
    const handleGetPost = async () => {
      const response = await httpHeader.get(`/forum/get?id=${id}`);
      setPost(response.data.question);
      setComments(response.data.comment);
    };

    handleGetPost();
  }, [id]);

  const navigate = useNavigate();

  if (!post) {
    navigate("/404");
  }

  const toggleComments = async () => {
    if (showComment === false) {
        setCommentLoading(true)

        const response = await httpHeader.get(`/forum/get-comments?id=${id}`)
        setComments(response.data.comments)
        setShowComment(true)

        setCommentLoading(false)
    } else {
        setShowComment(false)
    }
  };

  return (
    <div className="min-h-screen bg-green-50">
      <div className="container mx-auto py-6 px-4">
        <div className="flex gap-8">
          {/* Main Content */}
          <div className="flex-1">
            <PostHeader post={post} />
            <PostContent post={post} />
            <button onClick={toggleComments} className="my-4">
              {showComment ? "Hide Comments" : "Show Comments"}
            </button>
            {isCommentLoading && <Loading />}
            {showComment && <CommentSection comments={comments} />}
            <SharePopUp />
          </div>
        </div>
      </div>
    </div>
  );
};

export default ID;
