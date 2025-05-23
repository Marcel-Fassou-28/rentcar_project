import {
  BarChart,
  Bar,
  Rectangle,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";

const ReservationChart = ({reservationData}) => {
  // const reservationData = [
  //   { mois: "Jan", reservations: 65 },
  //   { mois: "Fév", reservations: 59 },
  //   { mois: "Mar", reservations: 80 },
  //   { mois: "Avr", reservations: 81 },
  //   { mois: "Mai", reservations: 90 },
  //   { mois: "Juin", reservations: 125 },
  //   { mois: "Juil", reservations: 160 },
  //   { mois: "Août", reservations: 155 },
  //   { mois: "Sept", reservations: 90 },
  //   { mois: "Oct", reservations: 85 },
  //   { mois: "Nov", reservations: 63 },
  //   { mois: "Déc", reservations: 70 },
  // ];

  

  return (
    <div className="shadow-[0_0_15px_rgba(0,0,0,0.1)] w-[96%] m- lg:w-[98%]">
      <h2 className="text-2xl  m-4 text-gray-500">Reservations Mensuelles</h2>
      <ResponsiveContainer width="90%" height={400}>
        <BarChart width={700} height={250} data={reservationData}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="mois" />
          <YAxis />
          <Tooltip />
          <Legend />
          <Bar dataKey="reservations" fill="#2bf" />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};

export default ReservationChart;
