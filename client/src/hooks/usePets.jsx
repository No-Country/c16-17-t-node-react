import { useEffect, useState } from "react"
import { toast } from "react-toastify";
import { useUserStore } from "../store/user";
import { config } from '../config';

const { apiUrl } = config;

const usePets = () => {
    const [petData, setPetData] = useState({})
    const {addLostPets, removeLostPets, getLostPets, lostPets, token} = useUserStore()

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
    
    const editPetData = async (data, id) => {
        const response = await toast.promise(fetch(`${apiUrl}/pets/${id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${token}`
            },
            body: JSON.stringify(data)
        }),
        {
            pending: 'Actualizando datos...'
        })
        if(!response.ok){
            toast.error('Ocurrió un error al actualizar..')
            return
        } 
        toast.success('Datos actualizados ✅')
        const result = response.json()
    }
  return {
    deletePet,
    petData,
    getPetData,
    addLostPets,
    removeLostPets,
    lostPets,
    editPetData
  }
}

export default usePets
