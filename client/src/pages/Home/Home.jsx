import { Banner, Services } from '../../components'
import LostPetsList from '../../components/lostPetsList/LostPetsList'

export const Home = () => {
  return (
    <div className='max-w-[1400px] m-auto'>
      <Banner />
      <h1 className='text-5xl text-center font-bold my-10'>🐾 PetPal 🐾</h1>
      <div className='container m-auto flex flex-col gap-5'>
        <Services />
      </div>
      <div className='m-auto mt-10 rounded-md p-10 bg-bgBtn'>
        <h2 className='text-center font-bold text-4xl text-white mb-10'>Últimas mascotas reportadas</h2>
        <LostPetsList />
      </div>
    </div>
  )
}
