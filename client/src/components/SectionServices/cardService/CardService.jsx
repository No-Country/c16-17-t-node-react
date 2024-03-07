import React from 'react'

const CardService = ({img, title, text}) => {
  return (
    <article className="w-72 h-72 border rounded-xl bg-bgGray flex flex-col items-center justify-between p-5">
        <figure className="w-full h-1/3 rounded-lg p-3 flex justify-center items-center bg-bgBtn">
            <img
                className='w-[70px] h-fit' 
                src={img} alt={title}/>
        </figure>
        <h3 className='font-semibold text-xl text-center bg-primaryBtn p-2 rounded-xl text-white w-full'>{title}</h3>
        <p className='text-lg'>{text}</p>
    </article>
  )
}

export default CardService