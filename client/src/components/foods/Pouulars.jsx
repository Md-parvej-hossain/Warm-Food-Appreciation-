import React, { useEffect } from 'react';
import PopularCard from './PopularCard';
import { Link, useLocation } from 'react-router';
import useAxiosPublic from '../../hooks/useAxiosPublic';
import { useQuery } from '@tanstack/react-query';
import toast from 'react-hot-toast';
import Loading from '../../shared/loadingSpnier/Loading';

const Pouulars = () => {
  const axiosPublic = useAxiosPublic();
  const {
    data: foods = [],
    isLoading,
    isError,
  } = useQuery({
    queryKey: ['popular'],
    queryFn: async () => {
      const res = await axiosPublic.get('/api/foods/popular');
      return res.data;
    },
  });
  if (isError) toast.error('Data not Fetch');
  if (isLoading) return <Loading />;
  return (
    <div className="w-full md:w-11/12  mx-auto shadow-md p-4 my-10">
      <h2 className="text-2xl font-bold mb-5">Most Popular</h2>
      <div className=" grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4  gap-4">
        {foods.map(item => (
          <Link to={'/allPopuler'}>
            <PopularCard
              rating={item.rating}
              title={item.name}
              description={item.description}
              img={item.image}
            />
          </Link>
        ))}
      </div>
    </div>
  );
};

export default Pouulars;
