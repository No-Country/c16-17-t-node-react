import React from 'react'
import { useUserStore } from '../../../store/user'
import {ModalPets} from '../../'
import {useModal, usePets} from '../../../hooks'

export const CardButtons = ({petData, flexDirection}) => {
    const {user} = useUserStore()
    const {active,setActive, closeModal} = useModal()
    const {deletePet} = usePets()
    const handleDelete = async () => {
        await deletePet(petData.id)
        location.replace('/mypets')
    }
  return (
    <div className={`flex justify-center items-center gap-2 ${flexDirection}`}>
        {
            user?.id == petData?.owner?.id
                ? (<>
                    <button
                        onClick={()=>setActive(true)}
                        to="/"
                        className="inline-block rounded-md border-black p-3 w-full text-base text-center font-medium bg-secondaryBtn transition hover:border-primary hover:bg-black text-white">
                        Editar Datos
                    </button>
                    <button
                        onClick={handleDelete}
                        className="inline-block rounded-md bg-red-500 p-3 w-full text-white font-medium transition hover:bg-red-700"
                    >
                        Quitar Mascota
                    </button>
                </>
                )
                : null
        }
        {
            active
                ? <ModalPets
                    data={petData}
                    closeModal={closeModal} />
                : null
        }

    </div>
  )
}
