import { useQuery } from '@tanstack/react-query';
import useAxiosPublic from '../../hooks/useAxiosPublic';
import RasturentCard from './RasturentCard';
import Loading from '../../shared/loadingSpnier/Loading';
import { Link } from 'react-router';

const AllResturentHome = () => {
  const axiosPublic = useAxiosPublic();
  const {
    data: foods = [],
    isLoading,
  } = useQuery({
    queryKey: ['foods'],
    queryFn: async () => {
      const res = await axiosPublic.get('/api/foods');
      return res.data;
    },
  });
  if (isLoading) return <Loading />;
  return (
    <div id="all-restaurants" className="w-full md:w-11/12 px-4 mx-auto my-10">
      <h2 className="text-2xl font-bold mb-5">All restaurants</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4  gap-4">
        {foods.map(food => (
          <Link to={'/allRestaurants'}>
            <RasturentCard foodData={food} key={food._id} />
          </Link>
        ))}
      </div>
    </div>
  );
};

export default AllResturentHome;
