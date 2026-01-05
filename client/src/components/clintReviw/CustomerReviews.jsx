import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, Pagination } from 'swiper/modules';
import { FaStar } from 'react-icons/fa';
import 'swiper/css';
import 'swiper/css/pagination';

const reviews = [
  {
    id: 1,
    name: 'John Carter',
    img: 'https://randomuser.me/api/portraits/men/32.jpg',
    rating: 5,
    comment:
      'Amazing food quality and super fast delivery. Highly recommended!',
  },
  {
    id: 2,
    name: 'Sarah Ahmed',
    img: 'https://randomuser.me/api/portraits/women/45.jpg',
    rating: 4,
    comment: 'Loved the taste! Packaging was great and delivery was on time.',
  },
  {
    id: 2,
    name: 'Sarah Ahmed',
    img: 'https://randomuser.me/api/portraits/women/45.jpg',
    rating: 4,
    comment: 'Loved the taste! Packaging was great and delivery was on time.',
  },
  {
    id: 3,
    name: 'Michael Lee',
    img: 'https://randomuser.me/api/portraits/men/67.jpg',
    rating: 5,
    comment: 'Best restaurant experience so far. Will definitely order again.',
  },
  {
    id: 4,
    name: 'Ayesha Khan',
    img: 'https://randomuser.me/api/portraits/women/68.jpg',
    rating: 4,
    comment:
      'Very good service and delicious food. Customer support is friendly.',
  },
  {
    id: 4,
    name: 'Ayesha Khan',
    img: 'https://randomuser.me/api/portraits/women/68.jpg',
    rating: 4,
    comment:
      'Very good service and delicious food. Customer support is friendly.',
  },
  {
    id: 5,
    name: 'David Miller',
    img: 'https://randomuser.me/api/portraits/men/15.jpg',
    rating: 5,
    comment: 'Exceptional quality and fast delivery. Totally satisfied!',
  },
];

const CustomerReviews = () => {
  return (
    <section className="w-full lg:w-11/12 mx-auto px-4 py-10">
      <h2 className="text-3xl font-bold text-center mb-10">
        What Our Customers Say
      </h2>

      <Swiper
        modules={[Autoplay, Pagination]}
        autoplay={{
          delay: 3000,
          disableOnInteraction: false,
        }}
        pagination={{ clickable: true }}
        spaceBetween={20}
        breakpoints={{
          0: { slidesPerView: 1 },
          640: { slidesPerView: 2 },
          1024: { slidesPerView: 3 },
        }}
      >
        {reviews.map(review => (
          <SwiperSlide key={review.id}>
            <div className="card bg-gray-700 shadow-lg w-full hover:shadow-xl transition rounded-xl h-full">
              <div className="card-body text-center">
                <img
                  src={review.img}
                  alt={review.name}
                  className="w-16 h-16 rounded-full mx-auto border-2 border-primary"
                />

                <h3 className="font-semibold text-lg mt-3">{review.name}</h3>

                {/* Rating */}
                <div className="flex justify-center gap-1 my-2 w-full">
                  {[...Array(5)].map((_, i) => (
                    <FaStar
                      key={i}
                      className={
                        i < review.rating ? 'text-yellow-400' : 'text-gray-300'
                      }
                    />
                  ))}
                </div>

                <p className="text-gray-500 text-sm">“{review.comment}”</p>
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </section>
  );
};

export default CustomerReviews;
