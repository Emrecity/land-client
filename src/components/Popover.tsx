'use client'

import React, { useState, useRef, useEffect } from 'react'

interface PopoverProps {
  children: React.ReactNode
  content: React.ReactNode
  position?: 'top' | 'right' | 'bottom' | 'left'
  align?: 'start' | 'center' | 'end'
}

export default function Popover({ children, content, position = 'bottom', align = 'center' }: PopoverProps) {
  const [isVisible, setIsVisible] = useState(false)
  const popoverRef = useRef<HTMLDivElement>(null)
  const triggerRef = useRef<HTMLButtonElement>(null)

  const toggleVisibility = () => {
    setIsVisible(!isVisible)
  }

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        popoverRef.current &&
        !popoverRef.current.contains(event.target as Node) &&
        triggerRef.current &&
        !triggerRef.current.contains(event.target as Node)
      ) {
        setIsVisible(false)
      }
    }

    document.addEventListener('mousedown', handleClickOutside)
    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
    }
  }, [])

  const positionClasses = {
    top: 'bottom-full left-1/2 -translate-x-1/2 mb-1',
    right: 'left-full top-[100%] -translate-y-1/2 ml-1',
    bottom: 'top-full left-1/2 -translate-x-1/2 mt-1',
    left: 'right-full top-full -translate-y-0 mr-0',
  }

  const alignmentClasses = {
    start: position === 'left' || position === 'right' ? 'top-0' : 'left-0',
    center: '',
    end: position === 'left' || position === 'right' ? 'bottom-0' : 'right-0',
  }

  return (
    <div className="relative  inline-block">
      <button
        ref={triggerRef}
        onClick={toggleVisibility}
        className=""
        aria-haspopup="true"
        aria-expanded={isVisible}
        aria-controls="popover-content"
      >
        {children}
      </button>
      {isVisible && (
        <div
          id="popover-content"
          ref={popoverRef}
          className={`absolute bg-white border border-gray-200 shadow-lg rounded-md p-4 z-50 ${positionClasses[position]} ${alignmentClasses[align]}`}
          role="dialog"
          aria-modal="true"
        >
          {content}
        </div>
      )}
    </div>
  )
}