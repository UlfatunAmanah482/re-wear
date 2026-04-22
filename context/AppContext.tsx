"use client";

import React, { createContext, useContext, useState, useEffect } from "react";

// --- DEFINISI TYPE ---
export interface Item {
  id: number;
  title: string;
  price: number;
  description: string;
  category: string;
  image: string;
  seller: string;
  sellerEmail: string;
}

export interface User {
  email: string;
  role: "USER" | "ADMIN";
  name: string;
}

interface AppContextType {
  items: Item[];
  user: User | null;
  isMounted: boolean;
  login: (email: string) => void;
  logout: () => void;
  addItem: (data: Omit<Item, "id" | "seller" | "sellerEmail">) => void;
  deleteItem: (id: number) => void;
  getItemById: (id: number) => Item | undefined;
}

// --- DATA DUMMY AWAL ---
const INITIAL_ITEMS: Item[] = [
  {
    id: 1,
    title: "Kamera Analog Canon AE-1",
    price: 1500000,
    description: "Kamera legendaris untuk pecinta fotografi film. Kondisi 90% mulus, lightmeter menyala akurat, sudah termasuk strap kulit original.",
    category: "Fotografi",
    image: "https://images.unsplash.com/photo-1510127034890-ba27508e9f1c?w=800",
    seller: "Budi",
    sellerEmail: "budi@mail.com",
  },
  {
    id: 2,
    title: "Jaket Levi's Vintage 70s",
    price: 850000,
    description: "Jaket denim original era 70-an. Warna pudar alami (faded), tidak ada sobek, ukuran fit L dewasa.",
    category: "Fashion",
    image: "https://images.unsplash.com/photo-1551028719-00167b16eac5?w=800",
    seller: "Siska",
    sellerEmail: "siska@mail.com",
  },
  {
    id: 3,
    title: "Sepatu Converse 70s Black",
    price: 550000,
    description: "Converse Chuck Taylor 70s. Baru dipakai 2 kali, tapak masih tebal, box lengkap. Dijamin original 100%.",
    category: "Sepatu",
    image: "https://images.unsplash.com/photo-1595950653106-6c9ebd614d3a?w=800",
    seller: "Andi",
    sellerEmail: "andi@mail.com",
  }
];

const AppContext = createContext<AppContextType | undefined>(undefined);

export function AppProvider({ children }: { children: React.ReactNode }) {
  const [items, setItems] = useState<Item[]>([]);
  const [user, setUser] = useState<User | null>(null);
  const [isMounted, setIsMounted] = useState(false);

  // --- 1. LOAD DATA DARI LOCALSTORAGE SAAT PERTAMA KALI JALAN ---
  useEffect(() => {
    setIsMounted(true);
    
    // Load Items
    const savedItems = localStorage.getItem("preloved_items");
    if (savedItems) {
      setItems(JSON.parse(savedItems));
    } else {
      setItems(INITIAL_ITEMS); // Gunakan dummy jika storage kosong
    }

    // Load User Session
    const savedUser = localStorage.getItem("preloved_user");
    if (savedUser) {
      setUser(JSON.parse(savedUser));
    }
  }, []);

  // --- 2. SIMPAN DATA KE LOCALSTORAGE TIAP ADA PERUBAHAN ITEMS ---
  useEffect(() => {
    if (isMounted) {
      localStorage.setItem("preloved_items", JSON.stringify(items));
    }
  }, [items, isMounted]);

  // --- 3. FUNGSI LOGIN ---
  const login = (email: string) => {
    // Logika Role: Jika email mengandung kata "admin", otomatis jadi ADMIN
    const role = email.toLowerCase().includes("admin") ? "ADMIN" : "USER";
    const name = email.split("@")[0];
    
    const newUser: User = { email, role, name };
    setUser(newUser);
    localStorage.setItem("preloved_user", JSON.stringify(newUser));
  };

  // --- 4. FUNGSI LOGOUT ---
  const logout = () => {
    setUser(null);
    localStorage.removeItem("preloved_user");
  };

  // --- 5. FUNGSI TAMBAH BARANG ---
  const addItem = (data: Omit<Item, "id" | "seller" | "sellerEmail">) => {
    if (!user) return;

    const newItem: Item = {
      ...data,
      id: Date.now(), // Generate ID unik pake timestamp
      seller: user.name,
      sellerEmail: user.email,
    };

    setItems((prev) => [newItem, ...prev]);
  };

  // --- 6. FUNGSI HAPUS BARANG (ADMIN) ---
  const deleteItem = (id: number) => {
    setItems((prev) => prev.filter((item) => item.id !== id));
  };

  // --- 7. FUNGSI AMBIL DETAIL BARANG ---
  const getItemById = (id: number) => {
    console.log("id", id)
    return items.find((item) => item.id === id);
  };

  return (
    <AppContext.Provider 
      value={{ 
        items, 
        user, 
        isMounted, 
        login, 
        logout, 
        addItem, 
        deleteItem, 
        getItemById 
      }}
    >
      {children}
    </AppContext.Provider>
  );
}

// --- CUSTOM HOOK ---
export const useApp = () => {
  const context = useContext(AppContext);
  if (context === undefined) {
    throw new Error("useApp harus digunakan di dalam AppProvider");
  }
  return context;
};