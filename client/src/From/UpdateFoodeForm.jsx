import { useState } from 'react';
import useAxiosPublic from '../hooks/useAxiosPublic';
import axios from 'axios';
import { useQuery } from '@tanstack/react-query';
import { useNavigate, useParams } from 'react-router';
import toast from 'react-hot-toast';

const UpdateFoodeForm = () => {
  const [imgUrl, setImgUrl] = useState('');
  const axiosPublic = useAxiosPublic();
  const { id } = useParams();
  const navigate = useNavigate();
  /* ---------------- Fetch single food ---------------- */
  const { data: food = {}, isLoading } = useQuery({
    queryKey: ['food', id],
    queryFn: async () => {
      const res = await axiosPublic.get(`/api/foods/${id}`);
      return res.data;
    },
    enabled: !!id,
  });

  /* ---------------- Image Upload ---------------- */
  const handleImgUpload = async e => {
    const img = e.target.files[0];
    if (!img) return;
    const formData = new FormData();
    formData.append('image', img);
    try {
      const res = await axios.post(
        `https://api.imgbb.com/1/upload?key=${
          import.meta.env.VITE_Image_upload_key
        }`,
        formData
      );
      setImgUrl(res.data.data.display_url);
    } catch (err) {
      //console.log(err);
    }
  };
  if (isLoading) return <p>Loading...</p>;
  /* ---------------- Submit ---------------- */
  const handleSubmit = async e => {
    e.preventDefault();
    const form = e.target;
    const updatedFood = {
      name: form.name.value,
      category: form.category.value,
      type: form.type.value,
      price: Number(form.price.value),
      discount: Number(form.discount.value),
      creatingTime: form.creatingTime.value,
      image: imgUrl || food.image, // keep old image if not changed
      description: form.description.value,
    };
    //console.log(updatedFood);
    try {
      const res = await axiosPublic.put(`/api/foods/${id}`, updatedFood);
      // ✅ success check
      if (res.data?.modifiedCount > 0 || res.data?.success) {
        toast.success('Food updated successfully ✅');
        navigate('/dashboard/allFoods');
      } else {
        toast.error('No changes were made');
      }
      return res.data;
    } catch (error) {
      // ❌ error handle
      const message =
        error?.response?.data?.message ||
        error?.message ||
        'Failed to update food';

      toast.error(message);
      console.error('Update food error:', error);
    }
  };

  return (
    <div className="max-w-5xl mx-auto min-h-screen p-6">
      <div className="card bg-base-100 shadow-xl">
        <div className="card-body">
          <h2 className="card-title">Update Food Item</h2>

          <form onSubmit={handleSubmit} className="space-y-4">
            {/* Food Name */}
            <input
              type="text"
              name="name"
              defaultValue={food.name}
              className="input input-bordered w-full"
            />

            {/* Category */}
            <select
              name="category"
              defaultValue={food.category}
              className="select select-bordered w-full"
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

            {/* Type */}
            <select
              name="type"
              defaultValue={food.type}
              className="select select-bordered w-full"
            >
              <option value="regular">Regular</option>
              <option value="popular">Popular</option>
              <option value="offer">Offer</option>
              <option value="fastdelivery">FastDelivery</option>
            </select>

            {/* Price */}
            <input
              type="number"
              name="price"
              defaultValue={food.price}
              className="input input-bordered w-full"
            />

            {/* Discount */}
            <input
              type="number"
              name="discount"
              defaultValue={food.discount}
              className="input input-bordered w-full"
            />

            {/* Creating Time */}
            <input
              type="text"
              name="creatingTime"
              defaultValue={food.time}
              className="input input-bordered w-full"
            />

            {/* Image */}
            <input
              type="file"
              onChange={handleImgUpload}
              className="file-input file-input-bordered w-full"
            />

            {/* Preview */}
            {(imgUrl || food.image) && (
              <img
                src={imgUrl || food.image}
                className="w-24 h-24 object-cover rounded"
              />
            )}

            {/* Description */}
            <textarea
              name="description"
              defaultValue={food.description}
              className="textarea textarea-bordered w-full"
            />

            <button className="btn btn-primary w-full">Update Food Item</button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default UpdateFoodeForm;
