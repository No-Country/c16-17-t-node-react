import React from 'react'
import { Link } from 'react-router-dom'
import { toast } from 'react-toastify'
import { PetCard } from '../../components'



export const Home = () => {
  const notifySuccess = () => toast.success('Todo OK!', {
    position: 'top-center'
  })
  const notifyError = () => toast.error('Algo se rompió!', {
    position: 'top-center'
  })
  const userData = JSON.parse(localStorage.getItem('petpal_user'))
  const pets = userData.pets
  const handleClick = () => {
    localStorage.clear()
  }
  return (
    <div>
      <h1 className='text-5xl text-center font-bold'>Pagina Home</h1>
      <div className='container m-auto flex flex-col gap-5 mt-16'>
        <button onClick={notifySuccess}>Ok</button>
        <button onClick={notifyError}>Error</button>
        <section className='container flex justify-center items-center gap-5'>
          {
            pets.map( pet => (
              <PetCard
                key={pet} 
                petId={pet}/>
            ))
          }
        </section>
        <Link
          onClick={handleClick} 
          className='border rounded-md w-fit p-5 bg-black text-white font-bold'
          to='/login'>Desloguear</Link>
      </div>
    </div>
  )
}
