import { useParams } from "react-router"
import { PetCard } from "../../components"

export const PetProfile = () => {
    const params = useParams()
    
    return (
        <div>
            <section className="bg-gray-300 pb-10 pt-20 dark:bg-dark lg:pb-20 lg:pt-[120px]">
                <div className="container">
                    <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
                        {
                            petData &&
                            <PetCard
                                petId={params.id}
                                />
                        }
                    </div>
                </div>
            </section>
        
        </div>
    )
}

