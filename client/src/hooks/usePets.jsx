import { useEffect, useState } from "react"
import { toast } from "react-toastify";

export const usePets = () => {
    const [petData, setPetData] = useState({})

    const deletePet = async (id) => {
        const response = await toast.promise(
            fetch(`${import.meta.env.VITE_API_URL}/pets/${id}`, {
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
            const response = await fetch(`${import.meta.env.VITE_API_URL}/pets/${id}`)
            const result = await response.json()
            setPetData(result)
        } catch (error) {
            throw new Error(error.message)
        }
    }

  return {
    deletePet,
    petData,
    getPetData
  }
}

export default usePets