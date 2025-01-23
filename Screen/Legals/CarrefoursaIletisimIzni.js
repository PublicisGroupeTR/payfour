import React from 'react';
import { ScrollView, Text, StyleSheet, View } from 'react-native';
import { legalStyles } from "../Components/LegalStyles";

const CarrefoursaIletisimIzni = () => {
  return (
    <ScrollView style={legalStyles.container}>
      <View style={legalStyles.section}>
      {/* <Text style={legalStyles.title}>CARREFOURSA İLETİŞİM İZNİ METNİ</Text> */}
      </View>
      <View style={legalStyles.section}>
      <Text style={legalStyles.paragraph}>Kişisel verilerimin CarrefourSA Carrefour Sabancı Ticaret Merkezi Anonim Şirketi (“Şirket”) tarafından doğrudan veya dolaylı pazarlama faaliyetlerinin gerçekleştirilmesi amacıyla işlenmesi suretiyle iletişim bilgilerime; reklam, promosyon, kampanya ve benzeri nitelikte genel ve özel kampanyalar, avantajlar, ürün, hizmet tanıtımları, reklâm, pazar araştırması anketleri ve diğer müşteri memnuniyeti uygulamalarına ilişkin olarak kısa mesaj (SMS), mobil uygulama, anlık bildirim, e-posta, otomatik makinelerden arama, telefonla arama, bluetooth, beacon kablosuz ağlar, sosyal medya vb. her türlü elektronik iletişim aracı ile ticari elektronik ileti gönderilmesine ve kişisel verilerimin Şirket’in hizmet aldığı tedarikçilere aktarılmasına  onay veriyorum.</Text>
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

export default CarrefoursaIletisimIzni;
