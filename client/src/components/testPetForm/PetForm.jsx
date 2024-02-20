// import { handleSubmit } from "../../services/petForm";
import "./petform.css";
import usePetForm from "../../hooks/usePetForm";

const PetForm = () => {
  const { handlePetFile, petBlob, handleSubmit } = usePetForm();

  return (
    <div className='formContainer'>
      <form onSubmit={e => handleSubmit(e)} id='petform'>
        <div>
          <label htmlFor='petName'>Nombre de tu mascota</label>
          <input type='text' id='petName' name='petName' required />
        </div>
        <div>
          <label htmlFor='petBirthDate'>Fecha de nacimiento</label>
          <input type='date' id='petBirthDate' name='petBirthDate' required />
        </div>
        <div>
          <label htmlFor='petDescription'>Descripcion</label>
          <input
            type='text'
            id='petDescription'
            name='petDescription'
            required
          />
        </div>
        <div>
          <p>Está Perdid@?</p>
          <label htmlFor='petIsLost'>Si</label>
          <input type='radio' name='petIsLost' value={true} />
          <label htmlFor='petIsLost'>No</label>
          <input type='radio' name='petIsLost' value={false} />
        </div>
        <div>
          <p>Agrega su foto</p>
          <input
            type='file'
            name='petImg'
            id='petImg'
            onChange={e => handlePetFile(e)}
            accept='image/png, image/jpg, image/jpeg, image/jfif'
            required
          />
        </div>
        <img src={petBlob && petBlob} width={200} height={200} />
        <button type='submit' id='submitPetForm'>
          Enviar
        </button>
      </form>
    </div>
  );
};

export default PetForm;
