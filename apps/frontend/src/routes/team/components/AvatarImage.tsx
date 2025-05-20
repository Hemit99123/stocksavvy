import type { ImgHTMLAttributes } from "react"

export type AvatarImageProps = {
    className?: string
    src: string
    alt?: string
  } & ImgHTMLAttributes<HTMLImageElement>
  
const AvatarImage: React.FC<AvatarImageProps> = ({ className, src, alt = "", ...props }) => {
    return (
      <img
        className={`aspect-square h-full w-full ${className || ""}`}
        src={src || "/placeholder.svg"}
        alt={alt}
        {...props}
      />
    )
}

export default AvatarImage;
  