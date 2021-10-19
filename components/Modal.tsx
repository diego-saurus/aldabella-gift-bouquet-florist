import React, { HTMLAttributes } from "react"
import { createPortal } from "react-dom"

interface Props {
  open: boolean
}

const Modal: React.FC<Props> = ({ open }) => {
  if (!open) return null
  return createPortal(
    <div className="">modal</div>,
    document.getElementById("modal")
  )
}

export default Modal
