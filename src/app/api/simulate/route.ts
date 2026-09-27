import { NextRequest, NextResponse } from 'next/server';
import { UserInput, SimulationResultData } from '@/types/simulation';
import { runSimulationEngine } from '@/lib/simulation-engine';

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const input: UserInput = body.input;
    const customApiKey: string | undefined = body.apiKey;

    if (!input) {
      return NextResponse.json({ error: 'Geçersiz girdi verisi.' }, { status: 400 });
    }

    const apiKey = customApiKey || process.env.GEMINI_API_KEY;

    // If Gemini API Key is provided, we can optionally enhance the simulation with LLM reasoning!
    if (apiKey) {
      try {
        const prompt = `Sen uzman bir davranış bilimci, kariyer stratejisti ve psikolojik profil uzmanısın.
Kullanıcının 5 yıllık hayat kırılma simülasyonunu çıkaracaksın.

Kullanıcı Profili:
- İsim: ${input.name || 'Gezgin'}
- Yaş: ${input.age || 27}
- Mevcut İkilem/Odak: ${input.focus}
- Risk Alma Eşiği (1-10): ${input.riskTolerance}
- En Büyük Gece Korkusu: ${input.biggestFear}
- Karar Alma Refleksi: ${input.decisionStyle}
- Erteleme Süresi: ${input.delayTime}
- Düşündüğü Radikal Hamle: ${input.radicalPivot}

Gereksinimler:
1. Türkçe yanıt ver.
2. Rahatsız edici derecede nokta atışı, Forer/Barnum etkisi taşıyan ve "Altın Kelepçe Sendromu", "Analiz Felci", "Statü Prangası" gibi spesifik kavramlar kullanan derin psikolojik içgörüler üret.
3. Çıktıyı MUTLAKA geçerli bir JSON olarak ver. JSON formatı aşağıdaki şemaya tam uymalıdır:

{
  "archetype": {
    "title": "string (Örn: Altın Kelepçe Mahkumu)",
    "description": "string (2-3 cümlelik derin psikolojik teşhis)",
    "tagline": "string",
    "warningQuote": "string"
  },
  "metrics": {
    "regretIndex": number (40-98 arası),
    "comfortDecayRate": number (40-98 arası),
    "courageScore": number (10-98 arası),
    "potentialWasteRisk": number (40-98 arası),
    "primaryBottleneck": "string (3. yıl kritik tıkanma noktası)",
    "hiddenBlindspot": "string (Görünmeyen gizli zaaf)",
    "lostHoursPerWeek": number (haftalık boşa harcanan zihinsel saat)
  },
  "timelines": {
    "current": {
      "id": "current_path",
      "name": "Çizgi A: Mevcut Rota (Konforlu Aşınma)",
      "tagline": "string",
      "themeColor": "#ef4444",
      "regretScore": number,
      "comfortZoneDecay": "Kritik Seviye" | "Orta" | "Düşük",
      "bottleneckYear3": "string",
      "hiddenBlindspot": "string",
      "summary": "string",
      "timeline": [
        {
          "year": 1,
          "phase": "string",
          "title": "string",
          "narrative": "string",
          "warning": "string",
          "criticalDecision": "string",
          "regretScoreImpact": 15,
          "badge": "string"
        },
        {
          "year": 3,
          "phase": "KRİTİK KIRILMA NOKTASI",
          "title": "string",
          "narrative": "string",
          "warning": "string",
          "criticalDecision": "string",
          "regretScoreImpact": 35,
          "badge": "string"
        },
        {
          "year": 5,
          "phase": "Vade Sonu",
          "title": "string",
          "narrative": "string",
          "warning": "string",
          "criticalDecision": "string",
          "regretScoreImpact": 45,
          "badge": "string"
        }
      ]
    },
    "radical": {
      "id": "radical_path",
      "name": "Çizgi B: Radikal Hamle (Dönüştürücü Kaos)",
      "tagline": "string",
      "themeColor": "#10b981",
      "regretScore": number,
      "comfortZoneDecay": "Düşük",
      "bottleneckYear3": "string",
      "hiddenBlindspot": "string",
      "summary": "string",
      "timeline": [
        {
          "year": 1,
          "phase": "Bilinmezin Şoku",
          "title": "string",
          "narrative": "string",
          "warning": "string",
          "criticalDecision": "string",
          "regretScoreImpact": -20,
          "badge": "string"
        },
        {
          "year": 3,
          "phase": "DÖNÜM NOKTASI",
          "title": "string",
          "narrative": "string",
          "warning": "string",
          "criticalDecision": "string",
          "regretScoreImpact": -40,
          "badge": "string"
        },
        {
          "year": 5,
          "phase": "Tam Özgürlük",
          "title": "string",
          "narrative": "string",
          "warning": "string",
          "criticalDecision": "string",
          "regretScoreImpact": -60,
          "badge": "string"
        }
      ]
    }
  },
  "emergencyProtocol": [
    {
      "timeframe": "Önümüzdeki 72 Saat",
      "title": "string",
      "description": "string",
      "impact": "string"
    },
    {
      "timeframe": "90 Gün İçinde",
      "title": "string",
      "description": "string",
      "impact": "string"
    },
    {
      "timeframe": "12. Ay Dönümünde",
      "title": "string",
      "description": "string",
      "impact": "string"
    }
  ],
  "viralQuotes": [
    "string",
    "string"
  ]
}

Sadece saf JSON döndür, hiçbir markdown code block (örneğin \`\`\`json) ekleme.`;

        const geminiRes = await fetch(
          `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${apiKey}`,
          {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
              contents: [{ parts: [{ text: prompt }] }],
              generationConfig: {
                responseMimeType: 'application/json',
                temperature: 0.8
              }
            })
          }
        );

        if (geminiRes.ok) {
          const geminiData = await geminiRes.json();
          const rawText = geminiData.candidates?.[0]?.content?.parts?.[0]?.text;
          if (rawText) {
            const cleaned = rawText.replace(/```json/g, '').replace(/```/g, '').trim();
            const parsed = JSON.parse(cleaned) as SimulationResultData;
            return NextResponse.json({ success: true, mode: 'ai-gemini', data: parsed });
          }
        }
      } catch (geminiErr) {
        console.warn('Gemini API call failed, falling back to local simulation engine:', geminiErr);
      }
    }

    // Fallback: Super high-quality deterministic simulation engine
    const result = runSimulationEngine(input);
    return NextResponse.json({
      success: true,
      mode: 'deterministic-engine',
      data: result
    });
  } catch (err: unknown) {
    const error = err as Error;
    console.error('Simulation error:', error);
    return NextResponse.json({ error: error.message || 'Simülasyon motoru hatası.' }, { status: 500 });
  }
}
