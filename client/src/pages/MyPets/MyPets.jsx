import React from 'react'
import { useGetUserPets } from '../../hooks/useGetUserPets'
import { PetCard } from '../../components'
import { Link } from 'react-router-dom'

export const MyPets = () => {
    const user = JSON.parse(localStorage.getItem('petpal_user'))

  const { pets } = useGetUserPets(user.id)

  return (
    <section className='container flex justify-center items-center rounded-xl flex-col gap-5'>
        <h1 className='text-5xl font-semibold'>Mis Mascotas</h1>
        <Link 
            className='border rounded-md w-fit p-2 bg-black text-white font-bold'
            to='/petform'>Agregar Mascota</Link>
        <section>
          {
            pets.map( pet => (
              <PetCard
                key={pet} 
                petId={pet}/>
            ))
          }
            
        </section>
    </section>
  )
}