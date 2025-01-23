import React from 'react';
import { ScrollView, Text, StyleSheet, View } from 'react-native';
import { legalStyles } from "../Components/LegalStyles";

const DavetKurallari = () => {
  return (
    <ScrollView style={legalStyles.container}>
      <View style={legalStyles.section}>
        {/* <Text style={legalStyles.title}>CARREFOURSA PAZARLAMA AYDINLATMA METNİ</Text> */}
        
        <Text style={legalStyles.paragraph}>Referans Kodu ile Payfour’a kazandırılan üyenin yapacağı tek seferde 150 TL ve üzeri ilk alışverişinde, hem referans kodu sahibi hem de yeni üye 10 TL Puan kazanacaktır.</Text>

        <Text style={legalStyles.paragraph}>Kampanya 11.01.2025 – 31.03.2025 tarihleri arasında geçerlidir.</Text>

        <Text style={legalStyles.paragraph}>Kampanyada, Payfour Profilim içerisindeki “Arkadaşını Davet Et” alanındaki kod ile Payfour’a her yeni üye kazandırıldığında hem kod sahibine hem de yeni üyeye 10 TL CarrefourSA Puan kazandırılacaktır.</Text>

        <Text style={legalStyles.paragraph}>Puanın kazanılabilmesi için “Arkadaşını Davet Et” alanındaki kodun paylaşıldığı kişinin, Payfour’a yeni üye olurken “Referans Kodu” alanına ilgili kodu yazarak üye olması gerekmektedir.</Text>

        <Text style={legalStyles.paragraph}>Bir müşteri, kampanyadan en fazla 10 kere faydalanabilecektir ve toplamda 100 TL Puan kazanabilecektir.</Text>

        <Text style={legalStyles.paragraph}>Kazanılan puanların geçerlilik süresi yüklendiği gün dahil 30 gündür.</Text>

        <Text style={legalStyles.paragraph}>Kazanılan puanlar nakde çevrilemez; alkollü içecek, tütün mamulleri, şans oyunları, hediye kart ve kuyum alışverişleri ile GSM TL ve E-PİN yüklemelerinde kullanılamaz.</Text>

        <Text style={legalStyles.paragraph}>CarrefourSA kampanya koşullarını değiştirme ve kampanyayı durdurma hakkını saklı tutar.</Text>

        <Text style={legalStyles.paragraph}>Detaylı bilgi 444 10 00.</Text>
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

export default DavetKurallari;
