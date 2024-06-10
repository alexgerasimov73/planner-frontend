import { Dispatch, SetStateAction, useEffect, useRef, useState } from 'react'

type TOut = {
	readonly isShow: boolean
	readonly ref: any
	readonly setIsShow: Dispatch<SetStateAction<boolean>>
}

export function useOutside(initialVisible: boolean): TOut {
	const [isShow, setIsShow] = useState(initialVisible)
	const ref = useRef<HTMLElement>(null)

	const handleClickOutside = (event: any) => {
		if (ref.current && !ref.current.contains(event.target)) {
			setIsShow(false)
		}
	}

	useEffect(() => {
		document.addEventListener('click', handleClickOutside, true)

		return () => document.removeEventListener('click', handleClickOutside, true)
	}, [])

	return { isShow, ref, setIsShow }
}
