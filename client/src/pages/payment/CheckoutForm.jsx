import { CardElement, useElements, useStripe } from '@stripe/react-stripe-js';
import { useEffect, useState } from 'react';
import './CheckoutForm.css';
import useAuth from '../../hooks/useAuth';
import { ImSpinner9 } from 'react-icons/im';
import useAxiosSecure from '../../hooks/useAxiosSecure';
import { useNavigate } from 'react-router';
import useAxiosPublic from '../../hooks/useAxiosPublic';
import toast from 'react-hot-toast';
const CheckoutForm = ({ closeModal }) => {
  const stripe = useStripe();
  const elements = useElements();
  const { user } = useAuth();
  const [cardError, setCardError] = useState('');
  const [processing, setProcessing] = useState(false);
  const [clientSecret, setClientSecret] = useState('');
  const axiosSecure = useAxiosSecure();
  const navigate = useNavigate();
  const axiosPublic = useAxiosPublic();
  const price = 400;
  // get stripe client secret
  const getClientSecret = async totalPrice => {
    try {
      const { data } = await axiosSecure.post('/api/create-payment-intent', {
        price: totalPrice,
      });
      setClientSecret(data.clientSecret);
    } catch (error) {
      console.error('Failed to get client secret:', error);
    }
  };

  // fetch client secret when price changes
  useEffect(() => {
    if (price > 0) {
      getClientSecret(price);
    }
  }, [price]);
  const handleSubmit = async event => {
    event.preventDefault();
    setProcessing(true);
    if (!stripe || !elements) {
      return;
    }

    const card = elements.getElement(CardElement);
    if (card === null) {
      return;
    }

    const { paymentMethod, error } = await stripe.createPaymentMethod({
      type: 'card',
      card,
    });

    if (error) {
      //console.log('error', error);
      setProcessing(false);
      setCardError(error.message);
    } else {
      setCardError('');
      // //console.log('payment method', paymentMethod);
    }

    setProcessing(true);

    const { paymentIntent, error: confirmError } =
      await stripe.confirmCardPayment(clientSecret, {
        payment_method: {
          card: card,
          billing_details: {
            email: user?.email,
            name: user?.displayName,
          },
        },
      });

    if (confirmError) {
      //console.log(confirmError);
      setProcessing(false);
      setCardError(confirmError.message);
    }

    // //console.log('payment intent', paymentIntent);

    if (paymentIntent.status === 'succeeded') {
      const paymentInfo = {
        email: user?.email,
        name: user?.displayName,
        amount: paymentIntent.amount / 100,
        transactionId: paymentIntent.id,
        status: 'Pending',
        date: new Date(),
      };

      //console.log(paymentInfo);
      try {
        const res = await axiosPublic.post('/api/paymentHistory', paymentInfo);
        setProcessing(false);
        localStorage.clear();
        setProcessing(false);
        navigate('/dashboard');
        return res.data;
      } catch (error) {
        toast.error(error.message);
      }
    }
  };

  return (
    <>
      <form className="my-2" onSubmit={handleSubmit}>
        <CardElement
          options={{
            style: {
              base: {
                fontSize: '16px',
                color: '#424770',
                '::placeholder': {
                  color: '#aab7c4',
                },
              },
              invalid: {
                color: '#9e2146',
              },
            },
          }}
        />
        <div className="flex mt-2 justify-between">
          <button
            type="button"
            className="inline-flex justify-center rounded-md border border-transparent bg-red-100 px-4 py-2 text-sm font-medium text-red-900 hover:bg-red-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-red-500 focus-visible:ring-offset-2"
            onClick={closeModal}
          >
            Cancel
          </button>
          <button
            type="submit"
            disabled={!stripe || !clientSecret || processing}
            className="inline-flex justify-center rounded-md border border-transparent bg-green-100 px-4 py-2 text-sm font-medium text-green-900 hover:bg-green-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-green-500 focus-visible:ring-offset-2"
          >
            {processing ? (
              <ImSpinner9 className="m-auto animate-spin" size={24} />
            ) : (
              `Pay ${price}$`
            )}
          </button>
        </div>
      </form>
      {cardError && <p className="text-red-600 ml-8">{cardError}</p>}
    </>
  );
};

export default CheckoutForm;
