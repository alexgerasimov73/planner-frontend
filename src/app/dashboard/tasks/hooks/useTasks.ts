import { useQuery } from '@tanstack/react-query'
import { useEffect, useState } from 'react'

import type { ITaskResponse } from '@/types/task.types'

import { categorizeTasks, initialTasks } from '../utils/tasks.utils'

import { taskService } from '@/services/task.service'

export const useTasks = () => {
	const { data } = useQuery({
		queryKey: ['tasks'],
		queryFn: () => taskService.getTasks()
	})

	const [items, setItems] =
		useState<Record<string, ITaskResponse[]>>(initialTasks)

	useEffect(() => {
		const newData = categorizeTasks(data?.data)
		setItems(newData)
	}, [data?.data])
	console.log('items', items)

	return { items, setItems }
}
