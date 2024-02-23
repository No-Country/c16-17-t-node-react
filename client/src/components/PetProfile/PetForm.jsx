import { PhotoIcon } from '@heroicons/react/24/solid'
import usePetForm from "../../hooks/usePetForm";


export const PetForm = () => {

        const { handlePetFile, petBlob, handleSubmit } = usePetForm();
    
 return (
     
    <form onSubmit={e => handleSubmit(e)}  id="petform" className="w-11/12 sm:w-4/5">
        <h2 className="text-base font-semibold leading-7 text-gray-900">Registra tu mascota</h2>
            
        <div className="mt-10 flex flex-col gap-x-6 gap-y-8 ">
            <div className="">
                <label htmlFor="nickName" className="block text-sm font-medium leading-6 text-gray-900">
                    Nombre de tu mascota
                </label>
                <div className="mt-2">
                    <div className="flex rounded-md shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-600 sm:max-w-md">                          
                    <input
                        type="text"
                        name="nickName"
                        id="nickName"
                        autoComplete="on"
                        className="block p-2 flex-1 border-0 bg-transparent placeholder:text-sm sm:placeholder:text-base outline-none text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6"
                        placeholder="Introduce el nombre de tu mascota"
                        required
                    />
                    </div>
                </div>
            </div>

            <div className="">
                <label htmlFor="breed" className="block text-sm font-medium leading-6 text-gray-900">
                    Raza
                </label>
                <div className="mt-2">
                    <div className="flex rounded-md shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-600 sm:max-w-md">                          
                    <input
                        type="text"
                        name="breed"
                        id="breed"
                        autoComplete="on"
                        className="block p-2 flex-1 border-0 bg-transparent placeholder:text-sm sm:placeholder:text-base outline-none text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6"
                        placeholder="Introduce la raza de tu mascota"
                        required
                    />
                    </div>
                </div>
            </div>
            <div className="">
                <label htmlFor="detail" className="block text-sm font-medium leading-6 text-gray-900">
                    Detalles de tu mascota
                </label>
                <div className="mt-2">
                    <textarea
                    id="detail"
                    name="detail"
                    rows={3}
                    className="block p-2 w-full rounded-md outline-none border-0 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                    defaultValue={''}
                    />
                </div>
                <p className="mt-3 text-sm leading-6 text-gray-600">Descríbela, ayuda a otros a reconocerla.</p>
            </div>
            <div className="">
                    <label
                htmlFor="birth"
                className="mb-3 block text-base font-medium text-[#07074D]"
                >
                Fecha de cumpleaños
                </label>
                <div className="mt-2">
                    <div className="flex rounded-md shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-600 sm:max-w-md">  
                        <input
                        type="date"
                        name="birth"
                        id="birth"
                        className="block  p-2 flex-1 border-0 bg-transparent outline-none text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6"
                        />
                    </div>
                </div>
            </div>
            <div className="">
                <label htmlFor="cover-photo" className="block text-sm font-medium leading-6 text-gray-900">
                    Imagen de tu mascota
                </label>
                <div className="mt-2 flex justify-center rounded-lg border border-dashed border-gray-900/25 sm:px-6 py-10">
                    <div className="text-center">
                                 {
                                    petBlob? <img src={petBlob} width={200} height={200} /> : <PhotoIcon className="mx-auto h-12 w-12 text-gray-300" aria-hidden="true" />
                                 }                     
                        <div className="mt-4 flex flex-col lg:flex-row text-sm justify-center leading-6 text-gray-600">
                            <label
                            htmlFor="image"
                            className="relative cursor-pointer rounded-md bg-white font-semibold text-indigo-600 focus-within:outline-none focus-within:ring-2 focus-within:ring-indigo-600 focus-within:ring-offset-2 hover:text-indigo-500"
                            >
                                
                            <span className=''>Sube una foto</span>
                            <input id="image" name="image" type="file" accept='image/png image/jpg image/jpeg' onChange={e => handlePetFile(e)} className="sr-only" required/>
                            </label>
                        </div>
                        <p className="text-xs leading-5 text-gray-600">PNG, JPG, JPEG hasta 10MB</p>
                    </div>
                </div>
            </div>
            
                <div className="mt-6 flex justify-center gap-x-6">
                    <button type="button" className="text-sm font-semibold leading-6 text-gray-900">
                    Cancelar
                    </button>
                    <button
                    type="submit"
                    className="rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                    >
                    Guardar
                    </button>
                </div>
        </div>
    </form>     
    )
}