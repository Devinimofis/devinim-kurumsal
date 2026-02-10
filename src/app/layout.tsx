import './globals.css';
import Link from 'next/link';

export const metadata = {
  title: 'Devinim Makina | Endüstriyel Çözümler',
  description: 'Hidrolik ve Pnömatik Sistemlerde Teknik Çözüm Ortağınız',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="tr">
      <body className="bg-slate-50 text-slate-900 font-sans">
        {/* ÜST MENÜ (NAVIGATION) */}
        <nav className="bg-white border-b border-slate-200 sticky top-0 z-50">
          <div className="max-w-7xl mx-auto px-4 h-20 flex items-center justify-between">
            <Link href="/" className="text-2xl font-black tracking-tighter text-slate-900">
              DEVİNİM <span className="text-blue-600">MAKİNA</span>
            </Link>
            
            <div className="hidden md:flex gap-8 font-medium text-slate-600">
              <Link href="/" className="hover:text-blue-600 transition-colors">Ana Sayfa</Link>
              <Link href="/urunler" className="hover:text-blue-600 transition-colors">Ürünler</Link>
              <Link href="/kurumsal" className="hover:text-blue-600 transition-colors">Kurumsal</Link>
              <Link href="/iletisim" className="hover:text-blue-600 transition-colors">İletişim</Link>
            </div>

            <Link href="https://devinimonline.com" target="_blank" className="bg-slate-900 text-white px-5 py-2 rounded-md text-sm font-bold hover:bg-slate-800 transition-all">
              Online Satış
            </Link>
          </div>
        </nav>

        {/* SAYFA İÇERİĞİ */}
        <main>{children}</main>

        {/* ALT BİLGİ (FOOTER) */}
        <footer className="bg-slate-900 text-slate-400 py-12 mt-20">
          <div className="max-w-7xl mx-auto px-4 grid grid-cols-1 md:grid-cols-3 gap-12">
            <div>
              <h3 className="text-white font-bold text-lg mb-4">Devinim Makina</h3>
              <p className="text-sm leading-relaxed">
                Endüstriyel sistemlerde yüksek kalite ve güvenilir teknik destek ile hizmetinizdeyiz.
              </p>
            </div>
            <div>
              <h3 className="text-white font-bold text-lg mb-4">Hızlı Bağlantılar</h3>
              <ul className="space-y-2 text-sm">
                <li><Link href="/urunler" className="hover:text-white">Ürün Kataloğu</Link></li>
                <li><Link href="/kurumsal" className="hover:text-white">Hakkımızda</Link></li>
                <li><Link href="/iletisim" className="hover:text-white">Bize Ulaşın</Link></li>
              </ul>
            </div>
            <div>
              <h3 className="text-white font-bold text-lg mb-4">İletişim</h3>
              <p className="text-sm">E-posta: info@devinimmakina.com</p>
              <p className="text-sm mt-2">Lokasyon: İstanbul, Türkiye</p>
            </div>
          </div>
          <div className="max-w-7xl mx-auto px-4 mt-12 pt-8 border-t border-slate-800 text-center text-xs">
            © 2026 Devinim Makina. Tüm Hakları Saklıdır.
          </div>
        </footer>
      </body>
    </html>
  );
}