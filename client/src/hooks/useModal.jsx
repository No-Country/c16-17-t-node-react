import { useEffect, useState } from "react"
import { toast } from "react-toastify";
import {config} from '../config'
import { useParams } from "react-router-dom";

export function useModal(){
    const {apiUrl} = config
    const [isVisible, setIsVisible] = useState(false)
    const [active, setActive] = useState(false)
    const params = useParams()

    const closeModal = () =>{
		setTimeout(() => {
			setActive(false);
            setIsVisible(false);
		}, 100);
    }

    const handleModalActive = () => {
        setActive(!active);
    }
    const handleSendMail = async (e, closeModal) => {
		e.preventDefault();
		const formData = new FormData(e.target);
		let heroName = formData.get('heroName')
        let heroTel = formData.get('heroTel')
        let heroEmail = formData.get('heroEmail')
        let heroMsg = formData.get('heroMsg')
        const heroData = {
            heroName: heroName,
            telephone: heroTel,
            email: heroEmail,
            description: heroMsg,
        }
        const response = await fetch(`${apiUrl}/pets/report/${params.id}`, {
            method: 'POST',
            headers: {
                'Content-Type' : 'application/json'
            },
            body: JSON.stringify(heroData)
        })
        if(response.ok){
            toast.success('Mensaje Enviado')
        }
        const result = await response.json()
        closeModal()
        return result
	};

    return {
        closeModal,
        active,
        setActive,
        handleModalActive,
        isVisible,
        setIsVisible,
        handleSendMail
    }
}