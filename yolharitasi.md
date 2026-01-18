# Ev Harcama Dashboard MVP - Yol Haritası

## Hedef
Supabase, React, TypeScript, Tailwind ve shadcn/ui kullanarak tek sayfalık bir harcama takip uygulaması oluşturmak. Uygulama, kullanıcıların harcamalarını takip etmelerine, özetleri görüntülemelerine ve verileri grafikleştirmelerine olanak tanıyacak.

## Teknoloji Yığını
- **Frontend**: React (Vite), TypeScript
- **Stil**: Tailwind CSS, shadcn/ui (lucide-react ikonları ile)
- **Veri Yönetimi**: Supabase React Client
- **Grafikler**: Recharts

## UI Kuralları
- **Düzen**: Modern dashboard düzeni, net bölümler, ferah boşluklar (spacing).
- **Tipografi**: Güçlü başlıklar, rahat okunabilir gövde metni, tutarlı ölçek.
- **Kartlar**: Hafif gölge (elevation), yuvarlatılmış köşeler, temiz ayraçlar.
- **Grafikler**: Minimal ve okunaklı, eksen etiketleri mevcut, tooltip desteği.
- **Renk**: Nötr temel renkler + 1 adet accent (vurgu/CTA) rengi.
- **Performans**: Hafif yapılı, gereksiz ağır asset kullanımından kaçınılmış.
- **Ton**: Sakin, net, "kontrol bende" hissi.
- **Accent Rengi**: Tek bir renk seç ve her yerde tutarlı kullan.
- **Butonlar**: Primary = Accent, Secondary = Nötr outline.
- **Sayılar**: Tutarlı format (Para birimi, binlik ayırıcı, iki hane).
- **UI Hedefi**: Kaygıyı azalt, harcamayı görünür ve aksiyon alınabilir kıl.

## Veritabanı Şeması (Supabase)

### `transactions` tablosu
- `id`: uuid (Birincil anahtar)
- `user_id`: uuid (Kullanıcı ilişkilendirmesi)
- `amount`: numeric/decimal (Tutar)
- `date`: date (Tarih)
- `category`: text ('Faturalar', 'Market', 'Ulaşım', 'Eğlence', 'Diğer')
- `payment_method`: text ('Nakit', 'Kredi Kartı', 'Banka Kartı')
- `notes`: text (Opsiyonel notlar)
- `created_at`: timestamptz

## UI Yapısı (Tek Sayfa Tasarımı)

> **Tasarım Stili**: Referans görselden esinlenilmiştir. Modern, temiz ve premium bir görünüm. Yüksek okunabilirlik, yuvarlatılmış köşeler, hafif gölgeler ve mavi ton ağırlıklı uygulama.

1. **Üst Bar (Header)**: Uygulama Başlığı, Profil/Çıkış
2. **Ana Düzen (Grid Layout)**:
    - **Üst Satır**: 3 Özet Kartı
        - Bu ay toplam harcama
        - Geçen aya göre fark (%)
        - En çok harcanan kategori
    - **Sol Sütun**: Harcama Ekleme Formu
        - Tutar Girişi
        - Tarih Seçici
        - Kategori Seçimi
        - Ödeme Yöntemi Seçimi
        - Notlar
        - Kaydet Butonu
    - **Sağ Sütun**:
        - **Üst**: Kategori Dağılımı (Donut Grafik)
        - **Alt**: Son Harcamalar Listesi (Düzenle/Sil butonları ile)

## Doğrulama Planı
- Kullanıcı hesabı oluşturma (Auth) testi.
- Farklı kategori ve tarihlerde harcama ekleme.
- Özet kartlarının doğru hesaplandığının kontrolü.
- Grafiklerin verileri doğru yansıttığının kontrolü.
- Harcama düzenleme ve silme.
- Responsive görünüm kontrolü.
