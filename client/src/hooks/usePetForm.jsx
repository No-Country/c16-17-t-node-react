import { useState, useEffect } from "react";

const usePetForm = () => {
  const [petBlob, setPetBlob] = useState("");

  const [petImgUrl, setPetImgUrl] = useState("");

  const handlePetFile = e => {
    const reader = new FileReader();
    reader.readAsDataURL(e.target.files[0]);
    reader.onloadend = () => {
      setPetBlob(reader.result);
    };
  };
  useEffect(() => {
    const getPetUrl = petBlob => {
      fetch("https://api.cloudinary.com/v1_1/gadd88cloud/image/upload", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          file: petBlob,
          public_id: "user_pet_pic_uploaded",
          upload_preset: "ml_default",
          folder: "petpal",
        }),
      })
        .then(res => res.json())
        .then(data => setPetImgUrl(data.url));
    };
    getPetUrl(petBlob);
  }, [petBlob]);

  return {
    petImgUrl,
    handlePetFile,
    petBlob,
  };
};

export default usePetForm;
