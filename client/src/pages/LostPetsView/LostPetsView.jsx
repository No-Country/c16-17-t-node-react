import React from 'react'
import LostPetsList from '../../components/lostPetsList/LostPetsList'
import usePets from '../../hooks/usePets'

export const LostPetsView = () => {
  
  return (
    <div className='m-auto mt-10 rounded-md p-5'>
        <h1>Últimas mascotas reportadas</h1>
        
        <LostPetsList />
    </div>
  )
}
