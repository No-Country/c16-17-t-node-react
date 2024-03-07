import CardService from "./cardService/CardService"
import img1 from './icons/img1.png'
import img2 from './icons/img260.png'
import img3 from './icons/img3.png'
import img4 from './icons/img4.png'

export const Services = () => {
  return (
    <section className="bg-primary my-10 rounded-xl px-10">
      <h2 className='text-center font-bold text-4xl mt-10'>Aqui puedes</h2>
      <section className="h-fit flex py-10 flex-col justify-center items-center md:flex-row gap-10 sm:gap-32 flex-wrap">
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
    </section>
  )
}
