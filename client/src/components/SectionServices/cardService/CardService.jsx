import React from 'react'

const CardService = ({img, title, text}) => {
  return (
    <article className="w-72 h-72 md:h-96 border rounded-xl bg-bgGray flex flex-col items-center justify-start md:gap-7 gap-5 p-5">
        <figure className="w-full h-1/3 rounded-md p-3 flex justify-center items-center bg-bgBtn">
            <img
                className='w-[70px] h-fit'
                src={img} alt={title}/>
        </figure>
        <h3 className='font-semibold text-xl md:text-2xl text-center bg-secondaryBtn p-2 rounded-md text-white w-full'>{title}</h3>
        <p className='text-lg md:text-2xl'>{text}</p>
    </article>
  )
}

export default CardService
