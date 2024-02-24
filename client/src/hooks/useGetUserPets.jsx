import {useState, useEffect} from 'react'

export const useGetUserPets = (id) => {
    const [pets, setPets] = useState([])
    const getPets = async (id) => {
        const response = await fetch(`${import.meta.env.VITE_API_URL}/users/${id}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${JSON.parse(localStorage.getItem('petpal_token'))}` 
            }
        })
        const result = await response.json()
        setPets(result.pets)
    }
    useEffect(() => {
        getPets(id)
    },[])
    return {
        pets
    }
}
