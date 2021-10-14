import React from "react"

interface ButtonProps {
  className?: string
}

const Button: React.FC<ButtonProps> = ({ children, className }) => {
  return (
    <button
      className={`py-3 px-10 md:px-14 rounded-lg font-bold text-sm md:text-base ${
        className && className
      }`}
    >
      {children}
    </button>
  )
}
export default Button
