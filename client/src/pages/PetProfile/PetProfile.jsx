import { useParams } from "react-router"
import { Img } from "../../components"
import usePets from "../../hooks/usePets"
import { useEffect } from "react"
import {petIcon, petIcon2, ownerIcon, calendarIcon } from './icons'
import { CardButtons } from "../../components/petCard/components/CardButtons"
import { useUserStore } from "../../store/user"

export const PetProfile = () => {
    const params = useParams()
    const {petData, getPetData} = usePets()

    const {user} = useUserStore()
    useEffect(()=>{
        getPetData(params.id)
    },[])
    const { nickName, breed, description, images, owner, lost } = petData
    return (
        <div>
            <section className="bg-primary p-2 md:p-10 mt-10 rounded-xl lg:pb-20 lg:pt-[120px] mx-auto">
                <div className="container flex flex-col lg:flex-row justify-center items-center rounded-xl gap-5 mx-auto">
                    <article className="w-full md:w-1/2 overflow-hidden relative flex- flex-col items-center justify-center min-h-96">
                        <div className={`absolute w-full h-16 sm:top-8 sm:left-26 top-10 left-32 right-0 lg:top-6 lg:right-0 lg:left-64 bg-danger justify-center items-center font-semibold text-white text-2xl rotate-45 ${lost ? 'flex' : 'hidden'}`}>Perdida</div>
                        <figure className="rounded-xl overflow-hidden h-full mb-4">
                            {
                                images && 
                                        <picture>
                                            <Img src={images[0]?.url} alt="pet image" />
                                        </picture>
                            }
                        </figure>
                        {
                            user.id == owner?.id 
                                ? <CardButtons
                                    petData={petData} 
                                    />
                                : null
                        }
                    </article>
                    <article className="w-full lg:w-1/2">
                        <div className="flex flex-wrap w-full gap-3">
                            <div className="flex flex-col w-full mx-auto items-center justify-center md:flex-row gap-2">
                                <div className="w-full lg:w-1/2 min-h-64">
                                    <div className="p-5 rounded-lg flex flex-col items-center justify-start  bg-white min-h-64">
                                        <figure className="w-[100px] h-[100px] inline-flex items-center justify-center rounded-full bg-indigo-100 text-indigo-500 mb-4 p-5">
                                            <img src={petIcon} alt="pet icon" className="object-cover w-full h-full"/>
                                        </figure>
                                        <h2 className="text-3xl mx-auto flex flex-col items-center gap-2">Nombre: <span className="font-medium ">{nickName}</span></h2>
                                    </div>
                                </div>
                                <div className="w-full lg:w-1/2 min-h-64">
                                    <div className="bg-white p-6 rounded-lg flex flex-col items-center justify-between min-h-64">
                                        <figure className="w-[100px] h-[100px] inline-flex items-center justify-center rounded-full bg-indigo-100 text-indigo-500 mb-4 p-5">
                                            <img src={petIcon2} alt="pet icon" className="object-cover w-full h-full"/>
                                        </figure>
                                        <div className="flex items-start justify-center gap-2 flex-col w-full">
                                            <p className=""><span className="font-medium">Raza:</span> {breed}</p>
                                            <p className=""><span className="font-medium">Detalles:</span> {description}</p>
                                            </div>
                                    </div>
                                </div>
                            </div>
                            <div className="w-full mx-auto">
                                <div className="bg-white p-6 rounded-lg flex flex-col items-center justify-between">
                                    <figure className="w-[150px] h-[150px] inline-flex items-center justify-center rounded-full bg-indigo-100 text-indigo-500 mb-4 p-2">
                                        <img src={ownerIcon} alt="pet icon" className="object-cover w-3/4 h-3/4"/>
                                    </figure>
                                    <div className="flex items-start justify-center gap-2 flex-col w-full">
                                        <h2 className="font-medium">Dueño: {owner?.name}</h2>
                                        <p className=""><span className="font-medium">Teléfono: </span>{owner?.telephone ? owner.telephone : 'XXX-XXXXXX'}</p>
                                        <p className="font-medium">Email: {owner?.email ? owner.email : '@'}</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </article>
                </div>
            </section>
        
        </div>
    )
}

