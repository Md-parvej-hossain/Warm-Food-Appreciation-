import PropTypes from 'prop-types';
import {
  Dialog,
  Transition,
  TransitionChild,
  DialogPanel,
  DialogTitle,
} from '@headlessui/react';
import { Fragment } from 'react';
import { loadStripe } from '@stripe/stripe-js';
const stripePromise = loadStripe(import.meta.env.VITE_PAYMENT_CLINT_KEY);
import { Elements } from '@stripe/react-stripe-js';
import CheckoutForm from '../pages/payment/CheckoutForm';
import useAuth from '../hooks/useAuth';

const PaymentFrom = ({ closeModal, open }) => {
  const { user } = useAuth();
  return (
    <Transition appear show={open} as={Fragment}>
      <Dialog as="div" className="relative z-50" onClose={closeModal}>
        <TransitionChild
          as={Fragment}
          enter="ease-out duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 bg-black bg-opacity-25" />
        </TransitionChild>

        <div className="fixed inset-0 overflow-y-auto">
          <div className="flex min-h-full items-center justify-center p-4 text-center">
            <TransitionChild
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 scale-95"
              enterTo="opacity-100 scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 scale-100"
              leaveTo="opacity-0 scale-95"
            >
              <DialogPanel className="w-full max-w-md transform overflow-hidden rounded-2xl bg-white p-6 text-left align-middle shadow-xl transition-all">
                <DialogTitle
                  as="h3"
                  className="text-lg font-medium text-center leading-6 text-gray-900"
                >
                  Review Info Before Payment
                </DialogTitle>
                <div className="mt-2">
                  <p className="text-sm text-gray-500">
                    Name: {user?.displayName}
                  </p>
                </div>
                <div className="mt-2">
                  <p className="text-sm text-gray-500">Email: {user?.email}</p>
                </div>

                <hr className="mt-8 " />
                {/* checkout form */}
                <Elements stripe={stripePromise}>
                  <CheckoutForm closeModal={closeModal} />
                </Elements>
              </DialogPanel>
            </TransitionChild>
          </div>
        </div>
      </Dialog>
    </Transition>
  );
};

PaymentFrom.propTypes = {
  bookingInfo: PropTypes.object,
  closeModal: PropTypes.func,
  open: PropTypes.bool,
};

export default PaymentFrom;
