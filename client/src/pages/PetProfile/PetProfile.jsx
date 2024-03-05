import { useParams } from "react-router"
import { Img } from "../../components"
import usePets from "../../hooks/usePets"
import { useEffect } from "react"
import {petIcon, petIcon2, ownerIcon } from './icons'
import { CardButtons } from "../../components/petCard/components/CardButtons"
import { useUserStore } from "../../store/user"
import QRCode from "react-qr-code";
import { Link } from "react-router-dom"
import wsp from '../../components/petCard/icons/wsp.png'

export const PetProfile = () => {
    const params = useParams()
    const {petData, getPetData} = usePets()
    const {user} = useUserStore()
    const profileAdress = location.origin+'/pets/'+params.id
    
    const handleDownload = (e) => {
        const svg = document.getElementById("QRCode");
        const svgData = new XMLSerializer().serializeToString(svg);
        const canvas = document.createElement("canvas");
        const ctx = canvas.getContext("2d");
        const img = new Image();
        img.onload = () => {
            canvas.width = 600;
            canvas.height = 600;
            ctx.fillStyle='white'
            ctx.fillRect(0,0,600,600)
            ctx.drawImage(img, 50, 50, 500, 500);
            const pngFile = canvas.toDataURL("image/jpeg");
            const downloadLink = document.createElement("a");
            downloadLink.download = `${nickName}`;
            downloadLink.href = `${pngFile}`;
            downloadLink.click();
        };
        img.src = `data:image/svg+xml;base64,${btoa(svgData)}`;
    };
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
                        {
                            user.id != owner?.id
                                ? 	(<button
                                        className="p-3 w-full rounded-md bg-green-500 font-semibold hover:bg-black flex justify-center items-center mt-3"
                                    >
                                        {
                                            !params.id
                                            ? <Link
                                                className='flex justify-center items-center gap-2' 
                                                to={`/pets/${petId}`}>
                                                Ver Info
                                            </Link>
                                            : <Link className='flex items-center justify-center gap-3 text-white' 
                                                to={`https://api.whatsapp.com/send?phone=+54${owner?.telephone}&text=Hola%20,%20creo%20que%20acabo%20de%20ver%20a%20tu%20mascota%0A`}>
                                                Avisar al Dueño
                                                <span>
                                                    <img
                                                        className='w-9 h-9' 
                                                        src={wsp} alt="wsp logo" />
                                                </span>
                                            </Link>
                                        }
                                    </button>)
                                :	lost 
                                        ?   (<button
                                                onClick={() => removeLostPets(petData)}
                                                className="p-3 w-full rounded-md bg-secondaryBtn font-semibold hover:bg-black mt-3 text-white">
                                                La Encontré 🥳
                                            </button>)
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
                            <div className="w-full gap-2 mx-auto flex flex-col md:flex-row items-center justify-center">
                                <div className="bg-white p-6 rounded-lg flex flex-col items-center justify-between w-full md:w-1/2 h-72">
                                    <figure className="w-[150px] h-[150px] inline-flex items-center justify-center rounded-full bg-indigo-100 text-indigo-500 mb-4 p-2">
                                        <img src={ownerIcon} alt="pet icon" className="object-cover w-3/4 h-3/4"/>
                                    </figure>
                                    <div className="flex items-start justify-center gap-2 flex-col w-full">
                                        <h2 className="font-medium">Dueño: {owner?.name}</h2>
                                        <p className=""><span className="font-medium">Teléfono: </span>{owner?.telephone ? owner.telephone : 'XXX-XXXXXX'}</p>
                                        <p className="font-medium">Email: {owner?.email ? owner.email : '@'}</p>
                                    </div>
                                </div>
                                <div
                                    className="bg-white rounded-lg flex flex-col items-center justify-between gap-2 w-full md:w-1/2 h-72 p-5">
                                    <QRCode
                                        id='QRCode'
                                        size={256}
                                        style={{ height: "auto", maxWidth: "100%", width: "100%"}}
                                        value={`${profileAdress}`}
                                        viewBox={`0 0 256 256`}
                                    />
                                    <input
                                        className="cursor-pointer rounded-md p-2 border-bgBtn border-4" 
                                        type="button" 
                                        value="Descargar QR" 
                                        onClick={handleDownload} />
                                    
                                </div>
                            </div>
                        </div>
                    </article>
                </div>
            </section>
        
        </div>
    )
}

