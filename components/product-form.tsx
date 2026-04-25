"use client";

import Navbar from "@/components/navbar";
import { X, Upload, Package, DollarSign, AlignLeft } from "lucide-react";
import { useRouter, useParams } from "next/navigation";
import { useEffect, useState } from "react";
import { useApp } from "@/context/AppContext";

export default function ProductForm() {
  const router = useRouter();
  const params = useParams();
  
  // Ambil fungsi dan state global dari context
  const { user, addItem, editItem, getItemById, selectedItem, clearSelectedItem } = useApp();

  const productId = params.id;
  const isEditMode = Boolean(productId);

  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    title: "",
    price: "",
    image: "",
    description: "",
    category: "Pakaian",
  });

  // --- 1. TRIGGER AMBIL DATA DARI API ---
  useEffect(() => {
    if (isEditMode && productId) {
      getItemById(Number(productId));
    }

    // Cleanup: Bersihkan selectedItem saat meninggalkan halaman
    return () => clearSelectedItem();
  }, [productId, isEditMode]);

  // --- 2. WATCH: ISI FORM SAAT SELECTED_ITEM TERISI ---
  useEffect(() => {
    // Jika data sudah masuk ke global state selectedItem, pindahkan ke local form
    if (isEditMode && selectedItem && selectedItem.id === Number(productId)) {
      setFormData({
        title: selectedItem.title,
        price: selectedItem.price.toString(),
        image: selectedItem.image || "",
        description: selectedItem.description || "",
        category: selectedItem.category || "Pakaian",
      });
    }
  }, [selectedItem, isEditMode, productId]);

  // --- 3. HANDLE SUBMIT ---
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    const payload = {
      title: formData.title,
      price: parseInt(formData.price),
      image: formData.image,
      description: formData.description,
      category: formData.category,
    };

    try {
      if (isEditMode) {
        await editItem(Number(productId), payload);
        alert("Produk berhasil diperbarui!");
      } else {
        await addItem(payload);
        alert("Produk berhasil diupload!");
      }
      router.push("/");
    } catch (error: any) {
      alert(error.message || "Gagal menyimpan produk");
    } finally {
      setLoading(false);
    }
  };

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const imageUrl = URL.createObjectURL(file);
      setFormData({ ...formData, image: imageUrl });
    }
  };

  return (
    <div className="min-h-screen bg-[#f8f9fa] text-slate-900 font-sans">
      <Navbar />

      <main className="flex items-center justify-center px-4 py-12">
        <div className="w-full max-w-2xl">
          <div className="bg-white p-8 md:p-12 rounded-[3rem] shadow-2xl border border-slate-50">
            
            <div className="flex justify-between items-center mb-10">
              <div>
                <h2 className="text-3xl font-black text-slate-900">
                  {isEditMode ? "Edit Produk" : "Jual Barang"}
                </h2>
                <p className="text-slate-400 text-sm mt-1">
                  {isEditMode ? "Perbarui informasi produk Anda" : "Isi detail barang yang ingin Anda jual"}
                </p>
              </div>
              <button onClick={() => router.back()} className="p-3 hover:bg-slate-100 rounded-full cursor-pointer group">
                <X className="group-hover:rotate-90 transition-transform" />
              </button>
            </div>

            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Bagian Upload Gambar */}
              <div className="relative group w-full h-48 bg-slate-50 rounded-3xl border-2 border-dashed border-slate-200 flex flex-col items-center justify-center overflow-hidden transition-all hover:border-indigo-400">
                {formData.image ? (
                  <>
                    <img src={formData.image} alt="Preview" className="w-full h-full object-cover" />
                    <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center backdrop-blur-sm">
                      <label className="cursor-pointer bg-white text-slate-900 px-4 py-2 rounded-xl font-bold text-sm">
                        Ganti Foto
                        <input type="file" className="hidden" accept="image/*" onChange={handleImageUpload} />
                      </label>
                    </div>
                  </>
                ) : (
                  <label className="cursor-pointer flex flex-col items-center">
                    <Upload className="text-slate-300 mb-2" size={32} />
                    <span className="text-slate-400 font-bold text-sm">Upload Foto Produk</span>
                    <input type="file" className="hidden" accept="image/*" onChange={handleImageUpload} />
                  </label>
                )}
              </div>

              {/* Input Nama Barang */}
              <div className="space-y-4">
                <div>
                  <label className="flex items-center gap-2 text-[10px] font-black text-slate-400 uppercase ml-2 mb-2 tracking-widest">
                    <Package size={14} className="text-indigo-600" /> Nama Barang
                  </label>
                  <input
                    placeholder="Contoh: Sepatu Nike Air Jordan"
                    className="w-full p-4 rounded-2xl bg-slate-50 border-2 border-transparent focus:border-indigo-500 focus:bg-white outline-none transition-all font-medium"
                    value={formData.title}
                    onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                    required
                  />
                </div>

                <div>
                  <label className="flex items-center gap-2 text-[10px] font-black text-slate-400 uppercase ml-2 mb-2 tracking-widest">
                    <DollarSign size={14} className="text-indigo-600" /> Harga (Rp)
                  </label>
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
                  <label className="flex items-center gap-2 text-[10px] font-black text-slate-400 uppercase ml-2 mb-2 tracking-widest">
                    <AlignLeft size={14} className="text-indigo-600" /> Deskripsi
                  </label>
                  <textarea
                    rows={4}
                    placeholder="Ceritakan kondisi barang Anda..."
                    className="w-full p-4 rounded-2xl bg-slate-50 border-2 border-transparent focus:border-indigo-500 focus:bg-white outline-none transition-all font-medium resize-none"
                    value={formData.description}
                    onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                    required
                  />
                </div>
              </div>

              <div className="pt-6 flex flex-col md:flex-row gap-4">
                <button
                  type="button"
                  onClick={() => router.back()}
                  disabled={loading}
                  className="flex-1 py-4 font-black text-slate-400 hover:bg-slate-50 rounded-2xl transition cursor-pointer order-2 md:order-1 disabled:opacity-50"
                >
                  BATAL
                </button>

                <button 
                  disabled={loading}
                  className="flex-1 bg-indigo-600 text-white px-8 py-4 rounded-2xl font-black hover:bg-indigo-700 transition shadow-xl shadow-indigo-100 cursor-pointer order-1 md:order-2 disabled:bg-indigo-300"
                >
                  {loading ? "MEMPROSES..." : (isEditMode ? "SIMPAN" : "UPLOAD")}
                </button>
              </div>
            </form>
          </div>
        </div>
      </main>
    </div>
  );
}