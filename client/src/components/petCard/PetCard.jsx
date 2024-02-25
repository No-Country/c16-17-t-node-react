import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import usePets from '../../hooks/usePets';
import { useUserStore } from '../../store/user';

export const PetCard = ({ petId }) => {
	const { petData, deletePet, getPetData, addLostPet, removeLostPet } =
		usePets(petId);

	const {user} = useUserStore();

	useEffect(() => {
		getPetData(petId);
	}, []);

	const { id, nickName, birth, images, breed, owner } = petData;
	console.log(petData)
	console.log(user.name)
	return (
		<div className="mb-10 overflow-hidden rounded-lg bg-slate-50 shadow-1 duration-300 hover:shadow-3 dark:bg-dark-2 dark:shadow-card dark:hover:shadow-3 w-80">
			<img
				src={images ? images[0]?.url : null}
				alt=""
				className="w-full h-80 object-cover"
			/>
			<div className="p-8 text-start sm:p-9 md:p-7 xl:p-9">
				<h3 className="mb-4 block text-xl font-semibold text-dark hover:text-zinc-600 sm:text-[22px] md:text-xl lg:text-[22px] xl:text-xl 2xl:text-[22px] cursor-default">
					Nombre: {nickName}
				</h3>
				<p className=" text-base leading-relaxed text-body-color dark:text-dark-6">
					Raza: {breed}
				</p>
				<p className="mb-7 text-base leading-relaxed text-body-color dark:text-dark-6">
					Nació: {new Date(birth).toLocaleDateString()}
				</p>
				<div className="flex justify-center items-center gap-5">
					<Link
						to="/"
						className="inline-block rounded-md border border-black px-7 py-2 text-base text-center font-medium text-body-color transition hover:border-primary hover:bg-black hover:text-white dark:border-dark-3 dark:text-dark-6"
					>
						Volver a inicio
					</Link>
					{
						user?.name == petData?.owner?.name 
							? <button
									onClick={() => deletePet(id)}
									className="inline-block rounded-md bg-red-500 px-7 py-2 text-white font-medium text-body-color transition hover:bg-white hover:border hover:text-red-500 hover:border-red-500 dark:border-dark-3 dark:text-dark-6"
								>
									Quitar Mascota
								</button>
							: null
					}
				</div>
				<div className='flex flex-col items-center justify-around text-white mt-5'>
					<button
						onClick={() => addLostPet(petData)}
						className="p-3 w-full font-semibold border rounded-md bg-danger"
					>
						Se Perdió 😢
					</button>
					<button
						onClick={() => removeLostPet(petData)}
						className="p-3 border w-full rounded-md bg-secondaryBtn font-semibold"
					>
						La Encontré 🥳
					</button>
				</div>
			</div>
		</div>
	);
};
