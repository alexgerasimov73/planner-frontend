import { LogOut } from 'lucide-react'

import { useLogout } from '@/hooks/useLogout'

export const LogoutButton = () => {
	const logout = useLogout()

	const handleLogout = () => logout()

	return (
		<button
			className='flex items-center gap-2.5 mb-10 ml-8 text-text opacity-70 transition-opacity duration-300 hover:opacity-100'
			onClick={handleLogout}
		>
			<LogOut size={20} /> <span>Logout</span>
		</button>
	)
}
