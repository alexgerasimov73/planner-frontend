import { useProfile } from '@/hooks/useProfile'

export const useLoadSettings = () => {
	const { data } = useProfile()

	const breakInterval = data?.user.breakInterval || 10
	const workInterval = data?.user.workInterval || 50

	return { breakInterval, workInterval }
}
