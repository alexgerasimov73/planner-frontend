import { TASK_URL } from '@/constants/common.constants'

import type { ITaskResponse, TTaskFormState } from '@/types/task.types'

import { axiosWithAuth } from '@/api/interceptors'

export const taskService = {
	async getTasks() {
		return await axiosWithAuth.get<ITaskResponse[]>(TASK_URL)
	},
	async createTask(data: TTaskFormState) {
		return await axiosWithAuth.post(TASK_URL, data)
	},
	async updateTask(id: string, data: TTaskFormState) {
		return await axiosWithAuth.put(`${TASK_URL}/${id}`, data)
	},
	async deleteTask(id: string) {
		return await axiosWithAuth.delete(`${TASK_URL}/${id}`)
	}
}
