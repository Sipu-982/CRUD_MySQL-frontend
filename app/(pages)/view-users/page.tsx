"use client";

import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import axios from "axios";
import Image from "next/image";
import { useRouter } from "next/navigation";
import AlertBox from "@/components/DeleteApi/page";

interface User {
  id: number;
  username: string;
  email: string;
  phone: string;
  profile_img: string;
  created_at: string;
}

export default function ViewUser() {
  const [userData, setUserData] = useState<User[]>([]);
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleUsers = async () => {
    setLoading(true);
    try {
      const response = await axios.get("http://localhost:5000/api/user/findUsers");
      setUserData(response.data.getData);
      console.log(response.data.message);
    } catch (error: any) {
      console.error(error.response?.data?.message || "Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    handleUsers();
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-black flex flex-col items-center justify-center p-6">
      <motion.h2
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.4 }}
        className="text-3xl font-bold mb-6 text-blue-400"
      >
        View All Users
      </motion.h2>

      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="w-full max-w-4xl bg-gray-900/70 backdrop-blur-lg border border-gray-700 shadow-[0_0_25px_rgba(59,130,246,0.2)] rounded-2xl overflow-hidden"
      >
        <table className="w-full text-left text-gray-300 border-collapse">
          <thead className="bg-gray-800 text-gray-200 uppercase text-sm">
            <tr>
              <th className="p-4">#</th>
              <th className="p-4">FullName</th>
              <th className="p-4">Email</th>
              <th className="p-4">Phone</th>
              <th className="p-4">Profile</th>
              <th className="p-4">Actions</th>
            </tr>
          </thead>
          <tbody>
            {userData.map((user, idx) => (
              <motion.tr
                key={user.id}
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: idx * 0.1 }}
                onClick={() => router.push(`/view-user/${user.id}`)} // ✅ click to navigate
                className="border-b border-gray-700 hover:bg-gray-800/60 transition cursor-pointer"
              >
                <td className="p-4 text-gray-400">{idx + 1}</td>
                <td className="p-4 font-medium text-gray-100">{user.username}</td>
                <td className="p-4">{user.email}</td>
                <td className="p-4 capitalize text-blue-400">{user.phone}</td>
                <td className="relative w-14 h-14 overflow-hidden">
                  <Image
                    src={user.profile_img}
                    alt="profile"
                    fill
                    className="object-scale-down rounded-full"
                  />
                </td>
                <td className="p-4 text-center">
                  <div
                    className="flex justify-center items-center gap-4"
                    onClick={(e) => e.stopPropagation()} // ✅ prevent parent row click
                  >
                    <button
                      className="cursor-pointer"
                      onClick={() => router.push(`/update-users/${user.id}`)}
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        height="24px"
                        viewBox="0 -960 960 960"
                        width="24px"
                        fill="#00b81f"
                      >
                        <path d="M185.09-105.87q-32.68 0-55.95-23.27-23.27-23.27-23.27-55.95v-589.82q0-32.91 23.27-56.35 23.27-23.44 55.95-23.44h504.13L854.7-689.22v244.79q-19.09-10.83-39.18-14.61-20.09-3.79-40.61-.96v-193.74L653.74-774.91H185.09v589.82h272.65v79.22H185.09Zm0-669.04v589.82-589.82ZM517.74-25.87v-134.87L741-383q10.2-10.5 22.67-15.16 12.48-4.67 25.55-4.67 13.13 0 25.85 5.35t22.8 15.48l37 37q10.03 10.13 14.93 22.64t4.9 25.01q0 13.26-5.35 26.18-5.35 12.91-15.39 23.04L652.61-25.87H517.74Zm308.48-271.48-37-37 37 37Zm-240 203h38l119.3-120.17-18-19.07-19-18.06-120.3 119.17v38.13Zm139.3-139.3-19-18 37 37-18-19ZM238.09-578.91h358v-143h-358v143ZM480-250.09q15.13 0 29.54-3 14.42-3 27.11-10.56l32.78-33.76q7.57-12.72 11.07-26.85t3.5-29.83q0-43.33-30.26-73.66-30.27-30.34-73.5-30.34-43.24 0-73.74 30.27-30.5 30.26-30.5 73.5 0 43.23 30.33 73.73 30.34 30.5 73.67 30.5Z" />
                      </svg>
                    </button>

                    <AlertBox
                      userId={user.id}
                      username={user.username}
                      onDeleted={handleUsers}
                    />
                  </div>
                </td>
              </motion.tr>
            ))}
          </tbody>
        </table>
      </motion.div>
    </div>
  );
}
