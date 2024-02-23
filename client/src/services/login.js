import { toast } from "react-toastify";

export const handleSubmit = (e) => {
    e.preventDefault();
    const formData = new FormData(e.target)
    const userData = {
        email: formData.get('email'),
        password: formData.get('password')
    }
    const loginToPetPal = async () => {
        try{
            const response = await toast.promise(
                fetch('https://c16-17-t-node-react.vercel.app/users/login',{
                    method: 'POST',
                    headers: {
                        'Content-Type':'application/json',
                    },
                    body: JSON.stringify(userData)
                }),
                {
                    pending: 'Ingresando',
                    success: 'Ingreso correcto...',
                    error: 'Ocurrió un error'
                }
            ) 
            const result = await response.json() 
            localStorage.setItem('petpal_user', JSON.stringify(result))
            localStorage.setItem('petpal_token', JSON.stringify(result.accessToken))
        }catch (error){
            throw new Error(error.message)
        }
    }
    loginToPetPal()
}