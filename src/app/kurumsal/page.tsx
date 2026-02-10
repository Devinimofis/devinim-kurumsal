export default function KurumsalPage() {
    return (
      <div className="max-w-4xl mx-auto py-16 px-4">
        <h1 className="text-4xl font-bold text-slate-900 mb-8">Kurumsal</h1>
        <div className="prose prose-slate lg:prose-lg">
          <p className="text-lg text-slate-600 mb-6 leading-relaxed">
            Devinim Makina, endüstriyel hidrolik ve pnömatik sistemler alanında yılların verdiği tecrübe ile sektörün öncü tedarikçilerinden biridir. 
            Amacımız, müşterilerimize sadece ürün satmak değil, teknik sorunlarına kalıcı ve verimli çözümler üretmektir.
          </p>
          <h2 className="text-2xl font-bold text-slate-800 mt-10 mb-4">Vizyon & Misyon</h2>
          <p className="text-slate-600 mb-6">
            Teknolojik gelişmeleri yakından takip ederek, Türkiye endüstrisinin üretim gücüne katkıda bulunmak ve global standartlarda bir teknik destek ağı oluşturmak temel misyonumuzdur.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-12">
            <div className="bg-blue-50 p-6 rounded-xl border border-blue-100">
              <h3 className="font-bold text-blue-900 mb-2">Güçlü Stok</h3>
              <p className="text-sm text-blue-800">İhtiyacınız olan parçalara beklemeden ulaşmanız için geniş bir depo hacmiyle çalışıyoruz.</p>
            </div>
            <div className="bg-slate-50 p-6 rounded-xl border border-slate-200">
              <h3 className="font-bold text-slate-900 mb-2">Uzman Destek</h3>
              <p className="text-sm text-slate-700">Sadece parça değil, mühendislik bilgisi paylaşıyoruz.</p>
            </div>
          </div>
        </div>
      </div>
    );
  }