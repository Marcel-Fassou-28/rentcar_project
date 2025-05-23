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

//     const data = [
//   { name: "Disponibles", value: 23 },
//   { name: "Loués", value: 15 },
//   { name: "En maintenance", value: 7 },
//   { name: "Hors service", value: 5 },
// ];

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
    <div className="shadow-[0_0_15px_rgba(0,0,0,0.1)] my-4 lg:ml-[2%] lg:mr-[0%]  p-4 w-[96%]  lg:w-[47%]   ">
      <h2 className="text-2xl  m-4 text-gray-500">Etats Des Voitures</h2>
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
