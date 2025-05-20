const CardVoiture = ({ voiture }) => {
  return (
    <div className="border p-4 rounded shadow bg-white w-full max-w-sm">
      <img src={voiture.image} alt={voiture.nom} className="h-40 w-full object-cover mb-4 rounded" />
      <h3 className="text-lg font-bold mb-2">{voiture.nom}</h3>
      <p className="text-gray-600 mb-2">{voiture.transmission} - {voiture.carburant}</p>
      <p className="text-orange-600 font-bold">{voiture.prix} DHS / jour</p>
      <button className="mt-4 bg-orange-500 text-white px-4 py-2 rounded">Réserver</button>
    </div>
  );
};

export default CardVoiture;