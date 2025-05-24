import { div } from "framer-motion/client";
import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts"; 


const EtatCarChar = ({data}) => {
const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042"];


const CustomLabel = ({ cx, cy, midAngle, innerRadius, outerRadius, index }) => {
  const RADIAN = Math.PI / 180;
  const radius = innerRadius + (outerRadius - innerRadius) * 1.39;
  const x = cx  + radius * Math.cos(-midAngle * RADIAN);
  const y = cy  + radius * Math.sin(-midAngle * RADIAN);

  return (
    <text x={x} y={y} fill={COLORS[index]}  dominantBaseline="central" fontSize={14}>
      {data[index].name}:{data[index].value}
    </text>
  );
};

  return (
    <div className="shadow-gray-200 p-2 w-full max-w-[95%] mx-auto bg-gray-100 shadow-md rounded-lg">
      <h2 className="text-2xl text-center uppercase  font-semibold m-4 text-black">Etats Des Voitures</h2>
      <ResponsiveContainer width="90%" height={370}>
        <PieChart width={500} height={500}>
          <Pie
            data={data}
            cx="50%"
            cy="50%"
            outerRadius={100}
            fill="#8884d8"
            dataKey="value"
            
            label={CustomLabel}
          >
            {data.map((entry, index) => (
              <Cell
                key={`cell-${index}`}
                fill={COLORS[index % COLORS.length]}
              />
            ))}
          </Pie>
         
          <Legend/>
        </PieChart>
      </ResponsiveContainer>
    </div>
  );
};

export default EtatCarChar;
