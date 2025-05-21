
import DashboardIcon from "@mui/icons-material/Dashboard";
import GroupIcon from "@mui/icons-material/Group";
import PersonOutlinedIcon from "@mui/icons-material/PersonOutlined";
import BorderAllIcon from "@mui/icons-material/BorderAll";
import LoginSharpIcon from "@mui/icons-material/LoginSharp";
import AccountCircleRoundedIcon from "@mui/icons-material/AccountCircleRounded";
import SettingsIcon from "@mui/icons-material/Settings";
import LogoutIcon from "@mui/icons-material/Logout";
import PsychologyOutlinedIcon from "@mui/icons-material/PsychologyOutlined";
import MedicalInformationIcon from "@mui/icons-material/MedicalInformation";
import NotificationsNoneIcon from "@mui/icons-material/NotificationsNone";
import LocalShippingIcon from "@mui/icons-material/LocalShipping";
import InventoryIcon from "@mui/icons-material/Inventory";
import AssessmentOutlined from "@mui/icons-material/AssessmentOutlined";
import { Link } from "react-router-dom";



const Sidebar = () => {


  return (
    <div className="bg-white flex-1 border-r border-gray-300 min-h-screen">
      <div className="h-[50px] flex items-center justify-center">
        <Link to="/" className="decoration-none color-inherit">
          {" "}
          <span className="text-[30px] font-bold text-red-500 cursor-pointer">Admin</span>
        </Link>
      </div>
      <hr className="h-[2px] bg-gray-300 border-none mx-0 my-auto" />
      <div className="pl-[10px]">
        <ul className="list-none p-0 m-0">
          <p className=" text-gray-500 font-bold text-[15px] mt-[15px] mb-[5px]">Menu</p>
          <li className="flex items-center p-[10px] mr-[10px] cursor-pointer hover:bg-gray-200 rounded">
            <Link to="/dashboard" className="decoration-none color-inherit">
              <DashboardIcon className="text-pink-500 text-[20px] " />
              <span className="ml-[10px] text-[15px] text-gray-500">Dashbord</span>
            </Link>
          </li>
          <p className=" text-gray-500 font-bold text-[15px] mt-[15px] mb-[5px]">List</p>
         <li className="flex items-center p-[10px] mr-[10px] cursor-pointer hover:bg-gray-200 rounded">
            <Link to="/utilisateurs" className="decoration-none color-inherit">
              <PersonOutlinedIcon className="text-pink-500 text-[20px]" />
              <span className="ml-[10px] text-[15px] text-gray-500">Utilisateurs</span>
            </Link>
          </li>
          <li className="flex items-center p-[10px] mr-[10px] cursor-pointer hover:bg-gray-200 rounded">
            <Link to="/voitures" className="decoration-none color-inherit">
              <InventoryIcon className="text-pink-500 text-[20px]" />
              <span className="ml-[10px] text-[15px] text-gray-500">Voitures</span>
            </Link>
          </li>
          <li className="flex items-center p-[10px] mr-[10px] cursor-pointer hover:bg-gray-200 rounded">
            <Link to="/reservation" className="decoration-none color-inherit">
              <BorderAllIcon className="text-pink-500 text-[20px]" />
              <span className="ml-[5px] text-[15px] text-gray-500">Reservations</span>
            </Link>
          </li>
          <p className=" text-gray-500 font-bold text-[15px] mt-[15px] mb-[5px]">Useful</p>
          <li className="flex items-center p-[10px] mr-[10px] cursor-pointer hover:bg-gray-200 rounded">
            <Link to="/stats" className="decoration-none color-inherit">
              {" "}
              <AssessmentOutlined className="text-pink-500 text-[20px]" />
              <span className="ml-[10px] text-[15px] text-gray-500"> stats</span>
            </Link>
          </li>

          <li className="flex items-center p-[10px] mr-[10px] cursor-pointer hover:bg-gray-200 rounded">
            <Link to="/notifications" className="decoration-none color-inherit">
              <NotificationsNoneIcon className="text-pink-500 text-[20px]" />
              <span className="ml-[10px] text-[15px] text-gray-500">Notifications</span>
            </Link>
          </li>
          <p className="text-gray-500 font-bold text-[15px] mt-[15px] mb-[5px]">Service</p>
          <li className="flex items-center p-[10px] mr-[10px] cursor-pointer hover:bg-gray-200 rounded">
            <Link to="/health" className="decoration-none color-inherit">
              <PsychologyOutlinedIcon className="text-pink-500 text-[20px]" />
              <span className="ml-[10px] text-[15px] text-gray-500">Logs</span>
            </Link>
          </li>
          
          <p className=" text-gray-500 font-bold text-[15px] mt-[15px] mb-[5px]">User</p>
          <li className="flex items-center p-[10px] mr-[10px] cursor-pointer hover:bg-gray-200 rounded">
            <Link to="/users/single" className="decoration-none color-inherit">
              <AccountCircleRoundedIcon className="text-pink-500 text-[20px]" />
              <span className="ml-[10px] text-[15px] text-gray-500">Profile</span>
            </Link>
          </li>
          <li className="flex items-center p-[10px] mr-[10px] cursor-pointer hover:bg-gray-200 rounded">
            <Link to="/" className="decoration-none color-inherit">
              <LogoutIcon className="text-pink-500 text-[20px]" />
              <span className="ml-[10px] text-[15px] text-gray-500">Logout</span>
            </Link>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default Sidebar;
