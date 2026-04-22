"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";

export default function RegisterPage() {
  const [authData, setAuthData] = useState({ name: "", email: "", password: "" });

  const router = useRouter();

  const handleRegister = (e: React.FormEvent) => {
    e.preventDefault();
    alert("Registrasi Berhasil! Silakan masuk.");
    router.push("/login");
  };

  return (
    <div className="min-h-screen bg-[#f8f9fa] text-slate-900 font-sans">
      <main className="min-h-screen flex items-center justify-center px-4">
        <div className="max-w-md mx-auto mt-10">
          <div className="bg-white p-10 rounded-[3rem] shadow-2xl border border-slate-50 text-center">
            <h2 className="text-3xl font-black mb-6">Gabung Sekarang</h2>
            <form onSubmit={handleRegister} className="space-y-4">
              <input
                type="text"
                placeholder="Nama Lengkap"
                className="w-full p-4 rounded-2xl bg-slate-50 border-2 border-transparent focus:border-indigo-500 focus:bg-white outline-none transition-all font-medium"
                value={authData.name}
                onChange={(e) => setAuthData({ ...authData, email: e.target.value })}
                required
              />
              <input
                type="email"
                placeholder="Email (admin@mail.com)"
                className="w-full p-4 rounded-2xl bg-slate-50 border-2 border-transparent focus:border-indigo-500 focus:bg-white outline-none transition-all font-medium"
                value={authData.email}
                onChange={(e) => setAuthData({ ...authData, email: e.target.value })}
                required
              />
              <input
                type="password"
                placeholder="Password"
                className="w-full p-4 rounded-2xl bg-slate-50 border-2 border-transparent focus:border-indigo-500 focus:bg-white outline-none transition-all font-medium"
                value={authData.password}
                onChange={(e) => setAuthData({ ...authData, password: e.target.value })}
                required
              />
              <button className="w-full bg-slate-900 text-white py-4 rounded-2xl font-black hover:bg-slate-800 transition shadow-lg">DAFTAR AKUN</button>
            </form>
            <button onClick={() => router.push("/login")} className="mt-6 text-sm font-bold text-slate-400 hover:text-indigo-600 transition">SUDAH PUNYA AKUN? LOGIN</button>
          </div>
        </div>
      </main>
    </div>
  )
}