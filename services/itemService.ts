import axios from "axios";
import { Item } from "@/types";

const API_URL = process.env.NEXT_PUBLIC_API_URL;

export const getItems = async (): Promise<Item[]> => {
  const res = await axios.get<Item[]>(`${API_URL}/api/products`);
  return res.data;
};