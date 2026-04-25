"use client";

import { Item, User } from "@/types";
import React, { createContext, useContext, useState, useEffect } from "react";
import axios from "axios";
import { useRouter } from "next/navigation";

const API_URL = "http://localhost:5000/api";

interface AppContextType {
  items: Item[];
  user: User | null;
  isMounted: boolean;
  register: (data: any) => Promise<void>;
  login: (credentials: any) => Promise<void>;
  logout: () => void;
  fetchItems: () => Promise<void>;
  fetchUser: () => Promise<void>; // Fungsi baru
  addItem: (data: any) => Promise<void>;
  editItem: (id: number, data: any) => Promise<void>;
  deleteItem: (id: number) => Promise<void>;
  getItemById: (id: number) => Item | undefined;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export function AppProvider({ children }: { children: React.ReactNode }) {
  const [items, setItems] = useState<Item[]>([]);
  const [user, setUser] = useState<User | null>(null);
  const [isMounted, setIsMounted] = useState(false);

  const router = useRouter();

  // --- 1. AMBIL DATA USER BERDASARKAN TOKEN (GET ME) ---
  const fetchUser = async () => {
    const token = localStorage.getItem("token");
    if (!token) return;

    try {
      const res = await axios.get(`${API_URL}/user`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setUser(res.data); // Set data user terbaru dari DB
    } catch (error) {
      console.error("Sesi habis atau token tidak valid");
      logout(); // Jika token bermasalah, paksa logout
    }
  };

  // --- 2. AMBIL SEMUA PRODUK ---
  const fetchItems = async () => {
    try {
      const res = await axios.get(`${API_URL}/products`);
      setItems(res.data);
    } catch (error) {
      console.error("Gagal mengambil produk:", error);
    }
  };

  // --- 3. INITIAL LOAD (Dijalankan saat web dibuka/refresh) ---
  useEffect(() => {
    const init = async () => {
      await fetchItems(); // Ambil barang
      await fetchUser();  // Ambil profil user jika ada token
      setIsMounted(true);
    };
    init();
  }, []);

  // --- 4. LOGIN ---
  const login = async (credentials: any) => {
    try {
      const res = await axios.post(`${API_URL}/login`, credentials);
      const { token, user: userData } = res.data;

      localStorage.setItem("token", token);
      setUser(userData);
    } catch (error: any) {
      throw new Error(error.response?.data?.message || "Login gagal");
    }
  };

  // --- 5. LOGOUT ---
  const logout = () => {
    localStorage.removeItem("token");
    setUser(null);
    router.push("/login");
  };

  // --- 6. REGISTER ---
  const register = async (data: any) => {
    try {
      await axios.post(`${API_URL}/register`, data);
      router.push("/login");
    } catch (error: any) {
      throw new Error(error.response?.data?.message || "Gagal mendaftar");
    }
  };

  // --- 7. ADD, EDIT, DELETE (Tetap Sama) ---
  const addItem = async (data: any) => {
    const token = localStorage.getItem("token");
    try {
      await axios.post(`${API_URL}/products`, data, {
        headers: { Authorization: `Bearer ${token}` },
      });
      await fetchItems();
    } catch (error: any) {
      throw new Error(error.response?.data?.message || "Gagal menambah barang");
    }
  };

  const editItem = async (id: number, data: any) => {
    const token = localStorage.getItem("token");
    try {
      await axios.put(`${API_URL}/products/${id}`, data, {
        headers: { Authorization: `Bearer ${token}` },
      });
      await fetchItems();
    } catch (error: any) {
      throw new Error(error.response?.data?.message || "Gagal update barang");
    }
  };

  const deleteItem = async (id: number) => {
    const token = localStorage.getItem("token");
    try {
      await axios.delete(`${API_URL}/products/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setItems((prev) => prev.filter((item) => item.id !== id));
    } catch (error: any) {
      alert(error.response?.data?.message || "Gagal hapus barang");
    }
  };

  const getItemById = (id: number) => {
    return items.find((item) => item.id === id);
  };

  return (
    <AppContext.Provider
      value={{
        items,
        user,
        isMounted,
        register,
        login,
        logout,
        fetchItems,
        fetchUser,
        addItem,
        editItem,
        deleteItem,
        getItemById,
      }}
    >
      {children}
    </AppContext.Provider>
  );
}

export const useApp = () => {
  const context = useContext(AppContext);
  if (!context) throw new Error("useApp must be used within AppProvider");
  return context;
};