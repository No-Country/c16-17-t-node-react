import React from 'react'
import { useUserStore } from '../../store/user'
import { PetCard } from '../petCard/PetCard'

const LostPetsList = () => {
    const lostPets = useUserStore((state) => state.lostPets)
    
  return (
    <>
        <h2 className='text-center font-bold text-4xl'>Lista de mascotas perdidas</h2>
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