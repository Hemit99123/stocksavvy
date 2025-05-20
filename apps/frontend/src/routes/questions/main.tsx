"use client"

import { useQuestionTypeStore } from "../../store/questions"
import { MdOutlineOpenInNew } from "react-icons/md"
import { useState, useEffect, useCallback } from "react"
import { CheckCircle, RotateCw } from "lucide-react"
import Sidebar from "../../components/common/Platform/SideBar"
import { motion } from "framer-motion"
import { toast } from "react-toastify"
import { SubmitButton } from "./components/SubmitButton"
import { useSubmitTypeStore } from "../../store/submit"
import httpHeader from "../../services/httpHeader"
import type { Question } from "../../types/question"
import Loading from "../../components/common/Loading"
import PageHeader from "../../components/common/Platform/PageHeader"
import NotReadyYet from "./components/NotReadyYet"
import type { Option } from "../../types/question"

const LetterCircle = ({ letter, isSelected }: { letter: string, isSelected: boolean }) => (
  <div className={`w-8 h-8 rounded-full border-2 ${isSelected ? 'border-green-500' : 'border-gray-300'} flex items-center justify-center`}>
    <span className={`text-lg ${isSelected ? 'text-green-500' : 'text-gray-600'}`}>{letter}</span>
  </div>
)

const QuestionView = () => {

  const { type } = useQuestionTypeStore()
  const { setType: setSubmitType } = useSubmitTypeStore.getState()

  const [isClient, setIsClient] = useState(false)
  const [selectedOption, setSelectedOption] = useState<Option | null>(null)
  const [isLoading, setLoading] = useState(false)
  const [question, setQuestion] = useState<Question | null>(null)
  const [streak, setStreak] = useState(0)

  const handleGetRandomQuestion = useCallback(async () => {
    try {
      setLoading(true)
      const response = await httpHeader.get(`/question/get?type=${type}`)
      setQuestion(response.data.question)
      setSelectedOption(null) // Reset selection
    } finally {
      setLoading(false)
    }
  }, [type])

  useEffect(() => {
    setIsClient(true)
  }, [])

  useEffect(() => {
    if (type && type !== "None") {
      handleGetRandomQuestion()
    }
  }, [type, handleGetRandomQuestion])

  const url = isClient ? encodeURIComponent(window.location.href) : ""
  const googleClassroomShare = `https://classroom.google.com/u/0/share?url=${url}`
  const linkedInShare = `https://www.linkedin.com/sharing/share-offsite/?url=${url}`

  const handleOptionSelect = (option: Option) => {
    setSelectedOption(option)
  }

  const handleSubmit = () => {
    if (!selectedOption || !question) return

    setSubmitType("success")

    if (selectedOption.letter === question.correctAnswer) {
      toast.success("Correct Answer")
      setStreak(prev => prev + 1)
      handleGetRandomQuestion()
    } else {
      toast.error("Wrong Answer")
      setStreak(0)
    }

    setTimeout(() => {
      setSubmitType("idle")
    }, 1500)
  }

  return (
    <div>
      <PageHeader
        title="Financial Questions"
        description="Let's test your financial skills! Explore below..."
        sideComponent={<NotReadyYet />}
      />

      <div className="lg:flex flex-col lg:flex-row px-px justify-center">
        <Sidebar page="question" storeHook={useQuestionTypeStore} />

        <div className="overflow-auto w-11/12">
          {isLoading ? (
            <Loading />
          ) : (
            <>
              <div className="flex items-center justify-center bg-green-100 rounded-lg shadow-md p-4 my-4">
                <motion.div
                  key={streak}
                  initial={{ scale: 0.8, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  transition={{ type: "spring", stiffness: 300, damping: 20 }}
                  className="text-3xl font-bold text-green-700"
                >
                  {streak}
                </motion.div>
                <span className="ml-3 text-lg font-medium text-green-600">🔥 Streak</span>
              </div>

              {type === "None" ? (
                <div className="text-center">
                  <hr className="w-52 h-0.5 mx-auto bg-gray-300 border-0 rounded-sm my-2" />
                  <h1 className="font-bold text-lg">Start with a topic</h1>
                  <p className="text-gray-500">Get started by selecting a topic.</p>
                </div>
              ) : (
                <div>
                  <h1 className="text-center text-3xl font-bold mb-2">{type}</h1>

                  {/* SHARING HEADER */}
                  <div className="flex justify-center space-x-10">
                    <a
                      href={googleClassroomShare}
                      className="cursor-pointer flex items-center space-x-2 text-green-800 text-sm"
                    >
                      <svg xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" width="25" height="25" viewBox="0 0 48 48">
                          <path fill="#ffc107" d="M41,42H7c-2.206,0-4-1.794-4-4V10c0-2.206,1.794-4,4-4h34c2.206,0,4,1.794,4,4v28C45,40.206,43.206,42,41,42z"></path><path fill="#388e3c" d="M7 10H41V38H7z"></path><path fill="#fff" d="M28 36H36V38H28zM24 17A3 3 0 1 0 24 23 3 3 0 1 0 24 17z"></path><path fill="#a5d6a7" d="M16 21A2 2 0 1 0 16 25A2 2 0 1 0 16 21Z"></path><path fill="#2e7d32" d="M7 10H41V12H7z"></path><path fill="#ffab00" d="M36 38L28 38 32 42 40 42z"></path><path fill="#a5d6a7" d="M32 21A2 2 0 1 0 32 25 2 2 0 1 0 32 21zM37 28.688c0-.445-.163-.874-.468-1.199C35.839 26.75 34.363 26 32 26s-3.839.75-4.532 1.489C27.163 27.814 27 28.242 27 28.688V30h10V28.688zM21 28.688c0-.445-.163-.874-.468-1.199C19.839 26.75 18.363 26 16 26s-3.839.75-4.532 1.489C11.163 27.814 11 28.242 11 28.688V30h10V28.688z"></path><path fill="#fff" d="M30,27.742c0-0.534-0.196-1.048-0.562-1.438C28.607,25.417,26.835,24,24,24s-4.607,1.417-5.438,2.303C18.196,26.693,18,27.207,18,27.742V30h12V27.742z"></path>
                      </svg>
                      <p>Google Classroom</p>
                      <MdOutlineOpenInNew />
                    </a>

                    <a href={linkedInShare} className="cursor-pointer flex items-center space-x-2 text-green-800 text-sm">
                      <svg xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" width="25" height="25" viewBox="0 0 48 48">
                        <path fill="#0078d4" d="M42,37c0,2.762-2.238,5-5,5H11c-2.761,0-5-2.238-5-5V11c0-2.762,2.239-5,5-5h26c2.762,0,5,2.238,5,5	V37z"></path><path d="M30,37V26.901c0-1.689-0.819-2.698-2.192-2.698c-0.815,0-1.414,0.459-1.779,1.364	c-0.017,0.064-0.041,0.325-0.031,1.114L26,37h-7V18h7v1.061C27.022,18.356,28.275,18,29.738,18c4.547,0,7.261,3.093,7.261,8.274	L37,37H30z M11,37V18h3.457C12.454,18,11,16.528,11,14.499C11,12.472,12.478,11,14.514,11c2.012,0,3.445,1.431,3.486,3.479	C18,16.523,16.521,18,14.485,18H18v19H11z" opacity=".05"></path><path d="M30.5,36.5v-9.599c0-1.973-1.031-3.198-2.692-3.198c-1.295,0-1.935,0.912-2.243,1.677	c-0.082,0.199-0.071,0.989-0.067,1.326L25.5,36.5h-6v-18h6v1.638c0.795-0.823,2.075-1.638,4.238-1.638	c4.233,0,6.761,2.906,6.761,7.774L36.5,36.5H30.5z M11.5,36.5v-18h6v18H11.5z M14.457,17.5c-1.713,0-2.957-1.262-2.957-3.001	c0-1.738,1.268-2.999,3.014-2.999c1.724,0,2.951,1.229,2.986,2.989c0,1.749-1.268,3.011-3.015,3.011H14.457z" opacity=".07"></path><path fill="#fff" d="M12,19h5v17h-5V19z M14.485,17h-0.028C12.965,17,12,15.888,12,14.499C12,13.08,12.995,12,14.514,12	c1.521,0,2.458,1.08,2.486,2.499C17,15.887,16.035,17,14.485,17z M36,36h-5v-9.099c0-2.198-1.225-3.698-3.192-3.698	c-1.501,0-2.313,1.012-2.707,1.99C24.957,25.543,25,26.511,25,27v9h-5V19h5v2.616C25.721,20.5,26.85,19,29.738,19	c3.578,0,6.261,2.25,6.261,7.274L36,36L36,36z"></path>
                      </svg>              
                      <p>LinkedIn</p>
                      <MdOutlineOpenInNew />
                    </a>

                    <button onClick={handleGetRandomQuestion}><RotateCw size={20} /></button>
                  </div>

                  {/* QUESTION */}
                  <div className="px-28 mt-10">
                    <p className="text-lg font-medium">{question?.question}</p>
                    <p className="mt-5 text-sm font-bold text-green-400">Select one:</p>
                    <hr className="h-px my-2 bg-green-200 border-0" />

                    <div className="space-y-3 mt-4">
                      {question?.options?.map((option: Option, index) => (
                        <motion.button
                          key={index}
                          onClick={() => handleOptionSelect(option)}
                          className={`w-full text-left rounded-xl transition-all duration-200 overflow-hidden ${
                            selectedOption?.letter === option.letter
                              ? "ring-2 ring-green-500 bg-green-50"
                              : "hover:bg-gray-50 border border-gray-200"
                          }`}
                          whileHover={{ scale: 1.01 }}
                          whileTap={{ scale: 0.99 }}
                        >
                          <div className="flex items-center p-4">
                            <LetterCircle letter={option.letter} isSelected={selectedOption?.letter === option.letter} />
                            <div className="flex-1 ml-4 flex justify-between items-center">
                              <h3 className={`font-medium ${selectedOption?.letter === option.letter ? "text-green-700" : "text-gray-800"}`}>
                                {option.text}
                              </h3>
                              {selectedOption?.letter === option.letter && (
                                <motion.div
                                  initial={{ scale: 0 }}
                                  animate={{ scale: 1 }}
                                  transition={{ type: "spring", stiffness: 500, damping: 30 }}
                                >
                                  <CheckCircle className="h-6 w-6 text-green-600" />
                                </motion.div>
                              )}
                            </div>
                          </div>
                          {selectedOption?.letter === option.letter && (
                            <motion.div
                              className="h-1 bg-green-500"
                              initial={{ width: 0 }}
                              animate={{ width: "100%" }}
                              transition={{ duration: 0.3 }}
                            />
                          )}
                        </motion.button>
                      ))}
                    </div>

                    <SubmitButton handleSubmit={handleSubmit} />
                  </div>
                </div>
              )}
            </>
          )}
        </div>
      </div>
    </div>
  )
}

export default QuestionView
