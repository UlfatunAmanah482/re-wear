"use client";

import { useParams, useRouter } from "next/navigation";
import { useApp } from "@/context/AppContext";
import { formatIDR } from "@/lib/utils";
import { ChevronLeft, ShoppingCart, ShieldCheck, MapPin } from "lucide-react";
import Navbar from "@/components/navbar";

export default function ProductDetail() {
  const { id } = useParams();
  const { getItemById, isMounted } = useApp();
  const router = useRouter();

  if (!isMounted) return null;
  const item = getItemById(Number(id));

  if (!item) return <div className="text-center py-20">Produk tidak ditemukan</div>;

  return (
    <div className="min-h-screen bg-[#f8f9fa] text-slate-900 font-sans">

      {/* NAVBAR */}
      <Navbar />

      <main className="max-w-6xl mx-auto px-4 py-10">
        <button onClick={() => router.back()} className="flex items-center gap-2 text-gray-500 hover:text-blue-600 mb-6 transition">
          <ChevronLeft size={20} /> Kembali
        </button>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Gambar */}
          <div className="rounded-3xl overflow-hidden shadow-2xl bg-white border">
            <img src={item.image} alt={item.title} className="w-full h-[500px] object-cover" />
          </div>

          {/* Info Detail */}
          <div className="flex flex-col">
            <span className="bg-blue-100 text-blue-600 px-4 py-1 rounded-full text-xs font-bold w-fit mb-4">
              {item.category || "Preloved"}
            </span>
            <h1 className="text-4xl font-black text-gray-900 mb-2">{item.title}</h1>
            <p className="text-3xl font-black text-blue-600 mb-6">Rp {formatIDR(item.price)}</p>

            <div className="bg-gray-50 p-6 rounded-2xl mb-8 border border-gray-100">
              <h3 className="font-bold mb-2">Deskripsi Produk</h3>
              <p className="text-gray-600 leading-relaxed">{item.description}</p>
            </div>

            <div className="flex items-center gap-4 mb-8 p-4 border rounded-2xl">
              <div className="w-12 h-12 bg-blue-600 rounded-full flex items-center justify-center text-white font-bold">
                {item.seller[0]}
              </div>
              <div>
                <p className="text-sm text-gray-400">Penjual</p>
                <p className="font-bold">{item.seller}</p>
              </div>
            </div>

            <div className="flex gap-4">
              <button className="flex-1 bg-blue-600 text-white py-4 rounded-2xl font-bold flex items-center justify-center gap-2 hover:bg-blue-700 shadow-lg shadow-blue-200 transition">
                <ShoppingCart size={20} /> Beli Sekarang
              </button>
            </div>

            <div className="mt-6 flex items-center gap-6 text-gray-400 text-xs">
              <span className="flex items-center gap-1"><ShieldCheck size={14} /> Aman & Terpercaya</span>
              <span className="flex items-center gap-1"><MapPin size={14} /> Pengiriman Se-Indonesia</span>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}