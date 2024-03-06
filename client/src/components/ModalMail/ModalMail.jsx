import { createPortal } from 'react-dom';
import { Button } from '../';
import { config } from '../../config';

export function ModalMail({id, closeModal}) {
    const { apiUrl } = config

	const handleSendMail = async (e) => {
		e.preventDefault();
		const formData = new FormData(e.target);
		const heroName = formData.get('heroName')
        const heroTel = formData.get('heroTel')
        const heroEmail = formData.get('heroEmail')
        const heroMsg = formData.get('heroMsg')
        const heroData = {
            heroName: heroName,
            telephone: heroTel,
            email: heroEmail,
            description: heroMsg,
        }
        const response = await fetch(`${apiUrl}/pets/report/${id}`, {
            method: 'POST',
            headers: {
                'Content-Type' : 'application/json'
            },
            body: JSON.stringify(heroData)
        })
        const result = await response.json()
        console.log(result)
	};

	return createPortal(
		<div
			role="dialog"
			aria-modal="true"
			className="bg-black bg-opacity-50 fixed left-0 top-0 flex h-full w-full items-center justify-center z-30 overflow-y-scroll"
		>
            <div className="relative flex flex-col p-2 sm:p-1 rounded-lg h-fit w-[90%] sm:w-3/4 md:w-2/3 lg:w-2/5 bg-primary">
                <div className="w-10 h-10 flex justify-center items-center rounded-lg overflow-hidden ml-auto">
                    <Button
                        color="danger"
                        type="button"
                        className="w-full h-full flex items-center justify-center"
                        onClick={closeModal}
                    >
                        X
                    </Button>
                </div>
                <form
                    className="container bg-primary flex flex-col justify-center gap-5 mx-auto p-5 overflow-y-scroll"
                    onSubmit={handleSendMail}
                >
                    <div className="sm:px-4">
                        <label
                            className="mb-1 block text-base font-medium text-black"
                            htmlFor="heroName"
                        >
                            Nombre (*)
                        </label>
                        <div className="relative">
                            <input
                                id="heroName"
                                name="heroName"
                                type="text"
                                placeholder='Tu nombre'
                                className="w-full bg-bgHeader rounded-md focus:border-4 focus:border-secondaryBtn py-[10px] pr-3 pl-4 outline-none transition"
                            />
                        </div>
                    </div>
                    <div className="sm:px-4">
                        <label
                            className="mb-1 block text-base font-medium text-black"
                            htmlFor="heroTel"
                        >
                            Teléfono
                        </label>
                        <div className="relative">
                            <input
                                id="heroTel"
                                name="heroTel"
                                type="tel"
                                placeholder="Cod.Área + Cel (sin 15)..."
                                className="w-full bg-bgHeader rounded-md focus:border-4 focus:border-secondaryBtn py-[10px] pr-3 pl-4 outline-none transition"
                            />
                        </div>
                    </div>
                    <div className="sm:px-4">
                        <label
                            className="mb-1 block text-base font-medium text-black"
                            htmlFor="heroEmail"
                        >
                            Email
                        </label>
                        <div className="relative">
                            <input
                                id="heroEmail"
                                name="heroEmail"
                                type="email"
                                placeholder="tumail@mail.com"
                                className="w-full bg-bgHeader rounded-md focus:border-4 focus:border-secondaryBtn py-[10px] pr-3 pl-4 outline-none transition"
                            />
                        </div>
                    </div>
                    <div className="sm:px-4">
                        <label
                            className="mb-1 block text-base font-medium text-black"
                            htmlFor="heroEmail"
                        >
                            Mensaje
                        </label>
                        <div className="relative">
                            <textarea
                                id="heroMsg"
                                name="heroMsg"
                                type="text"
                                rows={5}
                                cols={30}
                                placeholder="Escribe tu mensaje aqui..."
                                className="w-full bg-bgHeader rounded-md focus:border-4 focus:border-secondaryBtn py-[10px] pr-3 pl-4 outline-none transition"
                            />
                        </div>
                    </div>
                    <div className="w-full flex sm:flex-row flex-col justify-center items-center gap-2 px-5">
                        <button type="submit" className='bg-secondaryBtn hover:bg-sky-500 text-white font-bold w-full sm:w-1/2 p-4 rounded-lg'>
                            Enviar
                        </button>
                        <button type='button' onClick={closeModal} className='bg-bgBtn hover:bg-red-600 text-white font-bold w-full sm:w-1/2 p-4 rounded-lg'>
                            Cancelar
                        </button>
                    </div>
                </form>
            </div>
		</div>,
		document.getElementById('modal'),
	);
}
