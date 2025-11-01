"use client";

import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import axios from "axios";
import { Spinner } from "@/components/ui/spinner";
import { toast } from "sonner";
import Image from "next/image";
import { useParams } from "next/navigation";

export default function UpdateUser() {
  
  const params = useParams<{id:string}>()
  const id = params?.id;
  
  const [form, setForm] = useState({
    username: "",
    email: "",
    phone: "",
  });
  const [file, setFile] = useState<File | null>(null);
  const [preview, setPreview] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    console.log("user id:",id);
    if(!id)return;
    
    const fetchUser = async () => {

      try {
        const res = await axios.get(`http://localhost:5000/api/user/getUserByID/${id}`);
        const userInfo = res.data.data[0];
if (userInfo) {
          setForm({
            username: userInfo.username || "",
            email: userInfo.email || "",
            phone: userInfo.phone || "",
          });
          setPreview(userInfo.profile_img || null);
        }      } catch (err) {
        console.error(err);
        toast.error("Failed to load user data", { position: "top-center" });
      }
    };

    if (id) fetchUser();
  }, [id]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  // ✅ Handle image change
  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files?.[0];
    if (selectedFile) {
      setFile(selectedFile);
      setPreview(URL.createObjectURL(selectedFile));
    }
  };

  // ✅ Handle form submission (Update)
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const formData = new FormData();
      formData.append("username", form.username);
      formData.append("email", form.email);
      formData.append("phone", form.phone);

      if (file) {
        formData.append("profiles", file); // 👈 match multer field name
      }

      const res = await axios.put(
        `http://localhost:5000/api/user/updateRecord/${id}`,
        formData,
        { headers: { "Content-Type": "multipart/form-data" } }
      );

      toast.success(res.data.message || "User updated successfully ✅", {
        position: "top-center",
      });
    } catch (error: any) {
      console.error(error);
      toast.error(error.response?.data?.message || "Update failed ❌", {
        position: "top-center",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-black flex justify-center items-center">
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="w-full max-w-md bg-gray-900/70 backdrop-blur-lg border border-gray-700 shadow-[0_0_30px_rgba(59,130,246,0.2)] rounded-2xl p-8 text-gray-200"
      >
        <motion.h2
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="text-3xl font-bold mb-6 text-center text-blue-400"
        >
          Update User
        </motion.h2>

        <form onSubmit={handleSubmit} className="space-y-5">
          {/* Username */}
          <div>
            <label className="block text-sm font-medium mb-1">Username</label>
            <input
              name="username"
              value={form.username}
              onChange={handleChange}
              placeholder="Enter username"
              className="w-full bg-gray-800 border border-gray-700 rounded-lg px-3 py-2 text-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
            />
          </div>

          {/* Email */}
          <div>
            <label className="block text-sm font-medium mb-1">Email</label>
            <input
              type="email"
              name="email"
              value={form.email}
              onChange={handleChange}
              placeholder="Enter email"
              className="w-full bg-gray-800 border border-gray-700 rounded-lg px-3 py-2 text-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
            />
          </div>

          {/* Phone */}
          <div>
            <label className="block text-sm font-medium mb-1">Phone</label>
            <input
              type="text"
              name="phone"
              value={form.phone}
              onChange={handleChange}
              placeholder="Enter phone number"
              className="w-full bg-gray-800 border border-gray-700 rounded-lg px-3 py-2 text-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
            />
          </div>

          {/* Password */}
          {/* <div>
            <label className="block text-sm font-medium mb-1">Password (optional)</label>
            <input
              type="password"
              name="password"
              value={form.password || }
              onChange={handleChange}
              placeholder="Enter new password"
              className="w-full bg-gray-800 border border-gray-700 rounded-lg px-3 py-2 text-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
            />
          </div> */}

          {/* Profile Image */}
          <div>
            <label className="block text-sm font-medium mb-1">Profile Image</label>
            <input
              type="file"
              accept="image/*"
              onChange={handleImageChange}
              className="w-full text-gray-300"
            />
            {preview && (
              <Image
                src={preview}
                width={100}
                height={100}
                alt="Preview"
                className="mt-3 rounded-full w-24 h-24 object-cover border border-gray-700"
              />
            )}
          </div>

          {/* Submit Button */}
          <motion.button
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.97 }}
            type="submit"
            disabled={loading}
            className="w-full flex justify-center items-center text-center py-2 mt-3 rounded-lg bg-blue-600 hover:bg-blue-700 text-white font-semibold shadow-lg transition duration-200"
          >
            {loading ? (
              <>
                <Spinner /> &nbsp;Updating...
              </>
            ) : (
              "Update Record"
            )}
          </motion.button>
        </form>
      </motion.div>
    </div>
  );
}
