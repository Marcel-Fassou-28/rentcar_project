import { useEffect, useState } from "react";
import Sidebar from "../Sidebar";
import instance from "../../../../../config/Axios";
import {Calendar, User, Car} from "lucide-react";
import CheckIcon from '@mui/icons-material/Check';
import PaidIcon from '@mui/icons-material/Paid';
import ClearIcon from '@mui/icons-material/Clear';
import StatReservation from "./StatReservation";
import { motion } from "framer-motion";

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


// var sortedReservations = reservations.sort((a, b) => {
//   const statusPriority = {"en attente": 1, "en cours": 2, "payé": 3,   "expiré": 4 };
//   return statusPriority[a.statut] - statusPriority[b.statut];
// });


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
    <div className="flex pt-20 bg-gradient-to-b from-gray-50 to-gray-100">
      <Sidebar />
      <div className="w-full    bg-gray-50">
        <div className=" bg-gradient-to-r from-orange-500 to-orange-600 rounded-xl shadow-lg p-6  text-white mx-auto my-4 w-[95%]  ">
            <div className="flex flex-col md:flex-row justify-between items-center">
              <div>
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
        <div className=" mx-aut px-4 sm:px-6 lg:px-8 py-4 ">
          <StatReservation total={total} paye = {paye} enCours = {enCours} enAttente= {enAttente} expire={expire}/>

          {/* Table */}
          <motion.div 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className=" w-[80%] lg:w-full bg-white rounded-xl shadow-lg border border-gray-100">
            <div className=" overflow-x-auto">
              <form action="" onSubmit={handleSearch}  className="flex items-center gap-4 px-4 py-4">
                <div className="flex flex-[1] flex-col gap-2 p-2">
                <label htmlFor="">Statut</label>
                <select name="status" id="" 
                onChange={handleChange}
                className="border rounded-full p-2 py-1 px-4 focus:outline-none transition-all duration-300 focus:border-gray-500">
                  <option value="all" className="">Toutes</option>
                  <option value="en cours">En cours</option>
                  <option value="payé">Payées</option>
                  <option value="en attente">En attente</option>
                  <option value="expiré">Expirees</option>
                </select>
                </div>
                <button type="submit" className=" flex-1 bg-orange-500 text-white px-4 py-2 rounded">Trier</button>
              </form>
              {sortedReservations.length > 0 ? <table className=" min-w-full ">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900">ID</th>
                    <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900">Client</th>
                    <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900">Voiture</th>
                    <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900">Date Début</th>
                    <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900"> Fin</th>
                    <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900">Durée</th>
                    <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900">Statut</th>
                    <th className="px-6 py-4 text-center text-sm font-semibold text-gray-900">Actions</th>
                  </tr>
                </thead>
                <tbody className="">
                  {sortedReservations.map((reservation) => (
                    
                    reservation.client.nom && (<tr
                      key={reservation.id}
                      className="hover:bg-gray-50 transition-colors"
                    >
                      <td className="px-6 py-4 text-sm font-medium text-gray-900">#{reservation.id}</td>
                      <td className="px-6 py-4">
                        <div className="flex items-center">
                          <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center mr-3">
                            <User className="w-4 h-4 text-blue-600" />
                          </div>
                          <div>
                            <p className="text-sm font-medium text-gray-900">
                              {reservation.client.nom + " " + reservation.client.prenom}
                            </p>
                            <p className="text-xs text-gray-500">ID: {reservation.idClient}</p>
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <div className="flex items-center">
                          <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center mr-3">
                            <Car className="w-4 h-4 text-green-600" />
                          </div>
                          <div>
                            <p className="text-sm font-medium text-gray-900">
                              {reservation.voiture.car_name}
                            </p>
                            <p className="text-xs text-gray-500">ID: {reservation.idVoiture}</p>
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4 text-sm text-gray-900">
                        {new Date(reservation.dateDebut).toLocaleDateString("fr-FR")}
                      </td>
                      <td className="px-6 py-4 text-sm text-gray-900">
                        {new Date(reservation.dateFin).toLocaleDateString("fr-FR")}
                      </td>
                      <td className="px-6 py-4 text-sm text-gray-900">
                        {calculateDuration(
                          reservation.dateDebut,
                          reservation.dateFin
                        )}{" "}
                        jours
                      </td>
                      <td className="px-6 py-4">
                        <span
                          className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-medium border ${getStatusColor(
                            reservation.statut
                          )}`}
                        >
                          {reservation.statut}
                        </span>
                      </td>
                      <td className="px-6 py-4">
                        <div className="flex items-center justify-center space-x-2">
                          <button
                            className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
                            onClick={() => updateReservation(reservation.id, "accept")}
                          >
                            <CheckIcon className="w-4 h-4" />
                          </button>
                          <button 
                          onClick={() => updateReservation(reservation.id,"payer")}
                          className="p-2 text-green-600 hover:bg-green-50 rounded-lg transition-colors">
                            <PaidIcon className="w-4 h-4" />
                          </button>
                          <button 
                          onClick={() => updateReservation(reservation.id, "refuse")}
                          className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors">
                            <ClearIcon className="w-4 h-4" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  )))}
                </tbody>
              </table> : 
              <div className="text-center py-10">
              <Car className="mx-auto h-16 w-16 text-gray-400 mb-4" />
              <p className="text-gray-500 text-lg">Aucune réservation trouvée.
              <span className="text-center text-orange-400"> {status ? " statut: " + status : ""}</span></p>
            </div>
}
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
};
export default Reservations;
