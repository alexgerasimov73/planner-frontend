import { TIME_BLOCKS_URL } from '@/constants/common.constants'

import type {
	ITimeBlockResponse,
	TTimeBlockFormState
} from '@/types/time-block.types'

import { axiosWithAuth } from '@/api/interceptors'

export const timeBlockService = {
	async getTimeBlocks() {
		const response =
			await axiosWithAuth.get<ITimeBlockResponse[]>(TIME_BLOCKS_URL)
		return response
	},
	async createTimeBlock(data: TTimeBlockFormState) {
		const response = await axiosWithAuth.post(TIME_BLOCKS_URL, data)
		return response
	},
	async updateTimeBlock(id: string, data: TTimeBlockFormState) {
		const response = await axiosWithAuth.put(`${TIME_BLOCKS_URL}/${id}`, data)
		return response
	},
	async deleteTimeBlock(id: string) {
		const response = await axiosWithAuth.delete(`${TIME_BLOCKS_URL}/${id}`)
		return response
	},
	async updateOrderTimeBlocks(ids: string[]) {
		const response = await axiosWithAuth.put(
			`${TIME_BLOCKS_URL}/update-order`,
			{ ids }
		)
		return response
	}
}
