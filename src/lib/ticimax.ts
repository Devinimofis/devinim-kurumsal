import { parseStringPromise } from 'xml2js';

const TICIMAX_URL = 'https://www.devinimonline.com/Servis/UrunServis.svc';

export async function getTicimaxProducts() {
  // Anahtarın HOSTINGER olduğundan eminiz
  const apiKey = process.env.TICIMAX_API_KEY || 'HOSTINGER';

  const soapEnvelope = `
<soapenv:Envelope xmlns:soapenv="http://schemas.xmlsoap.org/soap/envelope/" xmlns:tem="http://tempuri.org/" xmlns:tic="http://schemas.datacontract.org/2004/07/Ticimax.Web.Service.Model">
   <soapenv:Header/>
   <soapenv:Body>
      <tem:SelectUrun>
         <tem:UyeKodu>${apiKey}</tem:UyeKodu>
         <tem:filitre>
            <tic:Aktif>-1</tic:Aktif>
         </tem:filitre>
      </tem:SelectUrun>
   </soapenv:Body>
</soapenv:Envelope>`;

  try {
    const response = await fetch(TICIMAX_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'text/xml; charset=utf-8',
        'SOAPAction': 'http://tempuri.org/IUrunServis/SelectUrun', // WCF'in beklediği tam yol
      },
      body: soapEnvelope,
      cache: 'no-store'
    });

    const xmlData = await response.text();
    const result = await parseStringPromise(xmlData);
    
    // Hiyerarşiyi WCF standartlarına göre parçalıyoruz
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
    console.error("Servis Cagri Hatasi:", error);
    return [];
  }
}