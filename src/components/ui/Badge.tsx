import { CSSProperties, PropsWithChildren } from 'react'
import { tv } from 'tailwind-variants'

interface IBadge {
	readonly className?: string
	readonly style?: CSSProperties
	readonly variant?: string
}

const badge = tv({
	base: 'rounded-lg w-max py-1 px-2 text-xs text-sm text-text transition',
	variants: {
		backgroundColor: {
			gray: 'bg-secondary/15',
			high: 'bg-pink',
			medium: 'bg-yellow',
			low: 'bg-blue-400/70'
		}
	},
	defaultVariants: {
		backgroundColor: 'gray'
	}
})

export function Badge({
	children,
	className,
	style,
	variant
}: PropsWithChildren<IBadge>) {
	return (
		<span
			className={badge({
				backgroundColor: variant as 'low' | 'medium' | 'high',
				className
			})}
			style={style}
		>
			{children}
		</span>
	)
}
