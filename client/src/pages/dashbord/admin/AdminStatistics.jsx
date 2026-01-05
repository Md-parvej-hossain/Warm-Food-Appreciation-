import StatCard from './StatCard';
import RevenueLineChart from './RevenueLineChart';
import OrderPieChart from './OrderPieChart';

const revenueData = [
  { month: 'Jan', revenue: 12000 },
  { month: 'Feb', revenue: 18000 },
  { month: 'Mar', revenue: 25000 },
  { month: 'Apr', revenue: 30000 },
];

const orderData = [
  { name: 'Completed', value: 55 },
  { name: 'Pending', value: 25 },
  { name: 'Cancelled', value: 20 },
];


const AdminStatistics = () => {
  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div>
        <h2 className="text-3xl font-bold text-black">Admin Dashboard</h2>
        <p className="text-gray-500">System analytics overview</p>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <StatCard title="Total Revenue" value="$145,000" />
        <StatCard title="Total Users" value="2,340" color="text-green-500" />
        <StatCard title="Total Orders" value="1,520" color="text-blue-500" />
        <StatCard title="Growth Rate" value="+22%" color="text-yellow-500" />
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <RevenueLineChart data={revenueData} />
        <OrderPieChart data={orderData} />
      </div>
    </div>
  );
};

export default AdminStatistics;
