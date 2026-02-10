export default function IletisimPage() {
    return (
      <div className="max-w-7xl mx-auto py-16 px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-16">
          <div>
            <h1 className="text-4xl font-bold text-slate-900 mb-6">Bize Ulaşın</h1>
            <p className="text-slate-600 mb-8">
              Teknik sorularınız, fiyat teklifleri veya iş birliği talepleriniz için aşağıdaki kanallardan bize ulaşabilirsiniz.
            </p>
            <div className="space-y-6">
              <div>
                <h3 className="font-bold text-slate-800">📍 Adres</h3>
                <p className="text-slate-600">İkitelli Organize Sanayi Bölgesi, Devinim Plaza, İstanbul</p>
              </div>
              <div>
                <h3 className="font-bold text-slate-800">📞 Telefon / WhatsApp</h3>
                <p className="text-slate-600">+90 (212) 000 00 00</p>
              </div>
              <div>
                <h3 className="font-bold text-slate-800">✉️ E-posta</h3>
                <p className="text-slate-600">info@devinimmakina.com</p>
              </div>
            </div>
          </div>
          <div className="bg-white p-8 rounded-2xl shadow-sm border border-slate-200">
            <form className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">Ad Soyad</label>
                <input type="text" className="w-full p-3 border rounded-lg outline-none focus:ring-2 focus:ring-blue-500" placeholder="Adınız..." />
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">E-posta</label>
                <input type="email" className="w-full p-3 border rounded-lg outline-none focus:ring-2 focus:ring-blue-500" placeholder="e-posta@adresiniz.com" />
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">Mesajınız</label>
                <textarea className="w-full p-3 border rounded-lg outline-none focus:ring-2 focus:ring-blue-500 h-32" placeholder="Nasıl yardımcı olabiliriz?"></textarea>
              </div>
              <button type="button" className="w-full bg-blue-600 text-white font-bold py-3 rounded-lg hover:bg-blue-700 transition-colors">Gönder</button>
            </form>
          </div>
        </div>
      </div>
    );
  }