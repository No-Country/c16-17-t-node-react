import CardService from "./cardService/CardService"
import img1 from './icons/img1.png'
import img2 from './icons/img260.png'
import img3 from './icons/img3.png'
import img4 from './icons/img4.png'

export const Services = () => {
  return (
    <section className="h-fit grid sm:grid-cols-2 sm:grid-rows-2 place-items-center gap-10 sm:gap-y-20 justify-items-center mb-10 bg-primary p-10 rounded-xl grid-cols-1 grid-rows-4">
        <CardService
            title='Perfiles Adorables'
            img={img1}
            text='Crea perfiles con fotos para tus peludos.' />
        <CardService
            img={img2}
            title='Ayuda a mascotas perdidas'
            text='Comunícate con dueños de mascotas extraviadas.' />
        <CardService
            img={img4}
            title='Vacunas'
            text='Mantén un registro de vacunación de tus mascotas' />
        <CardService
            img={img3}
            title='Mascotas perdidas cerca'
            text='Infórmate sobre mascotas perdidas en tu área.' />
    </section>
  )
}
