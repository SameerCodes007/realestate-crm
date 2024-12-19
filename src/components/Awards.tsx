import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay } from 'swiper/modules';

const awards = [
  {
    id: 1,
    "image": "/awards/New Doc 11-23-2024 13.32_11.jpg"
  },
  {
    id: 2,
    "image": "/awards/New Doc 11-23-2024 12.37_2.jpg"
  },
  {
    id: 3,
    "image": "/awards/New Doc 11-23-2024 12.37_3.jpg"
  },
  {
    id: 3,
    "image": "/awards/New Doc 11-23-2024 12.37_4.jpg"
  },
  {
    id: 3,
    "image": "/awards/New Doc 11-23-2024 12.37_5.jpg"
  },
  {
    id: 3,
    "image": "/awards/New Doc 11-23-2024 12.37_6.jpg"
  },
  {
    id: 3,
    "image": "/awards/New Doc 11-23-2024 13.32_8.jpg"
  },
  {
    id: 3,
    "image": "/awards/New Doc 11-23-2024 12.37_8.jpg"
  },
  {
    id: 3,
    "image": "/awards/New Doc 11-23-2024 12.37_9.jpg"
  },
  {
    id: 3,
    "image": "/awards/New Doc 11-23-2024 12.37_10.jpg"
  },
  {
    id: 3,
    "image": "/awards/New Doc 11-23-2024 12.37_11.jpg"
  },
  {
    id: 3,
    "image": "/awards/New Doc 11-23-2024 12.37_12.jpg"
  },
];

const Awards = () => {
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
                  src={award.image}
                  className="w-full h-48 object-contain"
                />
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </section>
  );
};

export default Awards;