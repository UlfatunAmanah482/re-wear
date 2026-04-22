"use client";

import Navbar from "@/components/navbar";
import { X } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function AddProduct() {
  const [formData, setFormData] = useState({ title: "", price: "", image: "" });

  const router = useRouter();

  const handleUpload = (e: React.FormEvent) => {
    e.preventDefault();

    const newItem = {
      id: Date.now(),
      title: formData.title,
      price: parseInt(formData.price),
      image: formData.image || "https://images.unsplash.com/photo-1584305116359-541405d6f4d3?w=500",
      // seller: user.email.split("@")[0],
    };

    // setItems([newItem, ...items]);
    setFormData({ title: "", price: "", image: "" });
    router.back();
  };

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const imageUrl = URL.createObjectURL(file);
    setFormData({ ...formData, image: imageUrl });
  };

  return (
    <div className="min-h-screen bg-[#f8f9fa] text-slate-900 font-sans">
      <Navbar />

      <main className="flex items-center justify-center px-4 mt-[6%]">
        <div className="w-xl">
          <div className="bg-white p-10 rounded-[3rem] shadow-2xl border border-slate-50">
            <div className="flex justify-between items-center mb-8">
              <h2 className="text-3xl font-black">Jual Barang</h2>
              <button onClick={() => router.back()} className="p-2 hover:bg-slate-100 rounded-full transition cursor-pointer"><X /></button>
            </div>

            <form onSubmit={handleUpload} className="space-y-5">
              <div>
                <label className="text-xs font-black text-slate-400 uppercase ml-2 mb-2 block">Nama Barang</label>
                <input
                  placeholder="Contoh: Sepatu Nike Air Jordan"
                  className="w-full p-4 rounded-2xl bg-slate-50 border-2 border-transparent focus:border-indigo-500 focus:bg-white outline-none transition-all font-medium"
                  value={formData.title}
                  onChange={(e) => setFormData({ ...formData, title: e.target.value })}
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
                  onChange={(e) => setFormData({ ...formData, price: e.target.value })}
                  required
                />
              </div>
              <div>
                <label className="text-xs font-black text-slate-400 uppercase ml-2 mb-2 block">Foto Barang</label>
                <input
                  type="file"
                  accept="image/*"
                  capture="environment"
                  className="w-full p-4 rounded-2xl bg-slate-50 border-2 border-transparent focus:border-indigo-500 focus:bg-white outline-none transition-all font-medium"
                  onChange={handleImageUpload}
                />
              </div>
              <div className="pt-4 flex gap-3">
                <button
                  type="button"
                  onClick={() => router.back()}
                  className="flex-1 py-4 font-black text-slate-400 hover:bg-slate-50 rounded-2xl transition cursor-pointer"
                >
                  BATAL
                </button>

                <button className="flex-1 bg-indigo-600 text-white px-8 py-4 rounded-2xl font-black hover:bg-indigo-700 transition shadow-lg shadow-indigo-200 cursor-pointer">
                  UPLOAD SEKARANG
                </button>
              </div>
            </form>
          </div>
        </div>
      </main>
    </div>
  )
}