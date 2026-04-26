"use client";

import Navbar from "@/components/navbar";
import Footer from "@/components/footer";
import { useRouter } from "next/navigation";
import { useApp } from "@/context/AppContext";

export default function PrelovedApp() {
  const { items, isMounted } = useApp();
  const router = useRouter();

  // Helper Format Rupiah
  const formatIDR = (num: number) => {
    return new Intl.NumberFormat("id-ID").format(num);
  };

  const handleClickDetail = (id: string | number) => {
    router.push(`/product/${id}`);
  };

  // Proteksi Hydration (Sangat penting di Next.js)
  if (!isMounted) return null;

  return (
    <div className="min-h-screen bg-[#f8f9fa] text-slate-900 font-sans">
      
      <Navbar />

      {/* HERO SECTION */}
      <div className="bg-indigo-900 text-white py-12 mb-10 px-4">
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
        
        {/* Jika items ada isinya, tampilkan. Jika tidak, tampilkan loading/pesan kosong */}
        {items.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {items.map((item) => (
              <div 
                key={item.id} 
                className="bg-white rounded-[2rem] border border-slate-100 p-3 shadow-sm hover:shadow-2xl hover:-translate-y-2 transition-all duration-500 group"
              >
                <div className="relative h-60 w-full mb-4 overflow-hidden rounded-[1.5rem]">
                  <img 
                    src={item.image || "/images/default-product.jpeg"} 
                    alt={item.title} 
                    className="w-full h-full object-cover group-hover:scale-110 transition duration-700" 
                  />
                </div>

                <div className="px-2 pb-2">
                  <h3 className="font-bold text-slate-800 mb-1 line-clamp-1">{item.title}</h3>
                  <p className="text-xl font-black text-indigo-600 mb-4">
                    Rp {formatIDR(item.price)}
                  </p>
                  
                  <button 
                    className="cursor-pointer w-full rounded-2xl bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-2 gap-2 text-sm font-bold transition shadow-lg shadow-indigo-100"
                    onClick={() => handleClickDetail(item.id)}
                  >
                    LIHAT DETAIL
                  </button>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-20 text-slate-400 font-medium">
            <p>Belum ada produk yang tersedia...</p>
          </div>
        )}
      </main>

      <Footer />
    </div>
  );
}