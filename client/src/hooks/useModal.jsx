import { useEffect, useState } from "react"

export function useModal(){
    const [isVisible, setIsVisible] = useState(false)
    const [active, setActive] = useState(false)

    const closeModal = () =>{
		setTimeout(() => {
			setActive(false);
            setIsVisible(false);
		}, 100);
    }

    const handleModalActive = () => {
        setActive(!active);
    }

    return {
        closeModal,
        active,
        setActive,
        handleModalActive,
        isVisible,
        setIsVisible
    }
}