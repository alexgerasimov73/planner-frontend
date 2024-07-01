import cn from 'clsx'
import dayjs from 'dayjs'
import LocalizedFormat from 'dayjs/plugin/localizedFormat'
import { X } from 'lucide-react'
import { useState } from 'react'
import { DayPicker, type SelectSingleEventHandler } from 'react-day-picker'
import 'react-day-picker/dist/style.css'

import { useOutside } from '@/hooks/useOutside'

import './DatePicker.scss'
import { formatCaption } from './DatePickerCaption'

dayjs.extend(LocalizedFormat)

interface IDatePicker {
	readonly position?: 'left' | 'right'
	readonly value: string
	readonly onChange: (value: string) => void
}

export function DatePicker({
	position = 'right',
	value,
	onChange
}: IDatePicker) {
	const [selected, setSelected] = useState<Date>()
	const { isShow, ref, setIsShow } = useOutside(false)

	const handleDaySelect: SelectSingleEventHandler = date => {
		const ISODate = date?.toISOString()

		setSelected(date)

		if (ISODate) {
			onChange(ISODate)
			setIsShow(false)
		} else {
			onChange('')
		}
	}

	return (
		<div
			className='relative'
			ref={ref}
		>
			<button
				className='pr-4'
				onClick={() => setIsShow(!isShow)}
			>
				{value ? dayjs(value).format('LL') : 'Click for select'}
			</button>
			{value && (
				<button
					className='absolute top-2 -right-2 opacity-30 hover:opacity-100 transition-opacity'
					onClick={() => onChange('')}
				>
					<X size={14} />
				</button>
			)}
			{isShow && (
				<div
					className={cn(
						'absolute p-2.5 slide bg-white z-10 shadow rounded-lg',
						position === 'left' ? '-left-4' : ' -right-4'
					)}
					style={{
						top: 'calc(100% + .7rem)'
					}}
				>
					<DayPicker
						defaultMonth={selected}
						initialFocus={isShow}
						formatters={{ formatCaption }}
						fromYear={2024}
						toYear={2054}
						mode='single'
						selected={selected}
						weekStartsOn={1}
						onSelect={handleDaySelect}
					/>
				</div>
			)}
		</div>
	)
}
