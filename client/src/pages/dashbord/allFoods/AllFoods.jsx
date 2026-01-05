// import { format } from 'date-fns';

import { useQuery } from '@tanstack/react-query';
import useAxiosPublic from '../../../hooks/useAxiosPublic';
import { MdDelete } from 'react-icons/md';
import { GrUpdate } from 'react-icons/gr';
import { Link } from 'react-router';
import toast from 'react-hot-toast';
import Loading from '../../../shared/loadingSpnier/Loading';
const AllFood = () => {
  const axiosPublic = useAxiosPublic();
  const {
    data: foods = [],
    isLoading,
    isError,
    refetch,
  } = useQuery({
    queryKey: ['foods'],
    queryFn: async () => {
      const res = await axiosPublic.get('/api/foods');
      return res.data;
    },
  });
  if (isError) toast.error('Data not Fetch');
  if (isLoading) return <Loading />;
  const handleDeleteFood = async foodId => {
    try {
      const res = await axiosPublic.delete(`api/foods/${foodId}`);

      if (res.data.success) {
        toast.success('Food deleted successfully 🗑');
        refetch();
      }
    } catch (error) {
      toast.error(error?.response?.data?.message || 'Failed to delete food');
    }
  };
  return (
    <div>
      <h1 className="text-green-500 text-3xl font-medium">
        Total Data : {foods.length}
      </h1>
      <div className="overflow-x-auto text-black">
        <table className="table">
          {/* head */}
          <thead className="text-black">
            <tr>
              <th></th>
              <th>Img</th>
              <th>Name</th>
              <th>Type</th>
              <th>category</th>
              <th>details</th>
            </tr>
          </thead>
          <tbody>
            {/* row 1 */}
            {foods.map(item => (
              <tr key={item._id}>
                <th></th>
                <td>
                  <div className="flex items-center gap-3">
                    <div className="avatar">
                      <div className=" h-20 w-20">
                        <img
                          src={item.image}
                          alt="Avatar Tailwind CSS Component"
                          referrerPolicy="no-referrer"
                          className="h-full w-full object-cover"
                        />
                      </div>
                    </div>
                  </div>
                </td>
                <td>{item.name}</td>
                <td>{item.type}</td>
                <td>{item.category}</td>
                <td>
                  <div className="flex items-center gap-10">
                    <button
                      className="cursor-pointer"
                      onClick={() => handleDeleteFood(item._id)}
                    >
                      <MdDelete className="text-red-500 " size={20} />
                    </button>
                    <Link to={`/dashboard/updateFoods/${item._id}`}>
                      <GrUpdate size={20} />
                    </Link>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AllFood;
