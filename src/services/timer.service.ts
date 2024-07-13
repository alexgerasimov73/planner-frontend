import {
	TIMER_ROUND_URL,
	TIMER_TODAY_URL,
	TIMER_URL
} from '@/constants/common.constants'

import type {
	ITimerSessionResponse,
	TTimerRoundState,
	TTimerSessionState
} from '@/types/timer.types'

import { axiosWithAuth } from '@/api/interceptors'

export const timerService = {
	async getTodaySession() {
		return await axiosWithAuth.get<ITimerSessionResponse>(TIMER_TODAY_URL)
	},
	async createSessiion() {
		return await axiosWithAuth.post<ITimerSessionResponse>(TIMER_URL)
	},
	async updateSession(id: string, data: TTimerSessionState) {
		return await axiosWithAuth.put(`${TIMER_URL}/${id}`, data)
	},
	async deleteSession(id: string) {
		return await axiosWithAuth.delete(`${TIMER_URL}/${id}`)
	},
	async updateRound(id: string, data: TTimerRoundState) {
		return await axiosWithAuth.put(`${TIMER_ROUND_URL}/${id}`, data)
	}
}
