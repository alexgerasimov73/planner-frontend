import {
	type Dispatch,
	type SetStateAction,
	useCallback,
	useEffect,
	useMemo,
	useRef,
	useState
} from 'react'

interface IOutside {
	readonly isShow: boolean
	readonly ref: any
	readonly setIsShow: Dispatch<SetStateAction<boolean>>
}

export const useOutside = (initialVisible: boolean): IOutside => {
	const [isShow, setIsShow] = useState(initialVisible)
	const ref = useRef<HTMLElement>(null)

	const handleClickOutside = useCallback((event: any) => {
		if (ref.current && !ref.current.contains(event.target)) {
			setIsShow(false)
		}
	}, [])

	useEffect(() => {
		document.addEventListener('click', handleClickOutside, true)

		return () => document.removeEventListener('click', handleClickOutside, true)
	}, [handleClickOutside])

	return useMemo(() => ({ isShow, ref, setIsShow }), [isShow])
}
