import cn from 'clsx'
import Image from 'next/image'

import { PIcon } from '@/assets/icons'

interface ILogo {
	readonly className?: string
	readonly isPrimaryColor?: boolean
}

export function Logo({ className, isPrimaryColor }: ILogo) {
	return (
		<div
			className={cn(
				'relative flex items-baseline p-layout pointer-events-none',
				className
			)}
		>
			<Image
				className='w-9'
				src={PIcon}
				alt='P'
			/>
			<span
				className={cn(
					'absolute top-7 left-16 text-2xl font-bold tracking-widest',
					isPrimaryColor ? 'text-primary' : 'text-white'
				)}
			>
				lanner
			</span>
		</div>
	)
}
