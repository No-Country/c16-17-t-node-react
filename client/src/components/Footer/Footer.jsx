import React from 'react'
import { Link } from 'react-router-dom'
import fb from './icons/fb.png'
import insta from './icons/insta.png'
import x from './icons/x.png'
import logo from '../../assets/logoPetpal2.png'
export const Footer = () => {
  return (
    <footer className='flex flex-col sm:flex-row justify-between sm:items-center h-52 w-full gap-5 mt-5 bg-secondary rounded-xl p-2 sm:py-5'>
        <figure className='w-full sm:w-1/3 h-full min-h-48 bg-bgBtn p-2 rounded-xl outline-none border-none overflow-hidden'>
            <img src={logo} alt="petpal logo" className='w-full h-full object-cover'/>
        </figure>
        <article className='w-full sm:w-1/2 rounded-md bg-primary flex justify-center items-center h-full min-h-48'>
            <ul className='flex justify-evenly items-center flex-col h-full min-h-52 font-semibold'>
                <Link to='/login'>Ingresar</Link>
                <Link to='/registro'>Registrarme</Link>
                <Link to='/mypets'>Mi Cuenta</Link>
            </ul>
        </article>
        <article className='w-full sm:w-1/2 rounded-md bg-primary flex justify-center items-center flex-col h-full min-h-48 gap-5 p-3'>
            <h3 className='font-semibold text-xl'>Nuestras Redes</h3>
            <ul className='flex justify-evenly w-full items-center'>
                <Link to='#' className='w-16 h-16 rounded-full p-2 bg-bgBtn flex justify-center items-center'>
                    <img className='w-16 object-cover h-fit' src={fb} alt="" />
                </Link>
                <Link to='#' className='w-16 h-16 rounded-full p-2 bg-bgBtn flex justify-center items-center'>
                    <img className='w-16 object-cover h-fit' src={insta} alt="" />
                </Link>
                <Link to='#' className='w-16 h-16 rounded-full p-2 bg-bgBtn flex justify-center items-center'>
                    <img className='w-16 object-cover h-fit' src={x} alt="" />
                </Link>
            </ul>
        </article>
    </footer>
  )
}
