export const handleSubmit = (e) => {
    e.preventDefault();
    const formData = new FormData(e.target)
    const userData = {
        email: formData.get('email'),
        password: formData.get('password')
    }
    console.log(userData)
    fetch('http://localhost:3001/login',{
        method: 'POST',
        headers: {
            'Content-Type':'application/json',
        },
        body: JSON.stringify(userData)
    })
    .then(res => res.json())
    .then(data => console.log(data))
}