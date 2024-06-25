import debounce from 'lodash.debounce'
import { useCallback, useEffect } from 'react'
import { UseFormWatch } from 'react-hook-form'

import { TTaskFormState } from '@/types/task.types'

import { useCreateTask } from './useCreateTask'
import { useUpdateTask } from './useUpdateTask'

interface IUseTaskDebounce {
	readonly itemId: string
	readonly watch: UseFormWatch<TTaskFormState>
}

export function useTaskDebounce({ itemId, watch }: IUseTaskDebounce) {
	const { createTask } = useCreateTask()
	const { updateTask } = useUpdateTask()

	const debounceCreateTask = useCallback(
		debounce((formatData: TTaskFormState) => {
			createTask(formatData)
		}, 400),
		[debounce]
	)
	const debounceUpdateTask = useCallback(
		debounce((formatData: TTaskFormState) => {
			updateTask({ id: itemId, data: formatData })
		}, 400),
		[debounce]
	)

	useEffect(() => {
		const { unsubscribe } = watch(formData => {
			if (itemId) {
				debounceUpdateTask({
					...formData,
					priority: formData.priority || undefined
				})
			} else {
				debounceCreateTask(formData)
			}
		})

		return () => unsubscribe()
	}, [debounceCreateTask, debounceUpdateTask, watch()])
}
