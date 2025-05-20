const Actu = (props) => {

    
  return (
    <div className="flex flex-col justify-between  p-4 my-4 border border-gray-300 rounded-lg  shadow-[0_0_15px_rgba(0,0,0,0.1)] h-[170px] w-[70%] md:w-[45%] lg:w-[20%]">
      <div className="flex items-center justify-betwee gap-8  mb-6 ">
        {props.icons.icon}
        <div >
          <h4 className=" text-gray-500 w-">{props.icons.title}</h4>
          <p className="font-bold text-2xl">{props.icons.value || (props.icons.price + " $")}</p>
        </div>
      </div>
      <div className="flex justify-between">
        <p className="text-gray-500"><span className= {props.icons.percent < 0 ? "text-red-500 font-bold" : "text-green-500 font-bold"} > {props.icons.percent}% </span> depuis hier</p>
        <a href={props.icons.link} className="text-blue-500 hover:cursor-pointer">Voir plus</a>
      </div>
    </div>
  );
};
export default Actu;
