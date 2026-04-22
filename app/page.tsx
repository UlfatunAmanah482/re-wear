"use client";

import React, { useState, useEffect } from "react";
import { Trash2, Plus, LogOut, User as UserIcon, Package, ShoppingBag, X, LogIn, Store } from "lucide-react";
import Navbar from "@/components/navbar";
import Footer from "@/components/footer";
import { useRouter } from "next/navigation";

// --- DATA AWAL (Hanya muncul jika storage kosong) ---
const INITIAL_ITEMS = [
  { id: 1, title: "Kamera Analog Canon AE-1", price: 1500000, image: "https://images.unsplash.com/photo-1510127034890-ba27508e9f1c?w=500", seller: "Budi" },
  { id: 2, title: "Jaket Levi's Vintage", price: 450000, image: "https://images.unsplash.com/photo-1551028719-00167b16eac5?w=500", seller: "Siska" },
  { id: 3, title: "Sepatu Converse 70s Black White", price: 600000, image: "https://images.unsplash.com/photo-1595950653106-6c9ebd614d3a?w=500", seller: "Andi" },
];

export default function PrelovedApp() {
  // --- STATES ---
  const [items, setItems] = useState<any[]>([]);
  const [user, setUser] = useState<{ email: string; role: string } | null>(null);
  const [view, setView] = useState("home"); // home, login, register, upload
  const [isMounted, setIsMounted] = useState(false);
  const [formData, setFormData] = useState({ title: "", price: "", image: "" });
  const [authData, setAuthData] = useState({ email: "", password: "" });

  const router = useRouter();

  // --- EFFECT: LOAD DATA (ON MOUNT) ---
  useEffect(() => {
    setIsMounted(true);
    // Ambil data barang dari LocalStorage
    const savedItems = localStorage.getItem("preloved_items");
    if (savedItems) {
      setItems(JSON.parse(savedItems));
    } else {
      setItems(INITIAL_ITEMS);
    }

    // Ambil data user session dari LocalStorage
    const savedUser = localStorage.getItem("preloved_user");
    if (savedUser) {
      setUser(JSON.parse(savedUser));
    }
  }, []);

  // --- EFFECT: SYNC ITEMS TO STORAGE ---
  useEffect(() => {
    if (isMounted) {
      localStorage.setItem("preloved_items", JSON.stringify(items));
    }
  }, [items, isMounted]);

  // --- LOGIC: AUTHENTICATION ---
  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (!authData.email || !authData.password) return alert("Isi semua bidang!");

    const role = authData.email.toLowerCase().includes("admin") ? "ADMIN" : "USER";
    const newUser = { email: authData.email, role };

    setUser(newUser);
    localStorage.setItem("preloved_user", JSON.stringify(newUser));
    setAuthData({ email: "", password: "" });
  };

  const handleLogout = () => {
    setUser(null);
    localStorage.removeItem("preloved_user");
    setView("home");
  };

  const handleRegister = (e: React.FormEvent) => {
    e.preventDefault();
    alert("Registrasi Berhasil! Silakan masuk.");
    setView("login");
  };

  // --- LOGIC: CRUD ---
  const handleUpload = (e: React.FormEvent) => {
    e.preventDefault();
    if (!user) return setView("login");

    const newItem = {
      id: Date.now(),
      title: formData.title,
      price: parseInt(formData.price),
      image: formData.image || "https://images.unsplash.com/photo-1584305116359-541405d6f4d3?w=500",
      seller: user.email.split("@")[0],
    };

    setItems([newItem, ...items]);
    setFormData({ title: "", price: "", image: "" });
    setView("home");
  };

  const handleDelete = (id: number) => {
    if (confirm("Hapus barang ini secara permanen?")) {
      setItems(items.filter((item) => item.id !== id));
    }
  };

  // Helper Format Rupiah
  const formatIDR = (num: number) => {
    return isMounted ? new Intl.NumberFormat("id-ID").format(num) : "---";
  };

  if (!isMounted) return null; // Mencegah Hydration Error

  return (
    <div className="min-h-screen bg-[#f8f9fa] text-slate-900 font-sans">
      
      {/* NAVBAR */}
      <Navbar />

      {/* HERO SECTION (Hanya muncul di Home) */}
      {view === "home" && (
        <div className="bg-indigo-900 text-white py-12 mb-10 px-4">
          <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center justify-between gap-8">
            <div className="max-w-lg">
              <h2 className="text-4xl md:text-5xl font-black leading-tight mb-4">Beri Kesempatan Kedua Untuk Barangmu.</h2>
              <p className="text-indigo-200 text-lg">Platform terpercaya jual beli barang preloved berkualitas di Indonesia.</p>
            </div>
            <div className="flex gap-4">
              <div className="bg-indigo-800/50 p-6 rounded-3xl border border-indigo-700 text-center">
                <div className="text-3xl font-black mb-1">{items.length}</div>
                <div className="text-indigo-300 text-xs uppercase font-bold tracking-widest">Produk Aktif</div>
              </div>
              <div className="bg-indigo-800/50 p-6 rounded-3xl border border-indigo-700 text-center">
                <div className="text-3xl font-black mb-1">2.4k</div>
                <div className="text-indigo-300 text-xs uppercase font-bold tracking-widest">Pembeli</div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* MAIN CONTENT */}
      <main className="max-w-6xl mx-auto px-4 pb-20">
        
        {/* VIEW: HOME */}
        {view === "home" && (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {items.map((item) => (
              <div key={item.id} className="bg-white rounded-[2rem] border border-slate-100 p-3 shadow-sm hover:shadow-2xl hover:-translate-y-2 transition-all duration-500 group">
                <div className="relative h-60 w-full mb-4 overflow-hidden rounded-[1.5rem]">
                  <img src={item.image} alt={item.title} className="w-full h-full object-cover group-hover:scale-110 transition duration-700" />
                  <div className="absolute top-3 right-3 bg-white/90 backdrop-blur-md px-3 py-1 rounded-full text-[10px] font-black uppercase text-indigo-600 shadow-sm border border-indigo-50">
                    {item.seller}
                  </div>
                </div>
                <div className="px-2 pb-2">
                  <h3 className="font-bold text-slate-800 mb-1 line-clamp-1">{item.title}</h3>
                  <p className="text-xl font-black text-indigo-600 mb-4">Rp {formatIDR(item.price)}</p>
                  
                  {user?.role === "ADMIN" ? (
                    <button 
                      onClick={() => handleDelete(item.id)}
                      className="w-full py-3 rounded-2xl bg-red-50 text-red-500 hover:bg-red-500 hover:text-white transition-all font-bold text-xs flex items-center justify-center gap-2 border border-red-100"
                    >
                      <Trash2 size={14} /> HAPUS BARANG (ADMIN)
                    </button>
                  ) : (
                    <button 
                      className="w-full rounded-2xl bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-2 gap-2 text-sm font-bold transition shadow-lg shadow-indigo-100"
                      onClick={() => router.push(`/product/${item.id}`)}
                    >
                      LIHAT DETAIL
                    </button>
                  )}
                </div>
              </div>
            ))}
          </div>
        )}

        {/* VIEW: UPLOAD */}
        {view === "upload" && (
          <div className="max-w-xl mx-auto mt-10">
            <div className="bg-white p-10 rounded-[3rem] shadow-2xl border border-slate-50">
              <div className="flex justify-between items-center mb-8">
                <h2 className="text-3xl font-black">Jual Barang</h2>
                <button onClick={() => setView("home")} className="p-2 hover:bg-slate-100 rounded-full transition"><X /></button>
              </div>
              
              <form onSubmit={handleUpload} className="space-y-5">
                <div>
                  <label className="text-xs font-black text-slate-400 uppercase ml-2 mb-2 block">Nama Barang</label>
                  <input 
                    placeholder="Contoh: Sepatu Nike Air Jordan" 
                    className="w-full p-4 rounded-2xl bg-slate-50 border-2 border-transparent focus:border-indigo-500 focus:bg-white outline-none transition-all font-medium"
                    value={formData.title}
                    onChange={(e) => setFormData({...formData, title: e.target.value})}
                    required 
                  />
                </div>
                <div>
                  <label className="text-xs font-black text-slate-400 uppercase ml-2 mb-2 block">Harga (Rp)</label>
                  <input 
                    type="number"
                    placeholder="Contoh: 1200000" 
                    className="w-full p-4 rounded-2xl bg-slate-50 border-2 border-transparent focus:border-indigo-500 focus:bg-white outline-none transition-all font-medium"
                    value={formData.price}
                    onChange={(e) => setFormData({...formData, price: e.target.value})}
                    required 
                  />
                </div>
                <div>
                  <label className="text-xs font-black text-slate-400 uppercase ml-2 mb-2 block">Link Foto Barang</label>
                  <input 
                    placeholder="https://images.unsplash.com/..." 
                    className="w-full p-4 rounded-2xl bg-slate-50 border-2 border-transparent focus:border-indigo-500 focus:bg-white outline-none transition-all font-medium"
                    value={formData.image}
                    onChange={(e) => setFormData({...formData, image: e.target.value})}
                  />
                </div>
                <div className="pt-4 flex gap-3">
                   <button type="button" onClick={() => setView("home")} className="flex-1 py-4 font-black text-slate-400 hover:bg-slate-50 rounded-2xl transition">BATAL</button>
                   <button className="flex-2 bg-indigo-600 text-white px-8 py-4 rounded-2xl font-black hover:bg-indigo-700 transition shadow-lg shadow-indigo-200">UPLOAD SEKARANG</button>
                </div>
              </form>
            </div>
          </div>
        )}

      </main>

      {/* FOOTER */}
      <Footer />
    </div>
  );
}