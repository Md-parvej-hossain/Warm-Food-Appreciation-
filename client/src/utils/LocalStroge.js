import toast from 'react-hot-toast';
const CART_KEY = 'cart';
export const getData = () => {
  const storeData = localStorage.getItem(CART_KEY);
  return storeData ? JSON.parse(storeData) : [];
};

export const saveData = data => {
  const carts = getData();
  const isExist = carts.find(item => item === data);
  if (isExist) {
    toast.error('Already added to cart');
    return;
  }
  carts.push(data);
  localStorage.setItem(CART_KEY, JSON.stringify(carts));
  getData();
  toast.success('Added to cart successfully');
};

export const deleteData = id => {
  const carts = getData();
  const remaining = carts.filter(item => item !== id);
  localStorage.setItem(CART_KEY, JSON.stringify(remaining));
  getData();
  toast.success('Item removed from cart');
};
