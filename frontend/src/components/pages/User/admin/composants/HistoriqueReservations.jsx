import {
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    Paper,
} from "@mui/material";
import { col } from "framer-motion/client";
const HistoriqueReservations = () => {
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
  ];

  return (
    <div className="shadow-[0_0_15px_rgba(0,0,0,0.1)] m-4 p-2 w-[96%] lg:w-[98%] ">
      <h2 className="text-2xl  m-4 text-gray-500">Reservation recentes</h2>
      <TableContainer component={Paper} >
        <Table sx={{ minWidth: 650 }} aria-label="simple table" >
          <TableHead  >
            <TableRow>
              <TableCell sx={{color:"gray",textTransform:"uppercase"}}>ID</TableCell>
              <TableCell sx={{color:"gray",textTransform:"uppercase"}}>Vehicule</TableCell>
              <TableCell sx={{color:"gray",textTransform:"uppercase"}}>Client</TableCell>
              <TableCell sx={{color:"gray",textTransform:"uppercase"}}>Periode</TableCell>
              <TableCell sx={{color:"gray",textTransform:"uppercase"}}>Statut</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {recentReservations.map((row) => (
              <TableRow
                key={row.id}
                sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
              >
                <TableCell component="th" scope="row">
                  {row.id}
                </TableCell>
                <TableCell sx={{color:"gray"}} >{row.client}</TableCell>
                <TableCell sx={{color:"gray"}}>{row.voiture}</TableCell>
                <TableCell sx={{color:"gray"}}>{row.debut} - {row.fin}</TableCell>
                <TableCell ><span className= {row.status === "En cours" ? "bg-green-200 px-2 py-1 rounded-full" : "bg-gray-100 px-2 py-1 rounded-full"}>{row.status}</span></TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
};

export default HistoriqueReservations;
