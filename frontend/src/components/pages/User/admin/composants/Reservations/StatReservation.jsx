import { Calendar } from 'lucide-react';
import { motion } from 'framer-motion';
import React from 'react'

function StatReservation({total, paye, enCours, enAttente, expire}) {

    const StatCard = ({ title, value, color, Icon = Calendar }) => (
        <div className="w-full md:w-[30%] lg:w-[15%] bg-white rounded-xl shadow-sm p-4 border border-gray-100">
            <div className="flex items-center justify-between">
            <div>
                <p className={`text-sm font-medium text-${color}-600`}>{title}</p>
                <p className={`text-3xl font-bold text-${color}-900`}>{value}</p>
            </div>
            <div className={`w-12 h-12 bg-${color}-100 rounded-lg flex items-center justify-center`}>
                <Icon className={`w-6 h-6 text-${color}-600`} />
            </div>
            </div>
        </div>
    );

    const StatsGrid = ({ total, paye, enCours, enAttente, expire }) => (
        <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.2 }}

         className="flex flex-wrap gap-4 md:gap-12 mb-6 bg-gray-100 mx-auto py-4 px-2 rounded-sm shadow-md justify-center"
         >
            <StatCard title="Total" value={total} color="gray"/>
            <StatCard title="Payées" value={paye} color="green" />
            <StatCard title="En Cours" value={enCours} color="blue" />
            <StatCard title="En Attente" value={enAttente} color="yellow" />
            <StatCard title="Expirées" value={expire} color="red" />
        </motion.div>
    );

  return (
    <StatsGrid total={total} paye={paye} enCours={enCours} enAttente={enAttente} expire={expire} />
  )
}

export default StatReservation
