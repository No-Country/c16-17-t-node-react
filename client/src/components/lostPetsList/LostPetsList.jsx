import { PetCard } from '../petCard/PetCard';
import './lostpetslist.css';
import { usePets } from '../../hooks';
const LostPetsList = () => {
	const { lostPets } = usePets();
	return (
		<>
			<div className="flex flex-row gap-5 overflow-auto snap-mandatory snap-x justify-start xl:justify-center xl:flex-wrap items-center w-full p-2 mx-auto">
				{lostPets.map((pet) => (
					<PetCard key={pet.id} petId={pet.id} />
				))}
			</div>
		</>
	);
};

export default LostPetsList;
