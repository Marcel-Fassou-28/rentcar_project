import Model from "./model";
import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import instance from "../../config/Axios";

import { Car, Jeep, CarSimple } from "@phosphor-icons/react";

const Interface = () => {

  const [voitures, setVoitures] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [startScroll, setStartScroll] = useState(false);

  useEffect(() => {
    const fetchVoitures = async () => {
      try {
        const response = await instance.get("/voitures");

        setVoitures(response.data.data);
        setLoading(false);
      } catch (err) {
        
        setError(err.response?.data?.message || 'Erreur lors de la connexion');
        setLoading(false);
      }
    };

    fetchVoitures();
  }, []);



  
  

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 10) {
        setStartScroll(false);
      } else {
        setStartScroll(true);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  if (loading) return <div className="pt-16 text-center">Chargement...</div>;
  if (error)
    return (
      <div className="pt-16 text-center text-red-500">Erreur: {error}</div>
    );


  return (
    <div className="">
      <motion.div
        className=" fixed top-0 left-0 w-full h-[300px] lg:h-[550px] bg-cover bg-center bg-no-repeat"
        style={{
          backgroundImage:
            "url('https://www.sixt.fr/magazine/wp-content/uploads//sites/3/2022/01/rolls-royce-la-rose-noire-droptail-1536x864.jpg')",
        }}
        initial={{ backgroundPositionY: "100px" }}
        animate={{ backgroundPositionY: startScroll ? "-100px" : "0px" }}
        transition={{ duration: 3.5, ease: "easeInOut" }}
      />

      <div className="relative">
        <div className=" relative p-[15%]  flex flex-col justify-center gap-4 md:flex-row md:justify-between md:items-center px-16 text-white ">
          <h1 className="text-sm md:text-2xl lg:text-4xl  font-bold">
            NOS VEHICULES
          </h1>
          <div className="flex gap-4">
            <a href="/">Accueil</a>
            <a href="/models">/ Voitures</a>
          </div>
        </div>

        <div className=" relative bg-white ">
          <div className="  flex  gap-16 flex-wrap p-4 justify-center items-center shadow-xl w-2/3 md:w-[770px] lg:w-[90%] mx-auto px-8">
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

          <div className="flex flex-wrap   pb-12 mx-4  lg:mx-64   md:gap-1">
            {voitures.map((voiture) => {
              return <Model voiture={voiture} key={voiture.nom} />;
            })}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Interface;
