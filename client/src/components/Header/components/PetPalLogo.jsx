import React from 'react'
import logo from '../../../assets/logoPetpal.png'
export const PetPalLogo = () => {
  return (
    <figure className='md:w-1/4 w-2/4 h-full'>
        <img src={logo} alt="petpal logo" className='object-fill min-w-full h-full '/>
    </figure>
  )
}
