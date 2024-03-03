import React from 'react'
import { LoginBtn } from './LoginBtn'
import { Link } from 'react-router-dom'
import { useUserStore } from '../../../store/user'

export const Nav = () => {
    const { visible } = useUserStore()
    return (
        <nav className='w-full sm:w-full h-full sm:flex justify-around items-center transition-all'>
            <ul className={`${visible ? 'flex':'hidden'} ${visible ? 'bg-bgBtn text-white font-semibold' : 'bg-transparent'} p-2 w-[80%] h-[305px] rounded-tl-xl rounded-b-xl absolute left-0 right-0 mx-auto top-[96px] flex-col justify-around items-center after:absolute after:top-[-24px] after:content-[''] after:right-0 after:border-[12px] after:border-t-transparent after:border-l-transparent after:border-b-bgBtn after:border-r-bgBtn text-dark-grayish-blue text-xl sm:flex-row sm:justify-evenly sm:gap-[20px] sm:after:hidden sm:bg-transparent sm:flex sm:h-full sm:relative sm:text-primaryBtn sm:text-base sm:top-0 sm:w-[450px] sm:p-0 lg:mr-0 lg:text-2xl lg:w-4/5 z-10`}>
                <Link to='/' className='cursor-pointer transition-all duration-300 hover:scale-110 min-w-fit'>Inicio</Link>
                <Link to='lostpets' className='cursor-pointer transition-all duration-300 hover:scale-110 min-w-fit'>Mascotas Perdidas</Link>
                <Link to='mypets' className='cursor-pointer transition-all duration-300 hover:scale-110 min-w-fit'>Mis Mascotas</Link>
                <Link to='profile' className='cursor-pointer transition-all duration-300 hover:scale-110 min-w-fit'>Mi Perfil</Link>
                <LoginBtn />
            </ul>
        </nav>
    )
}
