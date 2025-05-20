import { useState } from "react"
import { Plus } from "lucide-react"
import httpHeader from "../../../services/httpHeader"
import { toast } from "react-toastify"

const ActionHeader = () => {
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [content, setContent] = useState("")
  const [question, setQuestion] = useState("")

  const toggleModal = () => {
    setIsModalOpen(!isModalOpen)
  }

  const handlePostQuestion = async () => {
    await httpHeader.post("/forum/create", {
      content,
      question
    })
    toast.info("Created question")
  }

  return (
    <header className="p-4">
      <div className="container mx-auto flex items-center justify-between">
        <a href="/" className="text-3xl font-bold text-green-800">
          My Posts
        </a>
        
        <div className="flex items-center space-x-4 bg-green-500 px-2 py-2 rounded-full">
          <Plus className="text-white cursor-pointer" onClick={toggleModal} />
        </div>
      </div>

      {isModalOpen && (
        <div className="fixed inset-0 bg-gray-800 bg-opacity-50 flex justify-center items-center z-50">
          <div className="bg-white p-6 rounded-lg w-96">
            <h2 className="text-xl font-bold mb-4">Your Question</h2>
            <div className="mb-4">
                <label htmlFor="question" className="block text-sm font-medium text-gray-700">
                  Question
                </label>
                <input
                  id="question"
                  name="question"
                  onChange={(e) => setQuestion(e.target.value)}
                  type="text"
                  className="w-full p-2 mt-1 border border-gray-300 rounded-md"
                />
              </div>
              <div className="mb-4">
                <label htmlFor="content" className="block text-sm font-medium text-gray-700">
                  Content
                </label>
                <textarea
                  onChange={(e) => setContent(e.target.value)}
                  value={content}
                  id="content"
                  name="content"
                  rows={4}
                  className="w-full p-2 mt-1 border border-gray-300 rounded-md"
                ></textarea>
              </div>

              <div className="flex justify-end space-x-4">
                <button
                  type="button"
                  onClick={toggleModal}
                  className="px-4 py-2 bg-gray-500 text-white rounded-md hover:bg-gray-600"
                >
                  Cancel
                </button>
                <button
                  onClick={handlePostQuestion}
                  className="px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700"
                >
                  Submit
                </button>
              </div>
          </div>
        </div>
      )}
    </header>
  )
}

export default ActionHeader