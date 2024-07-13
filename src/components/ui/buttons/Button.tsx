import cn from 'clsx'
import type { ButtonHTMLAttributes, PropsWithChildren } from 'react'

export const Button = ({
	children,
	className,
	...rest
}: PropsWithChildren<ButtonHTMLAttributes<HTMLButtonElement>>) => (
	<button
		className={cn(
			'py-2 px-7 rounded-lg bg-primary text-base font-medium text-white transition hover:bg-secondary active:bg-secondary/75',
			className
		)}
		{...rest}
	>
		{children}
	</button>
)
