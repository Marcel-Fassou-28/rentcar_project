import { useEffect, useState } from "react";
import Sidebar from "../Sidebar";
import instance from "../../../../../config/Axios";
import {Calendar, User, Car} from "lucide-react";
import CheckIcon from '@mui/icons-material/Check';
import PaidIcon from '@mui/icons-material/Paid';
import ClearIcon from '@mui/icons-material/Clear';
import StatReservation from "./StatReservation";
import { motion } from "framer-motion";
import { div } from "framer-motion/client";

const Reservations = () => {
  const [reservations, setReservations] = useState([]);
  const [load, setLoad] = useState(false);

  useEffect(() => {
    instance
      .get("/admin/reservations")
      .then((res) => {
        setReservations(res.data);
      })
      .catch((err) => {
        console.log(err);
      }); 
  }, []);

 useEffect(() => {
  if (reservations.length > 0 && !load) {
    Promise.all(
      reservations.map(async (r) => {
        const res = await instance.get(`/admin/users/show/${r.idClient}`);
        return { ...r, client: res.data.data }; 
      })
    ).then((updatedReservations) => {
      setReservations(updatedReservations); 
      setLoad(true);
    }).catch((err) => {
      console.log(err);
    });
  }
}, [reservations]);


  const updateReservation = (id, etat) => {
    instance
      .patch(`/admin/reservations/update/${id}`, { statut: etat })
      .then((res) => {
        window.location.reload();
      })
      .catch((err) => { 
        console.log(err); 
      });
  };

  const total = reservations.length;
  const paye = reservations.filter((r) => r.statut === "payé").length;
  const enCours = reservations.filter((r) => r.statut === "en cours").length;
  const enAttente = reservations.filter(
    (r) => r.statut === "en attente"
  ).length;
  const expire = reservations.filter((r) => r.statut === "expiré").length;

  const calculateDuration = (dateDebut, dateFin) => {
    const start = new Date(dateDebut);
    const end = new Date(dateFin);
    const diffTime = Math.abs(end - start);
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return diffDays;
  };


  const [status, setStatus] = useState("all");

  const handleChange = (e) => {
    setStatus(e.target.value);
  }



const [sortedReservations, setSortedReservations] = useState(reservations);

useEffect(() => {
  setSortedReservations(reservations);
}, [reservations]);


const handleSearch = (e) => {
    e.preventDefault();
    if (status === "all") {
      setSortedReservations(reservations);
      return;
    }
    else{

    let filteredReservations = reservations.filter((r) => r.statut === status);

    setSortedReservations(filteredReservations); // ✅ Mise à jour correcte
    console.log(status);
    }
};

  const getStatusColor = (statut) => {
    switch (statut) {
      case "payé":
        return "bg-green-100 text-green-800 border-green-200";
      case "en cours":
        return "bg-blue-100 text-blue-800 border-blue-200";
      case "en attente":
        return "bg-yellow-100 text-yellow-800 border-yellow-200";
      case "expiré":
        return "bg-red-100 text-red-800 border-red-200";
      default:
        return "bg-gray-100 text-gray-800 border-gray-200";
    }
  };
  return (
    <div className="pt-16 bg-gradient-to-b from-gray-50 to-gray-100 flex">
      <Sidebar />
      <main className="flex-1 p-6 w-[88%]">
        <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }} className="max-w-7xl mx-auto">
        <div className=" bg-gradient-to-r from-orange-500 to-orange-600 rounded-xl shadow-lg p-6  text-white mx-auto my-4 w-full  ">
            <div className="flex flex-col md:flex-row justify-between items-center">
              <div className="flex flex-col items-center md:items-start">
                <h1 className="text-3xl font-bold mb-2">Dashboard des Réservations</h1>
                <p className="text-orange-100">Gérer et suivez toutes les réservations</p>
              </div>
              <div className="mt-4 md:mt-0 flex items-center">
                <div className="bg-white text-orange-600 p-2 rounded-full">
                  <Calendar size={24} />
                </div>
              </div>
            </div>
          </div>
          <StatReservation total={total} paye = {paye} enCours = {enCours} enAttente= {enAttente} expire={expire}/>
          <motion.div 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className=" w-full bg-white rounded-xl shadow-lg border border-gray-100 ">
             <form action="" onSubmit={handleSearch}  className="flex items-center gap-4 px-4 py-4">
                <div className="flex flex-1 flex-col gap-2 p-2">
                <select 
                  name="status" id="" 
                  onChange={handleChange}
                  className="border rounded-full p-2 py-2 px-4 focus:outline-none transition-all duration-300 focus:border-gray-500 font-semibold"
                  >
                  <option value="all" className="">Statuts de Réservations</option>
                  <option value="en cours">En cours</option>
                  <option value="payé">Payées</option>
                  <option value="en attente">En attente</option>
                  <option value="expiré">Expirees</option>
                </select>
                </div>
                <button type="submit" className=" flex-1 bg-orange-500 text-white px-4 py-2 rounded">Trier</button>
              </form>
              <div className="w-full overflow-x-auto">
  {sortedReservations.length > 0 ? (
    <div className="min-w-[1024px]">
      <table className="w-full border-collapse">
        <thead className="bg-gray-50">
          <tr>
            <th className="px-4 py-3 text-left text-xs font-semibold text-gray-900 w-[80px]">ID</th>
            <th className="px-4 py-3 text-left text-xs font-semibold text-gray-900 w-[200px]">Client</th>
            <th className="px-4 py-3 text-left text-xs font-semibold text-gray-900 w-[200px]">Voiture</th>
            <th className="px-4 py-3 text-left text-xs font-semibold text-gray-900 w-[120px]">Date Début</th>
            <th className="px-4 py-3 text-left text-xs font-semibold text-gray-900 w-[120px]">Fin</th>
            <th className="px-4 py-3 text-left text-xs font-semibold text-gray-900 w-[100px]">Durée</th>
            <th className="px-4 py-3 text-left text-xs font-semibold text-gray-900 w-[120px]">Statut</th>
            <th className="px-4 py-3 text-center text-xs font-semibold text-gray-900 w-[120px]">Actions</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-200">
          {sortedReservations.map((reservation) => (
            reservation.client?.nom && (
              <tr key={reservation.id} className="hover:bg-gray-50 transition-colors">
                <td className="px-4 py-3 text-sm font-medium text-gray-900">#{reservation.id}</td>
                <td className="px-4 py-3">
                  <div className="flex items-center">
                    <div className="w-7 h-7 bg-blue-100 rounded-full flex items-center justify-center mr-2">
                      <User className="w-4 h-4 text-blue-600" />
                    </div>
                    <div>
                      <p className="text-sm font-medium text-gray-900 truncate max-w-[160px]">
                        {reservation.client.nom} {reservation.client.prenom}
                      </p>
                      <p className="text-xs text-gray-500">ID: {reservation.idClient}</p>
                    </div>
                  </div>
                </td>
                <td className="px-4 py-3">
                  <div className="flex items-center">
                    <div className="w-7 h-7 bg-green-100 rounded-full flex items-center justify-center mr-2">
                      <Car className="w-4 h-4 text-green-600" />
                    </div>
                    <div>
                      <p className="text-sm font-medium text-gray-900 truncate max-w-[160px]">
                        {reservation.voiture.car_name}
                      </p>
                      <p className="text-xs text-gray-500">ID: {reservation.idVoiture}</p>
                    </div>
                  </div>
                </td>
                <td className="px-4 py-3 text-sm text-gray-900">
                  {new Date(reservation.dateDebut).toLocaleDateString("fr-FR")}
                </td>
                <td className="px-4 py-3 text-sm text-gray-900">
                  {new Date(reservation.dateFin).toLocaleDateString("fr-FR")}
                </td>
                <td className="px-4 py-3 text-sm text-gray-900">
                  {calculateDuration(reservation.dateDebut, reservation.dateFin)} jours
                </td>
                <td className="px-4 py-3">
                  <span
                    className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium border ${getStatusColor(
                      reservation.statut
                    )}`}
                  >
                    {reservation.statut}
                  </span>
                </td>
                <td className="px-4 py-3">
                  <div className="flex items-center justify-center space-x-1">
                    <button
                      className="p-1.5 text-blue-600 hover:bg-blue-50 rounded-md transition-colors"
                      onClick={() => updateReservation(reservation.id, "accept")}
                    >
                      <CheckIcon className="w-4 h-4" />
                    </button>
                    <button
                      onClick={() => updateReservation(reservation.id, "payer")}
                      className="p-1.5 text-green-600 hover:bg-green-50 rounded-md transition-colors"
                    >
                      <PaidIcon className="w-4 h-4" />
                    </button>
                    <button
                      onClick={() => updateReservation(reservation.id, "refuse")}
                      className="p-1.5 text-red-600 hover:bg-red-50 rounded-md transition-colors"
                    >
                      <ClearIcon className="w-4 h-4" />
                    </button>
                  </div>
                </td>
              </tr>
            )
          ))}
        </tbody>
      </table>
    </div>
  ) : (
    <div className="text-center py-8">
      <Car className="mx-auto h-12 w-12 text-gray-400 mb-3" />
      <p className="text-gray-500 text-base">
        Aucune réservation trouvée.
        {status && <span className="text-orange-400"> statut: {status}</span>}
      </p>
    </div>
  )}
</div>

              
          </motion.div>
          
        
        </motion.div>
      </main>
    </div>
  );
};
export default Reservations;
