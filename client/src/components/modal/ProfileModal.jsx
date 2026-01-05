import { Link } from 'react-router';
import { FiX } from 'react-icons/fi';

const ProfileModal = ({ isOpen, onClose, user }) => {
  if (!isOpen) return null;
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 mt-50">
      {/* Modal Box */}
      <div className="relative w-96 rounded-2xl bg-white p-6 shadow-lg dark:bg-gray-900">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute right-4 top-4 text-gray-500 hover:text-gray-700 dark:text-gray-400"
        >
          <FiX size={22} />
        </button>

        {/* User Image */}
        <div className="flex flex-col items-center">
          <img
            src={user?.photoURL}
            alt="User"
            className="h-24 w-24 rounded-full object-cover border"
          />

          {/* Name */}
          <h2 className="mt-4 text-xl font-semibold text-gray-800 dark:text-white">
            {user?.displayName ? user?.displayName : 'I am New Customer'}
          </h2>

          {/* Email */}
          <p className="text-sm text-gray-500 dark:text-gray-400">
            {user?.email}
          </p>

          {/* Role */}
          <span className="mt-2 rounded-full bg-blue-100 px-3 py-1 text-xs font-medium text-blue-600 dark:bg-blue-900 dark:text-blue-300">
            {'customer'}
          </span>

          {/* Dashboard Button */}
          <Link
            to="/dashboard"
            className="mt-6 w-full rounded-xl bg-blue-600 px-4 py-2 text-center text-white font-medium hover:bg-blue-700 transition"
          >
            Go to Dashboard
          </Link>
        </div>
      </div>
    </div>
  );
};

export default ProfileModal;
