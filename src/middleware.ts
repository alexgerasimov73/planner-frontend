import { NextRequest, NextResponse } from 'next/server'

import { DASHBOARD_PAGES } from './config/pages-url.config'
import { EnumTokens } from './services/auth-token.service'

export async function middleware(request: NextRequest) {
	const { cookies, url } = request
	console.log('cookies', cookies)
	console.log('url', url)

	const refreshToken = cookies.get(EnumTokens.REFRESH_TOKEN)?.value

	const isAuthPage = url.includes(DASHBOARD_PAGES.AUTH)

	console.log('refreshToken', refreshToken)
	if (isAuthPage && refreshToken) {
		console.log('I must be here!')

		return NextResponse.redirect(new URL(DASHBOARD_PAGES.HOME, url))
	}

	console.log('isAuthPage', isAuthPage)
	if (isAuthPage) return NextResponse.next()

	console.log('!refreshToken')
	if (!refreshToken)
		return NextResponse.redirect(new URL(DASHBOARD_PAGES.AUTH, url))

	console.log('NextResponse')
	return NextResponse.next()
}

export const config = {
	matcher: ['/dashboard/:path*', '/auth/:path']
}
