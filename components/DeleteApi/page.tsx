"use client";

import React from "react";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import axios from "axios";
import { toast } from "sonner";

interface DeleteDialogProps {
  userId: number;
  username: string;
  onDeleted: () => void;
}

export default function AlertBox({ userId, username, onDeleted }: DeleteDialogProps) {
  const handleDelete = async () => {
    try {
      const res = await axios.delete(`http://localhost:5000/api/user/deleteRecord/${userId}`);
      toast.success(res.data.success);
      onDeleted();
    } catch (err: any) {
      toast.error(err.response?.data?.message || "Failed to delete user ❌");
    }
  };

  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        <button className="cursor-pointer">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            height="24px"
            viewBox="0 -960 960 960"
            width="24px"
            fill="#f41c04ff"
          >
            <path d="M648.48-539.78v-97.53H906v97.53H648.48ZM361.7-489.61q-74.48 0-126.85-52.37-52.37-52.37-52.37-126.85 0-74.48 52.37-126.56 52.37-52.09 126.85-52.09 74.47 0 126.84 52.09 52.37 52.08 52.37 126.56t-52.37 126.85q-52.37 52.37-126.84 52.37ZM22.48-131.17v-132.35q0-39.26 20.43-72.17 20.44-32.9 54.31-50.22 63.69-31.57 129.93-47.63 66.24-16.07 134.55-16.07 69.39 0 135.65 15.78 66.26 15.79 128.82 47.35 33.87 17.24 54.31 49.99 20.43 32.75 20.43 72.94v132.38H22.48Zm106-106h466.43v-23.53q0-10.45-5.5-19t-14.5-13.3Q524.3-317.74 471-330.67q-53.3-12.94-109.3-12.94-54.87 0-109.31 12.94-54.43 12.93-103.91 37.67-9 4.75-14.5 13.3t-5.5 19v23.53Zm233.2-358.44q30.19 0 51.71-21.5t21.52-51.7q0-30.19-21.5-51.43t-51.69-21.24q-30.2 0-51.72 21.34t-21.52 51.31q0 30.2 21.5 51.71t51.7 21.51Zm.02-73.22Zm0 431.66Z" />
          </svg>
        </button>
      </AlertDialogTrigger>

      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Delete {username}?</AlertDialogTitle>
          <AlertDialogDescription>
            This action cannot be undone. This will permanently delete the user
            <span className="font-semibold text-red-500"> {username}</span> from the system.
          </AlertDialogDescription>
        </AlertDialogHeader>

        <AlertDialogFooter>
          <AlertDialogCancel>Cancel</AlertDialogCancel>
          <AlertDialogAction
            onClick={handleDelete}
            className="bg-red-600 hover:bg-red-700 text-white"
          >
            Delete
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
