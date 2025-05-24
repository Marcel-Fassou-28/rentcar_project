import { useState } from "react";
import Sidebar from "../Sidebar";
import instance from "../../../../../config/Axios";
import { Car, CarFront, Euro, Fuel, Hash, Layers, Settings, Sparkle, Tag, User, User2 } from "lucide-react";
import { Link } from "react-router-dom";

// Options pour les champs select
const FORM_OPTIONS = {
  place: ["2", "4", "6", "5"],
  models: ["Série 3", "X5", "Classe C", "A4", "RAV4", "Civic"],
  categories: ["berline", "SUV", "compact", "luxe", "citadine", "4x4"],
  moteurs: ["essence", "diesel", "hybride", "électrique"],
  transmissions: ["automatique", "manuelle"],
};

const formatOption = (value) =>
  value ? value.charAt(0).toUpperCase() + value.slice(1) : "Non spécifié";

const NewCar = () => {

  const [formData, setFormData] = useState({immatriculation: "", car_name: "", car_model: "", car_categorie: "", place: "", price: "", transmission: "", moteur: "", car_photo: null});
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setFormData((prev) => ({
        ...prev,
        car_photo: { file, preview: URL.createObjectURL(file) },
      }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);
    setSuccess(null);
    setLoading(true);

    const requiredFields = ["car_name","immatriculation","car_model","car_categorie","place" ,"price","transmission","moteur"];
    if (requiredFields.some((field) => !formData[field])) {
      setError("Tous les champs requis doivent être remplis.");
      setLoading(false);
      return;
    }

    if(formData.car_photo?.file) {
      const base64Image = await new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.onload = () => resolve(reader.result);
        reader.onerror = reject;
        reader.readAsDataURL(formData.car_photo.file);
      });
  
      formData.car_photo = {
        name: formData.car_photo.file.name,
        data: base64Image, // Contient l'image en base64 (ex. "data:image/jpeg;base64,...")
      };
    } else {
      formData.car_photo = {
        name: null,
        data: null,
      }
    }

    try {
      await instance.post("admin/voitures/add", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      
      setSuccess("Voiture ajoutée avec succès !");
      setFormData({immatriculation: "",car_name: "",car_model: "",car_categorie: "", place: "" ,price: "",transmission: "",moteur: "",car_photo: null,});
    } catch (err) {
      setError(err.response?.data?.message || "Erreur lors de l'ajout de la voiture.");
    } finally {
      setLoading(false);
      window.scrollTo({top: 0, behavior: 'smooth'})
    }
  };


  return (
    <div className="flex bg-gradient-to-br from-gray-50 to-gray-200 pt-16">
      <Sidebar />
      <div className="w-full flex flex-col">
        <div className=" bg-gradient-to-r from-orange-500 to-orange-600 rounded-xl shadow-lg p-6  text-white mx-auto my-4 w-[95%]  ">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div>
              <h1 className="text-3xl font-bold mb-2">Bienvenue</h1>
              <p className="text-orange-100">Ajoutez des voitures pour une clientèle accrue</p>
            </div>
            <div className="mt-4 md:mt-0 flex items-center">
              <div className="bg-white text-orange-600 p-2 rounded-full">
                <CarFront size={24} />
              </div>
            </div>
          </div>
        </div>

        {/* Messages de statut */}
        {success && (
          <div className=" flex mb-6 max-w-full rounded-lg bg-green-100 mx-auto p-4 text-green-500 shadow-md w-[95%]">{success}</div>
        )} {error && (<div className=" flex mb-6 max-w-full rounded-lg bg-red-100 p-4 text-red-700 shadow-md mx-auto w-[95%]">{error}</div>)}

        {/* Aperçu de la voiture */}
        <div className="bg-white rounded-xl shadow-sm p-4 border border-gray-100 mx-auto my-4 w-full flex lg:w-[95%] justify-between">

        {/* Formulaire */}
        <form
          onSubmit={handleSubmit}
          className="max-w-xl rounded-xl bg-white p-4 shadow-lg w-[48%]"
        >
          <h2 className="mb-4 font-semibold text-gray-900 text-xl  uppercase text-center">Ajouter une voiture</h2>
          
          <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
            {/* Champ Nom de la voiture */}
            <div className="flex flex-col gap-2">
              <label htmlFor="car_name" className="text-sm font-medium text-gray-700">
                Nom de la voiture <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                id="car_name"
                name="car_name"
                value={formData.car_name}
                onChange={handleInputChange}
                placeholder="Ex: RAV4"
                className="rounded-lg border border-gray-300 px-4 py-2 text-gray-700 focus:border-orange-500 focus:outline-none focus:ring-2 focus:ring-orange-200 transition"
                required
              />
            </div>

            {/* Champ PLace */}
            <div className="flex flex-col gap-2">
              <label htmlFor="place" className="text-sm font-medium text-gray-700">
                Nombre de place <span className="text-red-500">*</span>
              </label>
              <select
                id="place"
                name="place"
                value={formData.place}
                onChange={handleInputChange}
                className="rounded-lg border border-gray-300 px-4 py-2 text-gray-700 focus:border-orange-500 focus:outline-none focus:ring-2 focus:ring-orange-200 transition"
                required
              >
                <option value="">Sélectionner le nombre de place</option>
                {FORM_OPTIONS.place.map((place) => (
                  <option key={place} value={place}>
                    {place}
                  </option>
                ))}
              </select>
            </div>

            {/* Champ Immatriculation */}
            <div className="flex flex-col gap-2">
              <label htmlFor="immatriculation" className="text-sm font-medium text-gray-700">
                Immatriculation <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                id="immatriculation"
                name="immatriculation"
                value={formData.immatriculation}
                onChange={handleInputChange}
                placeholder="Ex: AB-123-CD"
                className="rounded-lg border border-gray-300 px-4 py-2 text-gray-700 focus:border-orange-500 focus:outline-none focus:ring-2 focus:ring-orange-200 transition"
                required
              />
            </div>

            {/* Champ Modèle */}
            <div className="flex flex-col gap-2">
              <label htmlFor="car_model" className="text-sm font-medium text-gray-700">
                Modèle <span className="text-red-500">*</span>
              </label>
              <select
                id="car_model"
                name="car_model"
                value={formData.car_model}
                onChange={handleInputChange}
                className="rounded-lg border border-gray-300 px-4 py-2 text-gray-700 focus:border-orange-500 focus:outline-none focus:ring-2 focus:ring-orange-200 transition"
                required
              >
                <option value="">Sélectionner un modèle</option>
                {FORM_OPTIONS.models.map((model) => (
                  <option key={model} value={model}>
                    {model}
                  </option>
                ))}
              </select>
            </div>

            {/* Champ Catégorie */}
            <div className="flex flex-col gap-2">
              <label htmlFor="car_categorie" className="text-sm font-medium text-gray-700">
                Catégorie <span className="text-red-500">*</span>
              </label>
              <select
                id="car_categorie"
                name="car_categorie"
                value={formData.car_categorie}
                onChange={handleInputChange}
                className="rounded-lg border border-gray-300 px-4 py-2 text-gray-700 focus:border-orange-500 focus:outline-none focus:ring-2 focus:ring-orange-200 transition"
                required
              >
                <option value="">Sélectionner une catégorie</option>
                {FORM_OPTIONS.categories.map((car_categorie) => (
                  <option key={car_categorie} value={car_categorie}>
                    {formatOption(car_categorie)}
                  </option>
                ))}
              </select>
            </div>

            {/* Champ Moteur */}
            <div className="flex flex-col gap-2">
              <label htmlFor="moteur" className="text-sm font-medium text-gray-700">
                Moteur <span className="text-red-500">*</span>
              </label>
              <select
                id="moteur"
                name="moteur"
                value={formData.moteur}
                onChange={handleInputChange}
                className="rounded-lg border border-gray-300 px-4 py-2 text-gray-700 focus:border-orange-500 focus:outline-none focus:ring-2 focus:ring-orange-200 transition"
                required
              >
                <option value="">Sélectionner un moteur</option>
                {FORM_OPTIONS.moteurs.map((moteur) => (
                  <option key={moteur} value={moteur}>
                    {formatOption(moteur)}
                  </option>
                ))}
              </select>
            </div>

            {/* Champ Transmission */}
            <div className="flex flex-col gap-2">
              <label htmlFor="transmission" className="text-sm font-medium text-gray-700">
                Transmission <span className="text-red-500">*</span>
              </label>
              <select
                id="transmission"
                name="transmission"
                value={formData.transmission}
                onChange={handleInputChange}
                className="rounded-lg border border-gray-300 px-4 py-2 text-gray-700 focus:border-orange-500 focus:outline-none focus:ring-2 focus:ring-orange-200 transition"
                required
              >
                <option value="">Sélectionner une transmission</option>
                {FORM_OPTIONS.transmissions.map((transmission) => (
                  <option key={transmission} value={transmission}>
                    {formatOption(transmission)}
                  </option>
                ))}
              </select>
            </div>

            {/* Champ Prix */}
            <div className="flex flex-col gap-2">
              <label htmlFor="price" className="text-sm font-medium text-gray-700">
                Prix (MAD) <span className="text-red-500">*</span>
              </label>
              <input
                type="number"
                id="price"
                name="price"
                value={formData.price}
                onChange={handleInputChange}
                placeholder="Ex: 250"
                className="rounded-lg border border-gray-300 px-4 py-2 text-gray-700 focus:border-orange-500 focus:outline-none focus:ring-2 focus:ring-orange-200 transition"
                required
                min="0"
                step="0.01"
              />
            </div>

            {/* Champ Photo */}
            <div className="flex flex-col gap-2 md:col-span-2">
              <label htmlFor="car_photo" className="text-sm font-medium text-gray-700">
                Photo <span className="text-red-500">*</span>
              </label>
              <input
                type="file"
                id="car_photo"
                name="car_photo"
                accept="image/png, image/jpeg, image/jpg"
                onChange={handleFileChange}
                className="rounded-lg border border-gray-300 px-4 py-2 text-gray-700 focus:border-orange-500 focus:outline-none"
                required
              />
            </div>
          </div>

          {/* Bouton de soumission */}
          <div className="mt-8 flex justify-center">
            <button
              type="submit"
              disabled={loading}
              className={`flex items-center gap-2 rounded-lg px-6 py-3 font-semibold text-white uppercase transition duration-300 ${
                loading
                  ? "bg-orange-300 cursor-not-allowed"
                  : "bg-orange-600 hover:bg-orange-700"
              }`}
            >
              {loading ? (
                <>
                  <svg
                    className="animate-spin h-5 w-5 text-orange-500"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                  >
                    <circle
                      className="opacity-25" cx="12" cy="12"
                      r="10" stroke="currentColor" strokeWidth="4"
                    />
                    <path
                      className="opacity-75"
                      fill="currentColor"
                      d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                    />
                  </svg>
                  Ajout en cours...
                </>
              ) : (
                "Ajouter la voiture"
              )}
            </button>
          </div>
        </form>

      <div className="mb-8 w-full max-w-[48%] rounded-xl bg-white p-4 shadow-lg">
      <h2 className="mb-6 text-center text-xl font-semibold text-gray-800 uppercase">
        Aperçu de la voiture
      </h2>
      <div className="flex flex-col gap-6 justify-center items-center">
        {/* Image de la voiture */}
        <div className="flex w-full">
          {formData.car_photo?.preview ? (
            <img
              src={formData.car_photo.preview}
              alt="Prévisualisation de la voiture"
              className="h-48 w-full rounded-lg object-cover shadow-sm"
              aria-label="Image de la voiture"
            />
          ) : (
            <div className="h-48 w-full rounded-lg bg-gray-100 flex items-center justify-center text-gray-500 text-sm">
              Aucune image
            </div>
          )}
        </div>

        {/* Informations de la voiture */}
        <div className="w-full">
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 items-center justify-center">
            <div className="flex items-center gap-3 rounded-lg bg-gray-50 p-3 transition hover:bg-gray-100">
              <Hash className="h-6 w-6 text-orange-500" aria-hidden="true" />
              <div>
                <p className="text-sm font-medium text-gray-600">Immatriculation</p>
                <p className="text-base font-semibold text-gray-900">
                  {formData.immatriculation || "Non spécifié"}
                </p>
              </div>
            </div>

            <div className="flex items-center gap-3 rounded-lg bg-gray-50 p-3 transition hover:bg-gray-100">
              <Car className="h-6 w-6 text-orange-500" aria-hidden="true" />
              <div>
                <p className="text-sm font-medium text-gray-600">Nom</p>
                <p className="text-base font-semibold text-gray-900">
                  {formData.car_name || "Non spécifié"}
                </p>
              </div>
            </div>

            <div className="flex items-center gap-3 rounded-lg bg-gray-50 p-3 transition hover:bg-gray-100">
              <User2 className="h-6 w-6 text-orange-500" aria-hidden="true" />
              <div>
                <p className="text-sm font-medium text-gray-600">PLace</p>
                <p className="text-base font-semibold text-gray-900">
                  {formData.place || "Non spécifié"}
                </p>
              </div>
            </div>

            <div className="flex items-center gap-3 rounded-lg bg-gray-50 p-3 transition hover:bg-gray-100">
              <Layers className="h-6 w-6 text-orange-500" aria-hidden="true" />
              <div>
                <p className="text-sm font-medium text-gray-600">Modèle</p>
                <p className="text-base font-semibold text-gray-900">
                  {formData.car_model || "Non spécifié"}
                </p>
              </div>
            </div>

            <div className="flex items-center gap-3 rounded-lg bg-gray-50 p-3 transition hover:bg-gray-100">
              <Sparkle className="h-6 w-6 text-orange-500" aria-hidden="true" />
              <div>
                <p className="text-sm font-medium text-gray-600">Catégorie</p>
                <p className="text-base font-semibold text-gray-900">
                  {formatOption(formData.car_categorie)}
                </p>
              </div>
            </div>

            <div className="flex items-center gap-3 rounded-lg bg-gray-50 p-3 transition hover:bg-gray-100">
              <Fuel className="h-6 w-6 text-orange-500" aria-hidden="true" />
              <div>
                <p className="text-sm font-medium text-gray-600">Moteur</p>
                <p className="text-base font-semibold text-gray-900">
                  {formatOption(formData.moteur)}
                </p>
              </div>
            </div>

            <div className="flex items-center gap-3 rounded-lg bg-gray-50 p-3 transition hover:bg-gray-100">
              <Settings className="h-6 w-6 text-orange-500" aria-hidden="true" />
              <div>
                <p className="text-sm font-medium text-gray-600">Transmission</p>
                <p className="text-base font-semibold text-gray-900">
                  {formatOption(formData.transmission)}
                </p>
              </div>
            </div>

            <div className="flex items-center gap-3 rounded-lg bg-gray-50 p-3 transition hover:bg-gray-100">
              <Euro className="h-6 w-6 text-orange-500" aria-hidden="true" />
              <div>
                <p className="text-sm font-medium text-gray-600">Prix</p>
                <p className="text-base font-semibold text-gray-900">
                  {formData.price ? `${formData.price} MAD` : "Non spécifié"}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>




    </div>        
  </div>
</div>
  );
};

export default NewCar;
