import Actu from "./composants/Actu";
import CalendarTodayOutlinedIcon from "@mui/icons-material/CalendarTodayOutlined";
import GroupOutlinedIcon from '@mui/icons-material/GroupOutlined';
import MonetizationOnOutlinedIcon from '@mui/icons-material/MonetizationOnOutlined';import AirportShuttleIcon from "@mui/icons-material/AirportShuttle";
import ReservationChart from "./composants/ReservatonChart";
import RevenuChart from "./composants/RevenuChart";
import EtatCarChar from "./composants/EtatCarChar";
import HistoriqueReservations from "./composants/HistoriqueReservations";
const Dashboard = () => {
  const calendar = [
    {
      icon: (
        <div className="bg-blue-200 rounded-full w-12 h-12  flex items-center justify-center">
          <CalendarTodayOutlinedIcon className="text-blue-700" />
        </div>
      ),

      title: "Reservations (Aujourdhui)",
      value: 20,
      link: "/reservation",
      percent: 10,
    },
    {
      icon: (
        <div className="bg-green-200 rounded-full w-12 h-12   flex items-center justify-center">
          <AirportShuttleIcon className="text-green-500" />
        </div>
      ),
      title: "Vehicules (disponibles)",
      value: 3,
      link: "/models",
      percent: -5,
    },
    {
      icon: (
        <div className="bg-yellow-200 rounded-full w-12 h-12  flex items-center justify-center">
          <GroupOutlinedIcon className="text-yellow-700" />
        </div>
      ),
      title: "nouveaux Clients",
      value: 10,
      link: "/clients",
      percent: 10,
    },
    {
      icon: (
        <div className="bg-pink-100 rounded-full w-12 h-12 flex items-center justify-center">
          <MonetizationOnOutlinedIcon className="text-pink-500" />
        </div>
      ),
      title: "Revenus",
      price: 1000,
      link: "/reservation",
      percent: -5,
    },

  ];

  return (
    <div className="pt-16 bg-gray-100">
      <div className="flex flex-wrap items-center justify-center   md:justify-between md:px-8">
        {
          calendar.map((unit) => (
            <Actu icons={unit} key={unit.title} />
          ))
        }
      </div>
      <div className=" px-4  flex flex-col flex-wrap lg:flex-row lg:items-center">
        <ReservationChart/>
        <RevenuChart/>
        <EtatCarChar/>
        <HistoriqueReservations/>
      </div>
     
    </div>
  );
};
export default Dashboard;
