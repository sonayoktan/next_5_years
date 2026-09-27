'use client';

import React from 'react';
import { SimulationResultData, UserInput } from '@/types/simulation';
import {
  Compass,
  ShieldAlert,
  Clock,
  TrendingDown,
  Flame,
  CheckCircle,
  FileText,
  AlertTriangle
} from 'lucide-react';

interface PdfReportTemplateProps {
  result: SimulationResultData;
  input: UserInput;
}

export const PdfReportTemplate = React.forwardRef<HTMLDivElement, PdfReportTemplateProps>(
  ({ result, input }, ref) => {
    const nameDisplay = input.name?.trim() || 'Gezgin';
    const ageDisplay = input.age || 27;
    const simId = `LP-2026-${Math.floor(100000 + Math.random() * 900000)}`;

    return (
      <div
        ref={ref}
        className="w-[794px] text-neutral-900 bg-white font-sans text-xs leading-normal select-none"
        style={{ width: '794px' }} // Standard A4 width at 96 DPI
      >
        {/* ================= PAGE 1: EXECUTIVE DIAGNOSIS ================= */}
        <div className="w-[794px] min-h-[1123px] p-10 flex flex-col justify-between bg-neutral-50 border-b-2 border-neutral-300 relative box-border">
          {/* Header */}
          <div>
            <div className="flex items-center justify-between border-b-2 border-neutral-900 pb-4 mb-6">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-lg bg-neutral-900 text-white flex items-center justify-center font-black">
                  LP
                </div>
                <div>
                  <h1 className="text-base font-black tracking-wider uppercase text-neutral-900">
                    LIFEPIVOT // NEXT 5 YEARS
                  </h1>
                  <span className="text-[10px] text-neutral-500 font-mono tracking-wider">
                    5 YILLIK PİŞMANLIK ÖNLEME & RİSKTEN KAÇINMA EYLEM KILAVUZU
                  </span>
                </div>
              </div>
              <div className="text-right text-[10px] font-mono text-neutral-500">
                <div>REF: {simId}</div>
                <div>TARİH: {new Date().toLocaleDateString('tr-TR')}</div>
              </div>
            </div>

            {/* Profile Bar */}
            <div className="p-4 rounded-xl bg-neutral-900 text-white flex items-center justify-between mb-6 shadow-sm">
              <div>
                <span className="text-[10px] font-mono uppercase tracking-wider text-rose-400 block">
                  DANIŞAN PROFİLİ
                </span>
                <span className="text-lg font-black">{nameDisplay}</span>
                <span className="text-neutral-400 text-xs ml-2">({ageDisplay} Yaş)</span>
              </div>
              <div className="text-right">
                <span className="text-[10px] font-mono uppercase tracking-wider text-purple-400 block">
                  MEVCUT İKİLEM
                </span>
                <span className="text-xs font-semibold text-neutral-200">
                  {input.radicalPivot ? input.radicalPivot.slice(0, 45) + '...' : 'Kariyer & Hayat Kararı'}
                </span>
              </div>
            </div>

            {/* Main Diagnosis Box */}
            <div className="p-6 rounded-xl border border-neutral-300 bg-white mb-6">
              <span className="text-[10px] font-mono font-bold text-rose-600 uppercase tracking-widest block mb-1">
                PSİKOMETRİK KARAKTER TEŞHİSİ
              </span>
              <h2 className="text-2xl font-black text-neutral-900 mb-1">
                {result.archetype.title}
              </h2>
              <p className="text-xs font-bold text-purple-700 mb-3">
                {result.archetype.tagline}
              </p>
              <p className="text-xs text-neutral-700 leading-relaxed mb-4">
                {result.archetype.description}
              </p>

              <div className="p-3 rounded-lg bg-neutral-100 border-l-4 border-neutral-900 italic text-neutral-800 text-[11px]">
                &ldquo;{result.archetype.warningQuote}&rdquo;
              </div>
            </div>

            {/* Key Metrics Grid */}
            <div className="grid grid-cols-4 gap-3 mb-6">
              <div className="p-3 rounded-lg border border-neutral-200 bg-white">
                <span className="text-[9px] font-mono text-neutral-500 uppercase block">
                  PİŞMANLIK ENDEKSİ
                </span>
                <span className="text-2xl font-black text-rose-600 font-mono">
                  %{result.metrics.regretIndex}
                </span>
                <span className="text-[9px] text-neutral-500 block">Mevcut rotada risk</span>
              </div>

              <div className="p-3 rounded-lg border border-neutral-200 bg-white">
                <span className="text-[9px] font-mono text-neutral-500 uppercase block">
                  KONFOR ÇÜRÜMESİ
                </span>
                <span className="text-xl font-black text-amber-600 font-mono">
                  %{result.metrics.comfortDecayRate}
                </span>
                <span className="text-[9px] text-neutral-500 block">Alışkanlık pası</span>
              </div>

              <div className="p-3 rounded-lg border border-neutral-200 bg-white">
                <span className="text-[9px] font-mono text-neutral-500 uppercase block">
                  3. YIL TUZAĞI
                </span>
                <span className="text-xs font-bold text-neutral-900 block leading-tight mt-1">
                  {result.metrics.primaryBottleneck}
                </span>
              </div>

              <div className="p-3 rounded-lg border border-neutral-200 bg-white">
                <span className="text-[9px] font-mono text-neutral-500 uppercase block">
                  ZAMAN SIZINTISI
                </span>
                <span className="text-xl font-black text-indigo-600 font-mono">
                  ~{result.metrics.lostHoursPerWeek}s / hf
                </span>
                <span className="text-[9px] text-neutral-500 block">Erteleme maliyeti</span>
              </div>
            </div>

            {/* Section 1 Deep Dive */}
            <div className="p-5 rounded-xl border border-neutral-200 bg-white">
              <h3 className="text-xs font-black uppercase tracking-wider text-neutral-900 mb-2 flex items-center gap-1.5">
                <span className="w-4 h-4 rounded-full bg-neutral-900 text-white text-[9px] flex items-center justify-center">
                  1
                </span>
                Bölüm 1: 3. Yıl Darboğazını & Altın Kelepçe Sendromunu Aşma Protokolü
              </h3>
              <p className="text-[11px] text-neutral-600 leading-relaxed mb-3">
                Önümüzdeki 36 ay boyunca harcamaların mevcut gelirine kilitlendiğinde, istifa etmek veya kendi işini kurmak kat be kat daha zor hale gelecektir. Bu tuzağa düşmemek için gereken 3 altın kural:
              </p>
              <div className="space-y-2 text-[11px] text-neutral-800">
                <div className="flex items-start gap-2">
                  <span className="font-bold text-rose-600">•</span>
                  <span><strong>Harcama Sabitleme (Lifestyle Creep Koruması):</strong> Maaş veya gelir artışlarını hayat standardına değil, doğrudan 6 aylık acil kaçış fonuna (Runway) yönlendir.</span>
                </div>
                <div className="flex items-start gap-2">
                  <span className="font-bold text-rose-600">•</span>
                  <span><strong>Paralel Proje Disiplini:</strong> Mevcut işi bırakmadan önce haftalık 10 saati yeni yetenek veya prototip üretimine ayır.</span>
                </div>
                <div className="flex items-start gap-2">
                  <span className="font-bold text-rose-600">•</span>
                  <span><strong>Onay Döngüsünü Kır:</strong> Kararlarını ebeveyn veya toplum beklentisine göre değil, 5 yıl sonraki pişmanlık riskine göre filtrele.</span>
                </div>
              </div>
            </div>
          </div>

          {/* Footer */}
          <div className="pt-4 border-t border-neutral-300 flex items-center justify-between text-[10px] text-neutral-400 font-mono">
            <span>LIFEPIVOT REPORT • SAYFA 1 / 2</span>
            <span>GİZLİ & KİŞİYE ÖZEL EYLEM BELGESİ</span>
          </div>
        </div>

        {/* ================= PAGE 2: MULTIVERSE & ACTION ROADMAP ================= */}
        <div className="w-[794px] min-h-[1123px] p-10 flex flex-col justify-between bg-white relative box-border">
          <div>
            {/* Header */}
            <div className="flex items-center justify-between border-b border-neutral-300 pb-3 mb-6">
              <span className="text-[10px] font-mono font-bold text-neutral-500 uppercase">
                LIFEPIVOT // BÖLÜM 2 & 3: PARALEL EVREN & ACİL EYLEM TAKVİMİ
              </span>
              <span className="text-[10px] font-mono text-neutral-400">Danışan: {nameDisplay}</span>
            </div>

            {/* Multiverse Comparison Table */}
            <div className="mb-6">
              <h3 className="text-xs font-black uppercase tracking-wider text-neutral-900 mb-3 flex items-center gap-1.5">
                <span className="w-4 h-4 rounded-full bg-neutral-900 text-white text-[9px] flex items-center justify-center">
                  2
                </span>
                Multiverse: Çizgi A (Mevcut Rota) vs Çizgi B (Radikal Hamle)
              </h3>

              <div className="grid grid-cols-2 gap-3">
                {/* Column A */}
                <div className="p-4 rounded-xl border border-rose-200 bg-rose-50/50">
                  <div className="flex items-center justify-between border-b border-rose-200 pb-2 mb-2">
                    <span className="font-bold text-xs text-rose-800">🛑 Çizgi A: Mevcut Rota</span>
                    <span className="font-mono text-xs font-bold text-rose-600">
                      Pişmanlık: %{result.timelines.current.regretScore}
                    </span>
                  </div>
                  <div className="space-y-2 text-[10px] text-neutral-700">
                    <div>
                      <strong className="text-neutral-900 block">Yıl 1: İçsel Sürtünme</strong>
                      Rutin devam eder, haftalık erteleme ve iç sıkıntısı alışkanlığa dönüşür.
                    </div>
                    <div>
                      <strong className="text-neutral-900 block">Yıl 3 (Kritik Eşik): {result.metrics.primaryBottleneck}</strong>
                      Konfor alanı kilitlenir; risk alma cesareti yarı yarıya azalır.
                    </div>
                    <div>
                      <strong className="text-neutral-900 block">Yıl 5: Kronik Pişmanlık</strong>
                      Vasat güvenliğe alışılır; "keşke o zaman başlasaydım" hissi kalıcılaşır.
                    </div>
                  </div>
                </div>

                {/* Column B */}
                <div className="p-4 rounded-xl border border-emerald-200 bg-emerald-50/50">
                  <div className="flex items-center justify-between border-b border-emerald-200 pb-2 mb-2">
                    <span className="font-bold text-xs text-emerald-800">🚀 Çizgi B: Radikal Hamle</span>
                    <span className="font-mono text-xs font-bold text-emerald-600">
                      Pişmanlık: %{result.timelines.radical.regretScore}
                    </span>
                  </div>
                  <div className="space-y-2 text-[10px] text-neutral-700">
                    <div>
                      <strong className="text-neutral-900 block">Yıl 1: Başlangıç Türbülansı</strong>
                      Bilinmezin şoku ve yüksek öğrenme eğrisi; kendi kaderinin kontrolü.
                    </div>
                    <div>
                      <strong className="text-neutral-900 block">Yıl 3 (Zafer Eşiği): Bileşik Etki</strong>
                      Gelir ve özgüven sıçraması; eski maaş ve statü kısıtları geride kalır.
                    </div>
                    <div>
                      <strong className="text-neutral-900 block">Yıl 5: Tam Otonomi</strong>
                      Geleceğe cesur bir miras; sıfır pişmanlık ve yüksek yaşam tatmini.
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Emergency Action Plan */}
            <div className="mb-6">
              <h3 className="text-xs font-black uppercase tracking-wider text-neutral-900 mb-3 flex items-center gap-1.5">
                <span className="w-4 h-4 rounded-full bg-neutral-900 text-white text-[9px] flex items-center justify-center">
                  3
                </span>
                Pişmanlık Önleme Acil Eylem Takvimi (Uygulama Adımları)
              </h3>

              <div className="space-y-3">
                {result.emergencyProtocol.map((step, idx) => (
                  <div
                    key={idx}
                    className="p-3.5 rounded-xl border border-neutral-200 bg-neutral-50 flex items-start justify-between gap-4"
                  >
                    <div>
                      <div className="flex items-center gap-2 mb-1">
                        <span className="px-2 py-0.5 rounded bg-neutral-900 text-white font-mono text-[9px] font-bold">
                          {step.timeframe}
                        </span>
                        <h4 className="text-xs font-bold text-neutral-900">{step.title}</h4>
                      </div>
                      <p className="text-[11px] text-neutral-600 leading-relaxed">
                        {step.description}
                      </p>
                    </div>
                    <div className="text-right shrink-0">
                      <span className="text-[9px] text-emerald-700 font-semibold font-mono block">
                        ETKİ DEĞERİ
                      </span>
                      <span className="text-[10px] text-neutral-800">{step.impact}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Commitment Contract Module */}
            <div className="p-4 rounded-xl border-2 border-dashed border-neutral-400 bg-neutral-50">
              <div className="flex items-center justify-between mb-2">
                <span className="text-[10px] font-mono font-bold text-neutral-800 uppercase tracking-wider">
                  KENDİME 5 YILLIK CESARET VE SORUMLULUK TAAHHÜTNAMESİ
                </span>
                <span className="text-[9px] text-neutral-500 font-mono">İMZALAYIN VE SAKLAYIN</span>
              </div>
              <p className="text-[10px] text-neutral-600 italic leading-relaxed mb-4">
                &ldquo;Ben, {nameDisplay}, önümüzdeki 5 yıl içinde vasat bir konforun beni çürütmesine izin vermeyeceğimi; 3. yılda Altın Kelepçe tuzağına düşmemek için gereken cesur kararları alacağımı ve bu kılavuzdaki ilk mikro adımı önümüzdeki 72 saat içinde atacağımı taahhüt ederim.&rdquo;
              </p>
              <div className="flex items-center justify-between pt-2 border-t border-neutral-300 text-[10px] text-neutral-700">
                <div>İmza / Tarih: ___________________________</div>
                <div className="font-mono text-[9px] text-neutral-500">Doğrulandı • LifePivot Engine v1</div>
              </div>
            </div>
          </div>

          {/* Footer */}
          <div className="pt-4 border-t border-neutral-300 flex items-center justify-between text-[10px] text-neutral-400 font-mono">
            <span>LIFEPIVOT REPORT • SAYFA 2 / 2</span>
            <span>lifepivot.ai • TÜM HAKLARI SAKLIDIR &copy; 2026</span>
          </div>
        </div>
      </div>
    );
  }
);

PdfReportTemplate.displayName = 'PdfReportTemplate';
