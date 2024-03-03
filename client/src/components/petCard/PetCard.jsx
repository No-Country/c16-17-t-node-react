import React, { useEffect } from 'react';
import usePets from '../../hooks/usePets';
import { useUserStore } from '../../store/user';
import { Img } from '../Img/Img';
import { CardButtons } from './components/CardButtons';
import { Link, useParams } from 'react-router-dom';
import wsp from './icons/wsp.png'
import link from './icons/link.png'

export const PetCard = ({petId}) => {

	const params = useParams()

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
				<article className='rounded-md bg-secondaryBtn w-full p-2 text-white my-4'>
					<Link to={`/pets/${petId}`}>
						<h3 className="mb-4 text-xl font-semibold text-dark hover:text-zinc-600 sm:text-[22px] md:text-xl lg:text-[22px] xl:text-xl 2xl:text-[22px] cursor-pointer flex items-center justify-center gap-3">
							{nickName} {!params.id ? <span><img src={link} alt="link" /></span> : null}
						</h3>
					</Link>
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
						user.id != owner?.id
							? 	(<button
									className="p-3 w-full rounded-md bg-green-500 font-semibold hover:bg-black flex justify-center items-center"
								>
									{
										!params.id
										? <Link
											className='flex justify-center items-center gap-2' 
											to={`/pets/${petId}`}>
											Ver Info
										</Link>
										: <Link className='flex items-center justify-center gap-3' 
											to={`https://api.whatsapp.com/send?phone=+54${owner?.telephone}&text=Hola%20,%20creo%20que%20acabo%20de%20ver%20a%20tu%20mascota%0A`}>
											Avisar al Dueño
											<span>
												<img
													className='w-9 h-9' 
													src={wsp} alt="wsp logo" />
											</span>
										</Link>
									}
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
