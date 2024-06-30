import { useEffect, useState } from 'react'

import { useProfile } from '@/hooks/useProfile'

export function useLoadSettings() {
	const { data } = useProfile()
	const [breakInterval, setBreakInterval] = useState(10)
	const [workInterval, setWorkInterval] = useState(50)

	useEffect(() => {
		if (!data?.user.breakInterval || !data.user.workInterval) return
		setBreakInterval(data.user.breakInterval)
		setWorkInterval(data.user.workInterval)
	}, [data?.user.breakInterval, data?.user.workInterval])

	return { breakInterval, workInterval }
}
