import type { CardProps } from '../../../types/team'
import React from 'react'

const CardTitle: React.FC<CardProps> = ({ className, children, ...props }) => {
    return (
      <h3 className={`text-2xl font-semibold leading-none tracking-tight ${className || ""}`} {...props}>
        {children}
      </h3>
    )
}

export default CardTitle