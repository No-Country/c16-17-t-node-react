import { useState } from "react";
// import { getPetUrl } from "../services/petForm";
// import {userStore} from '../store/user'

const usePetForm = () => {
  // const { tokenUsuario } = userStore
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
    fetch(import.meta.env.VITE_APP_CLOUDINARY_API, {
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
    const petBirthDate = Number(new Date(formData.get('petBirthDate')))
    const petDescription = formData.get('petDescription')
    const petIsLost = formData.get('petIsLost')
    let petImg = petCloudData.url
    const img_id = petCloudData.public_id
    // //Validacion
    if(petName == '' || petBirthDate == '' || petDescription == ''){
      throw new Error('Todos los campos son obligatorios')
    }
    const petData = {
      nickName: petName,
      breed: petDescription,
      images: {
        id: img_id,
        url: petImg
      },
      birth: petBirthDate,
      // isLost: petIsLost 
    }
    const sendPetData = async () => {
      const response = await fetch('http://localhost:3001/pets', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${JSON.parse(localStorage.getItem('token'))}`
          },
          body: JSON.stringify(petData)
      })
      const result = await response.json()
      console.log(result)
    }
    sendPetData()
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