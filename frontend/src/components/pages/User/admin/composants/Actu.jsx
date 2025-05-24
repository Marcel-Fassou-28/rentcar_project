import { Link } from "react-router-dom";
import CountUp from 'react-countup';
import { motion } from "framer-motion";

const Actu = (props) => {

    
  return (
    <motion.div className="bg-white rounded-xl shadow p-5 flex flex-col gap-3">
      <div className="flex items-center justify-between gap-6">
        <div>{props.icons.icon}</div>
        <div className="flex flex-col items-start">
          <h4 className=" text-gray-500">{props.icons.title}</h4>
          <p className="font-bold text-2xl">{<CountUp  end={props.icons.value} duration={2} /> || <CountUp  end={props.icons.price} decimals={2} duration={2} suffix="$"/>}</p>
        </div>
      </div>
      <div className="flex justify-between">
        <p className="text-gray-500"><span className= {props.icons.percent < 0 ? "text-red-500 font-bold" : "text-green-500 font-bold"} > {parseInt(props.icons.percent)}% </span></p>
        <Link to={props.icons.link} className="text-blue-500 hover:cursor-pointer">Voir plus</Link>
      </div>
    </motion.div>
  );
};
export default Actu;
