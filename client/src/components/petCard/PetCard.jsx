import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import usePets from '../../hooks/usePets';
import { useUserStore } from '../../store/user';
import { Img } from '../Img/Img';
import { CardButtons } from './components/CardButtons';

export const PetCard = ({ petId }) => {
	const { petData, deletePet, getPetData, addLostPet, removeLostPet } =
		usePets(petId);

	const {user} = useUserStore();

	useEffect(() => {
		getPetData(petId);
	}, []);

	const { id, nickName, birth, images, breed, owner } = petData;
	
	return (
		<div className="overflow-hidden rounded-lg bg-slate-200 shadow-1 duration-300 hover:shadow-3 w-80 max-h-[500px]">
			<figure className='w-full h-[200px]'>
				<Img src={images ? images[0]?.url : null} alt={nickName}/>
			</figure>
			<div className="p-3">
				<CardButtons
					user={user}
					petData={petData} 
					handleDelete={deletePet} 
					/>
				<article className='rounded-md bg-secondaryBtn w-full p-2 text-white my-4'>
					<h3 className="mb-4 block text-xl font-semibold text-dark hover:text-zinc-600 sm:text-[22px] md:text-xl lg:text-[22px] xl:text-xl 2xl:text-[22px] cursor-default">
						Nombre: {nickName}
					</h3>
					<p className=" text-base leading-relaxed text-body-color dark:text-dark-6">
						Raza: {breed}
					</p>
					<p className="mb-7 text-base leading-relaxed text-body-color dark:text-dark-6">
						Nació: {new Date(birth).toLocaleDateString()}
					</p>
				</article>
				<div className='flex items-center justify-around text-white mt-5 gap-2'>
					<button
						onClick={() => addLostPet(petData)}
						className="p-3 w-full font-semibold rounded-md bg-danger hover:bg-red-700"
					>
						Se Perdió 😢
					</button>
					<button
						onClick={() => removeLostPet(petData)}
						className="p-3 w-full rounded-md bg-secondaryBtn font-semibold hover:bg-black"
					>
						La Encontré 🥳
					</button>
				</div>
			</div>
		</div>
	);
};
