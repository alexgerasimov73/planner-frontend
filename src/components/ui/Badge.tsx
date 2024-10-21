import { CSSProperties, PropsWithChildren } from 'react'
import { tv } from 'tailwind-variants'

interface Props {
	readonly className?: string
	readonly style?: CSSProperties
	readonly variant?: string
}

const badge = tv({
	base: 'w-max py-1 px-2 rounded-lg text-sm text-text transition',
	variants: {
		backgroundColor: {
			gray: 'bg-secondary/15',
			high: 'bg-pink',
			medium: 'bg-yellow',
			low: 'bg-lime'
		}
	},
	defaultVariants: {
		backgroundColor: 'gray'
	}
})

export const Badge = ({
	children,
	className,
	style,
	variant
}: PropsWithChildren<Props>) => (
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
