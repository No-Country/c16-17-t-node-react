export const handleSubmit = (e, petImgUrl) => {
    e.preventDefault();
    //Datos
    const formData = new FormData(e.target)
    const petName = formData.get('petName')
    const petBirthDate = formData.get('petBirthDate')
    const petDescription = formData.get('petDescription')
    const petIsLost = formData.get('petIsLost')
    const petImg = petImgUrl
    // //Validacion
    if(petName == '' || petBirthDate == '' || petDescription == ''){
        throw new Error('Todos los campos son obligatorios')
    }
    const petData = {
        name: petName,
        birthDate: petBirthDate,
        image: petImg,
        description: petDescription,
        isLost: petIsLost 
    }
    console.log(petData)
};
