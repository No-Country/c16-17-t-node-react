import { UserProfile } from '../../components';

export function Profile() {
  return (
    <section className='container flex justify-center items-center rounded-xl flex-col gap-5 bg-primary p-8 mx-auto'>
      <h1 className='text-5xl font-semibold'>Mi Perfil</h1>
      <UserProfile />
    </section>
  );
}
