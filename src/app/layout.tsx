import type { Metadata } from 'next'
import { Oswald } from 'next/font/google'
import { Toaster } from 'sonner'

import { SITE_NAME } from '@/constants/seo.constants'

import './globals.scss'
import { Providers } from './providers'

const zen = Oswald({
	subsets: ['latin'],
	weight: ['300', '400', '500', '700'],
	display: 'swap',
	variable: '--font-zen',
	style: ['normal']
})

export const metadata: Metadata = {
	title: {
		default: SITE_NAME,
		template: `%s | ${SITE_NAME}`
	},
	description: 'The best planner ever ;)'
}

export default function RootLayout({
	children
}: Readonly<{
	children: React.ReactNode
}>) {
	return (
		<html lang='en'>
			<body className={zen.className}>
				<Providers>
					{children}
					<Toaster
						duration={1500}
						position='top-right'
						richColors
						theme='light'
					/>
				</Providers>
			</body>
		</html>
	)
}
