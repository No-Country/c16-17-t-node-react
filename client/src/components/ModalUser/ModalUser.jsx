import { createPortal } from 'react-dom';
import { PhotoIcon } from '@heroicons/react/24/solid';
import { useModalUser, useUser } from './../../hooks';
import { Button } from '../';

export function ModalUser({ toggleModalUser }) {
  const { user } = useUser();
  const { userBlob, invalid, handleUploadUserFile, handleSubmit } = useModalUser({ toggleModalUser });

  return createPortal(
    <div
      role="dialog"
      aria-modal="true"
      className="bg-black bg-opacity-50 fixed left-0 top-0 flex h-full w-full items-center justify-center z-30 overflow-y-scroll"
    >
      <div className="fixed overflow-y-scroll">
        <div className="flex items-end justify-center p-2 sm:items-center sm:p-0">
          <div className='rounded-lg bg-white text-left sm:my-8 sm:w-full sm:max-w-lg'>
            <div className='relative flex flex-col p-2 sm:p-6 overflow-y-scroll rounded-md h-full w-96'>
              <div className='absolute right-14 sm:right-1 top-2 rounded-full justify-self-end w-8 h-8'>
                <Button
                  color='danger'
                  type='button'
                  className='rounded-full w-full md:w-full h-full md:h-full px-0 py-0 sm:px-0 sm:py-0 text-center'
                  onClick={toggleModalUser}
                >
                  X
                </Button>
              </div>
              <form
                className="container bg-primary flex flex-col justify-center gap-5 border-2 mx-auto p-5 overflow-y-scroll"
                onSubmit={handleSubmit}
              >
                <div className="px-4">
                  <label className="mb-1 block text-base font-medium text-black">
                    Nombre (*)
                  </label>
                  <div className="relative">
                    <input
                      id="name"
                      name="name"
                      type="text"
                      placeholder={user.name}
                      className="w-full bg-transparent rounded-md border border-black dark:border-dark-3 py-[10px] pr-3 pl-4 text-dark-6 outline-none transition focus:border-danger active:border-danger disabled:cursor-default disabled:bg-gray-2"
                    />
                  </div>
                  {invalid.name &&
                    <p className='bg-danger text-white px-3 mt-2 rounded-md'>{invalid.name}</p>
                  }
                </div>
                <div className="px-4">
                  <label className="mb-1 block text-base font-medium text-black">
                    Apellido (*)
                  </label>
                  <div className="relative">
                    <input
                      id="lastName"
                      name="lastName"
                      type="text"
                      placeholder={user.lastName}
                      className="w-full bg-transparent rounded-md border border-black dark:border-dark-3 py-[10px] pr-3 pl-4 text-dark-6 outline-none transition focus:border-danger active:border-danger disabled:cursor-default disabled:bg-gray-2"
                    />
                  </div>
                  {invalid.lastName &&
                    <p className='bg-danger text-white px-3 mt-2 rounded-md'>{invalid.lastName}</p>
                  }
                </div>
                <div className="px-4">
                  <label className="mb-1 block text-base font-medium text-black">
                    Teléfono
                  </label>
                  <div className="relative">
                    <input
                      id="telephone"
                      name="telephone"
                      type="tel"
                      placeholder="Cod.Área + Cel (sin 15)..."
                      className="w-full bg-transparent rounded-md border border-black dark:border-dark-3 py-[10px] pr-3 pl-4 text-dark-6 outline-none transition focus:border-danger active:border-danger disabled:cursor-default disabled:bg-gray-2"
                    />
                  </div>
                </div>
                <div className="px-4">
                  <label htmlFor="cover-photo" className="block text-sm font-medium leading-6 text-gray-900">
                      Foto de Perfil
                  </label>
                  <div className="mt-2 flex justify-center rounded-lg border border-black sm:px-0 py-0">
                    <div className="text-center">
                      {
                        userBlob
                          ? <img src={userBlob} width={200} height={200} />
                          : <PhotoIcon className="mx-auto h-12 w-12 text-gray-300" aria-hidden="true" />
                      }
                      <div className="mt-4 flex flex-col lg:flex-row text-sm justify-center leading-6 text-gray-600">
                        <label
                          htmlFor="image"
                          className="relative cursor-pointer rounded-md bg-white font-semibold text-indigo-600 focus-within:outline-none focus-within:ring-2 focus-within:ring-indigo-600 focus-within:ring-offset-2 hover:text-indigo-500"
                        >
                          <span className=''>Sube una foto</span>
                          <input id="image" name="image" type="file" accept='image/png image/jpg image/jpeg' onChange={handleUploadUserFile} className="sr-only"/>
                        </label>
                      </div>
                      <p className="text-xs leading-5 text-gray-600">PNG, JPG, JPEG hasta 10MB</p>
                    </div>
                  </div>
                </div>
                <div className="w-full px-4 flex justify-center items-center gap-5">
                  <Button
                    color='success'
                    type='submit'
                  >
                    Guardar
                  </Button>
                  <Button
                    color='cancel'
                    type='button'
                    onClick={toggleModalUser}
                  >
                    Cancelar
                  </Button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>,
    document.getElementById('modal')
  );
}
