import useAxiosPublic from '../../hooks/useAxiosPublic';
import { useQuery } from '@tanstack/react-query';
import toast from 'react-hot-toast';
import Loading from '../../shared/loadingSpnier/Loading';
import { FaCartPlus } from 'react-icons/fa';
import { FcLike } from 'react-icons/fc';
import { saveData } from '../../utils/LocalStroge';

const OfferPages = () => {
  const axiosPublic = useAxiosPublic();
  const {
    data: foods = [],
    isLoading,
    isError,
  } = useQuery({
    queryKey: ['offers'],
    queryFn: async () => {
      const res = await axiosPublic.get('/api/foods/offers');
      return res.data;
    },
  });
  if (isError) toast.error('Data not Fetch');
  if (isLoading) return <Loading />;
  return (
    <div className="w-full md:w-11/12 mx-auto grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 my-39">
      {foods.map(foodData => (
        <div
          key={foodData._id}
          className="card group  bg-white/80 text-base-300 shadow-md hover:shadow-xl transition rounded-xl"
          data-aos="zoom-in-up"
          data-aos-easing="linear"
          data-aos-duration="500"
        >
          <figure className="relative">
            <img
              src={foodData.image}
              alt={foodData.name}
              className="h-40 w-full object-cover group-hover:scale-110 transition duration-300"
            />

            {/* Discount badges */}
            <div className="absolute top-2 left-2 space-y-1">
              <span className="badge badge-error text-white">
                {foodData.discount}% off Price : ৳{foodData.price}
              </span>
            </div>

            {/* Favorite icon */}
            <button className="absolute top-2 right-2  text-amber-50 btn-circle btn-xs ">
              <FcLike className="size-6" />
            </button>
          </figure>

          <div className="card-body p-4 ">
            <div className="flex cards-center justify-between">
              <h3 className="font-semibold text-base truncate">
                {foodData.name}
              </h3>

              <div className="flex cards-center gap-2 text-sm">
                <span className="text-orange-500">★ {foodData.rating}</span>
                <span className="text-gray-500">({foodData.views})</span>
              </div>
            </div>

            <p className="text-sm text-gray-500">
              {foodData.time} min · {foodData.category}
            </p>
            <div className="flex justify-between items-center">
              <div>
                <p className="text-gray-500">Type : {foodData.type}</p>
                <p className="text-gray-500">{foodData.description}</p>
              </div>
              <div onClick={() => saveData(foodData._id)}>
                <FaCartPlus className="cursor-pointer" size={20} />
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default OfferPages;
