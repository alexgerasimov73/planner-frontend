import {
	ACCESS_TOKEN,
	LAUNCH_SERVER,
	LOGOUT
} from '@/constants/common.constants'

import type { IAuthForm, IAuthResponse } from '@/types/auth.types'

import { DASHBOARD_PAGES } from '@/config/pages-url.config'

import { axiosClassic } from '@/api/interceptors'

import { removeTokenFromStorage, saveTokenStorage } from './auth-token.service'
import { TypeForm } from '@/app/auth/hooks/useAuth'

export const authService = {
	async main(type: TypeForm, data: IAuthForm) {
		const response = await axiosClassic.post<IAuthResponse>(
			`${DASHBOARD_PAGES.AUTH}/${type}`,
			data
		)

		if (response.data.accessToken) saveTokenStorage(response.data.accessToken)

		return response
	},
	async getNewTokens() {
		const response = await axiosClassic.post<IAuthResponse>(ACCESS_TOKEN)
		if (response.data.accessToken) saveTokenStorage(response.data.accessToken)

		return response
	},
	async logout() {
		const response = await axiosClassic.post<boolean>(LOGOUT)
		if (response.data) removeTokenFromStorage()

		return response
	},
	async launchServer() {
		return await axiosClassic.get<string>(LAUNCH_SERVER)
	}
}
