import { parseStringPromise } from 'xml2js';

const TICIMAX_URL = 'https://www.devinimonline.com/Servis/UrunServis.svc';

export async function getTicimaxProducts() {
  const apiKey = process.env.TICIMAX_API_KEY || 'HOSTINGER';

  // Dokümandaki "Service Reference" yapısına %100 uyumlu XML
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
      cache: 'no-store'
    });

    const xmlData = await response.text();
    
    // Hata Ayıklama: Eğer servis hata dönerse XML'i terminale basar
    if (xmlData.includes('Fault')) {
       console.log("TICIMAX XML HATASI:", xmlData);
    }

    const result = await parseStringPromise(xmlData);
    
    // Dokümandaki WCF yanıt hiyerarşisi (s:Body -> SelectUrunResponse -> SelectUrunResult)
    const envelope = result['s:Envelope'] || result['soap:Envelope'];
    const body = envelope?.['s:Body'];
    const responseNode = body?.[0]?.['SelectUrunResponse'];
    const resultNode = responseNode?.[0]?.['SelectUrunResult'];
    const urunlerRaw = resultNode?.[0]?.['UrunKart'] || [];

    return urunlerRaw.map((item: any) => ({
      id: item.StokKodu ? item.StokKodu[0] : 'N/A',
      ad: item.UrunAdi ? item.UrunAdi[0] : 'İsimsiz Ürün',
      kategori: item.KategoriAdi ? item.KategoriAdi[0] : 'Genel',
      marka: item.MarkaAdi ? item.MarkaAdi[0] : 'Devinim',
      aciklama: item.Aciklama ? item.Aciklama[0] : '',
    }));
  } catch (error) {
    console.error("KRITIK SERVIS HATASI:", error);
    return [];
  }
}