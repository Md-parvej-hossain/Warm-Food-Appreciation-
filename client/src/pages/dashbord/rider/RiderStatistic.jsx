import { FiDollarSign, FiClock, FiTruck } from 'react-icons/fi';
import {
  PieChart,
  Pie,
  Cell,
  ResponsiveContainer,
  Tooltip,
  Legend,
} from 'recharts';

const RiderStatistics = () => {
  // demo stats
  const totalEarnings = 45280;
  const pendingAmount = 3120;
  const totalDelivery = 128;

  const pieData = [
    { name: 'Total Earnings', value: totalEarnings },
    { name: 'Pending Amount', value: pendingAmount },
    { name: 'Deliveries', value: totalDelivery },
  ];

  const COLORS = ['#22c55e', '#facc15', '#3b82f6'];

  return (
    <div className="p-4 md:p-6">
      <h2 className="text-xl text-amber-500 font-semibold mb-6">Rider Statistics</h2>

      {/* TOP CARDS */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 mb-8">
        <StatCard
          title="Total Earnings"
          value={`৳ ${totalEarnings}`}
          icon={<FiDollarSign size={26} />}
          color="bg-green-100 text-green-600"
        />
        <StatCard
          title="Pending Amount"
          value={`৳ ${pendingAmount}`}
          icon={<FiClock size={26} />}
          color="bg-yellow-100 text-yellow-600"
        />
        <StatCard
          title="Total Delivery"
          value={totalDelivery}
          icon={<FiTruck size={26} />}
          color="bg-blue-100 text-blue-600"
        />
      </div>

      {/* PIE CHART */}
      <div className="bg-white rounded-xl shadow p-4 md:p-6">
        <h3 className="text-lg font-semibold text-amber-500 mb-4">Earnings Overview</h3>

        <div className="w-full h-[320px]">
          <ResponsiveContainer>
            <PieChart>
              <Pie
                data={pieData}
                cx="50%"
                cy="50%"
                outerRadius={110}
                innerRadius={60}
                dataKey="value"
                paddingAngle={3}
              >
                {pieData.map((_, index) => (
                  <Cell key={index} fill={COLORS[index]} />
                ))}
              </Pie>
              <Tooltip />
              <Legend />
            </PieChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
};

const StatCard = ({ title, value, icon, color }) => (
  <div className="flex items-center gap-4 bg-white p-5 rounded-xl shadow hover:shadow-lg transition">
    <div className={`p-3 rounded-full ${color}`}>{icon}</div>
    <div>
      <p className="text-sm text-gray-500">{title}</p>
      <h3 className="text-2xl font-bold text-gray-800">{value}</h3>
    </div>
  </div>
);

export default RiderStatistics;
