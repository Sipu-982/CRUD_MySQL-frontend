"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  LayoutDashboard,
  UserPlus,
  Users,
  Edit,
  Menu,
  X,
  LogOut,
} from "lucide-react";

const navItems = [
  { href: "/", label: "Dashboard", icon: LayoutDashboard },
  { href: "/add-users", label: "Add User", icon: UserPlus },
  { href: "/view-users", label: "View Users", icon: Users },
  { href: "/update-users", label: "Modify Users", icon: Edit },
];

export default function Sidebar() {
  const [isOpen, setIsOpen] = useState(true);
  const pathname = usePathname();

  return (
    <>
      {/* Mobile Toggle Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="md:hidden fixed top-4 left-4 z-50 p-2 bg-gray-900 text-white rounded-lg focus:outline-none"
      >
        {isOpen ? <X size={20} /> : <Menu size={20} />}
      </button>

      {/* Sidebar Container */}
      <motion.aside
        initial={{ width: 240 }}
        animate={{ width: isOpen ? 240 : 80 }}
        transition={{ duration: 0.4, type: "spring", stiffness: 120 }}
        className="h-screen fixed top-0 left-0 bg-gray-900 text-white shadow-xl flex flex-col z-40"
      >
        {/* Logo Section */}
        <div className="flex items-center justify-between p-4 border-b border-gray-800">
          <AnimatePresence>
            {isOpen && (
              <motion.h1
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="text-lg font-bold tracking-wide"
              >
                Admin Panel
              </motion.h1>
            )}
          </AnimatePresence>
        </div>

        {/* Navigation Links */}
        <nav className="flex-1 p-3 space-y-2">
          {navItems.map(({ href, label, icon: Icon }) => {
            const isActive = pathname === href;
            return (
              <Link key={href} href={href}>
                <motion.div
                  whileHover={{ scale: 1.05 }}
                  className={`flex items-center gap-3 p-3 rounded-md cursor-pointer transition-colors ${
                    isActive
                      ? "bg-blue-600 text-white"
                      : "hover:bg-gray-800 text-gray-300"
                  }`}
                >
                  <Icon size={22} />
                  <AnimatePresence>
                    {isOpen && (
                      <motion.span
                        initial={{ opacity: 0, x: -10 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: -10 }}
                        className="whitespace-nowrap"
                      >
                        {label}
                      </motion.span>
                    )}
                  </AnimatePresence>
                </motion.div>
              </Link>
            );
          })}
        </nav>

        {/* Footer Section */}
        <div className="border-t border-gray-800 p-4 flex items-center justify-between text-gray-400 text-sm">
          {isOpen && <span>© 2025 Admin</span>}
          <button className="hover:text-white transition">
            <LogOut size={20} />
          </button>
        </div>
      </motion.aside>
    </>
  );
}
