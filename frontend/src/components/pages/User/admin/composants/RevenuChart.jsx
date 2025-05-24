import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

const RevenuChart = ({revenueData}) => {
  return (
    <div className="mt-2 lg:mt-0 p-2 max-h-fit  shadow-gray-200 w-full max-w-[95%] mx-auto bg-gray-100 shadow-md rounded-lg">
      <h2 className="text-2xl text-center uppercase  font-semibold m-4 text-black">Revenus Mensuels</h2>
      <ResponsiveContainer width="90%" height={370}>
        <AreaChart
          width={700}
          height={250}
          data={revenueData}
          margin={{ top: 10, right: 3, left: 0, bottom: 0 }}
        >
          <defs>
            <linearGradient id="colorUv" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="#8884d8" stopOpacity={0.8} />
              <stop offset="95%" stopColor="#8884d8" stopOpacity={0} />
            </linearGradient>
          </defs>
          <XAxis dataKey="mois" />
          <YAxis />
          <CartesianGrid strokeDasharray="3 3" />
          <Tooltip />
          <Area
            type="monotone"
            dataKey="revenu"
            stroke="#ff84d8"
            fillOpacity={1}
            fill="url(#colorUv)"
          />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  );
};

export default RevenuChart;
