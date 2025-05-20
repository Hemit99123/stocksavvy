import React from 'react'

interface HeaderProps {
    smalltext: string;
    title: string;
    isWhite?: boolean
}
const Header: React.FC<HeaderProps> = ({smalltext, title, isWhite}) => {
  return (
    <div className="text-center">
      <div className="flex items-center justify-center space-x-4 mb-4">
        <div className="h-px w-12 bg-gradient-to-r from-transparent via-gray-500 to-transparent" />
        <h2 className={`text-sm lg:text-lg font-medium ${isWhite ? "text-green-300" : "text-green-600"}`}>
          {smalltext}
        </h2>
        <div className="h-px w-12 bg-gradient-to-r from-transparent via-gray-500 to-transparent" />
      </div>
      <h3 className={`text-3xl md:text-4xl lg:text-5xl font-semibold ${isWhite && "text-white"}`}>
          {title}
      </h3>
    </div>
  )
}

export default Header