import axios from "axios";
import { Item } from "@/types";

export const getItems = async (): Promise<Item[]> => {
  const res = await axios.get<Item[]>("http://localhost:5000/api/products");
  return res.data;
};