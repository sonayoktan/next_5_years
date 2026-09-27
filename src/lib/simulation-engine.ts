import { SimulationResultData, UserInput, TimelineNode, MultiverseTimeline } from '@/types/simulation';
import { COLD_READING_ARCHETYPES } from './constants';

export function runSimulationEngine(input: UserInput): SimulationResultData {
  const ageNum = typeof input.age === 'number' ? input.age : parseInt(String(input.age), 10) || 27;
  const name = input.name?.trim() || 'Gezgin';

  // 1. Archetype Determination
  let archetype = COLD_READING_ARCHETYPES[0];
  if (input.decisionStyle === 'overthinking' || input.decisionStyle === 'delayed_calculating') {
    archetype = COLD_READING_ARCHETYPES[1];
  } else if (input.decisionStyle === 'people_pleasing') {
    archetype = COLD_READING_ARCHETYPES[2];
  } else if (input.focus === 'corporate_trap') {
    archetype = COLD_READING_ARCHETYPES[0];
  } else if (input.focus === 'location_escape' || input.focus === 'burnout_rut') {
    archetype = COLD_READING_ARCHETYPES[3];
  }

  // 2. Score & Metrics Computation
  let baseRegret = 55;
  if (input.delayTime === '2_years_plus') baseRegret += 22;
  else if (input.delayTime === 'always') baseRegret += 30;
  else if (input.delayTime === '6_12_months') baseRegret += 14;
  else baseRegret += 5;

  if (input.riskTolerance <= 3) baseRegret += 10;
  else if (input.riskTolerance >= 8) baseRegret -= 8;

  if (input.decisionStyle === 'overthinking') baseRegret += 6;

  const regretIndex = Math.min(97, Math.max(42, baseRegret));

  const comfortDecayRate = Math.min(95, Math.max(48, 50 + (10 - input.riskTolerance) * 4 + (input.delayTime === '2_years_plus' ? 12 : 6)));
  const courageScore = Math.min(98, Math.max(15, input.riskTolerance * 10 - (input.decisionStyle === 'overthinking' ? 15 : 0)));
  const potentialWasteRisk = Math.min(96, Math.max(45, Math.round((regretIndex + comfortDecayRate) / 2)));
  const lostHoursPerWeek = Math.min(28, Math.max(8, 10 + (10 - input.riskTolerance) + (input.decisionStyle === 'overthinking' ? 5 : 2)));

  // Focus-specific text generators
  const focusLabels: Record<string, string> = {
    corporate_trap: 'Kurumsal Güvence',
    startup_pivot: 'Kendi Girişimini Başlatma',
    location_escape: 'Yurtdışı / Şehir Değişimi',
    relationship_sacrifice: 'İlişki & Gelecek Dengesi',
    burnout_rut: 'Tükenmişlik & Yeniden Doğuş'
  };
  const focusText = focusLabels[input.focus] || 'Kariyer ve Hayat Rotası';

  const radicalAction = input.radicalPivot?.trim() || 'Kafandaki o radikal hamleyi başlatmak';

  // 3. Multiverse Timelines
  const currentTimeline: TimelineNode[] = [
    {
      year: 1,
      phase: 'Başlangıç Aşınması',
      title: 'İçsel Sürtünme ve "Bakarız" Evresi',
      narrative: `${name}, önümüzdeki 12 ay boyunca mevcut düzeni koruyacaksın. Her şey dışarıdan stabil görünecek; maaş yatacak, rutin devam edecek. Ancak pazar akşamları gelen o iç sıkışması haftada 3 güne yayılacak. Kafandaki fikirleri arkadaş ortamlarında "bir ara yapacağım" diye anlatmaya devam edeceksin.`,
      warning: 'Zaman yavaş gibi görünür ama alışkanlıklar taşlaşır.',
      criticalDecision: 'Mevcut güvenli limanda kalmaya razı oluş.',
      regretScoreImpact: +15,
      badge: 'Alışkanlık Prangası'
    },
    {
      year: 3,
      phase: 'KRİTİK KIRILMA NOKTASI',
      title: `${archetype.primaryBottleneck}: Geri Dönüşü Zorlaşan Eşik`,
      narrative: `${ageNum + 3} yaşına geldiğinde, harcamaların ve hayat standardın tam olarak mevcut gelirine göre kilitlenmiş olacak. Artık "istifa etmek" veya "risk almak" sadece cesaret değil, ciddi bir lüks kaybı gibi görünecek. Çevrende seninle aynı dönemde cesur adımı atan insanların ilk meyvelerini topladığını göreceksin; en çok bu canını yakacak.`,
      warning: 'Kırılma uyarısı: Bu noktadan sonra risk toleransın %50 daha düşecek.',
      criticalDecision: 'Konfor alanına teslimiyet veya son çıkış kavşağı.',
      regretScoreImpact: +32,
      badge: 'KRİTİK TEHLİKE'
    },
    {
      year: 5,
      phase: 'Vade Sonu',
      title: 'Kronik Kabulleniş & "Keşke O Zaman Yapsaydım"',
      narrative: `5 yıl geride kaldığında, hayatın kötü olmayacak; fakat "vasat bir güvenliğe" tamamen hapsolmuş olacaksın. En büyük kabusun gerçekleşmiş olacak: Ne battın, ne de parladın. Sadece yapabileceğin şeylerin onda birini yaparak 1800 günü tükettin.`,
      warning: 'Pişmanlık artık düzeltilebilir bir hata değil, kalıcı bir kimlik özelliği haline gelir.',
      criticalDecision: 'Kaçırılan fırsatların faturasını ödeme.',
      regretScoreImpact: +40,
      badge: 'Yüksek Pişmanlık'
    }
  ];

  const radicalTimeline: TimelineNode[] = [
    {
      year: 1,
      phase: 'Bilinmezin Şoku',
      title: 'Türbülans ve Eski Kimliğin Yıkımı',
      narrative: `"${radicalAction}" kararını verdikten sonra ilk 6 ay korkutucu geçecek. Gelir dalgalanacak, çevrendeki bazı insanlar "Hata mı yaptın?" diye sorgulayacak. Fakat sabahları uyandığında ilk defa kendi geminin dümeninde olduğunu hissedeceksin. Öğrenme hızın son 3 yılın toplamından daha yüksek olacak.`,
      warning: 'İlk 180 gün şüphe sesleri en yüksek desibelde bağırır; pes etmeyenler eşiği aşar.',
      criticalDecision: 'Geri dönme dürtüsüne direnip inşa etmeye devam etmek.',
      regretScoreImpact: -25,
      badge: 'Yeniden Doğuş'
    },
    {
      year: 3,
      phase: 'DÖNÜM NOKTASI',
      title: 'Bileşik Etki (Compound Effect) Patlaması',
      narrative: `${ageNum + 3} yaşında, aldığın radikal kararın meyveleri somutlaşacak. Kendi yetkinliğin veya girişimin sayesinde eski maaşının veya yaşam kalitenin ötesine geçmeye başlayacaksın. En önemlisi: "Ya deneseydim ne olurdu?" sorusu beynini kemirmekten çıkacak. Öz saygın zirveye ulaşacak.`,
      warning: 'Başarı yeni ego tuzakları getirir; vizyonu genişletmek şart.',
      criticalDecision: 'Elde edilen başarıyı kaldıraçlayıp ölçeklemek.',
      regretScoreImpact: -45,
      badge: 'KRİTİK ZAFER'
    },
    {
      year: 5,
      phase: 'Vade Sonu',
      title: 'Tam Otonomi ve Sıfır Pişmanlık Mirası',
      narrative: `5 yılın sonunda baktığında: Verdiğin o tek radikal karar, hayatının sonraki 30 yılının gidişatını değiştirdi. Zorlandın, bedel ödedin ama asla "keşke" demedin. Artık sadece hayatı yaşayan biri değil, hayatını tasarlayan bir mimarsın.`,
      warning: 'Geleceğe bıraktığın en büyük hediye cesaretin oldu.',
      criticalDecision: 'Başkalarına mentorluk yapmak ve yeni ufuklar açmak.',
      regretScoreImpact: -60,
      badge: 'Tam Özgürlük'
    }
  ];

  const timelines: { current: MultiverseTimeline; radical: MultiverseTimeline } = {
    current: {
      id: 'current_path',
      name: 'Çizgi A: Mevcut Rota (Konforlu Aşınma)',
      tagline: 'Görünürde Güvenli, Derinde Tükenen Çizgi',
      themeColor: '#ef4444',
      regretScore: regretIndex,
      comfortZoneDecay: comfortDecayRate > 75 ? 'Kritik Seviye' : comfortDecayRate > 55 ? 'Orta' : 'Düşük',
      bottleneckYear3: archetype.primaryBottleneck,
      hiddenBlindspot: archetype.hiddenBlindspot,
      summary: `Mevcut gidişatta kaldığında 3. yılda karşına çıkacak en büyük duvar: ${archetype.primaryBottleneck}. Pişmanlık ihtimalin %${regretIndex}.`,
      timeline: currentTimeline
    },
    radical: {
      id: 'radical_path',
      name: 'Çizgi B: Radikal Hamle (Dönüştürücü Kaos)',
      tagline: 'Başta Zorlu, Sonunda Sonsuz Otonomi',
      themeColor: '#10b981',
      regretScore: Math.max(12, 100 - regretIndex - 15),
      comfortZoneDecay: 'Düşük',
      bottleneckYear3: 'Ölçeklenme ve Enerji Yönetimi',
      hiddenBlindspot: 'İlk Yılın Sabırsızlığı',
      summary: `"${radicalAction}" adımını attığında ilk 12 ay kaotik geçer; ancak 3. yılda özgürlüğünü ve kendi değerini eline alırsın. Pişmanlık ihtimalin %${Math.max(12, 100 - regretIndex - 15)}'ye düşer.`,
      timeline: radicalTimeline
    }
  };

  // 4. Emergency Action Protocol
  const emergencyProtocol = [
    {
      timeframe: 'Önümüzdeki 72 Saat' as const,
      title: 'Mikro İtiraz & Görünür Adım',
      description: `Ertelediğin kararla ilgili maliyetsiz ama geri dönülemez tek bir mikro adım at (örneğin: bir danışmanla randevu al, alan adı satın al, veya kararı güvendiğin birine sesli itiraf et).`,
      impact: 'Beyindeki "ertelersem tehlike yok" illüzyonunu kırar.'
    },
    {
      timeframe: '90 Gün İçinde' as const,
      title: '6 Aylık Finansal & Zihinsel Can Simidi',
      description: `Radikal hamlenin en büyük düşmanı paniktir. 90 gün boyunca lüks harcamaları kısarak 6 aylık acil durum fonu oluştur ve kararı takvime mühürle.`,
      impact: 'Korku mekanizmasını mantıkla devreden çıkarır.'
    },
    {
      timeframe: '12. Ay Dönümünde' as const,
      title: 'Geri Dönüşü Olmayan Eşik Değerlendirmesi',
      description: `1. yılın sonunda hala aynı bahaneleri üretiyorsan, bil ki sorun şartlar değil senin teslimiyetindir. Ya köprüleri yak ya da bu hayalden şikayet etmeyi tamamen bırak.`,
      impact: 'Kronik kurban psikolojisini sonlandırır.'
    }
  ];

  const viralQuotes = [
    `${name} için 3. yıl teşhisi: ${archetype.primaryBottleneck}. Pişmanlık Endeksi: %${regretIndex}.`,
    `"En tehlikeli bağımlılık düzenli maaş ve vasat bir konfordur." - Gelecek 5 Yıl Simülasyonu`,
    `Gelecek 5 yılda en büyük kör noktan: ${archetype.hiddenBlindspot}.`,
    `Paralel Evren Raporu: Radikal rota seçilirse pişmanlık riski %${regretIndex}'ten %${Math.max(12, 100 - regretIndex - 15)}'ye geriliyor.`
  ];

  return {
    archetype: {
      title: archetype.title,
      description: archetype.description,
      tagline: archetype.tagline,
      warningQuote: archetype.warningQuote
    },
    metrics: {
      regretIndex,
      comfortDecayRate,
      courageScore,
      potentialWasteRisk,
      primaryBottleneck: archetype.primaryBottleneck,
      hiddenBlindspot: archetype.hiddenBlindspot,
      lostHoursPerWeek
    },
    timelines,
    emergencyProtocol,
    viralQuotes
  };
}
