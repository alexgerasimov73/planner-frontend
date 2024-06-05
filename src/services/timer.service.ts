import {
	ITimerSessionResponse,
	TTimerRoundState,
	TTimerSessionState
} from '@/types/timer.types'

import { axiosWithAuth } from '@/api/interceptors'

const TIMER_URL = '/user/timer'

export const timerService = {
	async getTodaySession() {
		const response = await axiosWithAuth.get<ITimerSessionResponse>(
			`${TIMER_URL}/today`
		)
		return response
	},
	async createSessiion() {
		const response = await axiosWithAuth.post<ITimerSessionResponse>(TIMER_URL)
		return response
	},
	async updateSession(id: string, data: TTimerSessionState) {
		const response = await axiosWithAuth.put(`${TIMER_URL}/${id}`, data)
		return response
	},
	async deleteSession(id: string) {
		const response = await axiosWithAuth.delete(`${TIMER_URL}/${id}`)
		return response
	},
	async updateRound(id: string, data: TTimerRoundState) {
		const response = await axiosWithAuth.put(`${TIMER_URL}/round/${id}`, data)
		return response
	}
}
