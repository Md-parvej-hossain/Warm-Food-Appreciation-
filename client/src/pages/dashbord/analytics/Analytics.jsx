import useRole from '../../../hooks/useRole';
import RiderStatistics from '../rider/RiderStatistic';
import AdminStatistics from './../admin/AdminStatistics';
import CustomerStatistics from './../userData/CustomerStatistics';

const Analytics = () => {
  const { role } = useRole();
  //console.log(role);
  return (
    <div>
      {role === 'Rider' && <RiderStatistics />}
      {role === 'Admin' && <AdminStatistics />}
      {role === 'user' && <CustomerStatistics />}
    </div>
  );
};

export default Analytics;
