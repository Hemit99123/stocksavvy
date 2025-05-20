import type { CardProps } from '../../../types/team'
import React from 'react'

const CardFooter: React.FC<CardProps> = ({ className, children, ...props }) => {
    return (
      <div className={`flex items-center p-6 pt-0 ${className || ""}`} {...props}>
        {children}
      </div>
    )
}

export default CardFooter