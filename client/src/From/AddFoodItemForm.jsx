import axios from 'axios';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import toast from 'react-hot-toast';
import useAxiosPublic from '../hooks/useAxiosPublic';
import { useNavigate } from 'react-router';
const AddFoodItemForm = () => {
  const [imgUrl, setImgUrl] = useState('');
  const axiosPublic = useAxiosPublic();
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const queryClient = useQueryClient();
  const addFoodMutation = useMutation({
    mutationFn: async foodData => {
      try {
        const res = await axiosPublic.post('/api/foods', foodData);
        return res.data;
      } catch (error) {
        toast.error(error.message);
      }
    },
    onSuccess: () => {
      toast.success('Food added successfully 🍔');
      navigate('/dashboard/allFoods');
      queryClient.invalidateQueries(['foods']);
    },
    onError: error => {
      toast.error(error.message);
    },
  });

  const onSubmit = data => {
    //console.log('Food item submitted:', data);
    const foodData = {
      category: data.category,
      description: data.description,
      name: data.name,
      price: Number(data.price),
      time: data.time,
      rating: data.rating,
      views: data.views,
      type: data.type,
      discount: Number(data.discount) || 0,
      image: imgUrl,
      createdAt: new Date(),
    };
    //console.log(foodData);
    addFoodMutation.mutate(foodData);
  };

  // const imageFile = watch('image');
  const handleImgUpload = async e => {
    const img = e.target.files[0];
    //console.log(img);
    const formData = new FormData();
    //console.log(formData);
    formData.append('image', img);
    const res = await axios.post(
      `https://api.imgbb.com/1/upload?key=${
        import.meta.env.VITE_Image_upload_key
      }`,
      formData
    );
    const imgUrls = res.data.data.display_url;

    setImgUrl(imgUrls);
  };
  //console.log(imgUrl);
  return (
    <div className="w-full md:w-9/12 mx-auto p-6 text-gray-800 bg-white shadow-md rounded-md">
      <h2 className="text-xl font-semibold mb-4">Add Food Item</h2>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        {/* Food Name */}
        <div>
          <label className="block mb-1 font-medium">Food Name</label>
          <input
            type="text"
            {...register('name', { required: 'Food name is required' })}
            placeholder="Enter food name"
            className="w-full border border-gray-300 rounded px-3 py-2"
          />
          {errors.name && (
            <p className="text-red-500 text-sm">{errors.name.message}</p>
          )}
        </div>

        {/* Category */}
        <div>
          <label className="block mb-1 font-medium">Category</label>
          <select
            {...register('category', { required: 'Category is required' })}
            className="w-full border border-gray-300 rounded px-3 py-2"
          >
            <option value="">Select category</option>
            <option value="pizza">Pizza</option>
            <option value="burger">Burger</option>
            <option value="biryani">Biryani</option>
            <option value="chinese">Chinese</option>
            <option value="desserts">Desserts</option>
            <option value="friedChicken">Fried Chicken</option>
            <option value="drinks">Drinks</option>
            <option value="pasta">Pasta</option>
          </select>
          {errors.category && (
            <p className="text-red-500 text-sm">{errors.category.message}</p>
          )}
        </div>

        {/* Type */}
        <div>
          <label className="block mb-1 font-medium">Type</label>
          <select
            {...register('type', { required: 'Type is required' })}
            className="w-full border border-gray-300 rounded px-3 py-2"
          >
            <option value="regular">Regular</option>
            <option value="popular">Popular</option>
            <option value="offer">Offer</option>
            <option value="fastdelivery">FastDelivery</option>
          </select>
          {errors.type && (
            <p className="text-red-500 text-sm">{errors.type.message}</p>
          )}
        </div>

        {/* Price */}
        <div>
          <label className="block mb-1 font-medium">Price</label>
          <input
            type="number"
            {...register('price', { required: 'Price is required', min: 0 })}
            placeholder="Enter price"
            className="w-full border border-gray-300 rounded px-3 py-2"
          />
          {errors.price && (
            <p className="text-red-500 text-sm">{errors.price.message}</p>
          )}
        </div>
        {/* discount */}
        <div>
          <label className="block mb-1 font-medium">Discount</label>
          <input
            type="number"
            {...register('discount', {
              required: 'discount is required',
              min: 0,
            })}
            placeholder="Enter discount"
            className="w-full border border-gray-300 rounded px-3 py-2"
          />
          {errors.discount && (
            <p className="text-red-500 text-sm">{errors.discount.message}</p>
          )}
        </div>
        {/* rating */}
        <div>
          <label className="block mb-1 font-medium">Rating</label>
          <input
            type="number"
            {...register('rating', {
              required: 'rating is required',
              min: 0,
            })}
            placeholder="Enter rating"
            className="w-full border border-gray-300 rounded px-3 py-2"
          />
          {errors.rating && (
            <p className="text-red-500 text-sm">{errors.rating.message}</p>
          )}
        </div>
        {/* views */}
        <div>
          <label className="block mb-1 font-medium">Views</label>
          <input
            type="number"
            {...register('views', {
              required: 'views is required',
              min: 0,
            })}
            placeholder="Enter views"
            className="w-full border border-gray-300 rounded px-3 py-2"
          />
          {errors.views && (
            <p className="text-red-500 text-sm">{errors.views.message}</p>
          )}
        </div>
        {/* Crating time */}
        <div>
          <label className="block mb-1 font-medium">Creating time</label>
          <input
            type="number"
            {...register('time', { required: 'Time is required', min: 0 })}
            placeholder="Enter Creating time"
            className="w-full border border-gray-300 rounded px-3 py-2"
          />
          {errors.time && (
            <p className="text-red-500 text-sm">{errors.time.message}</p>
          )}
        </div>

        {/* Image */}
        <div>
          <label className="block mb-1 font-medium ">Image</label>
          <div className="flex justify-between items-center">
            <input
              onChange={handleImgUpload}
              type="file"
              name="img"
              id="img"
              title="Enter your img"
              placeholder="Your img"
              className="w-full px-3 py-2 border rounded-md dark:border-gray-300 dark:bg-gray-50 dark:text-gray-800 "
            />
          </div>
        </div>

        {/* Description */}
        <div>
          <label className="block mb-1 font-medium">Description</label>
          <textarea
            {...register('description')}
            placeholder="Enter food description"
            className="w-full border border-gray-300 rounded px-3 py-2"
          />
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          className="w-full bg-blue-600 text-white py-2 px-4 rounded hover:bg-blue-700 transition"
        >
          Add Food Item
        </button>
      </form>
    </div>
  );
};

export default AddFoodItemForm;
