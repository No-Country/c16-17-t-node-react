import React from 'react'
import LostPetsList from '../../components/lostPetsList/LostPetsList'
export const LostPetsView = () => {

  return (
    <div className='m-auto mt-10 rounded-md p-5'>
        <h1 className='text-center font-bold text-3xl min-h-2/4 mb-10'>Últimas mascotas reportadas</h1>
        <LostPetsList />
    </div>
  )
}
