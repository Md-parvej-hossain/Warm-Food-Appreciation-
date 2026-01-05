import axios from 'axios';

// save or update user in db
export const saveUserInDb = async user => {
  const { data } = await axios.post(
    `${import.meta.env.VITE_API_URL}/api/users`,
    user
  );

  //console.log(data);
};
