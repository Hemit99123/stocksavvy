import Loading from "../../../components/common/Loading"
import ActionHeader from "./ActionHeader"
import NoPostBanner from "../components/NoPostBanner"
import httpHeader from "../../../services/httpHeader"
import type { Forum } from "../../../types/forum"
import { PencilIcon, Trash } from "lucide-react"
import { useEffect, useState } from "react"

export default function Me() {
  const [questions, setQuestions] = useState<Forum[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [editingQuestion, setEditingQuestion] = useState<Forum | null>(null)
  const [newQuestion, setNewQuestion] = useState("")
  const [newContent, setNewContent] = useState("")
  const [showUpdate, setShowUpdate] = useState(false)

  useEffect(() => {
    async function fetchUserQuestions() {
      try {
        setIsLoading(true)
        const response = await httpHeader.get("/forum/user-questions")
        setQuestions(response.data.questions)
      } catch (err) {
        setError(err instanceof Error ? err.message : "An error occurred")
      } finally {
        setIsLoading(false)
      }
    }

    fetchUserQuestions()
  }, [])

  const handleDeleteForum = async (id: number) => {
    try {
      await httpHeader.delete("/forum/delete", { data: { id } })
      // Update state by removing the deleted forum
      setQuestions((prevQuestions) =>
        prevQuestions.filter((question) => question.id !== id)
      )
    } catch (error) {
      console.error("Error deleting forum:", error)
    }
  }

  const handleEditForum = (question: Forum) => {
    if (showUpdate === false) {
        setEditingQuestion(question)
        setNewQuestion(question.question)
        setNewContent(question.content)
    }

    setShowUpdate((prev) => !prev)
  }

  const handleUpdateForum = async () => {
    if (!newQuestion || !newContent) return

    try {
      await httpHeader.put("/forum/update", {
        id: editingQuestion?.id,
        question: newQuestion,
        content: newContent,
      })

      // Update the question in the state
      setQuestions((prevQuestions) =>
        prevQuestions.map((q) =>
          q.id === editingQuestion?.id
            ? { ...q, question: newQuestion, content: newContent }
            : q
        )
      )
      setEditingQuestion(null)
    } catch (error) {
      console.error("Error updating forum:", error)
    }
  }

  return (
    <>
      <ActionHeader />
      <div className="min-h-screen p-4 md:p-6">
        <div className="max-w-7xl mx-auto">
          {isLoading && (
            <Loading />
          )}

          {!isLoading && !error && questions.length === 0 && (
            <NoPostBanner />
          )}

          {!isLoading && !error && questions.length > 0 && (
            <div>
              {questions.map((question) => (
                <div
                  key={question.id}
                  className="rounded-lg overflow-hidden border border-green-500 hover:shadow-md transition-shadow mb-7"
                >
                  <div className="p-4">
                    <p className="text-green-800 line-clamp-3">{question.question}</p>

                    <div className="flex space-x-2 mt-2 text-green-500 cursor-pointer">
                        <PencilIcon size={20} onClick={() => handleEditForum(question)} />
                        <Trash size={20} onClick={() => handleDeleteForum(question.id)} />
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* Edit Form */}
          {showUpdate && (
            <div className="bg-white p-8 rounded-lg shadow-sm border border-green-200 mt-6">
              <h2 className="text-xl font-medium text-green-700 mb-4">Edit Question</h2>
              <div className="mb-4">
                <label htmlFor="question" className="block text-green-700">Question</label>
                <input
                  type="text"
                  id="question"
                  value={newQuestion}
                  onChange={(e) => setNewQuestion(e.target.value)}
                  className="w-full p-2 border border-green-300 rounded-md"
                />
              </div>
              <div className="mb-4">
                <label htmlFor="content" className="block text-green-700">Content</label>
                <textarea
                  id="content"
                  value={newContent}
                  onChange={(e) => setNewContent(e.target.value)}
                  rows={4}
                  className="w-full p-2 border border-green-300 rounded-md"
                />
              </div>
              <button
                onClick={handleUpdateForum}
                className="px-4 py-2 bg-green-600 text-white rounded-md"
              >
                Update Question
              </button>
            </div>
          )}
        </div>
      </div>
    </>
  )
}
