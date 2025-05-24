import { useEffect, useState } from "react";
import Sidebar from "./Sidebar";
import instance from "../../../../config/Axios";
import {Users, Calendar, BarChart,User2Icon } from "lucide-react";
import { motion } from "framer-motion";

const Clients = () => {
  const [clients, setClients] = useState([]);
  const [reservationClient, setReservationClient] = useState([]);

  useEffect(() => {
    instance
      .get("/admin/users/reservation")
      .then((res) => {
        setReservationClient(res.data.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  useEffect(() => {
    instance
      .get("/admin/users")
      .then((res) => {
        setClients(res.data.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  const calculateAge = (dateString) => {
    const today = new Date();
    const birthDate = new Date(dateString);
    let age = today.getFullYear() - birthDate.getFullYear();
    const m = today.getMonth() - birthDate.getMonth();
    if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) {
      age--;
    }
    return age;
  };

  return (
    <div className="flex pt-16 bg-gradient-to-b from-gray-50 to-gray-100">
      <Sidebar />
      <main className="flex-1 px-2 w-[88%]">
        <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }} className="w-full bg-white shadow-sm rounded-md">
        <div className=" bg-gradient-to-r from-orange-500 to-orange-600 rounded-xl shadow-lg p-6  text-white mx-auto my-4 w-full">
            <div className="flex flex-col md:flex-row justify-between items-center">
              <div className="flex flex-col items-center md:items-start">
                <h1 className="text-3xl font-bold mb-2">Les Clients</h1>
                <p className="text-orange-100">Gérer vos clients en toute sécurité</p>
              </div>
              <div className="mt-4 md:mt-0 flex items-center">
                <div className="bg-white text-orange-600 p-2 rounded-full">
                  <User2Icon size={24} />
                </div>
              </div>
            </div>
          </div>

        <div className="shadow-gray-200 bg-gray-100 shadow-md mt-2 overflow-x-auto mb-4">
          <div className=" bg-white m-4 p-2 ">
            <div className="bg-gray-100  p-4">
              <div className="max-w-7xl mx-auto">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="bg-white rounded-lg shadow p-6 flex items-center">
                    <div className="rounded-full bg-gray-100 p-3 mr-4">
                      <Users className="h-6 w-6 text-blue-600" />
                    </div>
                    <div>
                      <h2 className="text-sm font-medium text-gray-500">
                        Total Clients
                      </h2>
                      <p className="text-2xl font-semibold">{clients.length}</p>
                    </div>
                  </div>

                  <div className="bg-white rounded-lg shadow p-6 flex items-center">
                    <div className="rounded-full bg-green-100 p-3 mr-4">
                      <BarChart className="h-6 w-6 text-green-600" />
                    </div>
                    <div>
                      <h2 className="text-sm font-medium text-gray-500">
                        Nombre de clients ayant une reservation
                      </h2>
                      <p className="text-2xl font-semibold">
                        {reservationClient.length}
                      </p>
                    </div>
                  </div>

                  <div className="bg-white rounded-lg shadow p-6 flex items-center">
                    <div className="rounded-full bg-red-100 p-3 mr-4">
                      <Calendar className="h-6 w-6 text-red-600" />
                    </div>
                    <div>
                      <h2 className="text-sm font-medium text-gray-500">
                        Âge Moyen
                      </h2>
                      <p className="text-2xl font-semibold">
                        {Math.round(
                          clients.reduce(
                            (sum, client) =>
                              sum + calculateAge(client.birthday),
                            0
                          ) / clients.length
                        )}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="w-full overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr>
                    <th className="px-6 py-3 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider ">
                      ID
                    </th>
                    <th className="px-6 py-3 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer">
                      {" "}
                      nom
                    </th>
                    <th className="px-6 py-3 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider ">
                      {" "}
                      prenom
                    </th>
                    <th className="px-6 py-3 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Email
                    </th>
                    <th className="px-6 py-3 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer">
                      Date de naissance
                    </th>
                    <th className="px-6 py-3 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Âge
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {clients.map((client) => (
                    <tr key={client.id} className="hover:bg-gray-50">
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                        {client.id}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {client.nom}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {client.prenom}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {client.email}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {client.birthday}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {calculateAge(client.birthday)}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div> 

            <div className="flex items-center justify-between border-t border-gray-200 px-4 py-3 sm:px-6 mt-4">
              <div className="flex-1 flex justify-between">
                <button className="relative inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50">
                  Précédent
                </button>
                <button className="ml-3 relative inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50">
                  Suivant
                </button>
              </div>
            </div>
          </div>
        </div>
        </motion.div>
      </main>
    </div>
  );
};

export default Clients;
