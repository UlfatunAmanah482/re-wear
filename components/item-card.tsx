import { formatIDR } from '@/lib/utils';
import { Item } from '@/types';
import { MapPin } from 'lucide-react';
import Link from 'next/link';

export default function ItemCard({ item }: { item: Item }) {
  return (
    <div className="group bg-white rounded-[2rem] border p-3 shadow-sm hover:shadow-2xl transition-all duration-500">
      <Link href={`/product/${item.id}`}>
        <div className="relative h-52 w-full mb-3 overflow-hidden rounded-[1.5rem]">
          <img src={item.image} alt={item.title} className="w-full h-full object-cover group-hover:scale-110 transition duration-700" />
        </div>
        <div className="px-2">
          <h3 className="font-bold text-gray-800 line-clamp-1">{item.title}</h3>
          <p className="text-blue-600 font-black mb-2">Rp {formatIDR(item.price)}</p>
          <div className="flex items-center gap-1 text-[10px] text-slate-400 font-bold uppercase mt-1">
            <MapPin size={12} className="text-red-400" />
            <span>{item.address || "Indonesia"}</span>
          </div>
        </div>
      </Link>

      {/* {user?.role === 'admin' && (
        <button 
          onClick={(e) => {
            e.preventDefault();
          }}
          className="mt-2 w-full py-2 bg-red-50 text-red-500 rounded-xl text-[10px] font-black hover:bg-red-500 hover:text-white transition"
        >
          HAPUS (ADMIN)
        </button>
      )} */}
    </div>
  );
}