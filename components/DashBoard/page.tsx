"use client";

import React from "react";
import { motion } from "framer-motion";

export default function Dashboard() {
  const cards = [
    { title: "Total Users", value: "324", color: "from-blue-500 to-blue-700" },
    { title: "Admins", value: "12", color: "from-green-500 to-emerald-700" },
    { title: "Editors", value: "58", color: "from-yellow-500 to-amber-600" },
    { title: "Viewers", value: "254", color: "from-purple-500 to-indigo-700" },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-black p-6 flex flex-col items-center justify-center">
      {/* Heading */}
      <motion.h1
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.4 }}
        className="text-4xl font-extrabold mb-10 text-blue-400 tracking-wide"
      >
        Admin Dashboard
      </motion.h1>

      {/* Cards Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 w-full max-w-6xl">
        {cards.map((card, idx) => (
          <motion.div
            key={idx}
            initial={{ opacity: 0, y: 25 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: idx * 0.1 }}
            whileHover={{
              scale: 1.05,
              boxShadow: "0px 0px 30px rgba(59,130,246,0.4)",
            }}
            className={`bg-gradient-to-br ${card.color} rounded-2xl shadow-lg p-8 text-white text-center transition-transform duration-300`}
          >
            <h2 className="text-lg font-semibold opacity-90">{card.title}</h2>
            <p className="text-4xl font-bold mt-3 drop-shadow-md">{card.value}</p>
          </motion.div>
        ))}
      </div>

      {/* Footer note (optional aesthetic touch) */}
      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.8 }}
        className="text-gray-400 text-sm mt-10 tracking-wide"
      >
        Updated in real time — Last sync: <span className="text-blue-400">2 mins ago</span>
      </motion.p>
    </div>
  );
}
