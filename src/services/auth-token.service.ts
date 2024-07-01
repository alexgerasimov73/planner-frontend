import Cookies from 'js-cookie'

export enum EnumTokens {
	'ACCESS_TOKEN' = 'accessToken',
	'REFRESH_TOKEN' = 'refreshToken'
}

export const getAccessToken = () => {
	return Cookies.get(EnumTokens.ACCESS_TOKEN) || null
}

export const saveTokenStorage = (accessToken: string) => {
	Cookies.set(EnumTokens.ACCESS_TOKEN, accessToken, {
		domain: process.env.CLIENT_DOMAIN,
		sameSite: 'strict',
		expires: 1
	})
}

export const removeTokenFromStorage = () => {
	Cookies.remove(EnumTokens.ACCESS_TOKEN)
}
