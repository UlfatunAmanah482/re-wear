"use client";

import { Item, User } from "@/types";
import React, { createContext, useContext, useState, useEffect } from "react";
import axios from "axios";
import { useRouter } from "next/navigation";

const API_URL = "http://localhost:5000/api";

interface AppContextType {
  items: Item[];
  user: User | null;
  selectedItem: Item | null; // <--- NEW STATE
  isMounted: boolean;
  register: (data: any) => Promise<void>;
  login: (credentials: any) => Promise<void>;
  logout: () => void;
  fetchItems: () => Promise<void>;
  fetchUser: () => Promise<void>;
  addItem: (data: any) => Promise<void>;
  editItem: (id: number, data: any) => Promise<void>;
  deleteItem: (id: number) => Promise<void>;
  getItemById: (id: number) => Promise<void>; // <--- UPDATED: No longer returns, just updates state
  clearSelectedItem: () => void; // <--- HELPER to reset state
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export function AppProvider({ children }: { children: React.ReactNode }) {
  const [items, setItems] = useState<Item[]>([]);
  const [user, setUser] = useState<User | null>(null);
  const [selectedItem, setSelectedItem] = useState<Item | null>(null); // <--- NEW STATE
  const [isMounted, setIsMounted] = useState(false);

  const router = useRouter();

  // --- 1. USER SESSION ---
  const fetchUser = async () => {
    const token = localStorage.getItem("token");
    if (!token) return;
    try {
      const res = await axios.get(`${API_URL}/user`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setUser(res.data);
    } catch (error) {
      logout();
    }
  };

  // --- 2. FETCH ALL ITEMS ---
  const fetchItems = async () => {
    try {
      const res = await axios.get(`${API_URL}/products`);
      setItems(res.data);
    } catch (error) {
      console.error("Gagal mengambil produk:", error);
    }
  };

  useEffect(() => {
    const init = async () => {
      await fetchItems();
      await fetchUser();
      setIsMounted(true);
    };
    init();
  }, []);

  // --- 3. AUTH LOGIC ---
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

  const logout = () => {
    localStorage.removeItem("token");
    setUser(null);
    router.push("/login");
  };

  const register = async (data: any) => {
    try {
      await axios.post(`${API_URL}/register`, data);
      router.push("/login");
    } catch (error: any) {
      throw new Error(error.response?.data?.message || "Gagal mendaftar");
    }
  };

  // --- 4. PRODUCT CRUD ---
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

  // --- 5. GET DETAIL & UPDATE GLOBAL STATE ---
  const getItemById = async (id: number) => {
    try {
      const res = await axios.get(`${API_URL}/products/${id}`);
      setSelectedItem(res.data); // <--- Updates the global selectedItem state
    } catch (error: any) {
      setSelectedItem(null);
      throw new Error(error.response?.data?.message || "Produk tidak ditemukan");
    }
  };

  const clearSelectedItem = () => setSelectedItem(null);

  return (
    <AppContext.Provider
      value={{
        items,
        user,
        selectedItem, // <--- Shared globally
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
        clearSelectedItem,
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