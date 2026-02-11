import { getTicimaxProducts } from '@/lib/ticimax';
import Link from 'next/link';

export default async function UrunlerPage() {
  // Ticimax motorunu çalıştır ve ürünleri getir
  const products = await getTicimaxProducts();

  return (
    <div className="max-w-7xl mx-auto py-12 px-4">
      <div className="flex justify-between items-center mb-8 border-b pb-4">
        <h1 className="text-3xl font-bold text-slate-900">Ürün Kataloğu</h1>
        <span className="bg-blue-100 text-blue-700 text-xs font-medium px-2.5 py-0.5 rounded">
          Canlı Veri (Ticimax)
        </span>
      </div>
      
      {products.length === 0 ? (
        <div className="text-center py-20">
          <p className="text-slate-500 text-lg">Şu an gösterilecek ürün bulunamadı veya bağlantı bekleniyor.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {products.map((product: any) => (
            <div key={product.id} className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden hover:shadow-md transition-shadow flex flex-col">
              <div className="p-6 flex-grow">
                <div className="flex justify-between items-start mb-2">
                  <span className="text-xs font-semibold text-blue-600 uppercase tracking-wider">{product.kategori}</span>
                  <span className="text-[10px] bg-slate-100 px-2 py-1 rounded text-slate-500 font-bold">{product.marka}</span>
                </div>
                <h2 className="text-xl font-bold text-slate-800 mt-2 leading-tight">{product.ad}</h2>
                <p className="text-slate-500 text-sm mt-3 line-clamp-3">{product.aciklama}</p>
              </div>
              
              <div className="p-6 pt-0 mt-auto">
                <div className="pt-4 border-t border-slate-100 flex justify-between items-center">
                  <span className="text-xs text-slate-400 font-mono">Kod: {product.id}</span>
                  <Link href={`/urunler/${product.id}`} className="text-blue-600 font-semibold text-sm hover:underline">
                    Detayları Gör →
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}