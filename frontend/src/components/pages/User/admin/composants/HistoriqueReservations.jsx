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
const HistoriqueReservations = ({recentReservations}) => {

  return (
    <div className="col-span-2 shadow-gray-200 bg-gray-100 shadow-md mt-2 overflow-x-auto">
      <h2 className="text-2xl text-center uppercase  font-semibold m-4 text-black">Reservation recentes</h2>
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
                <TableCell ><span className= {row.statut === "payé" ? "bg-green-200 px-2 py-1 rounded-full"  : row.statut === "en attente" ? "bg-yellow-500 px-2 py-1 rounded-full" : row.statut === "expiré" ? "bg-red-300 px-2 py-1 rounded-full" : "bg-gray-100 px-2 py-1 rounded-full"}>{row.statut}</span></TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
};

export default HistoriqueReservations;
