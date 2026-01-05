import useAuth from '../../../hooks/useAuth';
import { CgProfile } from 'react-icons/cg';
import useRole from '../../../hooks/useRole';
import Loading from '../../../shared/loadingSpnier/Loading';

const DashboardProfile = () => {
  const { user } = useAuth();
  const { role, isLoading } = useRole();

  if (isLoading) return <Loading />;

  return (
    <div className="min-h-screen w-full bg-base-200 flex items-center justify-center px-4 py-8">
      <div className="w-full max-w-5xl bg-white rounded-2xl shadow-lg p-6 md:p-10">
        <div className="flex flex-col md:flex-row items-center gap-8">
          {/* AVATAR */}
          <div className="flex justify-center">
            <div className="avatar">
              <div className="w-40 h-40 md:w-56 md:h-56 rounded-full ring ring-primary ring-offset-base-100 ring-offset-4 overflow-hidden flex items-center justify-center bg-gray-100">
                {user?.photoURL ? (
                  <img
                    src={user.photoURL}
                    alt="User Avatar"
                    referrerPolicy="no-referrer"
                    className="object-cover"
                  />
                ) : (
                  <CgProfile size={90} className="text-gray-400" />
                )}
              </div>
            </div>
          </div>

          {/* USER INFO */}
          <div className="flex-1 space-y-4 text-center md:text-left">
            <h2 className="text-2xl md:text-3xl font-bold text-gray-800">
              {user?.displayName || 'No Name Available'}
            </h2>

            <p className="text-sm md:text-base text-gray-500">
              Email: <span className="text-gray-800">{user?.email}</span>
            </p>

            <p className="inline-block px-4 py-1 rounded-full bg-primary/10 text-primary font-medium">
              Role: {role || 'User'}
            </p>

            {/* ACTION BUTTON */}
            <div className="pt-4">
              <button className="btn btn-primary px-8">Update Profile</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DashboardProfile;
