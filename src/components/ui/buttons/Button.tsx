import cn from 'clsx'
import type { ButtonHTMLAttributes, PropsWithChildren } from 'react'

interface Props
	extends PropsWithChildren<ButtonHTMLAttributes<HTMLButtonElement>> {
	readonly secondary?: boolean
}

export const Button = ({ children, className, secondary, ...rest }: Props) => (
	<button
		className={cn(
			'py-2 px-7 rounded-lg border border-text shadow-[2px_3px_0px_#1A202C] text-base font-medium text-text transition',
			secondary
				? 'bg-white hover:bg-bg active:bg-bg/85'
				: 'bg-pink hover:bg-primary active:bg-primary/75',
			className
		)}
		{...rest}
	>
		{children}
	</button>
)
