import { useEffect, useState } from "react";
import Sidebar from "./Sidebar";
import instance from "../../../../config/Axios";





const Clients = () => {

    const [clients, setClients] = useState([]);

useEffect(()=>{
    instance.get('/users').then(res => {
        setClients(res.data);
    }).catch(err => {
        console.log(err);
    });
},[])

console.log(clients);

  return (
    <div className="flex pt-16">
      <Sidebar />
      <div>
        <div className="flex flex-col items-center w-full">
          <div className="  shadow-[0_0_15px_rgba(0,0,0,0.1)] m-4 p-2 w-[90%] lg:w-[98%] ">
            <h2 className="text-2xl  m-4 text-gray-500">Les Clients</h2>

          </div>
        </div>
      </div>
    </div>
  );
};

export default Clients;
