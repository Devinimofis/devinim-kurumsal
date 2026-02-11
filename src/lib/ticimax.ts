import { parseStringPromise } from 'xml2js';

const TICIMAX_URL = 'http://www.devinimonline.com/Servis/UrunServis.svc';

export async function getTicimaxProducts() {
  const apiKey = process.env.TICIMAX_API_KEY;

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
    
    // RÖNTGEN BURADA: Gelen verinin tam yapısını terminale yazdırıyoruz
    console.log("Ticimax'ten Gelen Ham Veri:", JSON.stringify(result, null, 2));

    // Veri yapısını kontrol ederek çekiyoruz
    const envelope = result['s:Envelope'] || result['soap:Envelope'];
    const body = envelope['s:Body'] || envelope['soap:Body'];
    const responseBody = body[0]['SelectUrunResponse'][0]['SelectUrunResult'][0];
    const urunlerRaw = responseBody['UrunKart'] || [];
    
    return urunlerRaw.map((item: any) => ({
      id: item.StokKodu ? item.StokKodu[0] : 'N/A',
      ad: item.UrunAdi ? item.UrunAdi[0] : 'İsimsiz Ürün',
      kategori: item.KategoriAdi ? item.KategoriAdi[0] : 'Genel',
      marka: item.MarkaAdi ? item.MarkaAdi[0] : 'Devinim',
      aciklama: item.Aciklama ? item.Aciklama[0] : '',
    }));
  } catch (error) {
    console.error('Ticimax servisinde bir hata oluştu:', error);
    return [];
  }
}