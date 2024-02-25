import React from 'react'
import { Link } from 'react-router-dom'
import { useUserStore } from '../../store/user'
import { handleLogout } from '../../services'

export const Navbar = () => {
    const {user} = useUserStore()
  return (
    <header className='flex justify-between items-center h-20 sm:h-24 bg-bgHeader rounded-b-xl'>
        <figure className='w-1/5 h-full'>
            <img src='' alt="" className='object-cover w-full h-full '/>
        </figure>
        <nav className='w-4/5 h-full flex justify-around items-center'>
            <ul className='flex justify-evenly items-center w-2/3 font-semibold text-xl'>
                <Link className='hover:underline' to="/">Inicio</Link>
                <Link className='hover:underline' to="/lostpets">Mascotas Perdidas</Link>
                <Link className='hover:underline' to="/mypets">Mis Mascotas</Link>
            </ul>
            <button className='rounded-md p-5 text-xl'>
                {
                    user.email
                    ? <Link
                        onClick={handleLogout} 
                        className='bg-black p-3 text-white rounded-xl'
                        to='/login'>Desloguear</Link>
                    :  <Link
                        className='bg-primaryBtn text-white p-3 rounded-xl font-semibold' 
                        to="/login">Ingresar</Link>
                }
            </button>
        </nav>
    </header>
  )
}
