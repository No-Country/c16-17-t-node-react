import React from 'react'
import { Link } from 'react-router-dom'
import fb from './icons/fb.png'
import insta from './icons/insta.png'
import x from './icons/x.png'

export const Footer = () => {
  return (
    <footer className='mt-16 flex flex-col sm:flex-row justify-between items-center sm:h-48 w-full gap-5 mt-5 bg-secondary rounded-xl p-2 sm:p-5'>
        <figure className='w-full sm:w-1/3 h-full bg-secondaryBtn rounded-md'>
            <img src="" alt="" className='w-full h-full'/>
        </figure>
        <article className='w-full sm:w-1/2 rounded-md bg-primary flex justify-center items-center h-full'>
            <ul className='flex justify-evenly items-center flex-col h-full font-semibold'>
                <Link to='/login'>Ingresar</Link>
                <Link to='/registro'>Registrarme</Link>
                <Link to='/mypets'>Mi Cuenta</Link>
            </ul>
        </article>
        <article className='w-full sm:w-1/2 rounded-md bg-primary flex justify-center items-center flex-col h-full gap-5 p-3'>
            <h3 className='font-semibold text-xl'>Nuestras Redes</h3>
            <ul className='flex justify-evenly w-full items-center'>
                <Link to='#' className='w-16 h-16 rounded-full p-2 bg-bgBtn'>
                    <img className='w-16 object-cover h-fit' src={fb} alt="" />
                </Link>
                <Link to='#' className='w-16 h-16 rounded-full p-2 bg-bgBtn'>
                    <img className='w-16 object-cover h-fit' src={insta} alt="" />
                </Link>
                <Link to='#' className='w-16 h-16 rounded-full p-2 bg-bgBtn'>
                    <img className='w-16 object-cover h-fit' src={x} alt="" />
                </Link>
            </ul>
        </article>
    </footer>
  )
}
