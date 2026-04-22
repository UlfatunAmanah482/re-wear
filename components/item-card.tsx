
import { useApp } from '@/context/AppContext';
import { formatIDR } from '@/lib/utils';
import { Item } from '@/types';
import Link from 'next/link';

export default function ItemCard({ item }: { item: Item }) {
  const { user, deleteItem } = useApp();

  return (
    <div className="group bg-white rounded-[2rem] border p-3 shadow-sm hover:shadow-2xl transition-all duration-500">
      <Link href={`/product/${item.id}`}>
        <div className="relative h-52 w-full mb-3 overflow-hidden rounded-[1.5rem]">
          <img src={item.image} alt={item.title} className="w-full h-full object-cover group-hover:scale-110 transition duration-700" />
        </div>
        <div className="px-2">
          <h3 className="font-bold text-gray-800 line-clamp-1">{item.title}</h3>
          <p className="text-blue-600 font-black mb-2">Rp {formatIDR(item.price)}</p>
        </div>
      </Link>
      
      {user?.role === 'admin' && (
        <button 
          onClick={(e) => {
            e.preventDefault(); // Biar tidak trigger Link
            // deleteItem(item.id);
          }}
          className="mt-2 w-full py-2 bg-red-50 text-red-500 rounded-xl text-[10px] font-black hover:bg-red-500 hover:text-white transition"
        >
          HAPUS (ADMIN)
        </button>
      )}
    </div>
  );
}