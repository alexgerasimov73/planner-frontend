import { Dispatch, SetStateAction, useEffect, useRef, useState } from 'react'

interface IUseLocalStorage<T> {
	readonly defaultValue: T
	readonly key: string
}

export function useLocalStorage<T>({
	defaultValue,
	key
}: IUseLocalStorage<T>): [boolean, T, Dispatch<SetStateAction<T>>] {
	const [value, setValue] = useState<T>(defaultValue)
	const [isLoading, setIsLoading] = useState(true)
	const isMounted = useRef(false)

	useEffect(() => {
		try {
			const item = window.localStorage.getItem(key)
			if (item) {
				setValue(JSON.parse(item))
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
			window.localStorage.setItem(key, JSON.stringify(value))
		} else {
			isMounted.current = true
		}
	}, [key, value])

	return [isLoading, value, setValue]
}
