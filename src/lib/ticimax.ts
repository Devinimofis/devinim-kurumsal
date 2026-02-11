import { parseStringPromise } from 'xml2js';

// Ticimax servis URL'niz (Genellikle bu formattadır, 
// eğer özel bir URL'niz varsa sonra güncelleyebiliriz)
const TICIMAX_URL = 'https://www.devinimonline.com/Servis/UrunServis.svc?wsdl';

export async function getTicimaxProducts() {
  const apiKey = process.env.TICIMAX_API_KEY;

  // Ticimax'ten ürünleri isteyen özel "istek paketi" (SOAP XML)
  const soapEnvelope = `
    <soapenv:Envelope xmlns:soapenv="http://schemas.xmlsoap.org/soap/envelope/" xmlns:ser="http://tempuri.org/">
       <soapenv:Header/>
       <soapenv:Body>
          <ser:SelectUrun>
             <ser:UyeKodu>${apiKey}</ser:UyeKodu>
             <ser:filitre>
                <ser:Aktif>-1</ser:Aktif>
             </ser:filitre>
          </ser:SelectUrun>
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
    const result = await parseStringPromise(xmlData);
    
    // Gelen karmaşık XML verisini bizim kartlara uygun basit listeye çeviriyoruz
    const urunlerRaw = result['s:Envelope']['s:Body'][0]['SelectUrunResponse'][0]['SelectUrunResult'][0]['UrunKart'];
    
    return urunlerRaw.map((item: any) => ({
      id: item.StokKodu[0],
      ad: item.UrunAdi[0],
      kategori: item.KategoriAdi ? item.KategoriAdi[0] : 'Genel',
      marka: item.MarkaAdi ? item.MarkaAdi[0] : 'Devinim',
      aciklama: item.Aciklama ? item.Aciklama[0] : '',
    }));
  } catch (error) {
    console.error('Ticimax verisi çekilirken hata oluştu:', error);
    return [];
  }
}