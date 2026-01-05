import toast from 'react-hot-toast';
import Loading from '../../../shared/loadingSpnier/Loading';
import useAxiosPublic from '../../../hooks/useAxiosPublic';
import { useQuery } from '@tanstack/react-query';
import useAuth from '../../../hooks/useAuth';

const UserPaymentHistory = () => {
  const { user } = useAuth();
  const axiosPublic = useAxiosPublic();
  const {
    data: paymentData = [],
    isLoading,
    isError,
  } = useQuery({
    queryKey: ['paymentHistory'],
    queryFn: async () => {
      const res = await axiosPublic.get(
        `/api/paymentHistory?email=${user.email}`
      );
      return res.data;
    },
  });
  
  if (isError) return toast.error('Faled to featch');
  if (isLoading) return <Loading />;
  //console.log(paymentData);
  return (
    <div className="overflow-x-auto text-gray-700">
      <table className="table">
        {/* head */}
        <thead>
          <tr className="text-gray-700">
            <th>Name</th>
            <th>Email</th>
            <th>transactionId</th>
            <th>Amount</th>
            <th>Date</th>
            <th>status</th>
          </tr>
        </thead>
        <tbody>
          {/* row 1 */}
          {paymentData.map(data => (
            <tr key={data._id}>
              <td>
                <div className="flex items-center gap-3">
                  <div className="avatar">
                    <div className="mask mask-squircle h-12 w-12">
                      <img
                        src={user.photoURL}
                        alt="User Avatar"
                        referrerPolicy="no-referrer"
                      />
                    </div>
                  </div>
                  <div>
                    <div className="font-bold">{data.name}</div>
                  </div>
                </div>
              </td>
              <td>{data.email}</td>
              <td>{data.transactionId}</td>
              <td>{data.amount}$</td>
              <td>{new Date(data.date).toLocaleString()}</td>
              <td>{data.status}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default UserPaymentHistory;
