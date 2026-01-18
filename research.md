# Kişisel Fatura ve Harcama Dashboard Araştırması

Kişisel finans yönetimi için etkili bir dashboard, kullanıcının finansal durumunu bir bakışta anlamasını sağlamalı ve aksiyon alabilir içgörüler sunmalıdır. İşte en iyi pratikler, kritik metrikler ve UI bileşenleri.

## En Önemli 5 Metrik

Bir kişisel finans dashboard'unun olmazsa olmaz 5 temel metriği şunlardır:

1.  **Net Değer (Net Worth)**
    *   **Tanım:** Toplam Varlıklar - Toplam Borçlar.
    *   **Neden Önemli:** Kullanıcının genel finansal sağlığının en büyük göstergesidir. Zaman içindeki değişimi (artış/azalış) finansal ilerlemeyi gösterir.
    *   **Gösterim:** Genellikle en üstte, büyük bir özet kartı veya zaman çizelgeli bir çizgi grafik olarak.

2.  **Aylık Nakit Akışı (Monthly Cash Flow)**
    *   **Tanım:** Aylık Gelir - Aylık Gider.
    *   **Neden Önemli:** Kullanıcının o ay "artıda" mı yoksa "ekside" mi olduğunu gösterir. Sürdürülebilir bir bütçe için temeldir.
    *   **Gösterim:** Gelir ve gider sütunları olan bir bar grafik veya basit bir "Kalan Bakiye" göstergesi.

3.  **Bütçe Gerçekleşme Oranı (Budget vs. Actual)**
    *   **Tanım:** Planlanan harcama limitlerine kıyasla gerçekleşen harcama durumu (Kategori bazlı).
    *   **Neden Önemli:** Hangi kategorilerde (örn. Market, Ulaşım) aşırı harcama yapıldığını anlık olarak gösterir.
    *   **Gösterim:** İlerleme çubukları (progress bars). Limit doluluk oranına göre renk değiştiren (Yeşil -> Sarı -> Kırmızı) barlar.

4.  **Tasarruf Oranı (Savings Rate)**
    *   **Tanım:** (Toplam Tasarruf / Toplam Gelir) * 100.
    *   **Neden Önemli:** Finansal özgürlük ve acil durum fonu oluşturma kapasitesini ölçer.
    *   **Gösterim:** Yüzdesel bir gösterge (gauge chart) veya trend grafiği.

5.  **Borç/Gelir Oranı (Debt-to-Income Ratio - DTI)**
    *   **Tanım:** Aylık toplam borç ödemelerinin aylık brüt gelire oranı.
    *   **Neden Önemli:** Borç yükünün yönetilebilir olup olmadığını gösterir. Kredi skoru ve finansal stres seviyesi için kritiktir.
    *   **Gösterim:** Basit bir oran kartı veya uyarı renkleri içeren bir gösterge.

## Kritik UI Bölümleri ve Yerleşim

Kullanıcı deneyimini (UX) en üst düzeye çıkarmak için dashboard şu bölümleri içermelidir:

### 1. Özet Kartları (Header / Top Cards)
Ekranın en üstünde, kullanıcının girdiği anda görmesi gereken "Manşet" rakamlar.
*   *İçerik:* Toplam Bakiye, Bu Ayki Harcama, Net Değer, Yaklaşan Ödemeler (Acil uyarılar).
*   *Stil:* Büyük, okunaklı fontlar, artış/azalış trend okları (örneğin geçen aya göre %10 azaldı).

### 2. Harcama Dağılımı ve Trendler (Main Chart Area)
Görsel ağırlıklı merkez alan.
*   *Kategori Dağılımı:* Pasta (Donut) grafik ile paranın nereye gittiği (örn. %40 Kira, %20 Gıda).
*   *Zaman Çizelgesi:* Son 6-12 ayın gelir/gider trendini gösteren çizgi grafik. Mevsimsel harcamaları görmeyi sağlar.

### 3. Hızlı İşlem Menüsü (Quick Actions)
Kullanıcının en sık yaptığı işlemlere hızlı erişim.
*   *Özellikler:* "+ Harcama Ekle", "Transfer Yap", "Fatura Öde" butonları. Genellikle sağ üstte veya mobil için altta sabit (floating action button).

### 4. Son İşlemler Listesi (Recent Transactions)
Detaylara inmek isteyenler için liste görünümü.
*   *Özellikler:* Tarih, Kategori (ikonlu), Açıklama ve Tutar.
*   *İşlev:* Sıralama, filtreleme ve arama özellikleri. Harcamanın üzerine tıklayıp detay/düzenleme imkanı.

### 5. Hedef Takibi (Goal Trackers)
Motivasyon kaynağı olan bölüm.
*   *Özellikler:* "Tatil İçin Biriktir", "Araba Borcunu Bitir" gibi hedeflerin görsel ilerleme çubukları. Hedefe ne kadar kaldığını gösteren motive edici görseller.

## En İyi Pratikler (Best Practices)
*   **Temiz ve Sade Tasarım:** Bilgi yoğunluğunu azaltın (White space kullanımı).
*   **Renk Kodlaması:** Gelirler için yeşil/mavi, giderler için kırmızı/turuncu gibi evrensel kodlar kullanın, ancak renk körü dostu paletler seçmeye özen gösterin.
*   **Mobil Uyumluluk:** Kullanıcılar harcamalarını genellikle hareket halindeyken girerler, mobil deneyim kusursuz olmalıdır.
*   **Kişiselleştirme:** Kullanıcının hangi widget'ları görmek istediğini seçmesine izin verin.