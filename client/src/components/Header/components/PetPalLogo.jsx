import React from 'react'
import logo from '../../../assets/logoPetpal.png'
export const PetPalLogo = () => {
  return (
    <figure className='w-2/4 sm:w-1/5 h-full'>
        <img src={logo} alt="petpal logo" className='object-cover w-full h-full '/>
    </figure>
  )
}
