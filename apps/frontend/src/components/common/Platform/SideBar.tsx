/* eslint-disable */

"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { Search, Trash } from "lucide-react"
import { topics as questionTopics } from "../../../data/topics"
import { features as forumFeatures } from "../../../data/forumFeatures"


interface SidebarProps {
  page: "forum" | "question"
  storeHook: () => {
    type: any;
    setType: (type: any) => void
  }
}

const Sidebar: React.FC<SidebarProps> = ({ page, storeHook }) => {

  const { type, setType } = storeHook()
  
  
  const selectedItems = page === "question" ? questionTopics : forumFeatures

  
  const [showSearchModal, setShowSearchModal] = useState(false)
  const [searchQuery, setSearchQuery] = useState("")

  const handleTopicClick = (newTopic: any) => {

    // If clicked again, unselect it!
    if (newTopic.name == type) {
      setType("None")
    } else {
      setType(newTopic.name) 
    }

  }

  const filteredTopics = selectedItems.filter((topic: any) =>
    topic.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    topic.description.toLowerCase().includes(searchQuery.toLowerCase())
  )

  const handleClearSearch = () => {
    setSearchQuery("")
  }

  return (
    <div className="w-64 md:w-1/3 md:pl-8 flex-shrink-0 flex flex-col gap-4">
      {/* Top bar */}
      <div className="flex justify-between items-center mb-5 mx-4">
        <Search
          className="h-4 w-4 text-muted-foreground cursor-pointer"
          onClick={() => setShowSearchModal(true)}
        />
        <Trash
          className="h-4 w-4 text-muted-foreground cursor-pointer"
          onClick={handleClearSearch}
        />
      </div>

      {/* Search Modal */}
      {showSearchModal && (
        <div className="fixed inset-0 z-10 bg-black bg-opacity-50 flex justify-center items-center">
          <div className="bg-white p-6 rounded-lg w-96">
            <h2 className="text-xl font-semibold mb-4">Search Topics</h2>
            <input
              type="text"
              placeholder="Search for a topic..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full px-4 py-2 mb-4 border rounded-md"
            />
            <button
              onClick={() => setShowSearchModal(false)}
              className="w-full bg-red-500 text-white py-2 rounded-md"
            >
              Close
            </button>
            <div className="mt-4 max-h-60 overflow-y-auto">
              {filteredTopics.map((topic) => (
                <motion.div key={topic.id} className="flex items-start gap-3">
                  <div className="p-2 rounded-md bg-muted text-muted-foreground text-green-500">
                    <topic.icon size={24} className="text-primary" />
                  </div>
                  <div className="flex-1">
                    <p className="text-xs font-medium text-muted-foreground uppercase tracking-wider">
                      {topic.description}
                    </p>
                    <p className="text-base font-semibold mt-1">{topic.name}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Topics List */}
      <div className="space-y-3 overflow-y-auto max-h-[calc(100vh-180px)] pr-2">
        {filteredTopics.map((topic) => (
          <motion.div
            key={topic.id}
            className={`relative cursor-pointer transition-all duration-200 p-4 rounded-lg ${
              type === topic.name
                ? "bg-green-100 border-l-4 border-green-500"
                : "bg-gray-50 hover:bg-gray-100"
            }`}
            onClick={() => handleTopicClick(topic)}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            <div className="flex items-start gap-3">
              <div className="p-2 rounded-md bg-muted text-muted-foreground text-green-500">
                <topic.icon size={24} className="text-primary" />
              </div>
              <div className="flex-1">
                <p className="text-xs font-medium text-muted-foreground uppercase tracking-wider">
                  {topic.description}
                </p>
                <p className="text-base font-semibold mt-1">{topic.name}</p>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  )
}

export default Sidebar
