import { useEffect, useState } from "react"
import { toast } from "react-toastify";
import { useUserStore } from "../store/user";
import { config } from '../config';

const { apiUrl } = config;

const usePets = () => {
    const [petData, setPetData] = useState({})
    const {addLostPets, removeLostPets, getLostPets, lostPets} = useUserStore()

    const deletePet = async (id) => {
        const response = await toast.promise(
            fetch(`${apiUrl}/pets/${id}`, {
                method: 'DELETE',
                headers: {
                    Authorization: `Bearer ${JSON.parse(localStorage.getItem('petpal_token'))}`
                }
            }),
            {
                pending: 'Eliminando...'
            }
        )
        if(!response.ok) return toast.error('No se pudo eliminar...')
        toast.success('Mascota Eliminada')
        const result = response.json()
        location.reload()
        return result
    }
    const getPetData = async(id) => {
        try {
            const response = await fetch(`${apiUrl}/pets/${id}`)
            const result = await response.json()
            setPetData(result)
        } catch (error) {
            throw new Error(error.message)
        }
    }
    useEffect(() => {
        getLostPets()
    }, [])
    

  return {
    deletePet,
    petData,
    getPetData,
    addLostPets,
    removeLostPets,
    lostPets
  }
}

export default usePets
