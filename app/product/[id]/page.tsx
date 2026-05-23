"use client";

import { useParams, useRouter } from "next/navigation";
import { useApp } from "@/context/AppContext";
import { formatIDR } from "@/lib/utils";
import { ChevronLeft, MessageSquare, Edit, Trash2, UserIcon, MapPin, X } from "lucide-react";
import Navbar from "@/components/navbar";
import { useEffect, useState } from "react";
import ConfirmModal from "@/components/confirm-modal";

export default function ProductDetail() {
  const [showDeleteModal, setShowDeleteModal] = useState<boolean>(false);
  const [showImageModal, setShowImageModal] = useState<boolean>(false);

  const params = useParams();

  const id =
    typeof params.id === "string"
      ? params.id
      : Array.isArray(params.id)
        ? params.id[0]
        : undefined;
  const { getItemById, selectedItem, clearSelectedItem, user, deleteItem } = useApp();
  const router = useRouter();

  useEffect(() => {
    if (!user) {
      router.push("/login");
      return;
    }

    if (!id) return;

    getItemById(id);

    return () => clearSelectedItem();
  }, [id, user]);

  const item = selectedItem;

  if (!user) return null;

  if (!item) return <div>Loading...</div>;

  const isOwner = item && user && item.user.email === user.email;

  const handleChat = () => {
    const message = "Halo kak, saya tertarik dengan produk ini";
    const url = `https://wa.me/${item?.user.phone}?text=${encodeURIComponent(message)}`;
    window.open(url, "_blank");
  };

  const handleEdit = () => {
    router.push(`/edit/${item?.id}`);
  };

  const handleDelete = async () => {
    try {
      if (!id) return;
      await deleteItem(id);
    } catch (error) {
      alert(error);
    }
  };

  return (
    <div className="min-h-screen bg-[#f8f9fa] text-slate-900 font-sans">
      <Navbar />

      <main className="max-w-6xl mx-auto px-4 py-10">
        <button
          onClick={() => router.back()}
          className="flex items-center gap-2 text-gray-500 hover:text-blue-600 mb-6 transition cursor-pointer"
        >
          <ChevronLeft size={20} /> Kembali
        </button>

        <div className="bg-white p-5 rounded-lg shadow-lg">
          {item ? (
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
              {/* IMAGE */}
              <div className="overflow-hidden">
                <img
                  src={item.image || "/images/default-product.jpeg"}
                  alt={item.title}
                  onClick={() => setShowImageModal(true)}
                  className="w-full h-[500px] object-cover rounded-lg cursor-pointer hover:opacity-90 transition"
                />
              </div>

              {/* DETAIL */}
              <div className="flex flex-col justify-center">
                <h1 className="text-xl font-black text-gray-900 mb-2">{item.title}</h1>
                <p className="text-xl font-black text-indigo-700 mb-1">
                  Rp{formatIDR(item.price)}
                </p>

                <div className="flex items-center gap-2 text-sm text-gray-500 mb-6">
                  <MapPin size={16} className="text-red-400" />
                  <span>{item.address}</span>
                </div>

                <div className="bg-gray-50 p-4 rounded-2xl mb-8 border border-gray-100">
                  <h3 className="font-bold mb-2">Deskripsi Produk</h3>
                  <p className="text-xs text-gray-600 leading-relaxed">
                    {item.description}
                  </p>
                </div>

                {/* PENJUAL */}
                <div className="flex items-center gap-4 mb-8 p-4 border border-gray-300 rounded-2xl bg-white">
                  <div className="w-12 h-12 bg-indigo-700 rounded-full flex items-center justify-center text-white font-bold">
                    <UserIcon size={16} />
                  </div>
                  <div>
                    <p className="text-sm text-gray-400">Penjual</p>
                    <p className="font-bold">
                      {item.user.name}{" "}
                      {isOwner && (
                        <span className="text-xs text-blue-500 font-normal">(Anda)</span>
                      )}
                    </p>
                  </div>
                </div>

                {/* ACTION BUTTON */}
                <div className="flex gap-4">
                  {isOwner ? (
                    <>
                      <button
                        onClick={handleEdit}
                        className="flex-1 bg-amber-500 text-sm text-white py-4 rounded-2xl font-bold flex items-center justify-center gap-2 hover:bg-amber-600 transition shadow-lg shadow-amber-100 cursor-pointer"
                      >
                        <Edit size={20} /> Edit Produk
                      </button>

                      <button
                        onClick={() => setShowDeleteModal(true)}
                        className="flex-1 bg-red-500 text-sm text-white py-4 rounded-2xl font-bold flex items-center justify-center gap-2 hover:bg-red-600 transition shadow-lg shadow-red-100 cursor-pointer"
                      >
                        <Trash2 size={20} /> Hapus
                      </button>
                    </>
                  ) : (
                    <button
                      onClick={handleChat}
                      className="flex-1 bg-blue-600 text-white py-4 rounded-2xl font-bold flex items-center justify-center gap-2 hover:bg-blue-700 shadow-lg shadow-blue-200 transition cursor-pointer"
                    >
                      <MessageSquare size={20} /> Chat Penjual
                    </button>
                  )}

                  {user && user.role === "admin" && (
                    <button
                      onClick={() => setShowDeleteModal(true)}
                      className="flex-1 bg-red-500 text-white py-4 rounded-2xl font-bold flex items-center justify-center gap-2 hover:bg-red-600 transition shadow-lg shadow-red-100 cursor-pointer"
                    >
                      HAPUS (ADMIN)
                    </button>
                  )}
                </div>
              </div>
            </div>
          ) : (
            <div className="text-center py-20">Produk tidak ditemukan</div>
          )}
        </div>
      </main>

      {/* IMAGE MODAL */}
      {showImageModal && (
        <div
          className="fixed inset-0 bg-black/80 flex items-center justify-center z-50 p-4"
          onClick={() => setShowImageModal(false)}
        >
          <div className="relative max-w-5xl w-full">
            <button
              onClick={() => setShowImageModal(false)}
              className="absolute -top-10 right-0 text-white hover:text-gray-300 cursor-pointer"
            >
              <X size={28} />
            </button>

            <img
              src={item.image || "/images/default-product.jpeg"}
              alt={item.title}
              className="w-full max-h-[85vh] object-contain rounded-lg"
              onClick={(e) => e.stopPropagation()}
            />
          </div>
        </div>
      )}

      <ConfirmModal
        isOpen={showDeleteModal}
        title="Hapus Produk"
        message="Apakah Anda yakin ingin menghapus produk? Produk ini akan dihapus secara permanen."
        confirmText="Hapus"
        type="delete"
        onCancel={() => setShowDeleteModal(false)}
        onConfirm={handleDelete}
      />
    </div>
  );
}