import {
	type Dispatch,
	type SetStateAction,
	useEffect,
	useRef,
	useState
} from 'react'

interface IOutside {
	readonly isShow: boolean
	readonly ref: any
	readonly setIsShow: Dispatch<SetStateAction<boolean>>
}

export function useOutside(initialVisible: boolean): IOutside {
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
