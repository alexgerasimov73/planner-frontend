import cn from 'clsx'
import { X } from 'lucide-react'

import { useOutside } from '@/hooks/useOutside'

import { Badge } from '../Badge'

export interface IOption {
	readonly label: string
	readonly value: string
}

interface ISingleSelect {
	readonly data: IOption[]
	readonly isColorSelected?: boolean
	readonly value: string
	readonly onChange: (value: string) => void
}

export function SingleSelect({
	data,
	isColorSelected,
	value,
	onChange
}: ISingleSelect) {
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
						variant={value}
						style={isColorSelected ? { backgroundColor: value } : {}}
					>
						{getValue()}
					</Badge>
				) : (
					<Badge>Click for select</Badge>
				)}
			</button>

			{value && (
				<button
					className='absolute top-0 right-0 opacity-30 hover:opacity-100 transition-opacity'
					onClick={handleValueClick}
				>
					<X size={14} />
				</button>
			)}

			{isShow && (
				<div
					className={cn(
						'absolute w-full p-2.5 left-0 slide bg-primary z-10 shadow rounded-lg'
					)}
					style={{
						top: 'calc(100% + .5rem)'
					}}
				>
					{data.map(item => (
						<button
							key={item.value}
							onClick={handleItemClick(item)}
							className='block mb-4 last:mb-0 capitalize rounded-lg'
							style={
								isColorSelected
									? {
											backgroundColor: item.value
										}
									: {}
							}
						>
							<Badge variant={item.value}>{item.label}</Badge>
						</button>
					))}
				</div>
			)}
		</div>
	)
}
