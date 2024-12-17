import React from 'react';
import { ScrollView, Text, StyleSheet, View } from 'react-native';
import { legalStyles } from "../Components/LegalStyles";

const CarrefoursaKartUyelikSozlesmesi = () => {
  return (
    <ScrollView style={legalStyles.container}>
      {/* <Text style={legalStyles.header}>CarrefourSA KART ÜYELİK SÖZLEŞMESİ</Text> */}

      <Text style={legalStyles.paragraph}>
        Sayın Kullanıcımız, Öncelikle belirtmek isteriz ki işbu CarrefourSA Kart üyelik sözleşmesi ile adınıza açılacak güvenli bir kullanıcı hesabı ile sizlere daha verimli hizmet vermeyi amaçlamaktayız. Onay kutucuğunu işaretleyerek Üye Ol işaretine basmanız neticesinde işbu Sözleşme yürürlüğe girecektir. Sözleşmenin yürürlüğe girmesiyle birlikte yapacağınız her türlü işlemlerden kullanıcı sıfatıyla sorumluluğunuz doğacaktır. Üyelik sürecine ilişkin ayrıntılı pek çok bilgiye internet sitemizin sıkça sorulan sorular bölümünden ulaşabilirsiniz.
      </Text>

      <Text style={legalStyles.sectionTitle}>1. TARAFLAR</Text>
      <Text style={legalStyles.paragraph}>
        İşbu sözleşme, “CarrefourSA Plaza Cevizli Mahallesi Tugay Yolu Caddesi No:67 A Blok:B 34846 Maltepe, İstanbul, Türkiye” adresinde yer alan CarrefourSA Carrefour Sabancı Tic. Merkezi A.Ş. (“CarrefourSA” veya “Şirket”) ile internet sitesinde sunulan hizmetten yararlanacak olan kullanıcı arasında oluşturulmaktadır.
      </Text>

      <Text style={legalStyles.sectionTitle}>2. TANIMLAR</Text>
      <Text style={legalStyles.paragraph}>
        <Text style={legalStyles.bold}>Site:</Text> www.CarrefourSA.com adresinde yer alan internet sitesini ifade eder.
      </Text>
      <Text style={legalStyles.paragraph}>
        <Text style={legalStyles.bold}>Sosyal Medya:</Text> Facebook, Twitter, Foursquare gibi sosyal medya mecralarını ifade eder.
      </Text>
      <Text style={legalStyles.paragraph}>
        <Text style={legalStyles.bold}>Mobil Uygulama:</Text> Mobil cihazlardan indirilebilen CarrefourSA uygulamasını ifade eder.
      </Text>
      <Text style={legalStyles.paragraph}>
        <Text style={legalStyles.bold}>Kullanıcı:</Text> CarrefourSA sistemine üye olan kişileri ifade eder.
      </Text>

      <Text style={legalStyles.sectionTitle}>3. KONU</Text>
      <Text style={legalStyles.paragraph}>
        İşbu Sözleşme’nin konusu, CarrefourSA internet sitesinden ve mağazalarından yapılacak alışverişlerde, Kullanıcı’ya fırsatlar oluşturan CarrefourSA Kart üyelik ilişkisine dair hak ve yükümlülüklerin belirlenmesidir.
      </Text>

      <Text style={legalStyles.sectionTitle}>4. TARAFLAR’IN HAK VE YÜKÜMLÜLÜKLERİ</Text>
      <Text style={legalStyles.paragraph}>
        Kullanıcı, kişisel verilerinin CarrefourSA tarafından işlenmesine izin verdiğini kabul eder. CarrefourSA, kullanıcının bilgilerini koruma ve pazarlama amaçlı kullanma hakkına sahiptir.
      </Text>

      <Text style={legalStyles.sectionTitle}>5. KAMPANYA KATILIM KOŞULLARI</Text>
      <Text style={legalStyles.paragraph}>
        Kullanıcı, kampanyalardan faydalanmak için CarrefourSA sadakat kart üyesi olmalıdır. Kullanıcı, kampanya koşullarını sağladıktan sonra en fazla 10 Olası Bağlı Üye üzerinden puan kazanabilir.
      </Text>

      <Text style={legalStyles.sectionTitle}>6. KAMPANYA KAPSAMINDA KULLANICI’NIN HAKLARI</Text>
      <Text style={legalStyles.paragraph}>
        Kullanıcı, aylık en fazla 275 TL puan kazanabilir. Puanlar, hak ediş tarihinden sonraki ayın 5’inde yatırılır.
      </Text>

      <Text style={legalStyles.sectionTitle}>7. SÖZLEŞME’NİN FESİHİ</Text>
      <Text style={legalStyles.paragraph}>
        CarrefourSA, kullanıcının başvuru bilgilerinin doğru olmadığını tespit ederse, sözleşmeyi feshetme hakkını saklı tutar.
      </Text>

      <Text style={legalStyles.sectionTitle}>8. GENEL HÜKÜMLER</Text>
      <Text style={legalStyles.paragraph}>
        Taraflar, mücbir sebepler dahilinde sözleşme yükümlülüklerini yerine getiremezlerse sorumlu tutulamazlar. Uyuşmazlık durumunda İstanbul Anadolu Mahkemeleri yetkilidir.
      </Text>

      <Text style={legalStyles.footer}>
        Soru ve önerileriniz için (216) 655 00 00 numaralı telefondan veya bilgi@CarrefourSA.com e-posta adresinden bize ulaşabilirsiniz.
      </Text>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: '#FFFFFF',
  },
  header: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 10,
    textAlign: 'center',
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginVertical: 10,
  },
  paragraph: {
    fontSize: 16,
    lineHeight: 24,
    marginBottom: 10,
  },
  bold: {
    fontWeight: 'bold',
  },
  footer: {
    fontSize: 14,
    marginTop: 20,
    textAlign: 'center',
  },
});

export default CarrefoursaKartUyelikSozlesmesi;
