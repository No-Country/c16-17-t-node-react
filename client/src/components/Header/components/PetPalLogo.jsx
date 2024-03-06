import React from 'react'
import logo from '../../../assets/logoPetpal.png'
import { Link } from 'react-router-dom'
export const PetPalLogo = () => {
  return (
    <figure className='md:w-1/4 w-2/4 h-full'>
      <Link to='/'>
        <img src={logo} alt="petpal logo" className='object-fill min-w-full h-full '/>
      </Link>
    </figure>
  )
}
