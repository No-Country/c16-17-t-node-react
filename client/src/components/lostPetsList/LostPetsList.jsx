import { PetCard } from '../petCard/PetCard'
import './lostpetslist.css'
import usePets from '../../hooks/usePets'
const LostPetsList = () => {
    
    const {lostPets} = usePets()
  return (
    <>
        <div className="flex flex-row gap-5 overflow-auto snap-mandatory snap-x justify-start items-center w-full p-2 mx-auto">
            {
                lostPets.map(pet => (
                    <PetCard 
                        key={pet.id}
                        petId={pet.id}/>
                ))
            }
        </div>
    </>
  )
}

export default LostPetsList