import { useEffect, useRef, useState } from 'react'

interface IUseLocalStorage<T> {
	readonly defaultValue: T
	readonly key: string
}

export const useLocalStorage = <T>({
	defaultValue,
	key
}: IUseLocalStorage<T>) => {
	const [type, setType] = useState<T>(defaultValue)
	const [isLoading, setIsLoading] = useState(true)
	const isMounted = useRef(false)

	useEffect(() => {
		try {
			const item = window.localStorage.getItem(key)
			if (item) {
				setType(JSON.parse(item))
			}
		} catch (error) {
			console.error(error)
		} finally {
			setIsLoading(false)
		}

		return () => {
			isMounted.current = false
		}
	}, [key])

	useEffect(() => {
		if (isMounted.current) {
			window.localStorage.setItem(key, JSON.stringify(type))
		} else {
			isMounted.current = true
		}
	}, [key, type])

	return { isLoading, type, setType }
}
