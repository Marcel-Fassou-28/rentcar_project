import { Link } from "react-router-dom";
import CountUp from 'react-countup';

const Actu = (props) => {

    
  return (
    <div className="flex flex-col justify-between  p-4 my-2 mx-auto border border-gray-300 rounded-lg  shadow-[0_0_15px_rgba(0,0,0,0.1)] h-[170px] w-[70%] md:w-[45%] lg:w-[20%]">
      <div className="flex items-center justify-between gap-6">
        <div>{props.icons.icon}</div>
        <div>
          <h4 className=" text-gray-500">{props.icons.title}</h4>
          <p className="font-bold text-2xl">{<CountUp  end={props.icons.value} duration={2} /> || <CountUp  end={props.icons.price} decimals={2} duration={2} suffix="$"/>}</p>
        </div>
      </div>
      <div className="flex justify-between">
        <p className="text-gray-500"><span className= {props.icons.percent < 0 ? "text-red-500 font-bold" : "text-green-500 font-bold"} > {parseInt(props.icons.percent)}% </span></p>
        <Link to={props.icons.link} className="text-blue-500 hover:cursor-pointer">Voir plus</Link>
      </div>
    </div>
  );
};
export default Actu;
