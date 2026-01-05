import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer } from 'recharts';

const COLORS = ['#22c55e', '#facc15', '#ef4444'];

const OrderPieChart = ({ data }) => {
  return (
    <div className="card bg-base-100 shadow">
      <div className="card-body">
        <h3 className="font-semibold mb-4">Order Status</h3>

        <ResponsiveContainer width="100%" height={300}>
          <PieChart>
            <Pie
              data={data}
              cx="50%"
              cy="50%"
              outerRadius={100}
              dataKey="value"
            >
              {data.map((_, index) => (
                <Cell key={index} fill={COLORS[index]} />
              ))}
            </Pie>
            <Tooltip />
          </PieChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default OrderPieChart;
