"use client";

import React from "react";
import { motion } from "framer-motion";

type User = { id: string; name: string; email: string; role: string };

export default function ModifyUsers() {
  const [users, setUsers] = React.useState<User[]>([
    { id: "1", name: "Alice", email: "alice@gmail.com", role: "admin" },
    { id: "2", name: "Bob", email: "bob@gmail.com", role: "editor" },
  ]);

  const handleRoleChange = (id: string, role: string) => {
    setUsers((prev) => prev.map((u) => (u.id === id ? { ...u, role } : u)));
  };

  const handleDelete = (id: string) => {
    setUsers((prev) => prev.filter((u) => u.id !== id));
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-black flex flex-col items-center justify-center p-6">
      <motion.h2
        initial={{ opacity: 0, y: -15 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
        className="text-3xl font-bold mb-6 text-blue-400"
      >
        Modify Users
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
              <th className="p-4">Name</th>
              <th className="p-4">Email</th>
              <th className="p-4">Role</th>
              <th className="p-4">Actions</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user, idx) => (
              <motion.tr
                key={user.id}
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: idx * 0.1 }}
                className="border-b border-gray-700 hover:bg-gray-800/60 transition"
              >
                <td className="p-4 text-gray-100 font-medium">{user.name}</td>
                <td className="p-4">{user.email}</td>
                <td className="p-4">
                  <select
                    value={user.role}
                    onChange={(e) => handleRoleChange(user.id, e.target.value)}
                    className="bg-gray-800 border border-gray-700 text-gray-200 rounded-lg px-2 py-1 focus:ring-2 focus:ring-blue-500 outline-none transition"
                  >
                    <option value="admin">Admin</option>
                    <option value="editor">Editor</option>
                    <option value="viewer">Viewer</option>
                  </select>
                </td>
                <td className="p-4">
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => handleDelete(user.id)}
                    className="px-4 py-1.5 rounded-lg bg-red-600 hover:bg-red-700 text-white font-medium transition"
                  >
                    Delete
                  </motion.button>
                </td>
              </motion.tr>
            ))}
          </tbody>
        </table>
      </motion.div>
    </div>
  );
}
