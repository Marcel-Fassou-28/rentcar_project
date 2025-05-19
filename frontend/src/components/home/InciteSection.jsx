import {Truck} from 'lucide-react';
import { CarFront } from 'lucide-react';
import { motion } from 'framer-motion';

function InciteSection() {
  return (
    <div className="flex flex-col md:flex-row mx-0 w-full my-0 h-auto lg:min-h-[500px]">
      <div className='md:w-1/2 w-full md:h-[500px] h-[500px] relative'>
        <motion.div 
        initial={{ opacity: 0, x: -30 }}
        whileInView={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.6 }}
        className='absolute bg-orange-600 h-full w-full flex flex-col text-white justify-center items-start gap-5 p-10'>
          <CarFront className='size-20' />
          <div className='p-4 flex flex-col gap-3'>
            <h1 className='uppercase font-semibold text-3xl mb-1'>Voitures exclusives</h1>
            <p className='text-justify'>Lorem, ipsum dolor sit amet consectetur adipisicing elit. Delectus mollitia nulla sunt porro impedit ratione, distinctio odit. Exercitationem autem aliquam ducimus provident fugiat dolorum maxime. Lorem ipsum dolor sit amet consectetur adipisicing elit. Placeat molestiae repellat voluptatum, facere perspiciatis odit ipsam eligendi laborum modi beatae?</p>
          </div>
        </motion.div>
      </div>
      <div className='md:w-1/2 md:h-[500px] h-[500px] relative'>
        <motion.div 
        initial={{ opacity: 0, x: 30 }}
        whileInView={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.6 }}
        className='absolute h-full w-full flex flex-col justify-center items-start gap-5 p-10'>
          <Truck className='size-20'/>
          <div className='p-4 flex flex-col gap-3'>
            <h1 className='uppercase font-semibold text-3xl mb-1'>Besoin de mobilité?</h1>
            <p className='text-justify'>Lorem, ipsum dolor sit amet consectetur adipisicing elit. Delectus mollitia nulla sunt porro impedit ratione, distinctio odit. Exercitationem autem aliquam ducimus provident fugiat dolorum maxime. Lorem ipsum dolor sit amet consectetur adipisicing elit. Placeat molestiae repellat voluptatum, facere perspiciatis odit ipsam eligendi laborum modi beatae?</p>
          </div>
        </motion.div>
      </div>
    </div>
  )
}

export default InciteSection
