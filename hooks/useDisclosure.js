import { useState } from 'react'

export default function useDisclosure() {
  const [isOpen, setIsOpen] = useState(false)

  const open = () => {
    if (!isOpen) setIsOpen(true)
  }

  const close = () => {
    if (isOpen) setIsOpen(false)
  }

  const toggle = () => {
    isOpen ? close() : open()
  }

  return [isOpen, { open, close, toggle }]
}
