import { useApp } from "@/context/AppContext";
import { LogOut, Plus, Store, UserIcon } from "lucide-react";
import { usePathname, useRouter } from "next/navigation";

export default function Navbar() {
  const { isMounted, user, logout } = useApp();

  const router = useRouter();
  const pathname = usePathname();

  const currentPage = (pathname || "").split("/")[1];

  if (!isMounted) return null;

  return (
    <nav className="bg-white/80 backdrop-blur-md border-b sticky top-0 z-50">
      <div className="max-w-6xl mx-auto px-4 h-16 flex items-center justify-between">
        <div className="flex items-center gap-2 cursor-pointer group" onClick={() => router.push("/")}>
          <div className="bg-indigo-600 p-2 rounded-xl group-hover:rotate-12 transition-transform">
            <Store className="text-white" size={20} />
          </div>
          <h1 className="text-xl font-black tracking-tighter text-indigo-900">RE<span className="text-indigo-500">WEAR</span></h1>
        </div>

        {currentPage !== "profile" && (
          <div className="flex items-center gap-2 md:gap-4">
            {user ? (
              <>
                {currentPage !== "upload" && (
                  <button
                    onClick={() => router.push("/upload")}
                    className="bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-2 rounded-xl flex items-center gap-2 text-sm font-bold transition shadow-lg shadow-indigo-100"
                  >
                    <Plus size={18} /> <span className="hidden sm:inline cursor-pointer">Mulai Jual</span>
                  </button>
                )}
                <div className="h-8 w-[1px] bg-slate-200 mx-1 hidden sm:block"></div>
                <div className="flex items-center gap-3 bg-slate-50 p-1 pr-3 rounded-full border border-slate-100">
                  <button onClick={() => router.push("/profile")} className="cursor-pointer bg-white p-1.5 rounded-full shadow-sm text-indigo-600">
                    <UserIcon size={16} />
                  </button>
                  <div className="flex flex-col">
                    <span className="text-xs font-bold text-slate-700 truncate max-w-[80px]">{user?.name}</span>
                  </div>
                  <button onClick={logout} className="ml-2 text-slate-400 hover:text-red-500 transition cursor-pointer">
                    <LogOut size={16} />
                  </button>
                </div>
              </>
            ) : (
              <div className="flex items-center gap-2">
                <button onClick={() => router.push("/login")} className="cursor-pointer text-sm font-bold px-4 py-2 text-slate-600 hover:text-indigo-600 transition">Masuk</button>
                <button onClick={() => router.push("/register")} className="cursor-pointer text-sm font-bold px-5 py-2.5 bg-slate-900 text-white rounded-xl hover:bg-slate-800 transition shadow-xl shadow-slate-200">Daftar</button>
              </div>
            )}
          </div>
        )}
      </div>
    </nav>
  )
}