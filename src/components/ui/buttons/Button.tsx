import cn from 'clsx'
import { ButtonHTMLAttributes, PropsWithChildren } from 'react'

export function Button({
	children,
	className,
	...rest
}: PropsWithChildren<ButtonHTMLAttributes<HTMLButtonElement>>) {
	return (
		<button
			className={cn(
				'linear rounded-lg bg-primary py-2 px-7 text-base font-medium text-white transition hover:bg-secondary active:bg-secondary/75',
				className
			)}
			{...rest}
		>
			{children}
		</button>
	)
}
