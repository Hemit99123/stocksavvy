import { Hand } from 'lucide-react'

const NotReadyYet = () => {
  return (
    <>
        <Hand size={16} />
        <div>
            Not feeling ready for this? Check out <span className="text-green-500 underline font-bold cursor-pointer">Financial guide</span>
        </div>
    </>
  )
}

export default NotReadyYet