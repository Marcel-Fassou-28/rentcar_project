import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

// const revenueData = [
//   { mois: "Jan", revenu: 12500 },
//   { mois: "Fév", revenu: 11000 },
//   { mois: "Mar", revenu: 15500 },
//   { mois: "Avr", revenu: 16000 },
//   { mois: "Mai", revenu: 17500 },
//   { mois: "Juin", revenu: 25000 },
//   { mois: "Juil", revenu: 32000 },
//   { mois: "Août", revenu: 31000 },
//   { mois: "Sept", revenu: 18000 },
//   { mois: "Oct", revenu: 17000 },
//   { mois: "Nov", revenu: 13500 },
//   { mois: "Déc", revenu: 14000 },
// ];

const RevenuChart = ({revenueData}) => {
  return (
    <div className="shadow-[0_0_15px_rgba(0,0,0,0.1)] my-4 lg:mr-[2%] w-[96%]  lg:w-[47%]">
      <h2 className="text-2xl  m-4 text-gray-500">Revenus Mensuels</h2>
      <ResponsiveContainer width="90%" height={400}>
        <AreaChart
          width={730}
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
