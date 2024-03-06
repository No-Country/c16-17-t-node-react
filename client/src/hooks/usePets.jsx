import { useEffect, useState } from "react"
import { toast } from "react-toastify";
import { useUserStore } from "../store/user";
import { config } from '../config';

const { apiUrl } = config;

export const usePets = () => {
    const [petData, setPetData] = useState({})
    const {addLostPets, removeLostPets, getLostPets, lostPets, token} = useUserStore()

    const deletePet = async (id) => {
        const response = await toast.promise(
            fetch(`${apiUrl}/pets/${id}`, {
                method: 'DELETE',
                headers: {
                    Authorization: `Bearer ${JSON.parse(localStorage.getItem('petpal_token'))}`
                }
            }),
            {
                pending: 'Eliminando...'
            }
        )
        if(!response.ok) return toast.error('No se pudo eliminar...')
        toast.success('Mascota Eliminada')
        const result = response.json()
        location.reload()
        return result
    }
    const getPetData = async(id) => {
        try {
            const response = await fetch(`${apiUrl}/pets/${id}`)
            const result = await response.json()
            setPetData(result)
        } catch (error) {
            throw new Error(error.message)
        }
    }
    useEffect(() => {
        getLostPets()
    }, [])

    const editPetData = async (data, id) => {
        const response = await toast.promise(fetch(`${apiUrl}/pets/${id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${token}`
            },
            body: JSON.stringify(data)
        }),
        {
            pending: 'Actualizando datos...'
        })
        if(!response.ok){
            toast.error('Ocurrió un error al actualizar..')
            return
        }
        toast.success('Datos actualizados ✅')
        const result = response.json()
    }
    const handleDownload = (e, nickName) => {
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
  return {
    handleDownload,
    deletePet,
    petData,
    getPetData,
    addLostPets,
    removeLostPets,
    lostPets,
    editPetData
  }
}
