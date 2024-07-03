import cn from 'clsx'
import { type InputHTMLAttributes, forwardRef } from 'react'

type TTransparentField = InputHTMLAttributes<HTMLInputElement>

export const TransparentField = forwardRef<HTMLInputElement, TTransparentField>(
	({ className, placeholder, ...rest }, ref) => (
		<input
			className={cn(
				'w-full bg-transparent border-none text-ellipsis focus:outline-0 focus:shadow-transparent',
				className
			)}
			autoComplete='off'
			placeholder={placeholder}
			ref={ref}
			{...rest}
		/>
	)
)

TransparentField.displayName = 'TransparentField'
