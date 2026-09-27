import { UserInput } from '@/types/simulation';

export interface QuestionOption {
  id: string;
  label: string;
  sublabel?: string;
  icon?: string;
}

export interface QuestionDef {
  id: string;
  step: number;
  category: string;
  title: string;
  subtitle: string;
  type: 'select' | 'slider' | 'text-select';
  options?: QuestionOption[];
  min?: number;
  max?: number;
  stepVal?: number;
  unit?: string;
  lowLabel?: string;
  highLabel?: string;
  placeholder?: string;
}

export const QUESTIONS: QuestionDef[] = [
  {
    id: 'focus',
    step: 1,
    category: 'Mevcut Durum & Tıkanma',
    title: 'Şu an seni en çok yıpratan ana ikilem veya tıkanıklık noktası nedir?',
    subtitle: 'Zihnini en çok meşgul eden ve karar vermekte zorlandığın alanı seç.',
    type: 'select',
    options: [
      {
        id: 'corporate_trap',
        label: 'Kurumsal Güvence vs. Kendi Hayalini İnşa Etme',
        sublabel: 'Maaşım fena değil ama potansiyelimi harcadığımı hissediyorum.',
        icon: 'Briefcase'
      },
      {
        id: 'startup_pivot',
        label: 'Girişim / Proje Başlatma vs. Başarısızlık Korkusu',
        sublabel: 'Kafamda fikirler var ama konfor alanından çıkıp riske giremiyorum.',
        icon: 'Flame'
      },
      {
        id: 'location_escape',
        label: 'Yurtdışına / Yeni Bir Şehre Göç İkilemi',
        sublabel: 'Düzeni sıfırlayıp bilinmeze gitmek mi, tanıdık kaosla devam etmek mi?',
        icon: 'Globe'
      },
      {
        id: 'relationship_sacrifice',
        label: 'İlişki / Evlilik vs. Bireysel Özgürlük & Kariyer',
        sublabel: 'Hayatımdaki insanla gelecek planlarım kişisel vizyonumla çelişiyor.',
        icon: 'Heart'
      },
      {
        id: 'burnout_rut',
        label: 'Tükenmişlik (Burnout) & Yön Kaybı',
        sublabel: 'Çok çalışıyorum ama nereye gittiğimi bilmiyorum, pilim bitmek üzere.',
        icon: 'BatteryLow'
      }
    ]
  },
  {
    id: 'risk_tolerance',
    step: 2,
    category: 'Risk Algısı & Eşik',
    title: 'Bilinmeyene adım atma ve risk alma eşiğin ne kadar yüksek?',
    subtitle: '1: Güvenli limandan asla ayrılmam | 10: Her şeyi sıfırlayıp uçurumdan atlayabilirim.',
    type: 'slider',
    min: 1,
    max: 10,
    lowLabel: 'Güvenli Liman (1)',
    highLabel: 'Gözü Kara Kaşif (10)'
  },
  {
    id: 'biggest_fear',
    step: 3,
    category: 'Psikolojik Gölge',
    title: 'Gelecekle ilgili seni geceleri uyanık tutan en karanlık korkun hangisi?',
    subtitle: 'Kabul etmek zor olsa da içindeki gerçek alarmı işaretle.',
    type: 'select',
    options: [
      {
        id: 'mediocrity',
        label: 'Vasatlaşmak & Sıradan Bir Hayata Razı Olmak',
        sublabel: '"Potansiyelim vardı ama cesaret edemedim" pişmanlığıyla yaşlanmak.',
        icon: 'EyeOff'
      },
      {
        id: 'financial_ruin',
        label: 'Finansal Olarak Çökmek ve Muhtaç Kalmak',
        sublabel: 'Parasız kalıp aileye veya sevmediğim bir sisteme bağımlı hale gelmek.',
        icon: 'TrendingDown'
      },
      {
        id: 'time_vanish',
        label: 'Zamanın Su Gibi Akması ve Geri Getirilememesi',
        sublabel: 'Göz açıp kapayana kadar 40 yaşına gelip hiçbir şey inşa etmemiş olmak.',
        icon: 'Hourglass'
      },
      {
        id: 'lonely_isolation',
        label: 'Başarılı Olsam Bile Yalnız ve Sevgisiz Kalmak',
        sublabel: 'Hedeflerime ulaşırken sevdiklerimi kaybetmek veya boş bir zirvede kalmak.',
        icon: 'UserX'
      }
    ]
  },
  {
    id: 'decision_style',
    step: 4,
    category: 'Karar Davranışı',
    title: 'Kritik dönemeçlerde karar alma refleksin hangisine daha yakın?',
    subtitle: 'Gerçek hayatta kendini en çok hangi davranış kalıbında yakalıyorsun?',
    type: 'select',
    options: [
      {
        id: 'overthinking',
        label: 'Aşırı Analiz Felci (Analysis Paralysis)',
        sublabel: 'Tüm senaryoları düşünürken aylar geçer ve hiçbir şey yapamam.',
        icon: 'Cpu'
      },
      {
        id: 'people_pleasing',
        label: 'Başkalarını Memnun Etme / Statü Kaygısı',
        sublabel: 'Ailemin, partnerimin veya toplumun onaylayacağı kararları seçerim.',
        icon: 'ShieldAlert'
      },
      {
        id: 'impulsive_leap',
        label: 'Ani Dürtüsel Patlama ve Sonra Pişmanlık',
        sublabel: 'Aylarca sabrederim, sonra bir anda köprüleri yakıp telaşa düşerim.',
        icon: 'Zap'
      },
      {
        id: 'delayed_calculating',
        label: 'Hesapçı Bekleyiş (Sonsuz Hazırlık)',
        sublabel: 'Sürekli kurs alır, kitap okur, "mükemmel zamanı" beklerim.',
        icon: 'BookOpen'
      }
    ]
  },
  {
    id: 'delay_time',
    step: 5,
    category: 'Erteleme Skoru',
    title: 'Kafandaki o "büyük adımı" (veya ertelediğin kararı) ne zamandır bekletiyorsun?',
    subtitle: 'Her ertelenen gün, konfor alanının etrafına yeni bir duvar örer.',
    type: 'select',
    options: [
      {
        id: '1_3_months',
        label: 'Son 1 - 3 aydır aklımda',
        sublabel: 'Fikir henüz yeni, araştırma evresindeyim.',
        icon: 'Clock1'
      },
      {
        id: '6_12_months',
        label: 'Yaklaşık 6 aydır - 1 yıldır',
        sublabel: 'Neredeyse her hafta düşünüyorum ama tetikleyici bulamıyorum.',
        icon: 'Clock6'
      },
      {
        id: '2_years_plus',
        label: '2 yıldan uzun süredir (Kronik Erteleme)',
        sublabel: 'Bu fikir beynimin arkasında paslanıyor ve vicdan azabı yaratıyor.',
        icon: 'AlertTriangle'
      },
      {
        id: 'always',
        label: 'Kendimi bildim bileli erteliyorum',
        sublabel: 'Hayalimin ne olduğunu biliyorum ama başlamaya hiç cesaret edemedim.',
        icon: 'Skull'
      }
    ]
  },
  {
    id: 'radical_pivot',
    step: 6,
    category: 'Paralel Evren (Multiverse)',
    title: 'Eğer başarısızlık ihtimali sıfır olsaydı, önümüzdeki 30 gün içinde alacağın radikal hamle ne olurdu?',
    subtitle: 'Simülatör bu cevabı "B Planı / Paralel Zaman Çizgisi" olarak işleyecek.',
    type: 'text-select',
    options: [
      {
        id: 'quit_and_build',
        label: 'İstifa edip kendi dijital işimi / girişimimi başlatmak',
        sublabel: 'Mevcut güvenceyi bırakıp kendi ürettiğim değerden kazanmak.',
        icon: 'Rocket'
      },
      {
        id: 'relocate_abroad',
        label: 'Bavulumu toplayıp yurtdışında / farklı bir şehirde yeni hayata başlamak',
        sublabel: 'Tanıdık çevreden kopup tamamen sıfırdan bir network kurmak.',
        icon: 'Plane'
      },
      {
        id: 'radical_focus',
        label: 'Tüm yan uğraşları bırakıp tek bir alanda uzmanlaşarak 10x kazanmak',
        sublabel: 'Dağınık ilgileri kesip tek bir beceride acımasız disiplin.',
        icon: 'Target'
      },
      {
        id: 'cut_toxic_ties',
        label: 'Beni geriye çeken ilişkiyi/arkadaş çevresini tamamen bitirmek',
        sublabel: 'Duygusal prangalardan kurtulup sadece geleceğe odaklanmak.',
        icon: 'Scissors'
      }
    ],
    placeholder: 'Veya aklındaki radikal hamleyi kendi cümlelerinle yaz...'
  }
];

export const PRESET_PROFILES: { name: string; tag: string; data: UserInput }[] = [
  {
    name: 'Can (28, Yazılım Uzmanı)',
    tag: 'Altın Kelepçe Adayı',
    data: {
      name: 'Can',
      age: 28,
      focus: 'corporate_trap',
      riskTolerance: 4,
      biggestFear: 'mediocrity',
      decisionStyle: 'overthinking',
      delayTime: '6_12_months',
      radicalPivot: 'İstifa edip kendi dijital SaaS ürünümü inşa etmek'
    }
  },
  {
    name: 'Selin (26, Pazarlama / Kreatif)',
    tag: 'Tükenmişlik Eşiği',
    data: {
      name: 'Selin',
      age: 26,
      focus: 'burnout_rut',
      riskTolerance: 6,
      biggestFear: 'time_vanish',
      decisionStyle: 'people_pleasing',
      delayTime: '1_3_months',
      radicalPivot: 'Bavulu toplayıp 6 ay Bali veya Lizbon’da freelance çalışmak'
    }
  },
  {
    name: 'Mert (32, Şirket Ortağı / Yönetici)',
    tag: 'Kronik Erteleme Tuzağı',
    data: {
      name: 'Mert',
      age: 32,
      focus: 'startup_pivot',
      riskTolerance: 3,
      biggestFear: 'financial_ruin',
      decisionStyle: 'delayed_calculating',
      delayTime: '2_years_plus',
      radicalPivot: 'Mevcut ortaklığı devredip sıfırdan yapay zeka ajansı kurmak'
    }
  }
];

export const COLD_READING_ARCHETYPES = [
  {
    id: 'golden_handcuffs',
    title: 'Altın Kelepçe Mahkumu',
    tagline: 'Kazanırken İçten İçe Tükenen Potansiyel',
    description:
      'Maaşın, yan hakların veya mevcut düzenin seni aç bırakmıyor ama asla tatmin etmiyor. Rahatlığın lüks bir hapishaneye dönüştü. Önündeki en büyük tehlike batmak değil; vasat ve konforlu bir uyuşukluk içinde 5 yılı sessizce kaybetmek.',
    warningQuote: 'En tehlikeli bağımlılık uyuşturucu değil; düzenli aylık maaş ve vasat bir konfordur.',
    primaryBottleneck: 'Altın Kelepçe Sendromu (Golden Handcuffs)',
    hiddenBlindspot: 'Zihinsel Enerji ve Yaratıcılık Sızıntısı'
  },
  {
    id: 'analysis_paralyzer',
    title: 'Aşırı Düşünce Mimarisi',
    tagline: 'Mükemmel Anı Beklerken Ömrünü Tüketen Zeka',
    description:
      'Zekan ve analiz yeteneğin en büyük savunma mekanizmana dönüştü. Harekete geçmekten o kadar çok korkuyorsun ki, araştırma yapmayı ve kurs almayı "ilerleme" zannediyorsun. Planların kusursuz ama icraatın sıfıra yakın.',
    warningQuote: 'Mükemmel bir plan yarın değil, iyi bir plan bugün icra edilmelidir.',
    primaryBottleneck: 'Analiz Felci & İcraatsızlık Döngüsü',
    hiddenBlindspot: 'Hazırlık Yapmayı İş Bitirmek Zannetme Yanılsaması'
  },
  {
    id: 'chronic_pleaser',
    title: 'Onay Bağımlısı Stratejist',
    tagline: 'Başkalarının Hayalini Yaşayan Görünmez Savaşçı',
    description:
      'Kararlarının çoğunu ailenin, sevgilinin veya çevrenin takdirini kaybetmemek için alıyorsun. Kendi sesini o kadar uzun süre kıstın ki, gerçekten ne istediğini unuttun. 3. yılda derin bir kimlik krizine sürüklenme riskin %80’in üzerinde.',
    warningQuote: 'Herkesi memnun etmeye çalışırsan, sadece kendi hayatını kurban edersin.',
    primaryBottleneck: 'Başkalarının Beklentilerine İpotekli Yaşam',
    hiddenBlindspot: 'Kendi Arzu ve Sınırlarını İfade Edememe'
  },
  {
    id: 'restless_wanderer',
    title: 'Huzursuz Göçebe',
    tagline: 'Sürekli Mekan ve Odak Değiştirerek Kendinden Kaçan',
    description:
      'Sıkılma eşiğin tehlikeli derecede düşük. Zorluklar başladığında derinleşmek yerine rotayı değiştiriyorsun. Birçok konuda fikrin var ama hiçbirinde 10.000 saatlik bileşik getiriye ulaşamıyorsun.',
    warningQuote: 'Derin kazmayan kuyu su vermez; sürekli yer değiştiren tohum meyve tutmaz.',
    primaryBottleneck: 'Maymun İştahlılık ve Yüzeysel Sebat',
    hiddenBlindspot: 'Sıkılmayı Başarısızlık Sanarak Vazgeçme'
  }
];
