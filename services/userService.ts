import axios from "axios";
import { User } from "@/types";

export const getUsers = async (): Promise<User[]> => {
  const res = await axios.get<User[]>("/json/users.json");
  return res.data;
};