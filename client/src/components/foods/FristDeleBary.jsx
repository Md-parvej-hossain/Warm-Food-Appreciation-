import { Link } from 'react-router';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation } from 'swiper/modules';
import { IoIosArrowDropright, IoIosArrowDropleft } from 'react-icons/io';
import { FcLike } from 'react-icons/fc';
import 'swiper/css';
import 'swiper/css/navigation';
import useAxiosPublic from '../../hooks/useAxiosPublic';
import { useQuery } from '@tanstack/react-query';
import toast from 'react-hot-toast';
import Loading from '../../shared/loadingSpnier/Loading';

const FristDeleBary = () => {
  const axiosPublic = useAxiosPublic();
  const {
    data: foods = [],
    isLoading,
    isError,
  } = useQuery({
    queryKey: ['fastdelivery'],
    queryFn: async () => {
      const res = await axiosPublic.get('/api/food/fastDelivery');
      return res.data;
    },
  });
  if (isError) toast.error('Data not Fetch');
  if (isLoading) return <Loading />;

  return (
    <div className="w-full md:w-11/12  px-4 mx-auto relative my-4">
      <h2 className="text-2xl font-bold mb-5">Fast delivery</h2>

      {/* LEFT ARROW */}
      <button className="offer-prev absolute left-0 top-1/2 -translate-y-1/2 z-10  shadow p-1">
        <IoIosArrowDropleft size={35} />
      </button>

      {/* RIGHT ARROW */}
      <button className="offer-next absolute right-0 top-1/2 -translate-y-1/2 z-10  shadow p-1">
        <IoIosArrowDropright size={35} />
      </button>

      <Swiper
        modules={[Navigation]}
        navigation={{
          prevEl: '.offer-prev',
          nextEl: '.offer-next',
        }}
        spaceBetween={16}
        slidesPerView={1.2}
        breakpoints={{
          640: { slidesPerView: 2.2 },
          768: { slidesPerView: 3.2 },
          1024: { slidesPerView: 4 },
        }}
        className="pb-4"
      >
        {foods.map(item => (
          <SwiperSlide key={item.id}>
            <Link to={`/restaurant`}>
              <div
                className="card group bg-white/80 text-base-300 shadow-md hover:shadow-xl transition rounded-xl"
                data-aos="zoom-out-up"
                data-aos-easing="linear"
                data-aos-duration="500"
              >
                <figure className="relative">
                  <img
                    src={item.image}
                    alt={item.name}
                    className="h-24 md:min-h-32 lg:h-40 w-full object-cover group-hover:scale-110 transition duration-300"
                  />

                  {/* Discount badges */}
                  <div className="absolute top-2 left-2 space-y-1">
                    <span className="badge badge-error text-white">
                      {item.discount}% price : ৳{item.price}
                    </span>
                  </div>

                  {/* Favorite icon */}
                  <button className="absolute top-2 right-2  text-amber-50 btn-circle btn-xs ">
                    <FcLike className="size-6" />
                  </button>
                </figure>

                <div className="card-body p-4 ">
                  <div className="flex items-center justify-between">
                    <h3 className="font-semibold text-base truncate">
                      {item.name}
                    </h3>

                    <div className="flex items-center gap-2 text-sm">
                      <span className="text-orange-500">★ {item.rating}</span>
                      <span className="text-gray-500">({item.reviews})</span>
                    </div>
                  </div>

                  <p className="text-sm text-gray-500">
                    {item.time} · {item.category}
                  </p>
                </div>
              </div>
            </Link>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

export default FristDeleBary;
