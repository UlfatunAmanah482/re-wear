"use client";

import { useApp } from "@/context/AppContext";
import { useRouter } from "next/navigation";
import { Package } from "lucide-react";
import ItemCard from "@/components/item-card";
import Navbar from "@/components/navbar";

export default function ProfilePage() {
  const { user, items, isMounted, logout } = useApp();
  const router = useRouter();

  if (!isMounted) return null;
  if (!user) { router.push("/login"); return null; }

  // Filter barang milik user ini sendiri
  const myItems = items.filter((item: any) => item.sellerEmail === user.email);

  return (
    <div className="min-h-screen bg-[#f8f9fa] text-slate-900 font-sans">

      {/* NAVBAR */}
      <Navbar />
      <main className="max-w-6xl mx-auto px-4 py-10">
        {/* Header Profil */}
        <div className="relative bg-gradient-to-r from-blue-600 to-indigo-700 rounded-[3rem] p-8 md:p-12 text-white overflow-hidden mb-10 shadow-2xl">
          <div className="relative z-10 flex flex-col md:flex-row items-center gap-8">
            <div className="w-32 h-32 bg-white/20 backdrop-blur-md rounded-full border-4 border-white/30 flex items-center justify-center text-4xl font-black">
              {user.email[0].toUpperCase()}
            </div>
            <div className="text-center md:text-left flex-1">
              <div className="flex items-center justify-center md:justify-start gap-3 mb-2">
                <h1 className="text-3xl font-black">{user.email.split('@')[0]}</h1>
                <span className="bg-white/20 px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-widest">
                  {user.role}
                </span>
              </div>
              <p className="text-blue-100 mb-6">{user.email}</p>
              <div className="flex flex-wrap justify-center md:justify-start gap-4">
                <button onClick={logout} className="bg-red-500/20 hover:bg-red-500 text-white border border-red-500/50 px-6 py-2 rounded-xl text-sm font-bold transition cursor-pointer">
                  Logout
                </button>
              </div>
            </div>
          </div>

          {/* Dekorasi Background */}
          <div className="absolute top-[-20%] right-[-10%] w-64 h-64 bg-white/10 rounded-full blur-3xl"></div>
        </div>

        {/* Tabs / Content */}
        <div className="flex items-center gap-8 border-b mb-8 px-4 font-bold text-gray-400">
          <button className="text-blue-600 border-b-2 border-blue-600 pb-4 flex items-center gap-2">
            <Package size={18} /> Produk Saya
          </button>
        </div>

        {/* List Produk User */}
        {myItems.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {myItems.map((item: any) => (
              <ItemCard key={item.id} item={item} />
            ))}
          </div>
        ) : (
          <div className="text-center py-20 bg-gray-50 rounded-[3rem] border-2 border-dashed border-gray-200">
            <Package className="mx-auto text-gray-300 mb-4" size={48} />
            <p className="text-gray-500 font-bold">Anda belum mengunggah barang apapun.</p>
            <button onClick={() => router.push("/upload")} className="mt-4 text-blue-600 font-bold cursor-pointer">Mulai Jual Sekarang &rarr;</button>
          </div>
        )}
      </main>
    </div>
  );
}