import { UserProfile } from '../../components';

export function Profile() {
  return (
    <section className='container flex justify-center items-center rounded-xl flex-col gap-5 h-full bg-primary p-8'>
      <h1 className='text-5xl font-semibold'>Mi Perfil</h1>
      <UserProfile />
    </section>
  );
}
