export type User = {
  email: string,
  password?: string,
  name?: string,
  phone: string,
  products?: Item[],
}

export type Item = {
  id: number,
  title: string,
  price: number,
  description: string,
  category: string,
  image: string,
  user: User,
}
