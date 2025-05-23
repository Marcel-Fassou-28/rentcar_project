import Sidebar from "../Sidebar";
import instance from "../../../../../config/Axios";
import { useState, } from "react";
import { useNavigate } from "react-router-dom";
import { s } from "framer-motion/client";

const NewCar = () => {

   const models = [
    "Série 3",
    "X5",
    "X3",
    "Série 1",
    "M4",
    "Classe C",
    "GLC",
    "Classe A",
    "AMG GT",
    "GLE",
    "A3",
    "A4",
    "Q5",
    "RS6",
    "Q7",
    "Yaris",
    "Corolla",
    "RAV4",
    "Land Cruiser",
    "CH-R",
    "Civic",
    "CR-V",
    "Jazz",
    "HR-V",
    "e:Ny1",
  ];

    const [formData, setFormData] = useState({
        
        immatriculation: "",
        brand: "",
        car_model: "",
        car_categorie: "",
        price: 0,
        transmission: "",
        moteur: "",
        car_photo: "",
        
    });
 
  const [carPhoto, setCarPhoto] = useState(null);
const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

   formData.car_photo = carPhoto;
   formData.statut = "disponible";
   formData.car_name = formData.brand + "-" + formData.car_model;
 

  const [error, setError] = useState('');
  var state = 0;

  const navigate = useNavigate();


  const handleSubmit =  async(e) =>{
    e.preventDefault();
    try {
      

      
      formData.car_photo = carPhoto;
      formData.price = parseInt(formData.price);
      
      const response = await instance.post('admin/voitures/add', formData);
     
      if (response.data) {
        alert('Voiture ajoutée avec succ !');
        state = 1;
        navigate('/admin/voitures');
      }
      else{
        state = 2;
      }
    } catch (err) {
       
   
        // console.log(err);
      setError(err.response?.data?.errors.immatriculation || 'Une erreur est survenue.');
      console.log(error);
    }
  };
  

  return (
    <div className="flex  pt-16 ">
      <Sidebar />

      <div className=" mb-4  flex-[4] flex-col items-center lg:flex-row ">
       
        <div className=" bg-gradient-to-r from-orange-500 to-orange-600 rounded-xl shadow-lg p-6  text-white mx-auto my-4 w-[95%] md:w-[80%] lg:w-[97%] lg:mx-auto  ">
            <div className="flex flex-col md:flex-row justify-between items-center">
                <h1 className="text-3xl font-bold mb-2">Nouvelle Voiture </h1>
                <p className="text-orange-100">Vueiller entrer les informations de la voiture dans le formulaire ci dessous</p>
              
            </div>
          </div>
          <div className="  flex flex-col lg:flex-row  gap-4 ">
        {carPhoto &&
         <div className=" flex flex-wrap justify-between  shadow-[0_0_15px_rgba(0,0,0,0.1)] w-[90%]  lg:w-[45%] lg:mx-4 lg:flex-col  rounded flex gap-4 p-8  lg:mt-6 mt-2 ">
            <img src={formData.car_photo} alt="photo voiture" className="w-[300px] h-[300px] m-auto object-cover"/>
          <div className="flex flex-col flex-wrap gap-4">
            <h1 className="text-2xl font-bold">Infos</h1>
            <p>
              <strong>Immatriculation :</strong> {formData.immatriculation}
            </p>
            <p>
              <strong>Nom de la voiture :</strong> {formData.car_name}
            </p>
            <p>
              <strong>Marque :</strong> {formData.brand}
            </p>
            <p>
              <strong>Modèle :</strong> {formData.car_model}
            </p>
            <p>
              <strong>Catégorie :</strong> {formData.car_categorie}
            </p>
            <p>
              <strong>Moteur :</strong> {formData.moteur}
            </p>
            <p>
              <strong>Transmission :</strong> {formData.transmission}
            </p>
            <p>
              <strong>Prix :</strong> { formData.price}
            </p>
          </div>
          
        </div>}
        <form
          method="post"
          onSubmit={handleSubmit}
          className=" flex flex-wrap justify-between  shadow-[0_0_15px_rgba(0,0,0,0.1)] w-[90%]  lg:w-[50%] rounded flex gap-4 p-8  lg:mt-6 lg:mx-auto mt-16  "
        >
          
        { error && (
          <div className="text-red-600 text-center">
           {console.log(error)}
            <p>{error}</p>
          </div>
        )}

            <div className="w-full flex flex-col gap-2">
                <label htmlFor="immatriculation">Immatriculation de la voiture <span className="text-red-600">*</span></label>
                <input type="text" name="immatriculation" placeholder="Immatriculation de la voiture"
                onChange={handleChange}
                required
                className="px-2 w-full flex flex-wrap py-2 font-light text-gray-400 border" />
            </div>
           
             <div className="w-full flex flex-col gap-2">
            <label>Marque<span className="text-red-600">*</span> :</label>
            <select
              name="brand"
              value={ formData.brand}
              required
              onChange={handleChange}
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
              value={formData.model}
              name="car_model"
              required
              onChange={handleChange}
              className="px-2 w-full py-2 font-light text-gray-400 border"
            >
              
              
              <option value="">Sélectionner un modèle</option>
              {models.map((model) => (
                <option key={model}>{model}</option>
              ))}
            </select>
          </div>

           {/* <div className="w-full flex flex-col gap-2">
                <label htmlFor="car_name">Nom de la voiture <span className="text-red-600">*</span></label>
                 <input type="text" name="car_name" placeholder="Nom de la voiture Marque-Modèle"
                 required
                 
                 onChange={handleChange}
                 className="px-2 w-full py-2 font-light text-gray-400 border" /> 
            </div> */}

          <div className="w-full flex flex-col gap-2">
            <label>Catégorie<span className="text-red-600">*</span> :</label>
            <select
            required
              value={formData.car_categorie}
              name="car_categorie"
              onChange={handleChange}
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
              name="moteur"
              value={formData.moteur}
              onChange={handleChange}
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
              name="transmission"
              value={formData.transmission}
              onChange={handleChange}
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
              type="number"
              name="price"
              value={formData.price}
              onChange={handleChange}
              placeholder="Prix de la voiture"
              className="px-2 w-full py-2 font-light text-gray-400 border"
            />
          </div>
          <div className="w-full flex flex-col gap-2">
            <label>Photo :</label>
            <input
            required
              type="file"
              name="car_photo"
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
       <div>
          
        </div>
    </div>
  );
};

export default NewCar;
