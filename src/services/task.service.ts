import type { ITaskResponse, TTaskFormState } from '@/types/task.types'

import { axiosWithAuth } from '@/api/interceptors'

const TASK_URL = '/user/tasks'

export const taskService = {
	async getTasks() {
		const response = await axiosWithAuth.get<ITaskResponse[]>(TASK_URL)
		return response
	},
	async createTask(data: TTaskFormState) {
		const response = await axiosWithAuth.post(TASK_URL, data)
		return response
	},
	async updateTask(id: string, data: TTaskFormState) {
		const response = await axiosWithAuth.put(`${TASK_URL}/${id}`, data)
		return response
	},
	async deleteTask(id: string) {
		const response = await axiosWithAuth.delete(`${TASK_URL}/${id}`)
		return response
	}
}
