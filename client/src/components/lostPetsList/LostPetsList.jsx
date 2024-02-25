import React from 'react'
import { useUserStore } from '../../store/user'
import { PetCard } from '../petCard/PetCard'

const LostPetsList = () => {
    const lostPets = useUserStore((state) => state.lostPets)
    
  return (
    <>
        <div className='container m-auto flex justify-center items-center'>
            {
                lostPets.map(pet => (
                    <PetCard 
                        key={pet.id}
                        petId={pet.id}/>
                ))
            }
        </div>
    </>
  )
}

export default LostPetsList