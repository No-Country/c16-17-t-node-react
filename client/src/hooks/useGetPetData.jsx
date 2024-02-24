import { useState, useEffect } from 'react'

export const useGetPetData = (id) => {
    
    const [petData, setPetData] = useState({})
    
    useEffect(() => {
        const getPetData = async(id) => {
            try {
                const response = await fetch(`https://c16-17-t-node-react.vercel.app/pets/${id}`)
                const result = await response.json()
                setPetData(result)
            } catch (error) {
                throw new Error(error.message)
            }
        }
        getPetData(id)
    }, [])
    
    return{
        petData
    }
}