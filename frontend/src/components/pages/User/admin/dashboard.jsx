import Actu from "./composants/Actu";
import CalendarTodayOutlinedIcon from "@mui/icons-material/CalendarTodayOutlined";
import GroupOutlinedIcon from "@mui/icons-material/GroupOutlined";
import MonetizationOnOutlinedIcon from "@mui/icons-material/MonetizationOnOutlined";
import AirportShuttleIcon from "@mui/icons-material/AirportShuttle";
import ReservationChart from "./composants/ReservatonChart";
import RevenuChart from "./composants/RevenuChart";
import EtatCarChar from "./composants/EtatCarChar";
import HistoriqueReservations from "./composants/HistoriqueReservations";
import Sidebar from "./composants/Sidebar";
import { User} from 'lucide-react';
import { useAuth } from "../../../AuthContext";
import { useEffect, useState } from "react";
import instance from "../../../config/Axios";
import { set } from "lodash";

const Dashboard = () => {
  const {user} = useAuth();
const [reservations, setReservations] = useState([]); 
const[voitures, setVoitures] = useState([]);
const [clients, setClients] = useState([]);
const [revenus, setRevenus] = useState([]);
const [date, setDate] = useState(new Date());
console.log(user);

useEffect(() => {

  const All = async () => {
    const [reservations, voitures, clients, revenus] = await Promise.all([
      instance.get("/admin/reservations"),
      instance.get("/voitures"),
      instance.get("/admin/users"),
      instance.get("/admin/reservations"),
    ]);
    setReservations(reservations.data);
    setVoitures(voitures.data.data);
    setClients(clients.data.data);
    setRevenus(revenus.data);
    setDate(new Date().toLocaleDateString("fr-FR"));
  };
  All();
  

        
    }, []);

  const role = user.role

  const totalReservations = reservations.length;
  const totalVoitures = voitures.length;
  const totalClients = clients.length;
  
  const RevenuHier = reservations.filter((r) => new Date(r.created_at).toLocaleDateString("fr-FR") !== date);
  const MontantTotal = reservations.reduce((acc, cur) => acc + cur.montant_total, 0);
  const MontantHier = RevenuHier.reduce((acc, cur) => acc + cur.montant_total, 0);
  const percentRevenu = (((MontantTotal -MontantHier) / MontantTotal) * 100).toFixed(0); 

  const clientHier = clients.filter((c) => new Date(c.created_at).toLocaleDateString("fr-FR") !== date);
  const percentClient = (((totalClients - clientHier.length) / totalClients) * 100).toFixed(0);

  const VoitureHier = voitures.filter((v) => new Date(v.created_at).toLocaleDateString("fr-FR") !== date);
  const percentVoiture = (((totalVoitures - VoitureHier.length) / totalVoitures) * 100).toFixed(0);

  const ReservationHier = reservations.filter((r) => new Date(r.created_at).toLocaleDateString("fr-FR") !== date);
  const percentReservation = (((totalReservations - ReservationHier.length) / totalReservations) * 100).toFixed(0);


  const reservationData = [
  { mois: "Jan", reservations: reservations.filter((r) => new Date(r.created_at).getMonth() === 0).length },
  { mois: "Fév", reservations: reservations.filter((r) => new Date(r.created_at).getMonth() === 1).length },
  { mois: "Mar", reservations: reservations.filter((r) => new Date(r.created_at).getMonth() === 2).length },
  { mois: "Avr", reservations: reservations.filter((r) => new Date(r.created_at).getMonth() === 3).length },
  { mois: "Mai", reservations: reservations.filter((r) => new Date(r.created_at).getMonth() === 4).length },
  { mois: "Juin", reservations: reservations.filter((r) => new Date(r.created_at).getMonth() === 5).length },
  { mois: "Juil", reservations: reservations.filter((r) => new Date(r.created_at).getMonth() === 6).length },
  { mois: "Août", reservations: reservations.filter((r) => new Date(r.created_at).getMonth() === 7).length },
  { mois: "Sept", reservations: reservations.filter((r) => new Date(r.created_at).getMonth() === 8).length },
  { mois: "Oct", reservations: reservations.filter((r) => new Date(r.created_at).getMonth() === 9).length },
  { mois: "Nov", reservations: reservations.filter((r) => new Date(r.created_at).getMonth() === 10).length },
  { mois: "Déc", reservations: reservations.filter((r) => new Date(r.created_at).getMonth() === 11).length }
];

const revenueData = [
  { mois: "Jan", revenu: reservations.filter((r) => new Date(r.created_at).getMonth() === 0).reduce((acc, cur) => acc + cur.montant_total, 0) },
  { mois: "Fév", revenu: reservations.filter((r) => new Date(r.created_at).getMonth() === 1).reduce((acc, cur) => acc + cur.montant_total, 0) },
  { mois: "Mar", revenu: reservations.filter((r) => new Date(r.created_at).getMonth() === 2).reduce((acc, cur) => acc + cur.montant_total, 0) },
  { mois: "Avr", revenu: reservations.filter((r) => new Date(r.created_at).getMonth() === 3).reduce((acc, cur) => acc + cur.montant_total, 0) },
  { mois: "Mai", revenu: reservations.filter((r) => new Date(r.created_at).getMonth() === 4).reduce((acc, cur) => acc + cur.montant_total, 0) },
  { mois: "Juin", revenu: reservations.filter((r) => new Date(r.created_at).getMonth() === 5).reduce((acc, cur) => acc + cur.montant_total, 0) },
  { mois: "Juil", revenu: reservations.filter((r) => new Date(r.created_at).getMonth() === 6).reduce((acc, cur) => acc + cur.montant_total, 0) },
  { mois: "Août", revenu: reservations.filter((r) => new Date(r.created_at).getMonth() === 7).reduce((acc, cur) => acc + cur.montant_total, 0) },
  { mois: "Sept", revenu: reservations.filter((r) => new Date(r.created_at).getMonth() === 8).reduce((acc, cur) => acc + cur.montant_total, 0) },
  { mois: "Oct", revenu: reservations.filter((r) => new Date(r.created_at).getMonth() === 9).reduce((acc, cur) => acc + cur.montant_total, 0) },
  { mois: "Nov", revenu: reservations.filter((r) => new Date(r.created_at).getMonth() === 10).reduce((acc, cur) => acc + cur.montant_total, 0) },
  { mois: "Déc", revenu: reservations.filter((r) => new Date(r.created_at).getMonth() === 11).reduce((acc, cur) => acc + cur.montant_total, 0) },
];

const stateCar = [
    {
      name: "disponible",
      value: voitures.filter((voiture) => voiture.statut === "disponible")
        .length,
    },
    {
      name: "Loué",
      value: voitures.filter((voiture) => voiture.statut === "loué").length,
    },
    {
      name: "reservé",
      value: voitures.filter((voiture) => voiture.statut === "reservé").length,
    },

  ];

 let recentReservation = []

 const limit = (reservations.length > 5) ? 5 : reservations.length

if (reservations.length > 0) {
  for (let i = 0; i < limit; i++) {

    const nom = clients.find((client) => client.id === reservations[i].idClient).nom;
    const prenom = clients.find((client) => client.id === reservations[i].idClient).prenom;

  recentReservation.push({
    id: reservations[i].id,
    client: nom + " " + prenom,
    voiture: reservations[i].voiture.car_name,
    debut: new Date(reservations[i].dateDebut).toLocaleDateString("fr-FR"), 
    fin: new Date(reservations[i].dateFin).toLocaleDateString("fr-FR"),
    statut: reservations[i].statut,
  });
}
}


  const calendar = [
    {
      icon: (
        <div className="bg-blue-200 rounded-full w-12 h-12  flex items-center justify-center">
          <CalendarTodayOutlinedIcon className="text-blue-700" />
        </div>
      ),

      title: "Reservations (Aujourdhui)",
      value: totalReservations,
      link: role + "/reservation",
      percent: percentReservation,
    },
    {
      icon: (
        <div className="bg-green-200 rounded-full w-12 h-12   flex items-center justify-center">
          <AirportShuttleIcon className="text-green-500" />
        </div>
      ),
      title: "Vehicules (disponibles)",
      value: totalVoitures,
      link: role + "/models",
      percent: percentVoiture,
    },
    {
      icon: (
        <div className="bg-yellow-200 rounded-full w-12 h-12  flex items-center justify-center">
          <GroupOutlinedIcon className="text-yellow-700" />
        </div>
      ),
      title: " Clients",
      value: totalClients,
      link: role + "/clients",
      percent: percentClient,
    },
    {
      icon: (
        <div className="bg-pink-100 rounded-full w-12 h-12 flex items-center justify-center">
          <MonetizationOnOutlinedIcon className="text-pink-500" />
        </div>
      ),
      title: "Revenus",
      price: parseInt(MontantTotal),
      link: role + "/reservation",
      percent: percentRevenu,
    },
  ];



  return (
    <div className="pt-16  bg-gray-100 flex">
      <Sidebar  />
      <div className="  w-full flex flex-col">


        <div className=" bg-gradient-to-r from-orange-500 to-orange-600 rounded-xl shadow-lg p-6  text-white mx-auto my-4 w-[95%]  ">
            <div className="flex flex-col md:flex-row justify-between items-center">
              <div>
                <h1 className="text-3xl font-bold mb-2">Bienvenue</h1>
                <p className="text-orange-100">Votre espace personnel RentCar</p>
              </div>
              <div className="mt-4 md:mt-0 flex items-center">
                <div className="bg-white text-orange-600 p-2 rounded-full">
                  <User size={24} />
                </div>
                <a className="ml-4 bg-white/20 hover:bg-white/30 transition duration-300 text-white px-4 py-2 rounded-lg">
                  Éditer le profil
                </a>
              </div>
            </div>
          </div>

        <div className="flex flex-wrap items-center justify-center   md:justify-between  w-[96%] lg:w-[98%]">
          {calendar.map((unit) => (
            <Actu icons={unit} key={unit.title} />
          ))}
        </div>
        <div className=" px-4  flex flex-col flex-wrap lg:flex-row lg:items-center">
          <ReservationChart reservationData={reservationData} />
          <RevenuChart revenueData={revenueData} />
          <EtatCarChar data={stateCar} />
          <HistoriqueReservations  recentReservations={recentReservation}/>
        </div>
      </div>
    </div>
  );
};
export default Dashboard;
