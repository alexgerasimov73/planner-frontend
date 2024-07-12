/** @type {import('next').NextConfig} */
const nextConfig = {
	output: 'export',
	env: {
		SERVER_URL: process.env.SERVER_URL,
		CLIENT_DOMAIN: process.env.CLIENT_DOMAIN
	},
	async redirects() {
		return [
			{
				source: '/',
				destination: '/dashboard',
				permanent: true
			}
		]
	}
}

export default nextConfig
