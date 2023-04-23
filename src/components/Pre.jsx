import { useState, useRef } from 'react'

export function Pre({collapsed, ...props}) {
  let collapsable;
  if (typeof collapsed === "undefined") {
    collapsable = false
  } else {
    collapsable = true
  }

  const [isCollapsed, setCollapse] = useState(collapsable ? Boolean(collapsed) : null)

  const toggleCollapse = () => {
    setCollapse(!isCollapsed)
  }

  const textInput = useRef(null)
  const [hovered, setHovered] = useState(false)
  const [copied, setCopied] = useState(false)

  const onEnter = () => {
    setHovered(true)
  }
  const onExit = () => {
    setHovered(false)
    setCopied(false)
  }
  const onCopy = () => {
    setCopied(true)
    navigator.clipboard.writeText(textInput.current.textContent)
    setTimeout(() => {
      setCopied(false)
    }, 2000)
  }

  return (
    <div ref={textInput} onMouseEnter={onEnter} onMouseLeave={onExit} className="relative">

      {hovered && (
        <button
          aria-label="Copy code"
          type="button"
          className={`absolute right-3 top-3 h-8 w-8 rounded border-2 bg-gray-700 p-1 dark:bg-gray-800 ${
            copied
              ? 'border-green-400 focus:border-green-400 focus:outline-none'
              : 'border-gray-300'
          }`}
          onClick={onCopy}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            stroke="currentColor"
            fill="none"
            className={copied ? 'text-green-400' : 'text-gray-300'}
          >
            {copied ? (
              <>
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4"
                />
              </>
            ) : (
              <>
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2"
                />
              </>
            )}
          </svg>
        </button>
      )}

      <pre>
        <div className={(collapsable && isCollapsed) ? "hidden" : undefined}>
          {props.children}
        </div>
        {collapsable && (
          <div className="flex justify-center">
            <button
              aria-label="Collapse / Expand code"
              type="button"
              className="rounded py-1 text-xs bg-gold-400 font-semibold text-white px-2"
              onClick={toggleCollapse}>
              {isCollapsed ? "Expand code" : "Collapse code"}
            </button>
          </div>
        )}
      </pre>
    </div>
  )
}
