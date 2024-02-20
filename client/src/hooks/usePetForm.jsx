import { useState } from "react";

const cloudUrl = import.meta.env.VITE_APP_CLOUDINARY_API
const usePetForm = () => {
  const [petBlob, setPetBlob] = useState("");
  const [petCloudData, setPetCloudData] = useState({
    url:'',
    public_id:''
  });

  //OBTENER BLOB
  const handlePetFile = async (e) => {
    const reader = new FileReader();
    reader.readAsDataURL(e.target.files[0]);
    reader.onloadend = () => {
      setPetBlob(reader.result);
      getPetUrl(reader.result)
    };
  };

  //SUBIR A CLOUDINARY Y OBTENER URL DE IMAGEN
  const getPetUrl = petBlob => {
    fetch(cloudUrl, {
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
    const petName = formData.get('petName')
    const petBirthDate = formData.get('petBirthDate')
    const petDescription = formData.get('petDescription')
    const petIsLost = formData.get('petIsLost')
    let petImg = petCloudData.url
    const img_id = petCloudData.public_id
    // //Validacion
    if(petName == '' || petBirthDate == '' || petDescription == ''){
      throw new Error('Todos los campos son obligatorios')
    }
    const petData = {
      id: crypto.randomUUID(),
        name: petName,
        birthDate: petBirthDate,
        image: petImg,
        image_id: img_id,
        description: petDescription,
        isLost: petIsLost 
    }
    console.log(petData)
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
