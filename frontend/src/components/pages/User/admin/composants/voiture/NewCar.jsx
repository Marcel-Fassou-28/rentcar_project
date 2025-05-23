import Sidebar from "../Sidebar";
import { useState } from "react";

const NewCar = () => {
  const [brand, setBrand] = useState("");
  const [immatriculation, setImmatriculation] = useState("");
  const [carName, setCarName] = useState("");
  const [model, setModel] = useState("");
  const [category, setCategory] = useState("");
  const [price, setPrice] = useState("");
  const [transmission, setTransmission] = useState("");
  const [moteur, setMoteur] = useState("");
  const [carPhoto, setCarPhoto] = useState(null);

  return (
    <div className="flex  pt-16 ">
      <Sidebar />
      <div className=" mb-4 flex flex-[4] flex-col items-center ">
        <div className=" flex flex-wrap justify-between  shadow-[0_0_15px_rgba(0,0,0,0.1)] w-[90%]  lg:w-[50%] rounded flex gap-4 p-8  lg:mt-6 mt-16 border border-orange-600 ">
            <img src={carPhoto} alt="photo voiture" />
          <div className="flex flex-col flex-wrap gap-4">
            <h1 className="text-2xl font-bold">Infos</h1>
            <p>
              <strong>Immatriculation :</strong> {immatriculation}
            </p>
            <p>
              <strong>Nom de la voiture :</strong> {carName}
            </p>
            <p>
              <strong>Marque :</strong> {brand}
            </p>
            <p>
              <strong>Modèle :</strong> {model}
            </p>
            <p>
              <strong>Catégorie :</strong> {category}
            </p>
            <p>
              <strong>Moteur :</strong> {moteur}
            </p>
            <p>
              <strong>Transmission :</strong> {transmission}
            </p>
            <p>
              <strong>Prix :</strong> {price}
            </p>
          </div>
          
        </div>
        <form
          method="post"
          className=" flex flex-wrap justify-between  shadow-[0_0_15px_rgba(0,0,0,0.1)] w-[90%]  lg:w-[50%] rounded flex gap-4 p-8  lg:mt-6 mt-16 border border-orange-600 "
        >
            <div className="w-full flex flex-col gap-2">
                <label htmlFor="car_name">Nom de la voiture <span className="text-red-600">*</span></label>
                 <input type="text" name="car_name" placeholder="Nom de la voiture"
                 onChange={() => setCarName(event.target.value)}
                 className="px-2 w-full py-2 font-light text-gray-400 border" required /> 
            </div>

            <div className="w-full flex flex-col gap-2">
                <label htmlFor="immatriculation">Immatriculation de la voiture <span className="text-red-600">*</span></label>
                <input type="text" name="immatriculation" placeholder="Immatriculation de la voiture"
                onChange={()=> setImmatriculation(event.target.value)}
                required
                className="px-2 w-full flex flex-wrap py-2 font-light text-gray-400 border" />
            </div>
           
             <div className="w-full flex flex-col gap-2">
            <label>Marque<span className="text-red-600">*</span> :</label>
            <select
              value={brand}
              required
              onChange={(e) => setBrand(e.target.value)}
              className="px-2 w-full py-2 font-light text-gray-400 border"
            >
              <option value="">Sélectionner une marque</option>
              <option value="BMW">BMW</option>
              <option value="Mercedes">Mercedes</option>
              <option value="Audi">Audi</option>
              <option value="Toyota">Toyota</option>
              <option value="Honda">Honda</option>
            </select>
          </div>

          <div className="w-full flex flex-col gap-2">
            <label>Modèle<span className="text-red-600">*</span> :</label>
            <select
              value={model}
              required
              onChange={(e) => setModel(e.target.value)}
              className="px-2 w-full py-2 font-light text-gray-400 border"
            >
              <option value="">Sélectionner un modèle</option>
              <option value="Série 3">Série 3</option>
              <option value="X5">X5</option>
              <option value="Classe C">Classe C</option>
              <option value="A4">A4</option>
              <option value="RAV4">RAV4</option>
              <option value="Civic">Civic</option>
            </select>
          </div>

          <div className="w-full flex flex-col gap-2">
            <label>Catégorie<span className="text-red-600">*</span> :</label>
            <select
            required
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              className="px-2 w-full py-2 font-light text-gray-400 border"
            >
              <option value="">Sélectionner une catégorie</option>
              <option value="berline">Berline</option>
              <option value="SUV">SUV</option>
              <option value="compact">Compact</option>
              <option value="luxe">Luxe</option>
              <option value="citadine">Citadine</option>
              <option value="4x4">4x4</option>
            </select>
          </div>
          <div className="w-full flex flex-col gap-2">
            <label>Moteur :</label>
            <select
            required
              value={moteur}
              onChange={(e) => setMoteur(e.target.value)}
              className="px-2 w-full py-2 font-light text-gray-400 border"
            >
              <option value="">Sélectionner un moteur</option>
              <option value="essence">Essence</option>
              <option value="diesel">Diesel</option>
              <option value="hybride">Hybride</option>
              <option value="électrique">Électrique</option>
            </select>
          </div>

          <div className="w-full flex flex-col gap-2">
            <label>Transmission :</label>
            <select
            required
              value={transmission}
              onChange={(e) => setTransmission(e.target.value)}
              className="px-2 w-full py-2 font-light text-gray-400 border"
            >
              <option value="">Sélectionner une transmission</option>
              <option value="automatique">Automatique</option>
              <option value="manuelle">Manuelle</option>
            </select>
          </div>

          <div className="w-full flex flex-col gap-2">
            <label >Prix :</label>
            <input
            required
              type="text"
              value={price}
              onChange={(e) => setPrice(e.target.value)}
              placeholder="Prix de la voiture"
              className="px-2 w-full py-2 font-light text-gray-400 border"
            />
          </div>
          <div className="w-full flex flex-col gap-2">
            <label>Photo :</label>
            <input
            required
              type="file"
              onChange={(event) => {
                if (event.target.files && event.target.files[0]) {
                  setCarPhoto(URL.createObjectURL(event.target.files[0]));
                }
              }}
              className="px-2 w-full py-2 font-light text-gray-400 border"
            />
          </div>
          <div className="flex justify-center">
            <button
              type="submit"
              className="bg-orange-500 text-xl p-2 rounded transition duration-200 hover:bg-orange-600 uppercase text-white font-semibold "
            >
              Ajouter la voiture
            </button>
          </div>
        </form>
          
      </div>
    </div>
  );
};

export default NewCar;
