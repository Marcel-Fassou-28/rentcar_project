import { div } from "framer-motion/client"
import CountUp from 'react-countup';
import { motion } from "framer-motion";

function StatsSection() {
  return (
    <div className="bg-orange-400/10 h-1/3  w-full p-4 overflow-x-auto flex flex-row gap-8 scrollbar-hide mx-auto">
    <motion.div 
      initial={{ opacity: 0, y: -30 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: 0.3 }}
    className="flex items-start justify-center flex-col h-auto border shadow-md px-4 py-6 min-w-[400px] w-auto bg-white/75 rounded-2xl min-h-[200px] gap-4">
      <div className="flex flex-row">
        <div className="bg-gradient-to-r from-blue-500 to-purple-600 rounded-full w-10 h-10 text-center pt-2 font-bold text-lg">A</div>
        <div className="bg-gradient-to-r from-blue-500 to-purple-600 rounded-full w-10 h-10 text-center pt-2 font-bold text-lg -ml-2">B</div>
        <div className="bg-gradient-to-r from-blue-500 to-purple-600 rounded-full w-10 h-10 text-center pt-2 font-bold text-lg -ml-2">C</div>
        <div className="bg-gradient-to-r from-blue-500 to-purple-600 rounded-full w-10 h-10 text-center pt-2 font-bold text-lg -ml-2">D</div>
        <div className="bg-gradient-to-r from-blue-500 to-purple-600 rounded-full w-10 h-10 text-center pt-2 font-bold text-lg -ml-2">E</div>
      </div>
      <div className="flex flex-col gap-1">
        <h1 className="text-2xl font-bold py-2"><CountUp end={41000} duration={3} separator=" " />+</h1>
        <p className="">Plus de 41,000 personnes nous font confiance</p>
      </div>
    </motion.div>
    <motion.div 
        initial={{ opacity: 0, y: -30 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.3 }}
    className="flex items-start justify-center flex-col h-auto border shadow-md px-4 py-6 min-w-[400px] w-auto bg-white/75 rounded-2xl min-h-[200px] gap-4">
      <div className="flex flex-row">
        <div className="bg-gradient-to-r from-blue-500 to-purple-600 rounded-full w-10 h-10 text-center pt-2 font-bold text-lg">A</div>
        <div className="bg-gradient-to-r from-blue-500 to-purple-600 rounded-full w-10 h-10 text-center pt-2 font-bold text-lg -ml-2">B</div>
        <div className="bg-gradient-to-r from-blue-500 to-purple-600 rounded-full w-10 h-10 text-center pt-2 font-bold text-lg -ml-2">C</div>
        <div className="bg-gradient-to-r from-blue-500 to-purple-600 rounded-full w-10 h-10 text-center pt-2 font-bold text-lg -ml-2">D</div>
        <div className="bg-gradient-to-r from-blue-500 to-purple-600 rounded-full w-10 h-10 text-center pt-2 font-bold text-lg -ml-2">E</div>
      </div>
      <div className="flex flex-col gap-1">
        <h1 className="text-2xl font-bold py-2"><CountUp end={41000} duration={3} separator=" " />+</h1>
        <p className="">Plus de 41,000 personnes nous font confiance</p>
      </div>
    </motion.div>
    <motion.div 
        initial={{ opacity: 0, y: -30 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.3 }}
    className="flex items-start justify-center flex-col h-auto border shadow-md px-4 py-6 min-w-[400px] w-auto bg-white/75 rounded-2xl min-h-[200px] gap-4">
      <div className="flex flex-row">
        <div className="bg-gradient-to-r from-blue-500 to-purple-600 rounded-full w-10 h-10 text-center pt-2 font-bold text-lg">A</div>
        <div className="bg-gradient-to-r from-blue-500 to-purple-600 rounded-full w-10 h-10 text-center pt-2 font-bold text-lg -ml-2">B</div>
        <div className="bg-gradient-to-r from-blue-500 to-purple-600 rounded-full w-10 h-10 text-center pt-2 font-bold text-lg -ml-2">C</div>
        <div className="bg-gradient-to-r from-blue-500 to-purple-600 rounded-full w-10 h-10 text-center pt-2 font-bold text-lg -ml-2">D</div>
        <div className="bg-gradient-to-r from-blue-500 to-purple-600 rounded-full w-10 h-10 text-center pt-2 font-bold text-lg -ml-2">E</div>
      </div>
      <div className="flex flex-col gap-1">
        <h1 className="text-2xl font-bold py-2"><CountUp end={41000} duration={3} separator=" " />+</h1>
        <p className="">Plus de 41,000 personnes nous font confiance</p>
      </div>
    </motion.div>
  </div>
  )
}

export default StatsSection
