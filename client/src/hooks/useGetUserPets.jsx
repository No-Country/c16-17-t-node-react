import { useState, useEffect } from 'react'
import { config } from '../config';

const { apiUrl } = config;

export const useGetUserPets = (id) => {
    const [pets, setPets] = useState([])
    const [isLoading, setIsLoading] = useState(false)

    const getPets = async (id) => {
        setIsLoading(true)
        try{
            const response = await fetch(`${apiUrl}/users/${id}`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${JSON.parse(localStorage.getItem('petpal_token'))}`
                }
            })
            const result = await response.json()
            setPets(result.pets)
        }catch(error){
            throw new Error('Error en el servidor')
        }finally{
            setIsLoading(false)
        }
    }
    useEffect(() => {
        getPets(id)
    },[id])

    return {
        pets,
        isLoading
    }
}
