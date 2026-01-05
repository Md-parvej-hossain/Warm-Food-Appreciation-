import {
  LineChart,
  Line,
  BarChart,
  Bar,
  PieChart,
  Pie,
  Cell,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from 'recharts';

const growthData = [
  { month: 'Jan', customers: 120 },
  { month: 'Feb', customers: 180 },
  { month: 'Mar', customers: 260 },
  { month: 'Apr', customers: 310 },
  { month: 'May', customers: 390 },
  { month: 'Jun', customers: 450 },
];

const typeData = [
  { name: 'New Customers', value: 65 },
  { name: 'Returning Customers', value: 35 },
];

const COLORS = ['#facc15', '#22c55e'];

const CustomerStatistics = () => {
  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div>
        <h2 className="text-3xl font-bold text-black">Customer Statistics</h2>
        <p className="text-gray-500">Customer behavior & growth overview</p>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="card bg-base-100 shadow">
          <div className="card-body">
            <h3 className="text-gray-500">Total Customers</h3>
            <p className="text-3xl font-bold">1,245</p>
          </div>
        </div>

        <div className="card bg-base-100 shadow">
          <div className="card-body">
            <h3 className="text-gray-500">New Customers</h3>
            <p className="text-3xl font-bold text-yellow-500">+245</p>
          </div>
        </div>

        <div className="card bg-base-100 shadow">
          <div className="card-body">
            <h3 className="text-gray-500">Returning</h3>
            <p className="text-3xl font-bold text-green-500">780</p>
          </div>
        </div>

        <div className="card bg-base-100 shadow">
          <div className="card-body">
            <h3 className="text-gray-500">Growth Rate</h3>
            <p className="text-3xl font-bold text-blue-500">+18%</p>
          </div>
        </div>
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Line Chart */}
        <div className="card bg-base-100 shadow">
          <div className="card-body">
            <h3 className="font-semibold mb-4">Customer Growth</h3>
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={growthData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="month" />
                <YAxis />
                <Tooltip />
                <Line
                  type="monotone"
                  dataKey="customers"
                  stroke="#facc15"
                  strokeWidth={3}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Pie Chart */}
        <div className="card bg-base-100 shadow">
          <div className="card-body">
            <h3 className="font-semibold mb-4">Customer Type</h3>
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  data={typeData}
                  cx="50%"
                  cy="50%"
                  innerRadius={60}
                  outerRadius={100}
                  dataKey="value"
                >
                  {typeData.map((_, index) => (
                    <Cell key={index} fill={COLORS[index]} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CustomerStatistics;
