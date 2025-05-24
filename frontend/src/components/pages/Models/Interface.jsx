import Model from "./model";
import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import instance from "../../config/Axios";
import { CarFront } from "lucide-react";
import { Car, Jeep, CarSimple } from "@phosphor-icons/react";
import { Link, useSearchParams } from "react-router-dom";


const Interface = () => {

  const [voitures, setVoitures] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [startScroll, setStartScroll] = useState(false);
  const [searchParams] = useSearchParams();
  const category = searchParams.get("category") || "";

  const categories = [
  {name: '', icon: CarFront, label: 'All'},
  { name: 'SUV', icon: Car, label: 'SUV' },
  { name: '4X4', icon: Jeep, label: '4x4' },
  { name: 'Berline', icon: Car, label: 'Berline' },
  { name: 'Citadine', icon: CarSimple, label: 'Citadine' },
  { name: 'Compact', icon: Car, label: 'Compact' },
  { name: 'Luxe', icon: Jeep, label: 'Luxe' },
];

  useEffect(() => {
    const fetchVoitures = async () => {
      try {
        const response = await instance.get(`/voitures${category ? `?category=${category}` : ""}`);
        setVoitures(response.data.data);
        setLoading(false);
      } catch (err) {
        
        setError(err.response?.data?.message || 'Erreur lors de la connexion');
        setLoading(false);
      }
    };

    fetchVoitures();
  }, [category]);

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

  if (loading) return <div className="text-center"><div className="pt-16 flex flex-col md:flex-row bg-gradient-to-b from-gray-50 to-gray-100 min-h-screen">
        <main className="flex-1 p-6 md:p-8 flex justify-center items-center">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-orange-500"></div>
        </main>
      </div></div>;
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
           <div className="flex  gap-16 flex-wrap p-4 justify-center items-center shadow-xl w-2/3 md:w-[770px] lg:w-[90%] mx-auto px-8">
        {categories.map(({ name, icon: Icon, label }) => (
          <Link
            key={name}
            to={`?category=${name.toLowerCase()}`}
            className={`flex w-20 flex-col items-center gap-2 text-center font-semibold text-gray-600 transition-colors hover:text-red-500
            ${ category && category.toLowerCase() === name.toLowerCase()
            ? "text-red-500"
            : "text-gray-600 hover:text-red-500"
            }`}>
            <Icon size={32} weight="duotone" />
            <span>{label}</span>
          </Link>
        ))}
      </div>

          <div className="pb-12 mx-4 mt-10  lg:mx-24   md:gap-1 lg:gap-4 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
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
