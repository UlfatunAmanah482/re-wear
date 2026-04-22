export type Product = {
  id: string;
  name: string;
  price: number;
  image: string;
  sellerName: string;
  whatsapp: string;
  category: string;
};

export const DUMMY_PRODUCTS: Product[] = [
  {
    id: '1',
    name: 'Kalkulator Casio FX-991EX',
    price: 250000,
    image: 'https://images.unsplash.com/photo-1574607383476-f517f220d1c0?q=80&w=300&h=200&fit=crop',
    sellerName: 'Budi (Teknik)',
    whatsapp: '628123456789',
    category: 'Alat Tulis'
  },
  {
    id: '2',
    name: 'Buku Sistem Informasi v2',
    price: 50000,
    image: 'https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?q=80&w=300&h=200&fit=crop',
    sellerName: 'Siti',
    whatsapp: '628987654321',
    category: 'Buku'
  },
  {
    id: '3',
    name: 'Keyboard Mechanical Preloved',
    price: 400000,
    image: 'https://images.unsplash.com/photo-1511467687858-23d96c32e4ae?q=80&w=300&h=200&fit=crop',
    sellerName: 'Andi',
    whatsapp: '628112233445',
    category: 'Elektronik'
  }
];