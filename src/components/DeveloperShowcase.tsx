import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay } from 'swiper/modules';
import 'swiper/css';

const developers = [
  {
    id: 1,
    name: 'Prestige Group',
    logo: 'https://images.unsplash.com/photo-1560179707-f14e90ef3623?ixlib=rb-1.2.1&auto=format&fit=crop&w=300&q=80',
  },
  {
    id: 2,
    name: 'Sobha Limited',
    logo: 'https://images.unsplash.com/photo-1561070791-2526d30994b5?ixlib=rb-1.2.1&auto=format&fit=crop&w=300&q=80',
  },
  {
    id: 3,
    name: 'Brigade Group',
    logo: 'https://images.unsplash.com/photo-1561070791-2526d30994b5?ixlib=rb-1.2.1&auto=format&fit=crop&w=300&q=80',
  },
  {
    id: 4,
    name: 'Puravankara',
    logo: 'https://images.unsplash.com/photo-1561070791-2526d30994b5?ixlib=rb-1.2.1&auto=format&fit=crop&w=300&q=80',
  },
  {
    id: 5,
    name: 'Godrej Properties',
    logo: 'https://images.unsplash.com/photo-1561070791-2526d30994b5?ixlib=rb-1.2.1&auto=format&fit=crop&w=300&q=80',
  },
];

const DeveloperShowcase = () => {
  return (
    <section className="py-16 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">Our Developer Partners</h2>
          <p className="text-lg text-gray-600">Collaborating with the best in the industry</p>
        </div>
        <Swiper
          modules={[Autoplay]}
          spaceBetween={30}
          slidesPerView={1}
          autoplay={{ delay: 1000 }}
          breakpoints={{
            640: { slidesPerView: 2 },
            768: { slidesPerView: 3 },
            1024: { slidesPerView: 4 },
          }}
        >
          {developers.map((developer) => (
            <SwiperSlide key={developer.id}>
              <div className="bg-white p-6 rounded-lg shadow-md">
                <img
                  src={developer.logo}
                  alt={developer.name}
                  className="w-full h-24 object-contain mb-4"
                />
                <h3 className="text-lg font-semibold text-center text-gray-900">
                  {developer.name}
                </h3>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </section>
  );
};

export default DeveloperShowcase;