import { Img } from './../';
import banner1 from './icons/banner1.webp';
import banner2 from './icons/banner2.jpg';
import banner3 from './icons/banner3.jpg';

const banners = [banner1, banner2, banner3];

export const Banner = () => {
  return (
    <section className='w-full h-56 sm:h-96 bg-primary mb-5 rounded-xl my-5'>
      <div className="relative w-full h-56 sm:h-96 overflow-hidden flex justify-center rounded-xl">
        <div className="relative flex whitespace-nowrap h-56 rounded-xl md:h-96 animate-scroll">
          {banners.map((banner, index) =>
            <figure className='flex-shrink-0 w-full h-full'>
              <Img
                key={index}
                src={banner}
                className="w-full h-full"
                alt={`banner ${index}`}
              />
            </figure>
          )}
        </div>
        <h2 className='absolute top-0 bottom-0 self-center bg-opacity-50 bg-primary text-black text-5xl p-5 rounded-xl'>
          Encuentra a tu amigo
        </h2>
      </div>
    </section>
  )
}
