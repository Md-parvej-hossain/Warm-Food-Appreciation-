import { useQuery } from '@tanstack/react-query';
import useAxiosPublic from '../../hooks/useAxiosPublic';
import Loading from '../../shared/loadingSpnier/Loading';
import AllResturentCard from '../../components/foods/AllResturentCard';

const AllRestaurants = () => {
  const axiosPublic = useAxiosPublic();
  const { data: foods = [], isLoading } = useQuery({
    queryKey: ['foods'],
    queryFn: async () => {
      const res = await axiosPublic.get('/api/foods');
      return res.data;
    },
  });
  if (isLoading) return <Loading />;
  return (
    <div className="mt-40 mb-20 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 w-full md:w-11/12 mx-auto  gap-4">
      {foods.map(foodData => (
        <AllResturentCard foodData={foodData} key={foodData._id} />
      ))}
    </div>
  );
};

export default AllRestaurants;
