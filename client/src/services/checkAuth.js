export function checkAuth(){
    const user = JSON.parse(localStorage.getItem('petpal_user'))
    if(user && user.accessToken != ''){ 
        return true
    }else{
        return false
    }
}