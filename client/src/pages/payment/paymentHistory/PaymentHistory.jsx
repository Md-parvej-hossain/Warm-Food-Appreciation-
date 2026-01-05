import toast from 'react-hot-toast';
import Loading from '../../../shared/loadingSpnier/Loading';
import { useQuery } from '@tanstack/react-query';
import useAuth from '../../../hooks/useAuth';
import useAxiosSecure from '../../../hooks/useAxiosSecure';

const PaymentHistory = () => {
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();
  const {
    data: paymentData = [],
    isLoading,
    isError,
    refetch,
  } = useQuery({
    queryKey: ['paymentHistory'],
    queryFn: async () => {
      const res = await axiosSecure.get(`/api/paymentHistory`);
      return res.data;
    },
  });
  const handleSubmit = async (id, e) => {
    const status = e.target.value;
    try {
      await axiosSecure.patch(`/api/updatePaymentStatus/${id}`, { status });
      refetch();
      toast.success('Status updated');
    } catch (error) {
      toast.error('Failed to update status');
    }
  };
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
            <th>Status</th>
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
              <td>
                <select
                  name="status"
                  defaultValue={data.status}
                  disabled={data.status === 'Delivered'}
                  className="select select-bordered w-full bg-white text-black"
                  onChange={e => handleSubmit(data._id, e)}
                >
                  <option value="Pending">Pending</option>
                  <option value="Confirmed">Confirmed</option>
                  <option value="Shipped">Shipped</option>
                  <option value="Out for Delivery">Out for Delivery</option>
                  <option value="Delivered">Delivered</option>
                </select>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default PaymentHistory;
