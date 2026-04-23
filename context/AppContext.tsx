"use client";

import { Item, User } from "@/types";
import React, { createContext, useContext, useState, useEffect } from "react";
import { getItems } from "@/services/itemService";
import { getUsers } from "@/services/userService";

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

const AppContext = createContext<AppContextType | undefined>(undefined);

export function AppProvider({ children }: { children: React.ReactNode }) {
  const [items, setItems] = useState<Item[]>([]);
  const [users, setUsers] = useState<User[]>([]);
  const [user, setUser] = useState<User | null>(null);
  const [isMounted, setIsMounted] = useState(false);


  const loadData = async () => {
    setIsMounted(true);

    try {
      const savedItems = localStorage.getItem("preloved_items");

      if (savedItems) {
        setItems(JSON.parse(savedItems));
      } else {
        const itemsData = await getItems();
        setItems(itemsData);
      }

      const usersData = await getUsers();
      setUsers(usersData);

      const savedUser = localStorage.getItem("preloved_user");
      if (savedUser) {
        setUser(JSON.parse(savedUser));
      }

    } catch (error) {
      console.error("Failed to load data:", error);
    }
  };

  useEffect(() => {
    loadData();
  }, []);

  useEffect(() => {
    if (isMounted) {
      localStorage.setItem("preloved_items", JSON.stringify(items));
    }
  }, [items, isMounted]);

  const login = (email: string) => {
    const foundUser = users.find((u) => u.email === email);
    if (!foundUser) return;

    setUser(foundUser);
    localStorage.setItem("preloved_user", JSON.stringify(foundUser));
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem("preloved_user");
  };

  const addItem = (data: Omit<Item, "id" | "seller" | "sellerEmail">) => {
    if (!user) return;

    const newItem: Item = {
      ...data,
      id: Date.now(),
      seller: user.name,
      sellerEmail: user.email,
    };

    setItems((prev) => [newItem, ...prev]);
  };

  const deleteItem = (id: number) => {
    setItems((prev) => prev.filter((item) => item.id !== id));
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
        login,
        logout,
        addItem,
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
  if (!context) {
    throw new Error("useApp harus digunakan di dalam AppProvider");
  }
  return context;
};