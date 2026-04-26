export type User = {
  email: string,
  password?: string,
  name?: string,
  role: string,
  phone: string,
  address: string,
  products?: Item[],
}

export type Item = {
  id: number,
  title: string,
  price: number,
  description: string,
  category: string,
  image: string,
  address: string,
  user: User,
}
