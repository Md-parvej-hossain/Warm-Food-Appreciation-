const StatCard = ({ title, value, color }) => {
  return (
    <div className="card bg-base-100 shadow">
      <div className="card-body">
        <h3 className="text-gray-500">{title}</h3>
        <p className={`text-3xl font-bold ${color}`}>{value}</p>
      </div>
    </div>
  );
};

export default StatCard;
