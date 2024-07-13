import {
	TIME_BLOCKS_URL,
	UPDATE_TIME_BLOCKS_ORDER_URL
} from '@/constants/common.constants'

import type {
	ITimeBlockResponse,
	TTimeBlockFormState
} from '@/types/time-block.types'

import { axiosWithAuth } from '@/api/interceptors'

export const timeBlockService = {
	async getTimeBlocks() {
		return await axiosWithAuth.get<ITimeBlockResponse[]>(TIME_BLOCKS_URL)
	},
	async createTimeBlock(data: TTimeBlockFormState) {
		return await axiosWithAuth.post(TIME_BLOCKS_URL, data)
	},
	async updateTimeBlock(id: string, data: TTimeBlockFormState) {
		return await axiosWithAuth.put(`${TIME_BLOCKS_URL}/${id}`, data)
	},
	async deleteTimeBlock(id: string) {
		return await axiosWithAuth.delete(`${TIME_BLOCKS_URL}/${id}`)
	},
	async updateOrderTimeBlocks(ids: string[]) {
		return await axiosWithAuth.put(UPDATE_TIME_BLOCKS_ORDER_URL, { ids })
	}
}
