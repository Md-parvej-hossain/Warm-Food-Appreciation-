import useAxiosPublic from '../../../hooks/useAxiosPublic';
import { useQuery } from '@tanstack/react-query';
import { FaRegCheckCircle } from 'react-icons/fa';
import { MdDelete } from 'react-icons/md';
import useAuth from '../../../hooks/useAuth';
import Loading from '../../../shared/loadingSpnier/Loading';
import toast from 'react-hot-toast';
import useAxiosSecure from '../../../hooks/useAxiosSecure';
const UsersData = () => {
  const axiosPublic = useAxiosPublic();
  const axiosSecure = useAxiosSecure();
  const { user } = useAuth();
  const {
    data: users = [],
    isLoading,
    isError,
    refetch,
  } = useQuery({
    queryKey: ['foods'],
    queryFn: async () => {
      const res = await axiosPublic.get('/api/users', user?.email);
      return res.data;
    },
  });
  const handleApprove = async id => {
    try {
      await axiosSecure.patch(`/api/approve-rider/${id}`);
      toast.success('Rider approved successfully');
      refetch();
    } catch (error) {
      toast.error('Approval failed', error.massage);
    }
  };
  const handleDeleteUser = async foodId => {
    try {
      const res = await axiosSecure.delete(`api/users/${foodId}`);

      if (res.data.success) {
        toast.success('Food deleted successfully 🗑');
        refetch();
      }
    } catch (error) {
      toast.error(error?.response?.data?.message || 'Failed to delete food');
    }
  };
  if (isError) return toast.error('Get user data field');
  if (isLoading) return <Loading />;
  //console.log(users);
  return (
    <div className="overflow-x-auto text-black">
      <table className="table">
        {/* head */}
        <thead className="text-black">
          <tr>
            <th></th>
            <th>Name/image</th>
            <th>Email</th>
            <th>Role</th>
            <th>Status</th>
            <th>
              <button>details</button>
            </th>
          </tr>
        </thead>
        <tbody>
          {/* row 1 */}
          {users.map(item => (
            <tr key={item._id}>
              <th></th>
              <td>
                <div className="flex items-center gap-3">
                  <div className="avatar">
                    <div className=" h-12 w-12">
                      <img
                        src={item.image}
                        alt="Avatar Tailwind CSS Component"
                        referrerPolicy="no-referrer"
                      />
                    </div>
                  </div>
                  <div>
                    <div className="font-bold">{item.name}</div>
                  </div>
                </div>
              </td>
              <td>{item.email}</td>
              <td>{item.role}</td>
              <td className="text-center">
                <p
                  className={`px-2 py-1  text-sm font-medium rounded
                    ${item.status === 'none' && 'bg-red-200 text-red-400'}
                    ${
                      item.status === 'Pending' && 'bg-amber-200 text-amber-400'
                    }
                    ${item.status === 'Active' && 'bg-green-200 text-green-400'}
                    `}
                >
                  {item?.status}
                </p>
              </td>
              <td className="flex gap-8 mt-2">
                <button
                  onClick={() => handleApprove(item._id)}
                  disabled={item.status == 'none'}
                  className="disabled:cursor-not-allowed"
                >
                  <FaRegCheckCircle className="text-green-500 " size={20} />
                </button>
                <button
                  onClick={() => handleDeleteUser(item._id)}
                  className="cursor-pointer"
                >
                  <MdDelete className="text-red-500 " size={20} />
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default UsersData;
