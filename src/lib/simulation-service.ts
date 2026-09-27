import { UserInput, SimulationResultData } from '@/types/simulation';
import { runSimulationEngine } from './simulation-engine';

export async function executeSimulation(
  input: UserInput,
  customApiKey?: string
): Promise<SimulationResultData> {
  // 1. If Gemini API Key is provided, call Google AI directly from the client
  if (customApiKey && customApiKey.trim().length > 10) {
    try {
      const prompt = `Sen uzman bir davranış bilimci, kariyer stratejisti ve psikolojik profil uzmanısın.
Kullanıcının 5 yıllık hayat kırılma simülasyonunu çıkaracaksın.

Kullanıcı Profili:
- İsim: ${input.name || 'Gezgin'}
- Yaş: ${input.age || 27}
- Mevcut İkilem: ${input.focus}
- Risk Alma Eşiği (1-10): ${input.riskTolerance}
- En Büyük Gece Korkusu: ${input.biggestFear}
- Karar Refleksi: ${input.decisionStyle}
- Erteleme Süresi: ${input.delayTime}
- Düşündüğü Radikal Hamle: ${input.radicalPivot}

Gereksinimler:
1. Türkçe yanıt ver.
2. Rahatsız edici derecede nokta atışı, Forer/Barnum etkisi taşıyan ve "Altın Kelepçe Sendromu", "Analiz Felci", "Statü Prangası" gibi spesifik kavramlar kullanan derin psikolojik içgörüler üret.
3. Çıktıyı MUTLAKA geçerli bir JSON olarak ver. JSON formatı aşağıdaki şemaya tam uymalıdır:

{
  "archetype": {
    "title": "string (Örn: Altın Kelepçe Mahkumu)",
    "description": "string",
    "tagline": "string",
    "warningQuote": "string"
  },
  "metrics": {
    "regretIndex": number,
    "comfortDecayRate": number,
    "courageScore": number,
    "potentialWasteRisk": number,
    "primaryBottleneck": "string",
    "hiddenBlindspot": "string",
    "lostHoursPerWeek": number
  },
  "timelines": {
    "current": {
      "id": "current_path",
      "name": "Çizgi A: Mevcut Rota (Konforlu Aşınma)",
      "tagline": "string",
      "themeColor": "#ef4444",
      "regretScore": number,
      "comfortZoneDecay": "Kritik Seviye",
      "bottleneckYear3": "string",
      "hiddenBlindspot": "string",
      "summary": "string",
      "timeline": [
        { "year": 1, "phase": "Başlangıç Aşınması", "title": "string", "narrative": "string", "warning": "string", "criticalDecision": "string", "regretScoreImpact": 15, "badge": "string" },
        { "year": 3, "phase": "KRİTİK KIRILMA NOKTASI", "title": "string", "narrative": "string", "warning": "string", "criticalDecision": "string", "regretScoreImpact": 35, "badge": "string" },
        { "year": 5, "phase": "Vade Sonu", "title": "string", "narrative": "string", "warning": "string", "criticalDecision": "string", "regretScoreImpact": 45, "badge": "string" }
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
        { "year": 1, "phase": "Bilinmezin Şoku", "title": "string", "narrative": "string", "warning": "string", "criticalDecision": "string", "regretScoreImpact": -20, "badge": "string" },
        { "year": 3, "phase": "DÖNÜM NOKTASI", "title": "string", "narrative": "string", "warning": "string", "criticalDecision": "string", "regretScoreImpact": -40, "badge": "string" },
        { "year": 5, "phase": "Tam Özgürlük", "title": "string", "narrative": "string", "warning": "string", "criticalDecision": "string", "regretScoreImpact": -60, "badge": "string" }
      ]
    }
  },
  "emergencyProtocol": [
    { "timeframe": "Önümüzdeki 72 Saat", "title": "string", "description": "string", "impact": "string" },
    { "timeframe": "90 Gün İçinde", "title": "string", "description": "string", "impact": "string" },
    { "timeframe": "12. Ay Dönümünde", "title": "string", "description": "string", "impact": "string" }
  ],
  "viralQuotes": ["string", "string"]
}
Sadece saf JSON döndür, hiçbir markdown code block (örneğin \`\`\`json) ekleme.`;

      const response = await fetch(
        `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${customApiKey.trim()}`,
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

      if (response.ok) {
        const data = await response.json();
        const rawText = data.candidates?.[0]?.content?.parts?.[0]?.text;
        if (rawText) {
          const cleaned = rawText.replace(/```json/g, '').replace(/```/g, '').trim();
          return JSON.parse(cleaned) as SimulationResultData;
        }
      }
    } catch (err) {
      console.warn('Direct client-side Gemini API call failed, falling back to local engine:', err);
    }
  }

  // 2. Fallback to client-side deterministic psychometric engine
  return runSimulationEngine(input);
}
