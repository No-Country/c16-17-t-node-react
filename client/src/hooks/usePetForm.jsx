import { useState } from "react";
import { toast } from "react-toastify";

const usePetForm = () => {
  const [petBlob, setPetBlob] = useState("");
  const [petCloudData, setPetCloudData] = useState({
    url:'',
    public_id:'',
    img_tag:''
  });
  //OBTENER BLOB
  const handlePetFile = (e) => {
    const reader = new FileReader();
    reader.readAsDataURL(e.target.files[0]);
    reader.onloadend = () => {
      setPetBlob(reader.result);
      getPetUrl(reader.result)
    };
  };
  //SUBIR A CLOUDINARY Y OBTENER URL DE IMAGEN
  const getPetUrl = petBlob => {
    fetch(`${import.meta.env.VITE_APP_CLOUDINARY_API}`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        file: petBlob,
        upload_preset: "ml_default",
        folder: "petpal",
        tags: ["petpal"]
      }),
    })
      .then(res => res.json())
      .then(data =>
        setPetCloudData({
          url: data.url,
          public_id: data.public_id,
          img_tag: data.tags[0],
        }));
  };

  //ENVIAR DATOS DEL FORM
  const handleSubmit = async (e) => {
    e.preventDefault();
    //Datos
    const formData = new FormData(e.target)
    const petName = formData.get('nickName')
    const petBirth = Number(new Date(formData.get('birth')))
    const petDetail = formData.get('detail')
    const petBreed = formData.get('breed')
    const petIsLost = formData.get('petIsLost')
    let petImg = petCloudData.url
    const img_id = petCloudData.public_id
    // //Validacion
    if(petName.trim() == ''|| petBirth.length<0 || petDetail.trim() == '' || petImg.trim() == '' || petBreed.trim() == ''){
      toast.error('Todos los campos son obligatorios')
      return
    }
    const petData = {
      nickName: petName,
      description: petDetail,
      images: {
        id: img_id,
        url: petImg
      },
      breed: petBreed,
      birth: petBirth,
      lost: petIsLost == 'false' ? false : true 
    }
    const sendPetData = async () => {
      const response = await toast.promise(
        fetch(`${import.meta.env.VITE_API_URL}/pets/`, {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
              Authorization: `Bearer ${JSON.parse(localStorage.getItem('petpal_token'))}`
            },
            body: JSON.stringify(petData)
        }),
        {
          pending: 'Ingresando...',
        }
      )
      if(!response.ok) return toast.error('Ocurrió un error')
      toast.success('Mascota creada exitosamente')
      const result = await response.json()
      return console.log(result)
    }
    await sendPetData()
    e.target.reset()
    setPetBlob('')
  }
  return {
    petCloudData,
    handlePetFile,
    petBlob,
    handleSubmit
  };
};

export default usePetForm;