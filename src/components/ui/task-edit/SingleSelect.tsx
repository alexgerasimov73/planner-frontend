import cn from 'clsx'
import { X } from 'lucide-react'

import type { IOption } from '@/types/common.types'

import { useOutside } from '@/hooks/useOutside'

import { Badge } from '../Badge'

interface ISingleSelect {
	readonly data: IOption[]
	readonly isColorSelected?: boolean
	readonly value: string
	readonly onChange: (value: string) => void
}

export const SingleSelect = ({
	data,
	isColorSelected,
	value,
	onChange
}: ISingleSelect) => {
	const { isShow, ref, setIsShow } = useOutside(false)

	const getValue = () => data.find(item => item.value === value)?.value

	const handleSelectClick = (e: React.MouseEvent<HTMLButtonElement>) => {
		e.preventDefault()
		setIsShow(!isShow)
	}

	const handleValueClick = (e: React.MouseEvent<HTMLButtonElement>) => {
		e.preventDefault()
		onChange('')
	}

	const handleItemClick =
		(item: IOption) => (e: React.MouseEvent<HTMLButtonElement>) => {
			e.preventDefault()
			onChange(item.value)
			setIsShow(false)
		}

	return (
		<div
			className={cn('relative min-w-36', { 'w-max': isColorSelected })}
			ref={ref}
		>
			<button onClick={handleSelectClick}>
				{getValue() ? (
					<Badge
						className='capitalize'
						style={isColorSelected ? { backgroundColor: value } : {}}
						variant={value}
					>
						{getValue()}
					</Badge>
				) : (
					<Badge>Click for select</Badge>
				)}
			</button>

			{value && (
				<button
					className='absolute top-2 right-6 opacity-30 transition-opacity hover:opacity-100'
					onClick={handleValueClick}
				>
					<X size={14} />
				</button>
			)}

			{isShow && (
				<div className='absolute left-0 top-calc w-full p-2.5 shadow rounded-lg bg-white z-10 slide'>
					{data.map(item => (
						<button
							key={item.value}
							className='block mb-4 capitalize rounded-lg last:mb-0'
							style={
								isColorSelected
									? {
											backgroundColor: item.value
										}
									: {}
							}
							onClick={handleItemClick(item)}
						>
							<Badge variant={item.value}>{item.label}</Badge>
						</button>
					))}
				</div>
			)}
		</div>
	)
}
