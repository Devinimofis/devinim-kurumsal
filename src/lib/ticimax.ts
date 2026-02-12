import { parseStringPromise } from 'xml2js';

const TICIMAX_URL = 'https://www.devinimonline.com/Servis/UrunServis.svc';

export async function getTicimaxProducts() {
  const apiKey = process.env.TICIMAX_API_KEY || 'HOSTINGER'; // Yedek mekanizma

  // Ticimax'ın en kararlı çalıştığı XML şablonu
  const soapEnvelope = `
    <soapenv:Envelope xmlns:soapenv="http://schemas.xmlsoap.org/soap/envelope/" xmlns:tem="http://tempuri.org/" xmlns:tic="http://schemas.datacontract.org/2004/07/Ticimax.Web.Service.Model">
       <soapenv:Header/>
       <soapenv:Body>
          <tem:SelectUrun>
             <tem:UyeKodu>${apiKey}</tem:UyeKodu>
             <tem:filitre>
                <tic:Aktif>-1</tic:Aktif>
                <tic:SayfaIndeks>0</tic:SayfaIndeks>
                <tic:SayfaUrunSayisi>100</tic:SayfaUrunSayisi>
             </tem:filitre>
          </tem:SelectUrun>
       </soapenv:Body>
    </soapenv:Envelope>`;

  try {
    const response = await fetch(TICIMAX_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'text/xml; charset=utf-8',
        'SOAPAction': 'http://tempuri.org/IUrunServis/SelectUrun',
      },
      body: soapEnvelope,
    });

    const xmlData = await response.text();
    
    // Ham veriyi bir kez daha kontrol edelim
    if (xmlData.includes('Fault')) {
      console.error("Ticimax Servis Hatası (SOAP Fault):", xmlData);
      return [];
    }

    const result = await parseStringPromise(xmlData);
    
    // Dinamik Yol Bulucu (Deep Extraction)
    const envelope = result['s:Envelope'] || result['soap:Envelope'] || result['soapenv:Envelope'];
    const body = envelope?.['s:Body'] || envelope?.['soap:Body'] || envelope?.['soapenv:Body'];
    const selectUrunResponse = body?.[0]?.['SelectUrunResponse'];
    const selectUrunResult = selectUrunResponse?.[0]?.['SelectUrunResult'];
    
    // Ürün kartlarını bul
    const urunlerRaw = selectUrunResult?.[0]?.['UrunKart'] || [];

    if (urunlerRaw.length === 0) {
      console.warn("⚠️ Ticimax Bağlantısı Başarılı Ama Ürün Listesi Boş! Filtreleri veya API Yetkisini Kontrol Edin.");
    }

    return urunlerRaw.map((item: any) => ({
      id: item.StokKodu ? item.StokKodu[0] : (item.ID ? item.ID[0] : 'N/A'),
      ad: item.UrunAdi ? item.UrunAdi[0] : 'İsimsiz Ürün',
      kategori: item.KategoriAdi ? item.KategoriAdi[0] : 'Genel',
      marka: item.MarkaAdi ? item.MarkaAdi[0] : 'Devinim',
      aciklama: item.Aciklama ? item.Aciklama[0] : '',
      resim: item.DefaultResim ? item.DefaultResim[0] : '', // Görsel için ekledik
    }));
  } catch (error) {
    console.error('Ticimax Entegrasyonunda Kritik Hata:', error);
    return [];
  }
}