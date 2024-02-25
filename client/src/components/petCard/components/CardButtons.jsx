import React from 'react'
import { Link } from 'react-router-dom'

export const CardButtons = ({user, petData, handleDelete, flexDirection, addLost, removeLost}) => {
  return (
    <div className={`flex justify-center items-center gap-2 ${flexDirection}`}>
        {
            user?.name == petData?.owner?.name 
                ? (<>
                    <Link
                        to="/"
                        className="inline-block rounded-md border-black p-2 w-full text-base text-center font-medium bg-secondaryBtn transition hover:border-primary hover:bg-black text-white">
                        Editar Datos
                    </Link>
                    <button
                        onClick={() => handleDelete(id)}
                        className="inline-block rounded-md bg-red-500 p-2 w-full text-white font-medium transition hover:bg-red-700"
                    >
                        Quitar Mascota
                    </button>
                </>
                )
                : null
        }
    </div>
  )
}
