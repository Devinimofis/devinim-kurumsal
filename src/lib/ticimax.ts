import { parseStringPromise } from 'xml2js';

const TICIMAX_URL = 'https://www.devinimonline.com/Servis/UrunServis.svc';

export async function getTicimaxProducts() {
  const apiKey = process.env.TICIMAX_API_KEY || 'HOSTINGER';

  // En sade ve hata payı en düşük SOAP zarfı
  const soapEnvelope = `
    <soapenv:Envelope xmlns:soapenv="http://schemas.xmlsoap.org/soap/envelope/" xmlns:tem="http://tempuri.org/">
       <soapenv:Header/>
       <soapenv:Body>
          <tem:SelectUrun>
             <tem:UyeKodu>${apiKey}</tem:UyeKodu>
             <tem:filitre />
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
      cache: 'no-store' // Verinin bayatlamaması için zorunlu
    });

    const xmlData = await response.text();
    
    // RÖNTGEN: Eğer veri gelmiyorsa, sayfanın kaynağında bu XML'i göreceğiz
    if (!xmlData || xmlData.length < 100) {
        console.error("KRİTİK: Ticimax'ten boş veya çok kısa yanıt döndü!");
    }

    const result = await parseStringPromise(xmlData);
    const envelope = result['s:Envelope'] || result['soap:Envelope'] || result['soapenv:Envelope'];
    const body = envelope?.['s:Body'] || envelope?.['soap:Body'];
    const responseBody = body?.[0]?.['SelectUrunResponse']?.[0]?.['SelectUrunResult']?.[0];
    
    const urunlerRaw = responseBody?.['UrunKart'] || [];

    return urunlerRaw.map((item: any) => ({
      id: item.StokKodu ? item.StokKodu[0] : 'N/A',
      ad: item.UrunAdi ? item.UrunAdi[0] : 'İsimsiz Ürün',
      kategori: item.KategoriAdi ? item.KategoriAdi[0] : 'Genel',
      marka: item.MarkaAdi ? item.MarkaAdi[0] : 'Devinim',
      aciklama: item.Aciklama ? item.Aciklama[0] : '',
    }));
  } catch (error) {
    return [];
  }
}