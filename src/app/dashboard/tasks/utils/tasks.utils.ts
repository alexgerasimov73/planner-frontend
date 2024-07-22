import dayjs, { type Dayjs } from 'dayjs'
import isSameOrAfter from 'dayjs/plugin/isSameOrAfter'
import isSameOrBefore from 'dayjs/plugin/isSameOrBefore'
import isoWeek from 'dayjs/plugin/isoWeek'
import weekOfYear from 'dayjs/plugin/weekOfYear'
import { Dispatch, SetStateAction } from 'react'

import type { ITaskResponse } from '@/types/task.types'

import { getDataForSelect } from '@/utils/common.utils'

dayjs.extend(isoWeek)
dayjs.extend(weekOfYear)
dayjs.extend(isSameOrAfter)
dayjs.extend(isSameOrBefore)

export const FILTERS: Record<string, Dayjs> = {
	today: dayjs().startOf('day'),
	tomorrow: dayjs().add(1, 'day').startOf('day'),
	'on-this-week': dayjs().endOf('isoWeek'),
	'on-next-week': dayjs().add(1, 'week').startOf('day'),
	later: dayjs().add(2, 'week').startOf('day')
}

export const filterTasks = (
	value: string,
	tasks: ReadonlyArray<ITaskResponse> | undefined
) => {
	switch (value) {
		case 'today':
			return tasks?.filter(
				item =>
					dayjs(item.createdAt).isSame(FILTERS.today, 'day') &&
					!item.isCompleted
			)
		case 'tomorrow':
			return tasks?.filter(
				item =>
					dayjs(item.createdAt).isSame(FILTERS.tomorrow, 'day') &&
					!item.isCompleted
			)
		case 'on-this-week':
			return tasks?.filter(
				item =>
					!dayjs(item.createdAt).isSame(FILTERS.today, 'day') &&
					!dayjs(item.createdAt).isSame(FILTERS.tomorrow, 'day') &&
					dayjs(item.createdAt).isSameOrBefore(FILTERS['on-this-week']) &&
					!item.isCompleted
			)
		case 'on-next-week':
			return tasks?.filter(
				item =>
					!dayjs(item.createdAt).isSame(FILTERS.tomorrow, 'day') &&
					dayjs(item.createdAt).isAfter(FILTERS['on-this-week']) &&
					dayjs(item.createdAt).isSameOrBefore(FILTERS['on-next-week']) &&
					!item.isCompleted
			)
		case 'later':
			return tasks?.filter(
				item =>
					(dayjs(item.createdAt).isAfter(FILTERS['on-next-week']) ||
						!item.createdAt) &&
					!item.isCompleted
			)
		case 'completed':
			return tasks?.filter(task => task.isCompleted)

		default:
			return []
	}
}

export const addTask =
	(
		setItems: Dispatch<
			SetStateAction<ReadonlyArray<ITaskResponse> | undefined>
		>,
		filterDate?: string
	) =>
	() =>
		setItems(prev => {
			if (!prev) return

			return [
				...prev,
				{
					id: '',
					name: '',
					isCompleted: false,
					createdAt: filterDate
				}
			]
		})

export const getFilteredDate = (value: string) =>
	FILTERS[value] ? FILTERS[value].format() : undefined

export const dataForTaskSelect = getDataForSelect(['high', 'medium', 'low'])
