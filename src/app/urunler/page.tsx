import products from '@/data.json';
import Link from 'next/link';

export default function UrunlerPage() {
  return (
    <div className="max-w-7xl mx-auto py-12 px-4">
      <h1 className="text-3xl font-bold text-slate-900 mb-8 border-b pb-4">Ürün Kataloğu</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {products.map((product) => (
          <div key={product.id} className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden hover:shadow-md transition-shadow">
            <div className="p-6">
              <span className="text-xs font-semibold text-blue-600 uppercase tracking-wider">{product.kategori}</span>
              <h2 className="text-xl font-bold text-slate-800 mt-2">{product.ad}</h2>
              <p className="text-slate-500 text-sm mt-3 line-clamp-3">{product.aciklama}</p>
              <div className="mt-6 pt-4 border-t border-slate-100 flex justify-between items-center">
                <span className="text-xs text-slate-400 font-mono">Kod: {product.id}</span>
                <Link href={`/urunler/${product.id}`} className="text-blue-600 font-semibold text-sm hover:underline">
                  Detayları Gör →
                </Link>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}