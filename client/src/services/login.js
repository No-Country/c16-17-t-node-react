export const handleSubmit = (e) => {
    e.preventDefault();
    const formData = new FormData(e.target)
    const userData = {
        email: formData.get('email'),
        password: formData.get('password')
    }
    const loginToPetPal = async () => {
        const response = await fetch('http://localhost:3001/users/login',{
            method: 'POST',
            headers: {
                'Content-Type':'application/json',
            },
            body: JSON.stringify(userData)
        })
        const result = await response.json() 
        localStorage.setItem('userLogged', JSON.stringify(result))
        localStorage.setItem('token', JSON.stringify(result.accessToken))
    }
    loginToPetPal()
}