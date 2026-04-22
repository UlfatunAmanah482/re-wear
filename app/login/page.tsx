"use client";

import { LogIn } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function LoginPage() {
  const [authData, setAuthData] = useState({ email: "", password: "" });

  const router = useRouter();

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (!authData.email || !authData.password) return alert("Isi semua bidang!");

    const role = authData.email.toLowerCase().includes("admin") ? "ADMIN" : "USER";
    const newUser = { email: authData.email, role };

    localStorage.setItem("preloved_user", JSON.stringify(newUser));
    setAuthData({ email: "", password: "" });
    router.push("/")
  };

  return (
    <div className="min-h-screen bg-[#f8f9fa] text-slate-900 font-sans">
      <main className="min-h-screen flex items-center justify-center px-4">
        <div className="max-w-md mx-auto mt-10">
          <div className="bg-white p-10 rounded-[3rem] shadow-2xl shadow-indigo-100 border border-slate-50">
            <div className="bg-indigo-50 w-16 h-16 rounded-2xl flex items-center justify-center text-indigo-600 mb-6 mx-auto rotate-3">
              <LogIn size={32} />
            </div>
            <h2 className="text-3xl font-black text-center mb-2">Masuk Kembali</h2>
            <p className="text-center text-slate-400 text-sm mb-8 font-medium">Gunakan akun admin untuk akses hapus barang.</p>

            <form onSubmit={handleLogin} className="space-y-4">
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
              <button className="w-full bg-indigo-600 text-white py-4 rounded-2xl font-black hover:bg-indigo-700 transition shadow-lg shadow-indigo-200">MASUK</button>
            </form>
            <button onClick={() => router.push("/register")} className="w-full mt-6 text-sm font-bold text-slate-400 hover:text-indigo-600 transition">BELUM PUNYA AKUN? DAFTAR</button>
          </div>
        </div>
      </main>
    </div>
  )
}