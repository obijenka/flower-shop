import { useState } from 'react'
import { HiOutlineChevronDown } from 'react-icons/hi'

export default function Dropdown({ label, options, selected, onSelect }) {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <div className="relative">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-2 hover:text-gray-300"
      >
        {label}
        <span className="text-custom-purple">{selected}</span>
        <HiOutlineChevronDown size={12} />
      </button>
      
      {isOpen && (
        <div className="absolute top-6 left-0 bg-white text-custom-dark shadow-lg z-20 min-w-[80px]">
          {options.map((option) => (
            <div
              key={option}
              onClick={() => {
                onSelect(option)
                setIsOpen(false)
              }}
              className="px-4 py-2 hover:bg-gray-100 cursor-pointer"
            >
              {option}
            </div>
          ))}
        </div>
      )}
    </div>
  )
}