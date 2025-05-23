import { useState } from "react";
import DashboardIcon from "@mui/icons-material/Dashboard";

import PersonOutlinedIcon from "@mui/icons-material/PersonOutlined";
import BorderAllIcon from "@mui/icons-material/BorderAll";

import AccountCircleRoundedIcon from "@mui/icons-material/AccountCircleRounded";

import InventoryIcon from "@mui/icons-material/Inventory";

import { Link } from "react-router-dom";
import { useAuth } from "../../../../AuthContext";




const Sidebar = () => {

  const [open,setOpen] = useState(true)
  const IsOpen =() =>{
    setOpen(!open)
  }



 const {  user} = useAuth();
 const acronyme = user ? user.nom + "-" + user.prenom : "";


  return (

    <div className="bg-white border-r border-gray-300 h-screen ">
       <div>
       <button onClick={IsOpen} className="toggle-btn">
        {open ? "Fermer" : "Ouvrir"}
      </button>
      </div>
      <hr className="h-[2px] bg-gray-300 border-none mx-0 my-auto" />

      
      { open && <div className=" pl-4 top-0 transition-opacity duration-900 ease-in-out lg:w-[280px] md:w-[300px] w-[300px]">
        <ul className="list-none p-0 m-0">
           <li className="flex items-center p-[10px] mr-[10px] cursor-pointer hover:bg-gray-200 rounded">
            <Link to={`/admin/dashboard/${user.id}/${acronyme}`} className="decoration-none color-inherit">
              <DashboardIcon className="text-orange-500  text-[20px] " />
              <span className="ml-[10px] text-[15px] font-semibold text-gray-800">Dashbord</span>
            </Link>
          </li>
         <li className="flex items-center p-[10px] mr-[10px] cursor-pointer hover:bg-gray-200 rounded">
            <Link to={`admin/utilisateurs`} className="decoration-none color-inherit">
              <PersonOutlinedIcon className="text-orange-500 text-[20px]" />
              <span className="ml-[10px] text-[15px] font-semibold text-gray-800">Utilisateurs</span>
            </Link>
          </li>
          <li className="flex items-center p-[10px] mr-[10px] cursor-pointer hover:bg-gray-200 rounded">
            <Link to={`${user.role}/voitures`} className="decoration-none color-inherit">
              <InventoryIcon className="text-orange-500  text-[20px]" />
              <span className="ml-[10px] text-[15px] font-semibold text-gray-800">Voitures</span>
            </Link>
          </li>
          <li className="flex items-center p-[10px] mr-[10px] cursor-pointer hover:bg-gray-200 rounded">
            <Link to={`${user.role}/reservation`} className="decoration-none color-inherit">
              <BorderAllIcon className="text-orange-500 text-[20px]" />
              <span className="ml-[5px] text-[15px] font-semibold text-gray-800">Reservations</span>
            </Link>
          </li>
          

         
          
          
          <li className="flex items-center p-[10px] mr-[10px] cursor-pointer hover:bg-gray-200 rounded">
            <Link to="/profile" className="decoration-none color-inherit">
              <AccountCircleRoundedIcon className="text-orange-500  text-[20px]" />
              <span className="ml-[10px] text-[15px] font-semibold text-gray-800">Profile</span>
            </Link>
          </li>
         
        </ul>
      </div>
}
    </div>
  );
};

export default Sidebar;
