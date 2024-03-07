import { createPortal } from 'react-dom';
import { usePets } from '../../hooks';
import camera from './icons/camera.png'
import usePetForm from '../../hooks/usePetForm';

export function ModalPets({ data, closeModal }) {
	const { editPetData } = usePets();
	const {handlePetFile, petBlob, petCloudData } = usePetForm()

	const handleModalSubmit = (e) => {
		e.preventDefault();
		const formData = new FormData(e.target);
		const newNickName = formData.get('nickName');
		const newBirth = Number(new Date(formData.get('birth')));
		const newDescription = formData.get('description');
		const newImgUrl = petCloudData.url
		const newImgId = petCloudData.public_id
		const newPetData = {
			nickName: newNickName,
			birth: newBirth,
			description: newDescription,
			images:{
				id: newImgId,
				url: newImgUrl
			}
		};
		editPetData(newPetData, data.id).then(() => closeModal());
	};

	return (
		<>
			{createPortal(
				<div
					role="dialog"
					aria-modal="true"
					className="fixed left-0 top-0 flex h-screen w-screen items-center justify-center overflow-hidden z-30"
				>
					<div className="relative flex w-[98%] md:w-3/5 min-h-[400px] md:h-[80%] flex-col items-center justify-between rounded-md  bg-primary font-bold shadow-box shadow-[1px_1px_12px_#bbb] transition-all duration-300 overflow-hidden overflow-y-auto">
						<button
							onClick={closeModal}
							className="flex justify-end w-full bg-bgBtn p-3 h-15"
						>
							<p className="bg-bgHeader w-10 h-8 md:h-6 md:w-6 rounded-sm flex justify-center items-center">
								X
							</p>
						</button>
						<article className="flex items-center justify-around flex-col w-full h-full p-4">
							<figure className='relative flex items-center justify-center'>
								<img
									className="w-full h-auto max-w-80 max-h-[150px] sm:max-h-96 rounded-lg object-cover"
									src={petBlob ? petBlob : data?.images[0]?.url}
									alt="pet image"
								/>
								<span className='rounded-full p-1 bg-black h-10 w-10 sm:h-14 sm:w-14 absolute bottom-1 sm:right-10 right-0'>
									<label htmlFor="newImg" className='cursor-pointer'>
										<img src={camera} alt="camera icon" className='w-full h-full' />
									</label>
									<input type="file" name="newImg" id="newImg" className='hidden' accept='image/png image/jpg image/jpeg' onChange={handlePetFile}/>
								</span>
							</figure>
							<section className="w-full flex items-center justify-start gap-3 flex-col">
								<form
									onSubmit={(e) => handleModalSubmit(e)}
									className="font-normal flex flex-col items-start justify-center gap-5 w-full sm:w-3/4 lg:w-2/4"
								>
									<div className="w-full">
										<label className="font-bold" htmlFor="nickName">
											Nombre
										</label>
										<input
											type="text"
											id="nickName"
											name="nickName"
											className="p-2 rounded-md w-full"
											placeholder={data.nickName}
										/>
									</div>
									<div className="w-full">
										<label className="font-bold" htmlFor="birth">
											F. Nacimiento
										</label>
										<input
											type="date"
											id="birth"
											name="birth"
											className="p-2 rounded-md w-full"
										/>
									</div>
									<div className="w-full">
										<label className="font-bold" htmlFor="description">
											Descripción
										</label>
										<input
											type="text"
											id="description"
											name="description"
											className="p-2 rounded-md w-full"
											placeholder={data.description}
										/>
									</div>
									<section className="flex md:flex-row flex-col justify-center items-center p-1 w-full gap-2 my-5">
										<button
											className="cursor-pointer rounded-md w-full bg-bgBtn text-xl p-3 text-white font-semibold shadow-box-sm"
											type="submit"
										>
											Guardar Cambios
										</button>
										<button
											onClick={closeModal}
											className="cursor-pointer rounded-md w-full bg-black text-xl p-3 text-white font-semibold shadow-box-sm"
											type="button"
										>
											Cancelar Cambios
										</button>
									</section>
								</form>
							</section>
						</article>
					</div>
				</div>,
				document.getElementById('modal'),
			)}
		</>
	);
}
