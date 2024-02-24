import { checkAuth } from "./checkAuth"

export const handleLogout = () => {
    const user = checkAuth()
    
    if(user){
        localStorage.removeItem('petpal_user')
        location.reload()
    }else{
        return
    }
}