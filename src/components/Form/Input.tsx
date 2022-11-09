import { forwardRef, InputHTMLAttributes } from 'react'

interface IInputProps extends InputHTMLAttributes<HTMLInputElement> {
  hasError?: boolean
}

export const Input = forwardRef<HTMLInputElement, IInputProps>(
  ({ hasError = false, ...props }, ref) => {
    return (
      <input
        {...props}
        ref={ref}
        className={`bg-zinc-900 py-2 md:py-3 px-4 rounded text-sm placeholder:text-zinc-500 border border-transparent focus-within:outline-none ${
          hasError ? 'border-red-500' : ''
        }`}
      />
    )
  },
)
Input.displayName = 'Input'
