import React, { useCallback, useEffect, useMemo } from 'react'
import { useUserStore } from '../../store/user'
import { PetCard } from '../petCard/PetCard'

const LostPetsList = () => {
    
    const {lostPets, getLostPets} = useUserStore()
    useMemo(
      () => {
        getLostPets
      },
      [lostPets]
    )
    // (() => getLostPets, [lostPets])
    useEffect(()=>{
        getLostPets()
    },[lostPets])
  return (
    <>
        <div className="flex flex-row gap-5 overflow-auto snap-mandatory snap-x justify-start items-center w-full p-5 [-webkit-scrollbar]:none ">
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