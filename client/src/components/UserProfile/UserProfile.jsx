import { Button, Img } from './../';
import { useUser, useUserProfile } from '../../hooks';
import { ModalUser } from './../';

export function UserProfile() {
  const { user, deleteProfile } = useUser();
  const { isVisibleModalUser, toggleModalUser } = useUserProfile();

  return (
    <>
      <section className="flex flex-col items-center">
        <figure className='w-40 h-40 border-4 border-danger rounded-full'>
          <Img
            className='rounded-full'
            src={user.image.url}
            alt={`${user.name} ${user.lastName}`}
          />
        </figure>
        <p className="text-2xl">{user.name} {user.lastName}</p>
      </section>
      <section className="my-4 flex flex-col 2xl:flex-row space-y-4 2xl:space-y-0 2xl:space-x-4 w-full">
        <div className="w-full flex flex-col md:w-3/4 mx-auto">
          <div className="w-full flex-1 bg-white rounded-lg shadow-xl p-6">
            <h4 className="text-xl text-gray-900 font-bold text-end">Información Personal</h4>
            <ul className="w-full mt-2 text-gray-700 ">
              <li className="flex border-y py-2">
                <span className="font-bold w-24">Nombre</span>
                <span className="text-gray-700">{user.name}</span>
              </li>
              <li className="flex border-y py-2">
                <span className="font-bold w-24">Apellido</span>
                <span className="text-gray-700">{user.lastName}</span>
              </li>
              <li className="flex border-b py-2">
                <span className="font-bold w-24">Teléfono:</span>
                <span className="text-gray-700">{user.telephone}</span>
              </li>
              <li className="flex gap-12 md:gap-0 border-b py-2">
                <span className="font-bold w-24">Email:</span>
                <span className="w-auto text-gray-700 overflow-scroll no-scrollbar">{user.email}</span>
              </li>
            </ul>
          </div>
        </div>
      </section>
      <section className="w-full flex-1 flex flex-col items-center lg:items-end justify-end mt-2">
        <div className="flex items-center justify-center mt-2 gap-2 w-full mx-auto md:w-2/3">
          <button
            className='bg-secondaryBtn p-3 w-1/2 rounded-lg transition-all hover:bg-blue-400 text-white font-semibold'
            onClick={toggleModalUser}
          >
              <span>Editar Datos</span>
          </button>
          <button
            onClick={()=> deleteProfile(user.id)}
            className='bg-red-500 transition-all hover:bg-red-700 p-3 w-1/2 rounded-lg text-white font-semibold'>
            Eliminar Cuenta
          </button>
        </div>
      </section>
      {isVisibleModalUser && <ModalUser toggleModalUser={toggleModalUser} />}
    </>
  );
}
