import { useEffect, useState } from "react"
import SideBar from "../../components/common/Platform/SideBar"
import PageHeader from "../../components/common/Platform/PageHeader"
import { useForumTypeStore } from "../../store/forum"
import Me from "./components/Me"
import HandyResource from "./components/HandyResource"
import { Post } from "./components/Post"
import NoPostBanner from "./components/NoPostBanner"
import Loading from "../../components/common/Loading"
import httpHeader from "../../services/httpHeader"
import type  { Forum as ForumType } from "../../types/forum"

const Forum = () => {
  const { type } = useForumTypeStore()

  const [posts, setPosts] = useState<ForumType[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const handleGetPosts = async () => {
      if (type !== "Home") return // only fetch if type is Home

      try {
        const response = await httpHeader.get("/forum/all-questions")
        setPosts(response.data.questions)
      } finally {
        setLoading(false)
      }
    }

    handleGetPosts()
  }, [type]) // re-fetch when type changes to "Home"

  return (
    <div className="min-h-screen">
      <PageHeader 
        title="Financial Forum"
        description="Learn and share financial knowledge for free!"
        sideComponent={<HandyResource />}
      />
      <div className="flex">
        <SideBar 
          page="forum"
          storeHook={useForumTypeStore}
        />
        <main className="flex-1 px-4">
          {type === "Home" ? (
            loading ? (
              <Loading />
            ) : (
              <div className="space-y-4">
                {posts.length > 0 ? (
                  posts.map((post) => <Post key={post.id} post={post} />)
                ) : (
                  <NoPostBanner />
                )}
              </div>
            )
          ) : type === "Me" ? (
            <Me />
          ) : type === "None" ? (
            <div className="text-center">
              <hr className="w-52 h-0.5 mx-auto bg-gray-300 border-0 rounded-sm my-2" />
              <h1 className="font-bold text-lg">Let's get started 🚀</h1>
              <p className="text-gray-500">Click one of the features in the sidebar to start!</p>
            </div>
          ) : null}
        </main>
      </div>
    </div>
  )
}

export default Forum
