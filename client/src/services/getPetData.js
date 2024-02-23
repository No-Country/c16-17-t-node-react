export const getPetData = async ({id}) => {
    try {
        const response = await fetch(`https://c16-17-t-node-react.vercel.app/pets/${id}`)
        const result = await response.json()
        return result
    } catch (error) {
        throw new Error(error.message)
    }
}