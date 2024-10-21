import Cookies from 'js-cookie'

export const enum EnumTokens {
	ACCESS_TOKEN = 'accessToken',
	REFRESH_TOKEN = 'refreshToken'
}

export const getAccessToken = () => {
	return Cookies.get(EnumTokens.ACCESS_TOKEN) || null
}

export const saveTokenStorage = (accessToken: string) => {
	Cookies.set(EnumTokens.ACCESS_TOKEN, accessToken, {
		// The correct settings for production are commented out below.
		// domain: process.env.CLIENT_DOMAIN,
		// sameSite: 'lax',
		// These settings are for demonstration with allowed third-source cookies.
		sameSite: 'None',
		secure: true,
		expires: 1
	})
}

export const removeTokenFromStorage = () => {
	Cookies.remove(EnumTokens.ACCESS_TOKEN)
}
