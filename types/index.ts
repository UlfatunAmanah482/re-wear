export type User = {
  email: string,
  password?: string,
  name?: string,
  products?: Item[],
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
