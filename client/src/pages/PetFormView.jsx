import { PetForm } from "../components/PetProfile/PetForm";

export function PetFormView () {

	return (
        <section className="grid grid-cols-3">     
            <div className="col-span-4 flex justify-center items-center w-full h-52  bg-gray-200">
                <p>Banner</p>
            </div>
            <div className="hidden md:flex md:justify-center col-span-1 text-center border-r-2 border-gray">
                <p className="mt-8">Información adicional</p>
            </div>    
            <div className="col-span-3  mt-10 mx-5  md:mx-20  md:col-span-3 flex justify-center items-center">
                <PetForm />	
            </div>
        </section>
		
	);
}