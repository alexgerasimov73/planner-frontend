import dayjs, { type Dayjs } from 'dayjs'
import isSameOrAfter from 'dayjs/plugin/isSameOrAfter'
import isSameOrBefore from 'dayjs/plugin/isSameOrBefore'
import isoWeek from 'dayjs/plugin/isoWeek'
import weekOfYear from 'dayjs/plugin/weekOfYear'
import { Dispatch, SetStateAction } from 'react'

import type { ITaskResponse } from '@/types/task.types'

import { deepCloneObject, getDataForSelect } from '@/utils/common.utils'

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

export const initialTasks: Record<string, ITaskResponse[]> = {
	today: [],
	tomorrow: [],
	'on-this-week': [],
	'on-next-week': [],
	later: [],
	completed: []
}

export const categorizeTasks = (
	tasks: ReadonlyArray<ITaskResponse> | undefined
) => {
	const categorizedTasks = deepCloneObject(initialTasks)

	tasks?.forEach(task => {
		if (task.isCompleted) {
			categorizedTasks.completed.push(task)
		} else if (dayjs(task.createdAt).isSame(FILTERS.today, 'day')) {
			categorizedTasks.today.push(task)
		} else if (dayjs(task.createdAt).isSame(FILTERS.tomorrow, 'day')) {
			categorizedTasks.tomorrow.push(task)
		} else if (dayjs(task.createdAt).isSameOrBefore(FILTERS['on-this-week'])) {
			categorizedTasks['on-this-week'].push(task)
		} else if (dayjs(task.createdAt).isSameOrBefore(FILTERS['on-next-week'])) {
			categorizedTasks['on-next-week'].push(task)
		} else {
			categorizedTasks.later.push(task)
		}
	})

	return categorizedTasks
}

export const addTask =
	(
		column: string,
		setItems: Dispatch<SetStateAction<Record<string, ITaskResponse[]>>>,
		filterDate?: string
	) =>
	() =>
		setItems(prev => ({
			...prev,
			[column]: [
				...prev[column],
				{
					id: '',
					name: '',
					isCompleted: false,
					createdAt: filterDate
				}
			]
		}))

export const getFilteredDate = (value: string) =>
	FILTERS[value] ? FILTERS[value].format() : undefined

export const dataForTaskSelect = getDataForSelect(['high', 'medium', 'low'])
