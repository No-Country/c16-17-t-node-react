import { PhotoIcon } from '@heroicons/react/24/solid';
import usePetForm from '../../hooks/usePetForm';
import { Link } from 'react-router-dom';

export const PetForm = () => {
	const { handlePetFile, petBlob, handleSubmit, invalid } = usePetForm();

	return (
		<form
			onSubmit={(e) => handleSubmit(e)}
			id="petform"
			className="w-11/12 sm:w-4/5"
		>
			<h2 className="text-base font-semibold leading-7 text-gray-900">
				Registra tu mascota
			</h2>

			<div className="mt-10 flex flex-col gap-x-6 gap-y-8 ">
				<div className="">
					<label
						htmlFor="nickName"
						className="block text-sm font-medium leading-6 text-gray-900"
					>
						Nombre de tu mascota
					</label>
					<div className="mt-2">
						<div className="flex rounded-md shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-600">
							<input
								type="text"
								name="nickName"
								id="nickName"
								autoComplete="on"
								className="block p-2 flex-1 border-0 bg-transparent placeholder:text-sm sm:placeholder:text-base outline-none text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6"
								placeholder="Introduce el nombre de tu mascota"
							/>
						</div>
						{invalid.nickName && (
							<p className="bg-danger text-white px-3 mt-2 rounded-md">
								{invalid.nickName}
							</p>
						)}
					</div>
				</div>

				<div className="">
					<label
						htmlFor="breed"
						className="block text-sm font-medium leading-6 text-gray-900"
					>
						Raza
					</label>
					<div className="mt-2">
						<div className="flex rounded-md shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-600">
							<input
								type="text"
								name="breed"
								id="breed"
								autoComplete="on"
								className="block p-2 flex-1 border-0 bg-transparent placeholder:text-sm sm:placeholder:text-base outline-none text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6"
								placeholder="Introduce la raza de tu mascota"
							/>
						</div>
						{invalid.breed && (
							<p className="bg-danger text-white px-3 mt-2 rounded-md">
								{invalid.breed}
							</p>
						)}
					</div>
				</div>
				<div className="flex flex-col w-full items-start gap-3 p-2">
					<p className="block text-sm font-medium leading-6 text-gray-900">
						Está Perdid@?
					</p>
					<div className="flex justify-center items-center gap-10">
						<label
							className="block text-md font-medium leading-6 text-gray-900"
							htmlFor="petIsLost"
						>
							Si
						</label>
						<input
							className="ms-[-30px] w-6 h-6"
							type="radio"
							name="petIsLost"
							value={true}
						/>
						<label
							className="block text-sm font-medium leading-6 text-gray-900"
							htmlFor="petIsLost"
						>
							No
						</label>
						<input
							className="ms-[-30px] w-6 h-6"
							type="radio"
							name="petIsLost"
							value={false}
							defaultChecked
						/>
					</div>
				</div>
				<div className="">
					<label
						htmlFor="detail"
						className="block text-sm font-medium leading-6 text-gray-900"
					>
						Detalles de tu mascota
					</label>
					<div className="mt-2">
						<textarea
							id="detail"
							name="detail"
							rows={3}
							className="block p-2 w-full rounded-md outline-none border-0 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
							defaultValue={''}
						/>
					</div>
					<p className="mt-3 text-sm leading-6 text-gray-600">
						Descríbela, ayuda a otros a reconocerla.
					</p>
					{invalid.detail && (
						<p className="bg-danger text-white px-3 mt-2 rounded-md">
							{invalid.detail}
						</p>
					)}
				</div>
				<div className="">
					<label
						htmlFor="birth"
						className="mb-3 block text-base font-medium text-[#07074D]"
					>
						Fecha de cumpleaños
					</label>
					<div className="mt-2">
						<div className="flex rounded-md shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-600  ">
							<input
								type="date"
								name="birth"
								id="birth"
								className="block  p-2 flex-1 border-0 bg-transparent outline-none text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6"
							/>
						</div>
					</div>
				</div>
				<div className="">
					<label
						htmlFor="cover-photo"
						className="block text-sm font-medium leading-6 text-gray-900"
					>
						Imagen de tu mascota
					</label>
					<div className="mt-2 flex justify-center rounded-lg border border-dashed border-gray-900/25 sm:px-6 py-10">
						<div className="text-center">
							{petBlob ? (
								<img src={petBlob} width={200} height={200} />
							) : (
								<PhotoIcon
									className="mx-auto h-12 w-12 text-gray-300"
									aria-hidden="true"
								/>
							)}
							<div className="mt-4 flex flex-col lg:flex-row text-sm justify-center leading-6 text-gray-600">
								<label
									htmlFor="image"
									className="relative cursor-pointer rounded-md bg-white font-semibold text-indigo-600 focus-within:outline-none focus-within:ring-2 focus-within:ring-indigo-600 focus-within:ring-offset-2 hover:text-indigo-500"
								>
									<span className="">Sube una foto</span>
									<input
										id="image"
										name="image"
										type="file"
										accept="image/png image/jpg image/jpeg"
										onChange={(e) => handlePetFile(e)}
										className="sr-only"
									/>
								</label>
							</div>
							<p className="text-xs leading-5 text-gray-600">
								PNG, JPG, JPEG hasta 10MB
							</p>
						</div>
					</div>
					{invalid.image && (
						<p className="bg-danger text-white px-3 mt-2 rounded-md">
							{invalid.image}
						</p>
					)}
				</div>

				<div className="mt-6 flex justify-center gap-x-6">
					<button
						type="submit"
						className="rounded-md bg-secondaryBtn px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
					>
						Guardar
					</button>
					<Link to="/">
						<button
							type="button"
							className="rounded-md bg-secondary px-3 py-2 text-sm font-semibold text-black border-2 shadow-sm hover:bg-black hover:text-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
						>
							Volver al Inicio
						</button>
					</Link>
				</div>
			</div>
		</form>
	);
};
