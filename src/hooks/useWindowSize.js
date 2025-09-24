import { useState, useEffect } from 'react'

const useWindowSize = () => {
	const [windowSize, setWindowSize] = useState({
		width: typeof window !== 'undefined' ? window.innerWidth : 0,
		height: typeof window !== 'undefined' ? window.innerHeight : 0
	})

	useEffect(() => {
		function updateSize() {
			setWindowSize({ 
				width: window.innerWidth, 
				height: window.innerHeight 
			})
		}

		// Adding debounce so stuff doesn’t freak out
		let timeoutId = null
		const debouncedUpdateSize = () => {
			clearTimeout(timeoutId)
			timeoutId = setTimeout(updateSize, 100)
		}

		window.addEventListener('resize', debouncedUpdateSize)
		updateSize() // Call immediately

		return () => {
			window.removeEventListener('resize', debouncedUpdateSize)
			clearTimeout(timeoutId)
		}
	}, [])

	// Quick helpers for the common breakpoints we use
	const isMobile = windowSize.width < 768
	const isTablet = windowSize.width >= 768 && windowSize.width < 1024
	const isDesktop = windowSize.width >= 1024
	const isSmallMobile = windowSize.width < 480

	return {
		windowSize,
		width: windowSize.width,
		height: windowSize.height,
		isMobile,
		isTablet,
		isDesktop,
		isSmallMobile
	}
}

export default useWindowSize