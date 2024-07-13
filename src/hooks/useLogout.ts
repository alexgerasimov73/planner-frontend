import { useMutation } from '@tanstack/react-query'
import { useRouter } from 'next/navigation'

import { DASHBOARD_PAGES } from '@/config/pages-url.config'

import { authService } from '@/services/auth.service'

export const useLogout = () => {
	const { push } = useRouter()

	const { mutate: logout } = useMutation({
		mutationKey: ['logout'],
		mutationFn: () => authService.logout(),
		onSuccess: () => push(DASHBOARD_PAGES.AUTH)
	})

	return logout
}
