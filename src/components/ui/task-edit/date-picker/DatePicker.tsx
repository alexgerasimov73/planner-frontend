import cn from 'clsx'
import dayjs from 'dayjs'
import LocalizedFormat from 'dayjs/plugin/localizedFormat'
import { X } from 'lucide-react'
import { memo, useRef, useState } from 'react'
import { DayPicker, type SelectSingleEventHandler } from 'react-day-picker'
import 'react-day-picker/dist/style.css'

import { useOutsideClick } from '@/hooks/useOutsideClick'

import './DatePicker.scss'
import { formatCaption } from './DatePickerCaption'

dayjs.extend(LocalizedFormat)

interface IDatePicker {
	readonly position?: 'left' | 'right'
	readonly value: string
	readonly onChange: (value: string) => void
}

export const DatePicker = memo(
	({ position = 'right', value, onChange }: IDatePicker) => {
		const [selected, setSelected] = useState<Date>()
		const [isOpened, setIsOpened] = useState(false)
		const ref = useRef(null)

		const handleCloseSelect = () => setIsOpened(false)

		useOutsideClick(ref, handleCloseSelect, isOpened)

		const handleDaySelect: SelectSingleEventHandler = date => {
			const ISODate = date?.toISOString()

			setSelected(date)

			if (ISODate) {
				onChange(ISODate)
				handleCloseSelect()
			} else {
				onChange('')
			}
		}

		const handleToggleShow = () => setIsOpened(isOpened => !isOpened)

		const handleReset = () => onChange('')

		return (
			<div
				className='relative'
				ref={ref}
			>
				<button
					className='pr-4'
					onClick={handleToggleShow}
				>
					{value ? dayjs(value).format('LL') : 'Click for select'}
				</button>

				{value && (
					<button
						className='absolute top-2 -right-2 opacity-30 transition-opacity hover:opacity-100'
						onClick={handleReset}
					>
						<X size={14} />
					</button>
				)}

				{isOpened && (
					<div
						className={cn(
							'absolute top-calc p-2.5 shadow rounded-lg bg-white z-10 slide',
							position === 'left' ? '-left-4' : '-right-4'
						)}
					>
						<DayPicker
							defaultMonth={selected}
							initialFocus={isOpened}
							formatters={{ formatCaption }}
							fromYear={2024}
							mode='single'
							selected={selected}
							toYear={2054}
							weekStartsOn={1}
							onSelect={handleDaySelect}
						/>
					</div>
				)}
			</div>
		)
	}
)
