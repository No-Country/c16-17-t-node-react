import React from 'react';
import { Link } from 'react-router-dom';
import { useGetPetData } from '../../hooks/useGetPetData';


export const PetCard = ({petId})=> {
	
	const { petData } = useGetPetData(petId)
	
	const { id, nickName, birth, images, breed } = petData
	
	return (
		<div className="mb-10 overflow-hidden rounded-lg bg-slate-50 shadow-1 duration-300 hover:shadow-3 dark:bg-dark-2 dark:shadow-card dark:hover:shadow-3 w-80">
			<img src={images ? images[0]?.url : null} alt="" className="w-full h-80 object-cover"/>
			<div className="p-8 text-center sm:p-9 md:p-7 xl:p-9">
				<h3 className="mb-4 block text-xl font-semibold text-dark hover:text-zinc-600 sm:text-[22px] md:text-xl lg:text-[22px] xl:text-xl 2xl:text-[22px] cursor-default">
					{nickName}
				</h3>
				<p className="mb-7 text-base leading-relaxed text-body-color dark:text-dark-6">
					{breed}
				</p>
				<Link
					to='/home'
					className="inline-block rounded-full border border-gray-3 px-7 py-2 text-base font-medium text-body-color transition hover:border-primary hover:bg-black hover:text-white dark:border-dark-3 dark:text-dark-6"
				>
					Volver
				</Link>
			</div>
		</div>
	);
};
