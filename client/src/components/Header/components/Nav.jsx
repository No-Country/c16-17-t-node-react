import React from 'react'
import { LoginBtn } from './LoginBtn'
import { Link } from 'react-router-dom'
import { useUserStore } from '../../../store/user'

export const Nav = () => {
    const { visible, handleVisible } = useUserStore()
    return (
        <nav className='w-full sm:w-full h-full sm:flex justify-around items-center transition-all'>
            <ul className={`${visible ? 'flex':'hidden'} ${visible ? 'bg-bgBtn text-white font-semibold' : 'bg-transparent'} p-2 w-[90%] h-[305px] rounded-tl-xl rounded-b-xl absolute left-0 right-0 mx-auto top-[96px] flex-col justify-around items-center after:absolute after:top-[-24px] after:content-[''] after:right-0 after:border-[12px] after:border-t-transparent after:border-l-transparent after:border-b-bgBtn after:border-r-bgBtn text-dark-grayish-blue text-xl md:flex-row md:justify-evenly md:gap-[5px] md:after:hidden md:bg-transparent md:flex md:h-full md:relative md:text-primaryBtn md:text-base md:top-0 md:w-[450px] md:p-0 lg:mr-0 lg:text-2xl lg:w-4/5 z-10`}>
                <Link onClick={()=>handleVisible()} to='/' className='cursor-pointer transition-all duration-300 hover:scale-110 min-w-fit'>Inicio</Link>
                <Link onClick={()=>handleVisible()} to='lostpets' className='cursor-pointer transition-all duration-300 hover:scale-110 min-w-fit'>Mascotas Perdidas</Link>
                <Link onClick={()=>handleVisible()} to='mypets' className='cursor-pointer transition-all duration-300 hover:scale-110 min-w-fit'>Mis Mascotas</Link>
                <Link onClick={()=>handleVisible()} to='profile' className='cursor-pointer transition-all duration-300 hover:scale-110 min-w-fit'>Mi Perfil</Link>
                <LoginBtn />
            </ul>
        </nav>
    )
}
