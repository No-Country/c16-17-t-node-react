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
      <div className='border w-[80%] m-auto mt-10 rounded-md p-10'>
        <LostPetsList />
      </div>
    </div>
  )
}
