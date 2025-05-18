import EvStationIcon from '@mui/icons-material/EvStation';
import SpeedIcon from '@mui/icons-material/Speed';
const Model = (props) => {
    
  return (
    <div className="  pt-16 w-[350px] md:w-[200px] lg:w-[300px] h-auto  rounded-lg m-auto  cursor-pointer pos">
      <div className="relative"><img
        src={props.voiture.lien}
        alt="Voiture"
        className="w-56 h-32 m-auto object-cover"
      />
      <div className=" absolute right-0 bottom-0 w-60 md:w-45  rounded-tl-[50px] flex justify-between items-center bg-red-400 cursor-pointer text-white   px-4">
        <p className=" font-bold"> A partir de {props.voiture.prix}DHS</p>
        <hr className="border border-gray-400 rounded  h-5 my-3  " />
        <p>jour</p>
      </div>
      </div>
      <h1 className="font-semibold uppercase text-xl mt-5 mb-5">{props.voiture.nom}</h1>
      <hr />
      <div className="flex justify-between my-2 mx-4 text-gray-500 capitalize">
        <span className='flex gap-2'> <EvStationIcon/> {props.voiture.carburant} </span>
        <span className='flex gap-2'>  <SpeedIcon />{props.voiture.transmission}</span>
      </div>
    </div>
  );
};
export default Model;
