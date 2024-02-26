import React, { useEffect } from 'react';
import usePets from '../../hooks/usePets';
import { useUserStore } from '../../store/user';
import { Img } from '../Img/Img';
import { CardButtons } from './components/CardButtons';
import { Link } from 'react-router-dom';

export const PetCard = ({ petId }) => {

	const { petData, deletePet, getPetData, addLostPets, removeLostPets } =
		usePets();
	const {user} = useUserStore();
	useEffect(() => {
		getPetData(petId);
	}, [petData]);
	const { nickName, birth, images, breed, lost, owner } = petData;
	
	return (

		<div className="overflow-hidden rounded-lg bg-slate-200 shadow-1 duration-300 hover:shadow-3 min-w-80 max-w-80 snap-end snap-always max-h-[500px] min-h-[500px] relative flex flex-col justify-between">
			<div className={`absolute w-full h-16 top-5 right-0 left-28 bg-danger justify-center items-center font-semibold text-white text-2xl rotate-45 ${lost ? 'flex' : 'hidden'}`}>Perdida</div>
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
					{
						!lost &&
							<button
								onClick={() => addLostPets(petData)}
								className="p-3 w-full font-semibold rounded-md bg-danger hover:bg-red-700"
							>
								Se Perdió 😢
							</button>
					}
					{
						!user.name
							? 	(<button
									// onClick={() => removeLostPets(petData)}
									className="p-3 w-full rounded-md bg-primaryBtn font-semibold hover:bg-black"
								>
									<Link to={`https://api.whatsapp.com/send?phone=+54${owner}&text=Hola%20${owner},%20creo%20que%20acabo%20de%20ver%20a%20tu%20mascota%0A`}>
										Avisar al Dueño 🥳
									</Link>
								</button>)
							:	(<button
									onClick={() => removeLostPets(petData)}
									className="p-3 w-full rounded-md bg-secondaryBtn font-semibold hover:bg-black"
								>
									La Encontré 🥳
								</button>)
					}
				</div>
			</div>
		</div>
	);
};
