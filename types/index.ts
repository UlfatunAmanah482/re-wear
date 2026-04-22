export type User = {
  email: string,
  password?: string,
  role: "user" | "admin",
  name?: string,
}

export type Item = {
  id: number,
  title: string,
  price: number,
  description: string,
  category: string,
  image: string,
  seller: string,
  sellerEmail: string,
  phone: string,
}
