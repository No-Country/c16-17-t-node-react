import menu from './icons/menu.png'
import { Nav } from './components/Nav'
import { useUserStore } from '../../store/user'
import { PetPalLogo } from './components/PetPalLogo'


export const Header = () => {
    
    const {handleVisible} = useUserStore()

  return (
    <header className='flex p-2 justify-between items-center h-20 sm:h-24 bg-bgHeader rounded-b-xl'>
        <PetPalLogo />
        <div className='me-1 lg:me-0 lg:w-full'>
            <div className='md:hidden'>
                <img src={menu} alt="" className='cursor-pointer md:hidden relative object-cover' onClick={handleVisible} />
            </div>
            <Nav />
        </div>
    </header>
  )
}
