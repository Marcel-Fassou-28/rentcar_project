import { useEffect, useState } from "react";
import Sidebar from "./Sidebar";
import instance from "../../../../config/Axios";

import {
  ChevronDown,
  Users,
  Calendar,
  Mail,
  Search,
  BarChart,
  PieChart,
} from "lucide-react";
import {
  BarChart as ReBarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import { PieChart as RePieChart, Pie, Cell, Legend } from "recharts";

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
    <div className="flex pt-16">
      <Sidebar />
      <div className="w-[85%]">
        <div className="flex flex-col items-center">
          <div className="  shadow-[0_0_15px_rgba(0,0,0,0.1)] m-4 p-2 w-[90%] lg:w-[98%] ">
            <h2 className="text-2xl  m-4 text-gray-500">Les Clients</h2>

            <div className="bg-gray-100  p-4">
              <div className="max-w-7xl mx-auto">
                <h1 className="text-3xl font-bold text-gray-800 mb-6">
                  Dashboard des Clients
                </h1>

             
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="bg-white rounded-lg shadow p-6 flex items-center">
                    <div className="rounded-full bg-blue-100 p-3 mr-4">
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
                        nombre de clients ayant une reservation
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
      </div>
    </div>
  );
};

export default Clients;
