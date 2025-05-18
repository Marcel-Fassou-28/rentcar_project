import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCar, faCarSide, faCarRear } from "@fortawesome/free-solid-svg-icons";
//import { CarProfile } from "phosphor-react";
import Model from "./model";

import { Car, Jeep, CarSimple } from "@phosphor-icons/react";

const Interface = () => {

    


  return (
    <div className="pt-16">
      <div>
        <div className=" flex flex-col justify-center gap-4 md:flex-row md:justify-between md:items-center px-16 text-white fo  bg-[url('https://ai.dimaster.io/assets/cache/1920/960/media/Artikel/231218%20Toyota%20FT-Se%20Concept/toyotaft-seext01.jpg')] bg-cover bg-center bg-no-repeat h-[300px]">
          <h1 className="text-2xl font-bold">NOS VEHICULES</h1>
          <div>
            <a href="/">Accueil </a>
            <a href="/models">/ Voitures</a>
          </div>
        </div>
      </div>
      

      <div className="flex  gap-16 flex-wrap p-4 justify-center items-center shadow-xl w-2/3 md:w-[770px] mx-auto px-8">
        <div className="flex flex-col  font-bold items-center gap-2 cursor-pointer hover:text-red-500  w-16">
          <Car size={32} weight="duotone" />
          <span className=" text-gray-400 ">SUV</span>
        </div>
        <div className="flex flex-col items-center font-bold gap-2 cursor-pointer hover:text-red-500 w-16">
          <Jeep size={32} weight="duotone" />
          <span className="text-gray-400">4X4</span>
        </div>
        <div className="flex flex-col items-center  font-bold gap-2 cursor-pointer hover:text-red-500 w-16">
          <Car size={32} weight="duotone" />
          <span className="text-gray-400"> BERLINE</span>
        </div>
        <div className="flex flex-col items-center  font-bold gap-2 cursor-pointer hover:text-red-500 w-16">
          <CarSimple size={32} weight="duotone" />

          <span className="text-gray-400"> CITADINE</span>
        </div>
        <div className="flex flex-col items-center  font-bold gap-2 cursor-pointer hover:text-red-500 w-16">
          <Car size={32} weight="duotone" />
          <span className="text-gray-400">COMPACT</span>
        </div>
        <div className="flex flex-col items-center  font-bold gap-2 cursor-pointer hover:text-red-500 w-16">
          <Jeep size={32} weight="duotone" />
          <span className="text-gray-400">LUXE</span>
        </div>
      </div>

      <div className="flex flex-wrap   pb-12 mx-4  lg:mx-64  md:gap-1">
        <Model />
        <Model />
        <Model />
        <Model />
        <Model />
        <Model />
        <Model />
        <Model />
        <Model />
      </div>
    </div>
  );
};

export default Interface;
