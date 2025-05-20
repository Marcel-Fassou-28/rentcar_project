import { DataGrid } from "@mui/x-data-grid";
import Paper from "@mui/material/Paper";
import HistoriqueReservations from "./User/admin/composants/HistoriqueReservations";

const Reservations = () => {
  const recentReservations = [
    {
      id: "RES-2587",
      client: "Martin Dubois",
      voiture: "Renault Clio",
      debut: "18/05/2025",
      fin: "25/05/2025",
      status: "En cours",
    },
    {
      id: "RES-2586",
      client: "Sophie Lefebvre",
      voiture: "Peugeot 308",
      debut: "17/05/2025",
      fin: "19/05/2025",
      status: "En cours",
    },
    {
      id: "RES-2585",
      client: "Thomas Bernard",
      voiture: "Citroën C3",
      debut: "15/05/2025",
      fin: "22/05/2025",
      status: "En cours",
    },
    {
      id: "RES-2584",
      client: "Émilie Moreau",
      voiture: "Fiat 500",
      debut: "14/05/2025",
      fin: "17/05/2025",
      status: "Terminée",
    },
    {
      id: "RES-2583",
      client: "Alexandre Petit",
      voiture: "BMW Série 1",
      debut: "10/05/2025",
      fin: "15/05/2025",
      status: "Terminée",
    },
    {
      id: "RES-2582",
      client: "Julie Martin",
      voiture: "Volkswagen Golf",
      debut: "20/05/2025",
      fin: "27/05/2025",
      status: "En cours",
    },
    {
      id: "RES-2581",
      client: "Nicolas Durand",
      voiture: "Audi A3",
      debut: "19/05/2025",
      fin: "24/05/2025",
      status: "Terminée",
    },
    {
      id: "RES-2580",
      client: "Camille Roche",
      voiture: "Mercedes Classe A",
      debut: "18/05/2025",
      fin: "21/05/2025",
      status: "En cours",
    },
    {
      id: "RES-2579",
      client: "Lucas Garnier",
      voiture: "Toyota Yaris",
      debut: "16/05/2025",
      fin: "20/05/2025",
      status: "Terminée",
    },
    {
      id: "RES-2578",
      client: "Emma Lefèvre",
      voiture: "Ford Focus",
      debut: "15/05/2025",
      fin: "18/05/2025",
      status: "En cours",
    },
    {
      id: "RES-2577",
      client: "Paul Richard",
      voiture: "Seat Ibiza",
      debut: "13/05/2025",
      fin: "17/05/2025",
      status: "Terminée",
    },
    {
      id: "RES-2576",
      client: "Laura Perrin",
      voiture: "Opel Corsa",
      debut: "11/05/2025",
      fin: "16/05/2025",
      status: "En cours",
    },
    {
      id: "RES-2575",
      client: "Hugo Meunier",
      voiture: "Honda Civic",
      debut: "09/05/2025",
      fin: "14/05/2025",
      status: "Terminée",
    },
    {
      id: "RES-2574",
      client: "Clara Simon",
      voiture: "Mazda 3",
      debut: "08/05/2025",
      fin: "12/05/2025",
      status: "En cours",
    },
    {
      id: "RES-2573",
      client: "Antoine Renaud",
      voiture: "Kia Rio",
      debut: "07/05/2025",
      fin: "11/05/2025",
      status: "Terminée",
    },
    {
      id: "RES-2572",
      client: "Isabelle Girard",
      voiture: "Hyundai i30",
      debut: "06/05/2025",
      fin: "10/05/2025",
      status: "En cours",
    },
    {
      id: "RES-2571",
      client: "Vincent Morel",
      voiture: "Skoda Octavia",
      debut: "05/05/2025",
      fin: "09/05/2025",
      status: "Terminée",
    },
    {
      id: "RES-2570",
      client: "Charlotte Dupont",
      voiture: "Tesla Model 3",
      debut: "04/05/2025",
      fin: "08/05/2025",
      status: "En cours",
    },
    {
      id: "RES-2569",
      client: "Julien Lambert",
      voiture: "Volvo XC40",
      debut: "03/05/2025",
      fin: "07/05/2025",
      status: "Terminée",
    },
  ];

  const columns = [
    { field: "id", headerName: "ID", flex:1 },
    { field: "client", headerName: "Client", flex:1.5 },
    { field: "voiture", headerName: "Voiture", flex:1},
    {
      field: "Periode",
      headerName: "Periode",
      flex:1.5,
      renderCell: (params) => (
        <div>
          <p>
            {params.row.debut}-{params.row.fin}
          </p>
        </div>
      ),
    },
    { field: "status", headerName: "Status", flex:1 ,
      renderCell:(params)=>(
        <div>
          <p className={params.row.status === "En cours" ? "text-green-500" : "text-red-500"}>{params.row.status}</p>
        </div>
      )
    },
  ];
  const paginationModel = { page: 0, pageSize: 10 };

  return (
    <div className=" pt-16 shadow-[0_0_15px_rgba(0,0,0,0.1)] m-4 p-2 w-[96%] lg:w-[98%] ">
      <h2 className="text-2xl  m-4 text-gray-500">Reservations</h2>
      <Paper sx={{ height: 700, width: "100%" }}>
        <DataGrid
        headerClassName="text-blue-500"
          rows={recentReservations}
          columns={columns}
          initialState={{ pagination: { paginationModel } }}
          pageSizeOptions={[10]}
          checkboxSelection
          sx={{ border: 0, }}
        />
      </Paper>
    </div>
  );
};
export default Reservations;
