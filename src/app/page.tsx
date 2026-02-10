import Link from 'next/link';

export default function HomePage() {
  return (
    <div className="flex flex-col min-h-screen">
      {/* Hero Bölümü - Karşılama Ekranı */}
      <section className="bg-slate-900 text-white py-24 px-4 text-center">
        <h1 className="text-4xl md:text-6xl font-extrabold mb-6 tracking-tight">
          Endüstriyel Çözümlerde <span className="text-blue-500">Devinim</span> Zamanı
        </h1>
        <p className="text-lg md:text-xl text-slate-400 max-w-2xl mx-auto mb-10 font-light">
          Hidrolik, pnömatik ve teknik ekipmanlarda güvenilir çözüm ortağınız. 
          Yüksek performanslı ürünlerle işletmenizi geleceğe taşıyoruz.
        </p>
        <div className="flex flex-col md:flex-row justify-center gap-4">
          <Link href="/urunler" className="bg-blue-600 hover:bg-blue-700 text-white px-10 py-4 rounded-lg font-bold transition-all text-lg">
            Ürün Kataloğunu İncele
          </Link>
          <Link href="/iletisim" className="bg-white text-slate-900 hover:bg-slate-100 px-10 py-4 rounded-lg font-bold transition-all text-lg border-2 border-white">
            Bize Ulaşın
          </Link>
        </div>
      </section>

      {/* Avantajlar Bölümü */}
      <section className="py-20 px-4 max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-12">
        <div className="text-center p-8 bg-white rounded-2xl shadow-sm border border-slate-100">
          <div className="text-4xl mb-4">⚙️</div>
          <h3 className="font-bold text-xl mb-3 text-slate-800">Teknik Uzmanlık</h3>
          <p className="text-slate-600 leading-relaxed">Yılların tecrübesiyle en karmaşık teknik sorunlarınıza kesin çözümler sunuyoruz.</p>
        </div>
        <div className="text-center p-8 bg-white rounded-2xl shadow-sm border border-slate-100">
          <div className="text-4xl mb-4">📦</div>
          <h3 className="font-bold text-xl mb-3 text-slate-800">Geniş Ürün Gamı</h3>
          <p className="text-slate-600 leading-relaxed">Stoktan hızlı teslimat ve binlerce çeşit endüstriyel yedek parça desteği.</p>
        </div>
        <div className="text-center p-8 bg-white rounded-2xl shadow-sm border border-slate-100">
          <div className="text-4xl mb-4">🛡️</div>
          <h3 className="font-bold text-xl mb-3 text-slate-800">Güvenilir Tedarik</h3>
          <p className="text-slate-600 leading-relaxed">Kalite odaklı hizmetle iş sürekliliğinizi koruyor, operasyonlarınızı aksatmıyoruz.</p>
        </div>
      </section>
    </div>
  );
}
