import type { ButtonHTMLAttributes, ReactNode } from 'react'

type ButtonProps = {
    children: ReactNode
} & ButtonHTMLAttributes<HTMLButtonElement>

// Button component
const SocialButton: React.FC<ButtonProps> = ({ children }) => {

    return (
      <button
      className="rounded-full flex justify-center items-center w-9 h-9 text-green-500 hover:text-white hover:bg-green-500"
      >
        {children}
      </button>
    )
}

export default SocialButton