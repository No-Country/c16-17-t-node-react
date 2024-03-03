export const saveToStorage = (data) => {
    localStorage.setItem('petpal_user', JSON.stringify(data))
}
export const removeFromStorage = () => {
    localStorage.clear()
}