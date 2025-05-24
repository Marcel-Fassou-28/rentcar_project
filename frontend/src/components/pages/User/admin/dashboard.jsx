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
import { Link } from "react-router-dom";

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
      instance.get("/admin/voitures"),
      instance.get("/admin/users"),
      instance.get("/admin/reservations"),
    ]);
    setReservations(reservations.data);
    setVoitures(voitures.data.data);
    setClients(clients.data.data);
    setRevenus(revenus.data.data);
    setDate(new Date().toLocaleDateString("fr-FR"));
  };
  All();
    }, []);


const safeReservations = Array.isArray(reservations) ? reservations : [];
const safeClients = Array.isArray(clients) ? clients : [];
const safeVoitures = typeof voitures === 'object' && voitures !== null 
  ? Object.values(voitures).flat().filter(item => item && typeof item === 'object') 
  : [];


const today = (date && !isNaN(new Date(date).getTime()) 
  ? new Date(date) 
  : new Date()).toLocaleDateString("fr-FR", { timeZone: "Europe/Paris" });

const totalReservations = safeReservations.length;
const totalVoitures = safeVoitures.length;
const totalClients = safeClients.length;

// Filter yesterday's data (skip voitures if created_at is unavailable)
const isNotToday = item => item.created_at && !isNaN(new Date(item.created_at).getTime()) 
  ? new Date(item.created_at).toLocaleDateString("fr-FR", { timeZone: "Europe/Paris" }) !== today 
  : false;
const revenuHier = safeReservations.filter(isNotToday);
const clientHier = safeClients.filter(isNotToday);
const voitureHier = []; // Placeholder: replace with safeVoitures.filter(isNotToday) when created_at is added

// Calculate totals and percentages with safe division
const montantTotal = safeReservations.reduce((acc, { montant_total }) => acc + (Number(montant_total) || 0), 0);
const montantHier = revenuHier.reduce((acc, { montant_total }) => acc + (Number(montant_total) || 0), 0);
const percentRevenu = montantTotal ? (((montantTotal - montantHier) / montantTotal) * 100).toFixed(0) : 0;
const percentClient = totalClients ? (((totalClients - clientHier.length) / totalClients) * 100).toFixed(0) : 0;
const percentVoiture = totalVoitures ? (((totalVoitures - voitureHier.length) / totalVoitures) * 100).toFixed(0) : 0;
const percentReservation = totalReservations ? (((totalReservations - revenuHier.length) / totalReservations) * 100).toFixed(0) : 0;

// Calculate car status counts
const stateCar = [
  { name: "disponible", value: safeVoitures.filter(voiture => voiture.statut === "disponible").length },
  { name: "loué", value: safeVoitures.filter(voiture => voiture.statut === "loué").length },
  { name: "reservé", value: safeVoitures.filter(voiture => voiture.statut === "reservé").length }
];

// Calculate monthly reservation counts and revenue efficiently
const months = [
  { mois: "Jan", index: 0 }, { mois: "Fév", index: 1 }, { mois: "Mar", index: 2 },
  { mois: "Avr", index: 3 }, { mois: "Mai", index: 4 }, { mois: "Juin", index: 5 },
  { mois: "Juil", index: 6 }, { mois: "Août", index: 7 }, { mois: "Sept", index: 8 },
  { mois: "Oct", index: 9 }, { mois: "Nov", index: 10 }, { mois: "Déc", index: 11 }
];

// Group reservations by month once
const reservationsByMonth = safeReservations.reduce((acc, r) => {
  if (r.created_at && !isNaN(new Date(r.created_at).getTime())) {
    const month = new Date(r.created_at).getMonth();
    acc[month] = acc[month] || { count: 0, revenu: 0 };
    acc[month].count += 1;
    acc[month].revenu += Number(r.montant_total) || 0;
  }
  return acc;
}, {});

const reservationData = months.map(({ mois, index }) => ({
  mois,
  reservations: reservationsByMonth[index]?.count || 0
}));

const revenueData = months.map(({ mois, index }) => ({
  mois,
  revenu: reservationsByMonth[index]?.revenu || 0
}));

// Calculate recent reservations (up to 5)
const recentReservation = safeReservations.slice(0, 5).map(reservation => {
  const client = safeClients.find(c => c.id === reservation.idClient) || {};
  return {
    id: reservation.id,
    client: `${client.nom || ''} ${client.prenom || ''}`.trim() || 'Inconnu',
    voiture: reservation.voiture?.car_name || 'Inconnue',
    debut: reservation.dateDebut && !isNaN(new Date(reservation.dateDebut).getTime()) 
      ? new Date(reservation.dateDebut).toLocaleDateString("fr-FR") 
      : 'Invalide',
    fin: reservation.dateFin && !isNaN(new Date(reservation.dateFin).getTime()) 
      ? new Date(reservation.dateFin).toLocaleDateString("fr-FR") 
      : 'Invalide',
    statut: reservation.statut || 'Inconnu'
  };
});

  const calendar = [
    {
      icon: (
        <div className="bg-orange-300 rounded-full w-12 h-12  flex items-center justify-center">
          <CalendarTodayOutlinedIcon className="text-blue-700" />
        </div>
      ),

      title: "Reservations",
      value: parseInt(totalReservations),
      link: `/${user.role}/reservation`,
      percent: percentReservation,
    },
    {
      icon: (
        <div className="bg-orange-300 rounded-full w-12 h-12   flex items-center justify-center">
          <AirportShuttleIcon className="text-green-500" />
        </div>
      ),
      title: "Vehicules",
      value: parseInt(totalVoitures),
      link: `/${user.role}/models`,
      percent: percentVoiture,
    },
    {
      icon: (
        <div className="bg-orange-300 rounded-full w-12 h-12  flex items-center justify-center">
          <GroupOutlinedIcon className="text-yellow-700" />
        </div>
      ),
      title: " Clients",
      value: parseInt(totalClients),
      link: `/${user.role}/clients`,
      percent: percentClient,
    },
    {
      icon: (
        <div className="bg-orange-300 rounded-full w-12 h-12 flex items-center justify-center">
          <MonetizationOnOutlinedIcon className="text-pink-500" />
        </div>
      ),
      title: "Revenus",
      price: parseFloat(montantTotal),
      link: `/${user.role}/reservation`,
      percent: percentRevenu,
    },
  ];



  return (
    <div className="pt-16  bg-gradient-to-b from-gray-50 to-gray-100 flex ">
      <Sidebar  />
      <div className=" w-full flex flex-col">
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
                <button className="ml-4 bg-white/20 hover:bg-white/30 transition duration-300 text-white px-4 py-2 rounded-lg">
                  <Link to={`/${user.role}/my/profil/${user.id}`}>Éditer le profil</Link>
                </button>
              </div>
            </div>
          </div>

        <div className="flex flex-wrap items-center justify-center   md:justify-between  w-[96%] lg:w-[98%]">
          {calendar.map((unit) => (
            <Actu icons={unit} key={unit.title} />
          ))}
        </div>
        <div className=" px-4  flex flex-col flex-wrap lg:flex-row lg:items-center w-[96%] lg:w-[98%]">
          <ReservationChart reservationData={reservationData} />
          <RevenuChart revenueData={revenueData} />
          <EtatCarChar data={stateCar} />
          <HistoriqueReservations  recentReservations={recentReservation}/>
        </div>
      </div>
    </div>
  );
}
export default Dashboard;
