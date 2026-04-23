"use client";

import { useParams, useRouter } from "next/navigation";
import { useApp } from "@/context/AppContext";
import { formatIDR } from "@/lib/utils";
import { ChevronLeft, MessageSquare, Edit, Trash2 } from "lucide-react"; // Tambah icon
import Navbar from "@/components/navbar";
import { useEffect, useState } from "react";
import { Item } from "@/types";

export default function ProductDetail() {
  const [item, setItem] = useState<Item | null>(null);
  const { id } = useParams();
  const { getItemById, user } = useApp(); // Ambil 'user' yang sedang login dari context
  const router = useRouter();

  useEffect(() => {
    setItem(getItemById(Number(id)) ?? null);
  }, [id, getItemById]);

  // Logika pengecekan pemilik
  // Sesuaikan properti 'id' atau 'username' sesuai dengan struktur data Item dan User kamu
  const isOwner = item && user && item.sellerEmail === user.email;

  const handleChat = () => {
    const message = "Halo kak, saya tertarik dengan produk ini";
    const url = `https://wa.me/${item?.phone}?text=${encodeURIComponent(message)}`;
    window.open(url, "_blank");
  };

  const handleEdit = () => {
    router.push(`/edit-product/${item?.id}`);
  };

  const handleDelete = () => {
    if (confirm("Apakah Anda yakin ingin menghapus produk ini?")) {
      // Panggil fungsi delete dari context di sini
      console.log("Menghapus produk:", item?.id);
    }
  };

  return (
    <div className="min-h-screen bg-[#f8f9fa] text-slate-900 font-sans">
      <Navbar />

      <main className="max-w-6xl mx-auto px-4 py-10">
        <button onClick={() => router.back()} className="flex items-center gap-2 text-gray-500 hover:text-blue-600 mb-6 transition cursor-pointer">
          <ChevronLeft size={20} /> Kembali
        </button>

        {item ? (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            <div className="rounded-3xl overflow-hidden shadow-2xl bg-white border">
              <img src={item.image} alt={item.title} className="w-full h-[500px] object-cover" />
            </div>

            <div className="flex flex-col justify-center">
              <span className="bg-blue-100 text-blue-600 px-4 py-1 rounded-full text-xs font-bold w-fit mb-4">
                {item.category || "Preloved"}
              </span>
              <h1 className="text-4xl font-black text-gray-900 mb-2">{item.title}</h1>
              <p className="text-3xl font-black text-blue-600 mb-6">Rp {formatIDR(item.price)}</p>

              <div className="bg-gray-50 p-4 rounded-2xl mb-8 border border-gray-100">
                <h3 className="font-bold mb-2">Deskripsi Produk</h3>
                <p className="text-gray-600 leading-relaxed">{item.description}</p>
              </div>

              {/* Tampilan Penjual */}
              <div className="flex items-center gap-4 mb-8 p-4 border border-gray-300 rounded-2xl bg-white">
                <div className="w-12 h-12 bg-blue-600 rounded-full flex items-center justify-center text-white font-bold">
                  {item.seller[0]}
                </div>
                <div>
                  <p className="text-sm text-gray-400">Penjual</p>
                  <p className="font-bold">{item.seller} {isOwner && <span className="text-xs text-blue-500 font-normal">(Anda)</span>}</p>
                </div>
              </div>

              {/* ACTION BUTTONS (Conditional) */}
              <div className="flex gap-4">
                {isOwner ? (
                  <>
                    <button
                      onClick={handleEdit}
                      className="flex-1 bg-amber-500 text-white py-4 rounded-2xl font-bold flex items-center justify-center gap-2 hover:bg-amber-600 transition shadow-lg shadow-amber-100"
                    >
                      <Edit size={20} /> Edit Produk
                    </button>
                    <button
                      onClick={handleDelete}
                      className="flex-1 bg-red-500 text-white py-4 rounded-2xl font-bold flex items-center justify-center gap-2 hover:bg-red-600 transition shadow-lg shadow-red-100"
                    >
                      <Trash2 size={20} /> Hapus
                    </button>
                  </>
                ) : (
                  <button
                    onClick={handleChat}
                    className="flex-1 bg-blue-600 text-white py-4 rounded-2xl font-bold flex items-center justify-center gap-2 hover:bg-blue-700 shadow-lg shadow-blue-200 transition"
                  >
                    <MessageSquare size={20} /> Chat Penjual
                  </button>
                )}
              </div>
            </div>
          </div>
        ) : (
          <div className="text-center py-20">Produk tidak ditemukan</div>
        )}
      </main>
    </div>
  );
}