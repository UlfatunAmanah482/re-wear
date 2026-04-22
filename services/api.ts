import axios from "axios";

export const getUser = async () => {
  const res = await axios.get("/json/user.json")

  return res.data;
}