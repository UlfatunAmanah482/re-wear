"use client";

import { Trash2, TriangleAlert } from "lucide-react";

interface ConfirmModalProps {
  isOpen: boolean;
  title?: string;
  message: string;
  confirmText?: string;
  cancelText?: string;
  type: "delete" | "update" | "logout";
  onConfirm: () => void;
  onCancel: () => void;
}

export default function ConfirmModal({
  isOpen,
  title,
  message,
  confirmText = "Ya",
  cancelText = "Batal",
  type,
  onConfirm,
  onCancel,
}: ConfirmModalProps) {
  if (!isOpen) return null;

  const colorMap = {
    update: "bg-orange-400 hover:bg-orange-500",
    delete: "bg-red-600 hover:bg-red-700",
    logout: "bg-red-600 hover:bg-red-700",
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40">
      <div className="bg-white rounded-2xl shadow-xl w-full max-w-md p-6 animate-fadeIn">

        <div className="flex flex-col items-center justify-center">
          <div>
            {type === "logout" && <TriangleAlert size={62} color="red" />}
            {type === "delete" && <Trash2 size={62} color="red" />}
            {type === "update" && <TriangleAlert size={62} color="orange" />}
          </div>
          {title && (
            <h2 className="text-xl font-bold text-slate-800 mt-2">{title}</h2>
          )}
          <p className="text-sm text-gray-600 text-center mb-6">{message}</p>
        </div>

        {/* BUTTONS */}
        <div className="flex justify-end gap-3">
          <button
            onClick={onCancel}
            className="px-4 py-2 rounded-lg border text-gray-600 hover:bg-gray-100 cursor-pointer"
          >
            {cancelText}
          </button>

          <button
            onClick={onConfirm}
            className={`px-4 py-2 rounded-lg text-white cursor-pointer ${colorMap[type]}`}
          >
            {confirmText}
          </button>
        </div>
      </div>
    </div>
  );
}