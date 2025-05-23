import Sidebar from "../Sidebar";
import instance from "../../../../../config/Axios";
import { useEffect, useState } from "react";
import { DataGrid } from "@mui/x-data-grid";
import Paper from "@mui/material/Paper";
import {
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  Tooltip,
  Legend,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
} from "recharts";
import { Link } from "react-router-dom";
import { CarFront } from "lucide-react";

const Voiture = () => {
  const [voitures, setVoitures] = useState([]);
  const [values, setValues] = useState([]);

  useEffect(() => {
    instance
      .get("/voitures")
      .then((res) => {
        setVoitures(res.data.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

 

  const columns = [
    
    {
      field: "immatriculation",
      headerName: "Matricule",
      flex: 1,
      renderCell: (params) => (
        <div className="flex gap-2">
          <img
            src={params.row.car_photo}
            alt={params.row.car_name}
            className="w-16 h-10 align-center mt-2 m"
          />
          <p>{params.row.immatriculation}</p>
        </div>
      ),
    },
    { field: "car_name", headerName: "Marque", flex: 1 },
    { field: "car_categorie", headerName: "Categorie", flex: 1 / 2 },
    {
      field: "moteur",
      headerName: "Mode",
      flex: 1,
      renderCell: (params) => (
        <div>
          <p>
            {params.row.moteur}-{params.row.transmission}
          </p>
        </div>
      ),
    },
    { field: "price", headerName: "Prix", flex: 1 / 2 },
    {
      field: "statut",
      headerName: "Statut",
      flex: 1,
      renderCell: (params) => (
        <div>
          <p
            className={
              params.row.statut == "disponible"
                ? "text-green-500"
                : params.row.statut == "reservé"
                ? "text-yellow-500"
                : "text-red-500"
            }
          >
            {params.row.statut}
          </p>
        </div>
      ),
    },
  ];

  const category = [
    {
      name: "SUV",
      value: voitures.filter((voiture) => voiture.car_categorie === "SUV")
        .length,
    },
    {
      name: "Berline",
      value: voitures.filter((voiture) => voiture.car_categorie === "berline")
        .length,
    },
    {
      name: "4x4",
      value: voitures.filter((voiture) => voiture.car_categorie === "4x4")
        .length,
    },
    {
      name: "citadine",
      value: voitures.filter((voiture) => voiture.car_categorie === "citadine")
        .length,
    },
    {
      name: "luxe",
      value: voitures.filter((voiture) => voiture.car_categorie === "luxe")
        .length,
    },
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
    {
      name: "Hors service",
      value: voitures.filter((voiture) => voiture.statut === "Hors service")
        .length,
    },
  ];

  const CustomLabel = ({
    cx,
    cy,
    midAngle,
    innerRadius,
    outerRadius,
    index,
  }) => {
    const RADIAN = Math.PI / 180;
    const radius = innerRadius + (outerRadius - innerRadius) * 1.39;
    const x = cx + radius * Math.cos(-midAngle * RADIAN);
    const y = cy + radius * Math.sin(-midAngle * RADIAN);

    return (
      <text
        x={x}
        y={y}
        fill={COLORS[index]}
        dominantBaseline="central"
        fontSize={14}
      >
        {stateCar[index].name}:{stateCar[index].value}
      </text>
    );
  };

  const COLORS = ["#00C49F", "#0088FE", "#FFBB28", "#FF8042", "#FF8042"];
  const paginationModel = { page: 0, pageSize: 10 };

  return (
    <div className="flex  pt-16 bg-gradient-to-b from-gray-50 to-gray-100">
      <Sidebar />
      <div className="flex flex-[4]  flex-col items-center  ">
        <div className=" bg-gradient-to-r from-orange-500 to-orange-600 rounded-xl shadow-lg p-6  text-white mx-auto my-4 w-[95%]  ">
            <div className="flex flex-col md:flex-row justify-between items-center">
              <div>
                <h1 className="text-3xl font-bold mb-2">Les Voitures</h1>
                <p className="text-orange-100">Gérer vos voitures en toute sécurité</p>
              </div>
              <div className="mt-4 md:mt-0 flex items-center">
                <div className="bg-white text-orange-600 p-2 rounded-full">
                  <CarFront size={24} />
                </div>
                <button className="ml-4 bg-white/20 hover:bg-white/30 transition duration-300 text-white px-4 py-2 rounded-lg">
                  <Link to="/admin/voitures/new">Ajouter une voiture</Link>
                </button>
              </div>
            </div>
          </div>

        <div className="  shadow-[0_0_15px_rgba(0,0,0,0.1)] m-4 p-2 w-[90%]  lg:w-[95%] ">
          <h2 className="text-2xl  m-4 text-gray-500">Les Voitures</h2>

          <Paper
            sx={{ height: 400, width: "100%" }}
            className="border border-blue-500"
          >
            <DataGrid
              headerClassName="text-blue-500"
              rows={voitures}
              columns={columns}
              initialState={{ pagination: { paginationModel } }}
              pageSizeOptions={[10]}
              checkboxSelection
             

              onCellClick={(params) => {
                setValues((values) => {
                  var newValues = [...values];
                  if (values.includes(params.row.id)) {
                    // Supprimer l'ID si la ligne est déjà sélectionnée
                    newValues = values.filter((id) => id !== params.row.id);
                  } else {
                    // Ajouter l'ID si la ligne n'était pas sélectionnée
                    newValues = [...values, params.row.id];
                  }
                  return newValues;
                });
                 
                
              }}
              sx={{ border: 0 }}
            />
          {console.log(values)}
          </Paper>
          {values.length > 0 && (
            <div className="flex gap-4 justify-center">
              <a href={`voitures/delete/${values[0]}`} className="m-4 bg-red-500 p-2 rounded-md">
                Supprimer
              </a>

              {values.length < 2 && (
                <a
                  href={`voitures/modifyCar/${values[0]}`}
                  className="m-4 bg-blue-500 p-2 rounded-md"
                >
                  {" "}
                 
                  Modifier
                </a>
              )}
            </div>
          )}
        </div>
        <div className="flex flex-col lg:flex-row items-center w-full lg:w-[95%]">
          <div className=" shadow-[0_0_15px_rgba(0,0,0,0.1)] m-4 p-2 w-[90%] lg:w-[98%] ">
            <h2 className="text-2xl  m-4 text-gray-500">Etats Des Voitures</h2>

            <Paper className="flex justify-center items-center w-full">
              <ResponsiveContainer width="80%" height={300} className="my-4">
                <PieChart width={500} height={500}>
                  <Pie
                    data={stateCar}
                    cx="50%"
                    cy="50%"
                    outerRadius={100}
                    fill="#8884d8"
                    dataKey="value"
                    label={CustomLabel}
                  >
                    {stateCar.map((entry, index) => (
                      <Cell
                        key={`cell-${index}`}
                        fill={COLORS[index % COLORS.length]}
                      />
                    ))}
                  </Pie>
                </PieChart>
              </ResponsiveContainer>
            </Paper>
          </div>

          <div className="shadow-[0_0_15px_rgba(0,0,0,0.1)] w-[90%] m-4 lg:w-[98%]">
            <h2 className="text-2xl  m-4 text-gray-500">
              Voitures par Categorie
            </h2>
            <Paper className="flex justify-center items-center w-full">
              <ResponsiveContainer width="90%" height={300}>
                <BarChart width={700} height={300} data={category}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="name" />
                  <YAxis />
                  <Tooltip />
                  <Legend />
                  <Bar dataKey="value" fill="#2bf" />
                </BarChart>
              </ResponsiveContainer>
            </Paper>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Voiture;
