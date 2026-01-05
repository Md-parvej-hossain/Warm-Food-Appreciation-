import { useEffect, useState } from 'react';
import { FiX, FiTrash2 } from 'react-icons/fi';
import { deleteData, getData } from '../../utils/LocalStroge';
import useAxiosPublic from '../../hooks/useAxiosPublic';
import PaymentFrom from '../../From/PaymentFrom';
import { Link } from 'react-router';
import useAuth from '../../hooks/useAuth';
const CartDrawer = ({ isOpen, onClose, handleGetData }) => {
  const [foods, setFoods] = useState([]);
  const [open, setOpen] = useState(false);
  const carts = getData(); // array of food IDs
  const axiosPrivate = useAxiosPublic();
  const { user } = useAuth();
  // total price
  const price = foods.reduce((sum, item) => sum + (item.price || 0), 0);
  const totalPrice = price + 100 + 50;
  const foodNamesAndPrices = foods.map(food => [food.name, food.price, price]);
  const foodInfo = foodNamesAndPrices;
  // fetch foods
  useEffect(() => {
    const fetchFoods = async () => {
      try {
        const validIds = [...new Set(carts)].filter(Boolean);

        const responses = await Promise.all(
          validIds.map(id => axiosPrivate.get(`/api/foods/${id}`))
        );

        const newFoods = responses.map(res => res.data);
        setFoods(newFoods);

        handleGetData(newFoods.length);
      } catch (error) {
        console.error('Failed to fetch foods:', error);
      }
    };

    if (carts?.length > 0) {
      fetchFoods();
    }
  }, [carts, axiosPrivate]);

  const closeModal = () => {
    setOpen(false);
  };
  return (
    <>
      {/* Overlay */}
      {isOpen && (
        <div onClick={onClose} className="fixed inset-0 z-40 bg-black/60 " />
      )}

      {/* Drawer */}
      <div
        className={`fixed right-0 top-0 z-50 w-96 h-screen bg-black text-white shadow-xl
  flex flex-col transform transition-transform duration-300
  ${isOpen ? 'translate-x-0' : 'translate-x-full'}`}
      >
        {/* Header */}
        <div className="flex items-center justify-between border-b border-gray-800 p-4">
          <h2 className="text-lg font-semibold">Your Cart</h2>
          <button onClick={onClose} className="hover:text-gray-400">
            <FiX size={22} />
          </button>
        </div>

        {/* Cart Items */}
        <div className="flex-1 min-h-0 overflow-y-auto p-4 space-y-4 bg-[#2a1f1b]">
          {foods.length === 0 ? (
            <p className="text-center text-gray-400">Cart is empty</p>
          ) : (
            foods.map(food => (
              <div
                key={food._id}
                className="flex items-center gap-3 rounded-lg border border-gray-800 p-3"
              >
                <img
                  src={food.image}
                  alt={food.name}
                  className="h-14 w-14 rounded object-cover"
                  referrerPolicy="no-referrer"
                />

                <div className="flex-1">
                  <h4 className="text-sm font-medium">{food.name}</h4>
                  <p className="text-xs text-gray-400">
                    ৳{food.price} × {1}
                  </p>
                </div>
                {/* Quantity Control */}
                <div className="flex items-center gap-2 mt-1">
                  <button
                    // onClick={() => decreaseQty(food._id)}
                    className="px-2 py-1 bg-gray-700 rounded hover:bg-gray-600 cursor-pointer"
                  >
                    −
                  </button>

                  <span className="text-sm">{food.quantity}</span>

                  <button
                    // onClick={() => increaseQty(food._id)}
                    className="px-2 py-1 bg-gray-700 rounded hover:bg-gray-600 cursor-pointer"
                  >
                    +
                  </button>
                </div>
                <button
                  onClick={() => deleteData(food._id)}
                  className="text-red-500 hover:text-red-600 cursor-pointer"
                >
                  <FiTrash2 />
                </button>
              </div>
            ))
          )}
          <div className="border-t border-gray-800 p-4 bg-[#3a1f1b]">
            <div className="flex justify-between text-sm mb-3">
              <span className="text-gray-400">Delivery</span>
              <span className="font-semibold">৳ {price && 100}</span>
            </div>
            <div className="flex justify-between text-sm mb-3">
              <span className="text-gray-400">Service</span>
              <span className="font-semibold">৳ {price && 50}</span>
            </div>
            <div className="flex justify-between text-sm mb-3">
              <span className="text-gray-400">Food Price</span>
              <span className="font-semibold">৳ {price}</span>
            </div>
            <div className="divider"></div>
            <div className="flex justify-between text-sm mb-3">
              <span className="text-gray-400">Total</span>
              <span className="font-semibold">
                ৳ {price > 0 ? totalPrice : 0}
              </span>
            </div>

            <PaymentFrom open={open} closeModal={closeModal} />
            {/* chack out from payment  */}
            <div>
              {user ? (
                <button
                  onClick={() => price > 0 && setOpen(true)}
                  className={`w-full text-center my-2 font-bold py-2 px-4 rounded
    ${
      price === 0
        ? 'bg-blue-300 cursor-not-allowed opacity-50'
        : 'bg-blue-500 hover:bg-blue-400 cursor-pointer'
    }`}
                >
                  Check out
                </button>
              ) : (
                <Link
                  to={'/login'}
                  className="text-center"
                  title="login Please"
                >
                  Check out
                </Link>
              )}
            </div>

            <PaymentFrom open={open} closeModal={closeModal} />
          </div>
        </div>
      </div>
    </>
  );
};

export default CartDrawer;
