import { ReactNode, HTMLAttributes } from "react"

// Type definitions
export type CardProps = {
    className?: string
    children: ReactNode
} & HTMLAttributes<HTMLDivElement>
  
export type TeamMember = {
    name: string
    role: string
    image: string
    bio: string
}