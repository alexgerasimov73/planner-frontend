/** @type {import('next').NextConfig} */
const nextConfig = {
	// The next row (output: 'export') must be removed because static export doesn't allow the app to work properly.
	// Middleware, redirects, etc. are disabled with output export.
	// This is enabled for demonstration on free test servers.
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
