import { useState } from "react"
import useSharePopupStore from "../../../../store/sharepopup"
import { MessageSquare, Share2, X } from "lucide-react"
import httpHeader from "../../../../services/httpHeader"
import { useParams } from "react-router"
import { useShowCommentStore } from "../../../../store/comment"
import {toast} from "react-toastify"

const PostActions = () => {
    const {setShowComment} = useShowCommentStore()
    const params = useParams()
    const id = params.id
    const togglePopupStatus = useSharePopupStore((state) => state.toggleStatus)
    const [isFormOpen, setFormOpen] = useState(false)

    // this is the content for the comment
    const [content, setContent] = useState("")
  
    const handlePostComment = async () => {
      const response = await httpHeader.post("/forum/create-comment", {
        content,
        forumID: id
      })

      if (response.status == 200) {
        toast.info("Created a comment")
        setContent("")
        setFormOpen(false)
      } else {
        toast.error("A error occured")
      }
    }
  
    const handleOpenForm = () => {
      setShowComment(false)
      setFormOpen(true)
    }
  
    return (
      <>
        <div className="flex items-center gap-4 mt-4 ml-px">
          <button className="flex items-center hover:text-zinc-100 transition" onClick={handleOpenForm}>
            <MessageSquare className="h-4 w-4 mr-2" />
          </button>
          <button className="flex items-center hover:text-zinc-100 transition" onClick={togglePopupStatus}>
            <Share2 className="h-4 w-4 mr-2" />
          </button>
        </div>
  
        {isFormOpen && (
          <div className="fixed inset-0 flex items-center justify-center">
            <div className="bg-white p-6 rounded-lg w-[90%] max-w-md shadow-lg">
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-lg font-semibold">Leave a Comment</h2>
                <button onClick={() => setFormOpen(false)} className="text-zinc-400 hover:text-white">
                  <X className="w-5 h-5" />
                </button>
              </div>
              <textarea
                className="w-full p-3 bg-slate-300 rounded-md border focus:outline-none focus:ring-1 focus:ring-white resize-none"
                placeholder="Write your message here..."
                value={content}
                onChange={(e) => setContent(e.target.value)}
                rows={4}
              />
              <div className="flex justify-end gap-2 mt-4">
                <button
                  onClick={() => setFormOpen(false)}
                  className="px-4 py-2 text-sm bg-gray-200 rounded-md transition"
                >
                  Cancel
                </button>
                <button
                  className="px-4 py-2 text-sm bg-green-600 rounded-md transition text-white"
                  onClick={handlePostComment}
                >
                  Send
                </button>
              </div>
            </div>
          </div>
        )}
      </>
    )
}

export default PostActions;