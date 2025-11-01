"use client";

import axios from "axios";
import { motion } from "framer-motion";
import Image from "next/image";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";

interface User {
  id: number;
  username: string;
  email: string;
  phone: string;
  profile_img: string;
  created_at: string;
}

export default function ViewUser() {
  const [loading, setLoading] = useState(false);
  const [userInfo, setUserInfo] = useState<User[]>([]);

  const params = useParams<{ id: string }>();
  const id = params?.id;

  useEffect(() => {
    if (!id) return;

    const getUser = async () => {
      setLoading(true);
      try {
        const result = await axios.get(
          `http://localhost:5000/api/user/getUserByID/${id}`
        );
        setUserInfo(result.data.data || []);
        console.log(result.data.message);
      } catch (error: any) {
        console.error(error.response?.data?.message || "Something went wrong ❌");
      } finally {
        setLoading(false);
      }
    };

    getUser(); // ✅ Correctly invoked
  }, [id]);

  if (loading) {
    return (
      <div className="h-screen flex items-center justify-center bg-gradient-to-br from-gray-900 via-gray-800 to-black">
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ repeat: Infinity, duration: 1 }}
          className="w-10 h-10 border-4 border-blue-500 border-t-transparent rounded-full"
        ></motion.div>
      </div>
    );
  }

  return (
    <div className="w-full min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-black flex flex-col items-center justify-center p-4 sm:p-6">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="w-full max-w-5xl bg-gray-900/70 backdrop-blur-lg border border-gray-700 shadow-[0_0_25px_rgba(59,130,246,0.2)] rounded-2xl overflow-hidden"
      >
        {/* ✅ Table for Desktop View */}
        <div className="hidden md:block overflow-x-auto">
          <table className="w-full text-left text-gray-300 border-collapse">
            <thead className="bg-gray-800 text-gray-200 uppercase text-sm">
              <tr>
                <th className="p-4">#</th>
                <th className="p-4">Full Name</th>
                <th className="p-4">Email</th>
                <th className="p-4">Phone</th>
                <th className="p-4">Profile</th>
                <th className="p-4 text-center">Actions</th>
              </tr>
            </thead>
            <tbody>
              {userInfo.map((user, idx) => (
                <motion.tr
                  key={idx}
                  initial={{ opacity: 0, y: 15 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: idx * 0.1 }}
                  className="border-b py-3 border-gray-700 hover:bg-gray-800/60 transition"
                >
                  <td className="p-4 text-gray-400">{idx + 1}</td>
                  <td className="p-4 font-medium text-gray-100">
                    {user.username}
                  </td>
                  <td className="p-4">{user.email}</td>
                  <td className="p-4 text-blue-400">{user.phone}</td>
                  <td className="relative w-14 h-14 p-2">
                    <Image
                      src={user.profile_img}
                      alt="profile"
                      fill
                      className="object-cover rounded-full border border-gray-600"
                    />
                  </td>
                  <td className="p-4 text-center text-sm text-gray-400">
                    <button className="px-3 py-1 bg-blue-600 hover:bg-blue-700 rounded-lg text-white font-semibold text-xs transition">
                      View
                    </button>
                  </td>
                </motion.tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* ✅ Card Layout for Mobile View */}
        <div className="md:hidden flex flex-col gap-4 p-4">
          {userInfo.map((user, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: idx * 0.1 }}
              className="bg-gray-800/80 border border-gray-700 rounded-xl p-4 shadow-md flex flex-col sm:flex-row items-center sm:items-start gap-4"
            >
              <div className="relative w-24 h-24 rounded-full overflow-hidden border border-gray-600">
                <Image
                  src={user.profile_img}
                  alt="Profile"
                  fill
                  className="object-cover"
                />
              </div>
              <div className="flex-1 text-center sm:text-left">
                <h3 className="text-lg font-semibold text-blue-400">
                  {user.username}
                </h3>
                <p className="text-gray-300">{user.email}</p>
                <p className="text-gray-400 text-sm">{user.phone}</p>
                <p className="text-gray-500 text-xs mt-1">
                  Joined: {new Date(user.created_at).toLocaleDateString()}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </div>
  );
}
