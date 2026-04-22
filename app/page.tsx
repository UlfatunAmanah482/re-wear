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

  const handleClickDetail = (id: string) => {
    router.push(user ? `/product/${id}` : `/login`)
  }

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
                      className="cursor-pointer w-full rounded-2xl bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-2 gap-2 text-sm font-bold transition shadow-lg shadow-indigo-100"
                      onClick={() => handleClickDetail(item.id)}
                    >
                      LIHAT DETAIL
                    </button>
                  )}
                </div>
              </div>
            ))}
          </div>
        )}
      </main>

      {/* FOOTER */}
      <Footer />
    </div>
  );
}