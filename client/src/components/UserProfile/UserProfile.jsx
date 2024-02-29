import { Link } from 'react-router-dom';
import { Button, Img } from './../';
import { useUser } from '../../hooks';

export function UserProfile() {
  const { user } = useUser();

  return (
    <>
      <section className="flex flex-col items-center">
        <figure className='w-40 h-40 border-4 border-danger rounded-full'>
          <Img
            className='rounded-full'
            src={user.image}
            alt={`${user.name} ${user.lastName}`}
          />
        </figure>
        <p className="text-2xl">{user.name} {user.lastName}</p>
      </section>
      <section className="my-4 flex flex-col 2xl:flex-row space-y-4 2xl:space-y-0 2xl:space-x-4 w-full">
        <div className="w-full flex flex-col">
          <div className="w-full flex-1 bg-white rounded-lg shadow-xl p-6">
            <h4 className="text-xl text-gray-900 font-bold">Información Personal</h4>
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
      <section className="w-full flex-1 flex flex-col items-center lg:items-end justify-end px-8 mt-2">
        <div className="flex items-center space-x-4 mt-2">
          <Link to='/'>
            <Button
              color='success'
              type='button'
            >
                <span>Editar</span>
            </Button>
          </Link>
        </div>
      </section>
    </>
  );
}
