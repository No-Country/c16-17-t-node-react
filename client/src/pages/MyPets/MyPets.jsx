import React from 'react';
import { useGetUserPets } from '../../hooks/useGetUserPets';
import { PetCard } from '../../components';
import { Link } from 'react-router-dom';
import { useUserStore } from '../../store/user';

export const MyPets = () => {
	const user = useUserStore((state) => state.user);
	const { pets } = useGetUserPets(user.id);

	return (
		<section className="container flex justify-center items-center rounded-xl flex-col gap-5">
			<h1 className="text-5xl font-semibold">Mis Mascotas</h1>
			<Link
				className="border rounded-md w-fit p-2 bg-black text-white font-bold"
				to="/petform"
			>
				Agregar Mascota
			</Link>
			<section className="flex flex-row gap-5 overflow-auto snap-mandatory snap-x justify-start items-center w-full p-5 [-webkit-scrollbar]:none ">
				{pets?.map((pet) => (
					<PetCard key={pet} petId={pet} />
				))}
			</section>
		</section>
	);
};
