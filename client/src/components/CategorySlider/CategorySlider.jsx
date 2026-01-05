import { categoryData } from '../../utils/catagory';
import { Swiper, SwiperSlide } from 'swiper/react';
import { FreeMode, Navigation } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';

import 'swiper/css';
import { Link } from 'react-router';

const CategorySlider = () => {
  return (
    <div className="w-full md:w-11/12 mx-auto px-4 py-10">
      <h2 className="text-2xl font-bold mb-5">Most Famous</h2>
      <Swiper
        spaceBetween={20}
        freeMode
        navigation
        modules={[FreeMode, Navigation]}
        breakpoints={{
          320: { slidesPerView: 2 },
          640: { slidesPerView: 3 },
          768: { slidesPerView: 4 },
          1024: { slidesPerView: 5 },
        }}
      >
        {categoryData.map(cat => (
          <SwiperSlide key={cat.id}>
            <Link to={`/category/${cat.name.toLowerCase()}`}>
              <div className="group cursor-pointer rounded-xl overflow-hidden shadow-md hover:shadow-xl transition">
                <img
                  src={cat.image}
                  alt={cat.name}
                  className="h-20 w-full object-cover group-hover:scale-110 transition duration-300"
                />
                <div className="bg-white/10 backdrop-blur-md text-white  text-center py-3 font-semibold">
                  {cat.name}
                </div>
              </div>
            </Link>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

export default CategorySlider;
