import { FaRegUserCircle } from 'react-icons/fa';
import useAuth from '../../hooks/useAuth';
import { Link } from 'react-router';
import { useState } from 'react';
import ProfileModal from '../../components/modal/ProfileModal';

const Profile = () => {
  const { logOut, user } = useAuth();
  const [open, setOpen] = useState(false);
  return (
    <div className="dropdown   dropdown-hover dropdown-end">
      {/* Button */}
      <label tabIndex={0} className="btn btn-ghost btn-circle">
        {user ? (
          <img
            src={user?.photoURL}
            alt=""
            className="rounded-full object-cover"
            referrerPolicy="no-referrer"
          />
        ) : (
          <FaRegUserCircle className="size-8" />
        )}
      </label>

      {/* Dropdown */}
      {user && (
        <ul
          tabIndex={0}
          className="dropdown-content menu p-2 shadow bg-base-100 rounded-box w-44"
        >
          <li onClick={() => setOpen(true)}>
            <a>Profile</a>
          </li>

          <li>
            <a>Help</a>
          </li>
          <li>
            <Link to={'/dashboard'}>Dashboard</Link>
          </li>
          <li>
            <a onClick={() => logOut()} className="text-red-500">
              Sign Out
            </a>
          </li>
        </ul>
      )}
      <ProfileModal isOpen={open} onClose={() => setOpen(false)} user={user} />
    </div>
  );
};

export default Profile;
