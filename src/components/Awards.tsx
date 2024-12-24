import React from 'react';
import { useAwards } from '../hooks/useAwards';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay } from 'swiper/modules';
import 'swiper/css';

const Awards = () => {
  const { awards, loading, error } = useAwards();

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-red-600"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-red-600 p-4">
        Error loading awards: {error}
      </div>
    );
  }

  return (
    <section className="py-16 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">Awards & Recognition</h2>
          <p className="text-lg text-gray-600">Excellence recognized in the industry</p>
        </div>
        <Swiper
          modules={[Autoplay]}
          spaceBetween={30}
          slidesPerView={1}
          autoplay={{ delay: 600 }}
          breakpoints={{
            640: { slidesPerView: 2 },
            768: { slidesPerView: 3 },
            1024: { slidesPerView: 4 },
          }}
        >
          {awards.map((award) => (
            <SwiperSlide key={award.id}>
              <div className="bg-white p-4 rounded-lg shadow-md">
                <img
                  src={award?.images ? award?.images : ""}
                  alt={award.title}
                  className="w-full h-48 object-contain"
                />
                <h3 className="mt-4 text-center font-semibold">{award.title}</h3>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </section>
  );
};

export default Awards;