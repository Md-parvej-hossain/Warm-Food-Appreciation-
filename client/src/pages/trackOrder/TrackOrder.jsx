import useAxiosSecure from '../../hooks/useAxiosSecure';
import Loading from '../../shared/loadingSpnier/Loading';
import toast from 'react-hot-toast';
import useAuth from '../../hooks/useAuth';
import { useQuery } from '@tanstack/react-query';
const STATUS_FLOW = [
  'Pending',
  'Confirmed',
  'Shipped',
  'Out for Delivery',
  'Delivered',
];
const TrackOrder = () => {
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();
  const {
    data: paymentData = [],
    isLoading,
    isError,
  } = useQuery({
    queryKey: ['paymentHistory'],
    queryFn: async () => {
      const res = await axiosSecure.get(
        `/api/paymentHistory?email=${user?.email}`
      );
      return res.data;
    },
  });
  const firstItem = paymentData[0];
  if (isError) return toast.error('Faled to featch');
  if (isLoading) return <Loading />;
  const currentIndex = STATUS_FLOW.indexOf(firstItem?.status);

  // ✅ NO DATA CASE
  if (!paymentData.length || !user) {
    return (
      <div className="max-w-3xl mx-auto p-6 my-20 text-center">
        <h2 className="text-2xl font-semibold mb-4">Track Your Order</h2>
        <p className="text-gray-500">No order found for your account.</p>
      </div>
    );
  }
  return (
    <div className="max-w-3xl mx-auto p-6 my-20">
      <h2 className="text-2xl font-semibold text-center mb-6">
        Track Your Order
      </h2>

      {/* Order Details */}

      <div className="card bg-base-100 shadow mt-6">
        <div className="card-body">
          <p>
            <strong>Tracking ID: {firstItem?.transactionId}</strong>
          </p>
          <p>
            <strong>Status:</strong>
            <span className=" "> {firstItem?.status}</span>
          </p>
          <p>
            <strong>Name:</strong>
            <span className=" "> {user?.displayName}</span>
          </p>

          {/* Pending | Confirmed | Shipped | Out for Delivery | Delivered */}
          <ul className="timeline timeline-vertical lg:timeline-horizontal w-full mx-auto my-10">
            {STATUS_FLOW.map((status, index) => {
              const isCompleted = index <= currentIndex;
              const isLast = index === STATUS_FLOW.length - 1;

              return (
                <li key={status}>
                  {/* line before */}
                  {index !== 0 && (
                    <hr
                      className={isCompleted ? 'bg-primary' : 'bg-gray-300'}
                    />
                  )}

                  {/* content */}
                  <div
                    className={
                      index % 2 === 0
                        ? 'timeline-start timeline-box'
                        : 'timeline-end timeline-box'
                    }
                  >
                    {status}
                  </div>

                  {/* icon */}
                  <div className="timeline-middle">
                    {isCompleted ? (
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 20 20"
                        fill="currentColor"
                        className="h-5 w-5 text-primary"
                      >
                        <path
                          fillRule="evenodd"
                          d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.857-9.809a.75.75 0 00-1.214-.882l-3.483 4.79-1.88-1.88a.75.75 0 10-1.06 1.061l2.5 2.5a.75.75 0 001.137-.089l4-5.5z"
                          clipRule="evenodd"
                        />
                      </svg>
                    ) : (
                      <div className="h-3 w-3 rounded-full bg-gray-400"></div>
                    )}
                  </div>

                  {/* line after */}
                  {!isLast && (
                    <hr
                      className={isCompleted ? 'bg-primary' : 'bg-gray-300'}
                    />
                  )}
                </li>
              );
            })}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default TrackOrder;
