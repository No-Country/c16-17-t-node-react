import { useUserStore } from '../../../store/user'
import { handleLogout } from '../../../services'
import { Link } from 'react-router-dom'

export const LoginBtn = () => {
    const { user, handleVisible } = useUserStore()

    return (
        <button className='rounded-md p-5 text-xl sm:visible'>
            {
                user.email
                ? <Link
                    onClick={handleLogout} 
                    className='bg-black p-3 text-white rounded-xl'
                    to='/login'>Desloguear</Link>
                :  <Link
                    onClick={handleVisible}
                    className='bg-primaryBtn text-white p-3 rounded-xl font-semibold' 
                    to="/login">Ingresar</Link>
            }
        </button>
    )
}
