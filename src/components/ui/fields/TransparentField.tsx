import cn from 'clsx'
import { InputHTMLAttributes, forwardRef } from 'react'

type TTransparentField = InputHTMLAttributes<HTMLInputElement>

export const TransparentField = forwardRef<HTMLInputElement, TTransparentField>(
	({ className, ...rest }, ref) => (
		<input
			className={cn(
				'bg-transparent border-none focus:outline-0 focus:shadow-transparent w-full',
				className
			)}
			autoComplete='off'
			ref={ref}
			{...rest}
		/>
	)
)

TransparentField.displayName = 'TransparentField'
