import axios from "axios";
import { Item } from "@/types";

export const getItems = async (): Promise<Item[]> => {
  const res = await axios.get<Item[]>("/json/items.json");
  return res.data;
};