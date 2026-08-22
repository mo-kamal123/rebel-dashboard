import { useEffect, useRef, useState } from 'react'
import { createPortal } from 'react-dom'

const MENU_GAP = 4
const MENU_MAX_HEIGHT = 240
const ESTIMATED_OPTION_HEIGHT = 41

function computeMenuStyle(triggerRect, optionCount) {
  const estimatedHeight =
    Math.min(optionCount * ESTIMATED_OPTION_HEIGHT + 12, MENU_MAX_HEIGHT) + MENU_GAP
  const spaceBelow = window.innerHeight - triggerRect.bottom
  const openUp = spaceBelow < estimatedHeight && triggerRect.top > estimatedHeight

  if (openUp) {
    return {
      position: 'fixed',
      left: triggerRect.left,
      width: triggerRect.width,
      bottom: window.innerHeight - triggerRect.top + MENU_GAP,
      maxHeight: Math.min(MENU_MAX_HEIGHT, triggerRect.top - MENU_GAP * 2),
    }
  }

  return {
    position: 'fixed',
    left: triggerRect.left,
    width: triggerRect.width,
    top: triggerRect.bottom + MENU_GAP,
    maxHeight: Math.min(MENU_MAX_HEIGHT, window.innerHeight - triggerRect.bottom - MENU_GAP * 2),
  }
}

function ChevronIcon({ className }) {
  return (
    <svg
      className={className}
      fill="none"
      stroke="currentColor"
      strokeWidth={2}
      viewBox="0 0 24 24"
    >
      <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
    </svg>
  )
}

function CheckIcon() {
  return (
    <svg
      className="size-4 shrink-0 text-rebel-red"
      fill="none"
      stroke="currentColor"
      strokeWidth={2}
      viewBox="0 0 24 24"
    >
      <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
    </svg>
  )
}

/**
 * @param {{
 *   value?: string | number,
 *   onChange: (value: string | number) => void,
 *   options: { value: string | number, label: string }[],
 *   disabled?: boolean,
 *   placeholder?: string,
 *   className?: string,
 * }} props
 */
export function Dropdown({
  value,
  onChange,
  options,
  disabled = false,
  placeholder = 'Select…',
  className = '',
}) {
  const [isOpen, setIsOpen] = useState(false)
  const [highlightIndex, setHighlightIndex] = useState(0)
  const [menuStyle, setMenuStyle] = useState(null)
  const rootRef = useRef(null)
  const triggerRef = useRef(null)
  const menuRef = useRef(null)

  const selectedIndex = options.findIndex((option) => option.value === value)
  const selectedOption = selectedIndex >= 0 ? options[selectedIndex] : null

  useEffect(() => {
    if (!isOpen) return undefined

    const handlePointerDown = (event) => {
      const target = event.target
      if (rootRef.current?.contains(target)) return
      if (menuRef.current?.contains(target)) return
      setIsOpen(false)
    }
    const handleKeyDown = (event) => {
      if (event.key === 'Escape') setIsOpen(false)
    }
    const handleReposition = () => {
      const rect = triggerRef.current?.getBoundingClientRect()
      if (rect) setMenuStyle(computeMenuStyle(rect, options.length))
    }

    document.addEventListener('pointerdown', handlePointerDown)
    document.addEventListener('keydown', handleKeyDown)
    window.addEventListener('resize', handleReposition)
    window.addEventListener('scroll', handleReposition, true)

    return () => {
      document.removeEventListener('pointerdown', handlePointerDown)
      document.removeEventListener('keydown', handleKeyDown)
      window.removeEventListener('resize', handleReposition)
      window.removeEventListener('scroll', handleReposition, true)
    }
  }, [isOpen, options.length])

  const commit = (index) => {
    const option = options[index]
    if (!option) return
    if (option.value !== value) {
      onChange(option.value)
    }
    setIsOpen(false)
  }

  const openMenu = () => {
    const rect = triggerRef.current?.getBoundingClientRect()
    if (rect) setMenuStyle(computeMenuStyle(rect, options.length))
    setHighlightIndex(selectedIndex >= 0 ? selectedIndex : 0)
    setIsOpen(true)
  }

  const moveHighlight = (delta) => {
    setHighlightIndex((current) =>
      Math.min(options.length - 1, Math.max(0, current + delta)),
    )
  }

  const handleKeyDown = (event) => {
    if (disabled) return

    if (!isOpen) {
      if (['Enter', ' ', 'ArrowDown', 'ArrowUp'].includes(event.key)) {
        event.preventDefault()
        openMenu()
      }
      return
    }

    switch (event.key) {
      case 'ArrowDown':
        event.preventDefault()
        moveHighlight(1)
        break
      case 'ArrowUp':
        event.preventDefault()
        moveHighlight(-1)
        break
      case 'Home':
        event.preventDefault()
        setHighlightIndex(0)
        break
      case 'End':
        event.preventDefault()
        setHighlightIndex(options.length - 1)
        break
      case 'Enter':
      case ' ':
        event.preventDefault()
        commit(highlightIndex)
        break
      case 'Tab':
        setIsOpen(false)
        break
      default:
        break
    }
  }

  return (
    <div ref={rootRef} className={`relative ${className}`} onKeyDown={handleKeyDown}>
      <button
        ref={triggerRef}
        type="button"
        disabled={disabled}
        aria-haspopup="listbox"
        aria-expanded={isOpen}
        onClick={() => (isOpen ? setIsOpen(false) : openMenu())}
        className={`field-base flex cursor-pointer items-center justify-between gap-3 text-left ${
          disabled ? 'cursor-not-allowed opacity-50' : ''
        }`}
      >
        <span className={selectedOption ? '' : 'text-white/25'}>
          {selectedOption ? selectedOption.label : placeholder}
        </span>
        <ChevronIcon
          className={`size-4 shrink-0 text-white/40 transition-transform ${
            isOpen ? 'rotate-180' : ''
          }`}
        />
      </button>

      {isOpen && menuStyle
        ? createPortal(
            <ul
              ref={menuRef}
              role="listbox"
              style={menuStyle}
              className="z-[100] space-y-1 overflow-y-auto rounded-xl border border-white/10 bg-[#0b0b0b]/95 p-1.5 shadow-[0_20px_60px_rgba(0,0,0,0.45)] backdrop-blur-xl"
            >
              {options.map((option, index) => {
                const isSelected = option.value === value
                const isHighlighted = index === highlightIndex

                return (
                  <li key={option.value} role="option" aria-selected={isSelected}>
                    <button
                      type="button"
                      onClick={() => commit(index)}
                      onMouseEnter={() => setHighlightIndex(index)}
                      className={`flex w-full items-center justify-between gap-3 rounded-lg px-3 py-2 text-left text-sm transition ${
                        isHighlighted ? 'bg-white/[0.06] text-white' : 'text-white/70'
                      }`}
                    >
                      <span>{option.label}</span>
                      {isSelected ? <CheckIcon /> : null}
                    </button>
                  </li>
                )
              })}
            </ul>,
            document.body,
          )
        : null}
    </div>
  )
}
