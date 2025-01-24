import React from 'react';
import { ScrollView, Text, StyleSheet, View } from 'react-native';
import { legalStyles } from "../Components/LegalStyles";

const PazarlamaAydinlatmaMetni = () => {
  return (
    <ScrollView style={legalStyles.container}>
      <View style={legalStyles.section}>
        {/* <Text style={legalStyles.title}>CarrefourSA PAZARLAMA AYDINLATMA METNİ</Text> */}
        </View>
        <Text style={legalStyles.paragraph}>İşbu Aydınlatma Metni’nde, kişisel verilerinizin, 6698 sayılı Kişisel Verilerin Korunması Kanunu (“Kanun”) ve ilgili mevzuata uygun olarak, veri sorumlusu “CarrefourSA Plaza Cevizli Mah. Tugay Yolu Cad. No:67/A Blok:B Maltepe/İstanbul” adresinde yer alan CarrefourSA Carrefour Sabancı Ticaret Merkezi Anonim Şirketi (“Şirket”) nezdinde işlenmesine ilişkin esaslar aşağıda belirtilmiştir.</Text>
        <View style={legalStyles.section}>
        <Text style={legalStyles.subtitle}>1.	Kişisel Verilerin İşlenme Amacı </Text>
        <Text style={legalStyles.paragraph}>Şirketimizin, SMS, çağrı, e-posta gibi elektronik yöntemlerle pazarlama amaçlı ticari elektronik ileti gönderimi gerçekleştirmesine yönelik verdiğiniz izin veya Şirketimiz ile aranızdaki ticari ilişki uyarınca toplanan iletişim verileriniz tarafınıza ticari elektronik ileti gönderimi gerçekleştirilebilmesi amacıyla işlenmektedir. </Text>
        <Text style={legalStyles.paragraph}>Böylelikle; tarafından doğrudan veya dolaylı pazarlama faaliyetlerinin gerçekleştirilmesi amacıyla işlenmesi suretiyle iletişim bilgilerinize; reklam, promosyon, kampanya ve benzeri nitelikte genel ve özel kampanyalar, avantajlar, ürün, hizmet tanıtımları, reklâm, pazar araştırması anketleri ve diğer müşteri memnuniyeti uygulamalarına ilişkin olarak kısa mesaj (SMS), anlık bildirim, e-posta, otomatik makinelerden arama, telefonla arama, sosyal medya vb. her türlü elektronik iletişim aracı ile ticari elektronik ileti gönderilebilecektir.</Text>
        <Text style={legalStyles.subtitle}>2.	İşlenen Kişisel Verilerin Aktarıldığı Yerler ve Aktarım Amacı</Text>
        <Text style={legalStyles.paragraph}>Kişisel verileriniz, Kanun’a uygun olarak talep edilmesi halinde hukuki yükümlülüklerin yerine getirilebilmesi amacıyla resmi kurum ve kuruluşlar ile amaçla bağlantılı olarak iletişim faaliyetlerinin ifası için iş ortaklarımıza Kanun’un 8. ve 9. maddelerinde belirtilen kişisel veri işleme şartları ve amaçları çerçevesinde aktarılabilmektedir.</Text>
        <Text style={legalStyles.paragraph}>İletişim bilgileriniz, Ticari İletişim ve Ticari Elektronik İletiler Hakkında Yönetmelik uyarınca iletişim izinlerinin yönetimi için İleti Yönetim Sistemi A.Ş.’ye aktarılmaktadır. </Text>
        <Text style={legalStyles.subtitle}>3.	Kişisel Verilerin Toplanma Yöntemi ve Hukuki Sebebi</Text>
        <Text style={legalStyles.paragraph}>Kişisel veriler, internet sitemizde yer alan dijital form vasıtasıyla kısmen veya tamamen otomatik yöntemle elektronik ortamda veri kayıt sisteminin bir parçası olmak üzere toplanmaktadır.</Text>
        <Text style={legalStyles.paragraph}>Kişisel verileriniz, iletişim izni verdiğinizi beyan ettiğiniz izin sayfası vasıtasıyla kısmen otomatik olan yöntemle Kanun’un m. 5/1 hükmü uyarınca açık rıza verilmesi, Kanun’un m. 5/2 (f) hükmü uyarınca ilgili kişinin temel hak ve özgürlüklerine zarar vermemek kaydıyla Şirketimizin meşru menfaati için veri işlemenin zorunlu olması hukuki sebebiyle toplanmaktadır. </Text>
        <Text style={legalStyles.subtitle}>4.	Veri Sorumlusuna Başvuru Yolları ve Haklarınız</Text>
        <Text style={legalStyles.paragraph}>Kanun’un 11. maddesi uyarınca, Şirketimize başvurarak, kişisel verilerinizin; a) işlenip işlenmediğini öğrenme, b) işlenmişse bilgi talep etme, c) işlenme amacını ve amacına uygun kullanılıp kullanılmadığını öğrenme, d) yurt içinde / yurt dışında transfer edildiği tarafları öğrenme, e) eksik / yanlış işlenmişse düzeltilmesini isteme, f) Kanun’un 7. maddesinde öngörülen şartlar çerçevesinde silinmesini / yok edilmesini isteme, g) aktarıldığı 3. kişilere yukarıda sayılan (e) ve (f) bentleri uyarınca yapılan işlemlerin bildirilmesini isteme, h) münhasıran otomatik sistemler ile analiz edilmesi nedeniyle aleyhinize bir sonucun ortaya çıkmasına itiraz etme, i) kanuna aykırı olarak işlenmesi sebebiyle zarara uğramanız hâlinde zararın giderilmesini talep etme hakkına sahipsiniz.
        Yukarıda sıralanan haklarınıza yönelik başvurularınızı Şirket’in CarrefourSA Plaza Cevizli Mah. Tugay Yolu Cad. No:67/A Blok:B Maltepe/İstanbul adresine posta yoluyla veya CarrefourSA@CarrefourSA.hs03.kep.tr adresine e-posta göndererek iletebilirsiniz. </Text>
        <Text style={legalStyles.paragraph}>Verilerinizin Şirketimiz nezdinde hassasiyetle korunduğunu belirtir bize duyduğunuz güven için teşekkür ederiz.</Text>
      </View>
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

export default PazarlamaAydinlatmaMetni;
