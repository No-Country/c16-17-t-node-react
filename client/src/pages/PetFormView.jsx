import { Banner, PetForm } from "../components/";

export function PetFormView () {

	return (
        <section className="flex flex-col p-5 items-center justify-around">     
            <Banner />
            <div className="w-full md:w-2/4 mt-10 flex justify-center items-center">
                <PetForm />	
            </div>
        </section>
		
	);
}