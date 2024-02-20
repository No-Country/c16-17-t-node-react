// import { handleSubmit } from "../../services/petForm";
import "./petform.css";
import usePetForm from "../../hooks/usePetForm";

const PetForm = () => {
  const { handlePetFile, petBlob, handleSubmit } = usePetForm();

  return (
    <div className='formContainer'>
      <form
        className="flex flex-col border rounded-lg p-5" 
        onSubmit={e => handleSubmit(e)} 
        id='petform'>
          <h1 className="text-3xl fw-bold text-center mb-4 border rounded-md p-2 bg-slate-400 text-white">Agrega a tu Mascota</h1>
        <div className="flex flex-col w-full items-start gap-3 p-2">
          <label htmlFor='petName'>Nombre de tu mascota</label>
          <input type='text' id='petName' name='petName' required />
        </div>
        <div className="flex flex-col w-full items-start gap-3 p-2">
          <label htmlFor='petBirthDate'>Fecha de nacimiento</label>
          <input type='date' id='petBirthDate' name='petBirthDate' required />
        </div>
        <div className="flex flex-col w-full items-start gap-3 p-2">
          <label htmlFor='petDescription'>Descripcion</label>
          <input
            type='text'
            id='petDescription'
            name='petDescription'
            required
          />
        </div>
        <div className="flex flex-col w-full items-start gap-3 p-2">
          <p>Está Perdid@?</p>
          <div>
            <label htmlFor='petIsLost'>Si</label>
            <input type='radio' name='petIsLost' value={true} />
            <label htmlFor='petIsLost'>No</label>
            <input type='radio' name='petIsLost' value={false} />
          </div>
        </div>
        <div className="flex flex-col w-full items-start gap-3 p-2">
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
        <div className="flex flex-col w-full items-center gap-3 p-2">
          {
            petBlob && <img src={petBlob} width={200} height={200} />
          }
        </div>
        <div className="flex justify-center items-center p-2 w-full">
          <button type='submit' id='submitPetForm' className="p-3 border rounded-md btn hover:bg-blue-500 text-white font-bold bg-slate-400">
            Enviar
          </button>
        </div>
      </form>
    </div>
  );
};

export default PetForm;
