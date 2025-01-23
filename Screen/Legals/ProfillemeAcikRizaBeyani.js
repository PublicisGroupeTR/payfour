import React from 'react';
import { ScrollView, Text, StyleSheet, View } from 'react-native';
import { legalStyles } from "../Components/LegalStyles";

const ProfillemeAcikRizaBeyani = () => {
  return (
    <ScrollView style={legalStyles.container}>
      <View style={legalStyles.section}>
        <Text style={legalStyles.paragraph}>CarrefourSA Carrefour Sabancı Ticaret Merkezi Anonim Şirketi (“Şirket”) CarrefourSA Profilleme Aydınlatma Metni  amaçları kapsamda ad, soyad, doğum tarihi, eğitim, meslek ve unvan bilgisi ile gelir bilgisine ilişkin kişisel verilerimin Şirket içi segmentasyon, profilleme faaliyetlerinin gerçekleştirilmesi, kişiye özel teklifler sunulması ve kampanya düzenlenebilmesi, müşteri memnuniyeti çalışmalarının yürütülmesi ve kişiselleştirilmiş ticari elektronik iletiler gönderilebilmesi amaçlarıyla işlenmesine ve söz konusu kişisel verilerimin aynı amaçlarla iştiraklerinize, bağlı olduğunuz kuruluşlara, birlikte çalışmakta olduğunuz iş ortaklarınıza, faaliyetlerin yürütülmesi adına hizmet aldığınız tedarikçilerinize aktarılmasına  onay veriyorum.</Text>
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

export default ProfillemeAcikRizaBeyani;
