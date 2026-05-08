"use client";

import Navbar from "@/components/navbar";
import Footer from "@/components/footer";
import { useRouter } from "next/navigation";
import { useApp } from "@/context/AppContext";
import ItemCard from "@/components/item-card";
import { useState } from "react";
import { Plus } from "lucide-react";

export default function PrelovedApp() {
  const { items, isMounted } = useApp();
  const router = useRouter();
  const [search, setSearch] = useState("");

  // Helper Format Rupiah
  const formatIDR = (num: number) => {
    return new Intl.NumberFormat("id-ID").format(num);
  };

  const handleClickDetail = (id: string | number) => {
    router.push(`/product/${id}`);
  };

  // Filter items berdasarkan nama
  const filteredItems = items.filter((item) =>
    item.title.toLowerCase().includes(search.toLowerCase())
  );

  // Proteksi Hydration
  if (!isMounted) return null;

  return (
    <div className="min-h-screen bg-[#f8f9fa] text-slate-900 font-sans">
      <Navbar />

      {/* HERO SECTION */}
      <div className="bg-gradient-to-r from-blue-800 to-indigo-900 text-white py-12 mb-10 px-4">
        <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center justify-between gap-8">
          <div className="max-w-lg">
            <h2 className="text-4xl md:text-5xl font-black leading-tight mb-4 tracking-tighter">
              Beri Kesempatan Kedua Untuk Barangmu.
            </h2>
            <p className="text-indigo-200 text-lg">
              Platform terpercaya jual beli barang preloved berkualitas di Indonesia.
            </p>
          </div>
        </div>
      </div>

      {/* MAIN CONTENT */}
      <main className="max-w-6xl mx-auto px-4 pb-20">

        {/* SEARCH FORM */}
        <div className="mb-8">
          <input
            type="text"
            placeholder="Cari produk..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
          />
        </div>

        {filteredItems.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {filteredItems.map((item) => (
              <ItemCard key={item.id} item={item} isProfilePage={false} />
            ))}
          </div>
        ) : (
          <div className="text-center py-20 text-slate-400 font-medium">
            <p>Produk tidak ditemukan...</p>
          </div>
        )}
      </main>

      {/* FLOATING ADD BUTTON */}
      <button
        onClick={() => router.push("/upload")}
        className="fixed bottom-6 right-6 w-14 h-14 rounded-full bg-indigo-600 hover:bg-indigo-700 text-white flex items-center justify-center shadow-lg transition cursor-pointer"
      >
        <Plus size={28} />
      </button>

      <Footer />
    </div>
  );
}