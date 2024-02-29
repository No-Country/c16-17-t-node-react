import { useParams } from "react-router"
import { PetCard } from "../../components"

export const PetProfile = () => {
    const params = useParams()
    return (
        <div>
            <section className="bg-gray-300 pb-10 pt-20 dark:bg-dark lg:pb-20 lg:pt-[120px]">
                <div className="container flex justify-center items-center rounded-xl flex-col gap-5">
                    <div className="flex flex-row gap-5 overflow-auto snap-mandatory snap-x justify-start items-center w-full p-5">
                        {
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

