'use client';

import React, { useState } from 'react';
import { X, Check, Lock, Sparkles, BookOpen, Download, ShieldCheck } from 'lucide-react';
import { SimulationResultData, UserInput } from '@/types/simulation';

interface DeepReportModalProps {
  isOpen: boolean;
  onClose: () => void;
  result: SimulationResultData;
  input: UserInput;
}

export const DeepReportModal: React.FC<DeepReportModalProps> = ({
  isOpen,
  onClose,
  result,
  input
}) => {
  const [unlocked, setUnlocked] = useState(false);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md overflow-y-auto">
      <div className="relative w-full max-w-xl bg-neutral-950 border border-white/10 rounded-3xl p-6 sm:p-8 shadow-2xl my-8">
        {/* Header */}
        <div className="flex items-center justify-between pb-4 border-b border-white/10 mb-6">
          <div className="flex items-center gap-2">
            <BookOpen className="w-5 h-5 text-amber-400" />
            <h3 className="font-bold text-white text-base sm:text-lg">
              5 Yıllık Pişmanlık Önleme Eylem Kılavuzu
            </h3>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-lg text-neutral-400 hover:text-white hover:bg-neutral-900 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        <div className="space-y-6">
          <div className="p-4 rounded-2xl bg-amber-500/10 border border-amber-500/20 text-amber-300 text-xs sm:text-sm">
            <span className="font-bold block mb-1">
              Özel Teşhis: {result.archetype.title} İçin Riskten Kaçınma Protokolü
            </span>
            {input.name || 'Gezgin'}, simülasyon sonuçlarına göre 3. yılda karşılaşacağın{' '}
            <strong className="text-white">{result.metrics.primaryBottleneck}</strong> tuzağını
            aşmak için hazırlanan 24 sayfalık derin eylem planı.
          </div>

          {/* Chapters list */}
          <div className="space-y-3">
            <h4 className="text-xs font-semibold text-neutral-400 uppercase tracking-wider">
              Kılavuz İçeriği & Eylem Modülleri:
            </h4>

            <div className="p-3.5 rounded-xl bg-neutral-900/60 border border-white/5 flex items-start gap-3">
              <div className="p-2 rounded-lg bg-purple-500/10 text-purple-400 shrink-0">
                <Check className="w-4 h-4" />
              </div>
              <div>
                <h5 className="text-sm font-semibold text-white">
                  Bölüm 1: Altın Kelepçe & Maaş Bağımlılığı Detoksu
                </h5>
                <p className="text-xs text-neutral-400 mt-0.5">
                  Mevcut yaşam standardını düşürmeden paralel gelir ve güvenlik marjı (runway) inşa etme formülü.
                </p>
              </div>
            </div>

            <div className="p-3.5 rounded-xl bg-neutral-900/60 border border-white/5 flex items-start gap-3">
              <div className="p-2 rounded-lg bg-emerald-500/10 text-emerald-400 shrink-0">
                <Check className="w-4 h-4" />
              </div>
              <div>
                <h5 className="text-sm font-semibold text-white">
                  Bölüm 2: Haftalık {result.metrics.lostHoursPerWeek} Saatlik Zaman Sızıntısını Kapatma
                </h5>
                <p className="text-xs text-neutral-400 mt-0.5">
                  Aşırı analiz ve sahte hazırlık döngüsünü kıran 72 saatlik mikro icraat şablonları.
                </p>
              </div>
            </div>

            <div className="p-3.5 rounded-xl bg-neutral-900/60 border border-white/5 flex items-start gap-3">
              <div className="p-2 rounded-lg bg-rose-500/10 text-rose-400 shrink-0">
                <Check className="w-4 h-4" />
              </div>
              <div>
                <h5 className="text-sm font-semibold text-white">
                  Bölüm 3: Radikal Hamle İçin 90 Günlük Geçiş Yol Haritası
                </h5>
                <p className="text-xs text-neutral-400 mt-0.5">
                  &ldquo;{input.radicalPivot}&rdquo; kararını sıfır panikle hayata geçirecek adım adım risk tamponlama kılavuzu.
                </p>
              </div>
            </div>
          </div>

          {/* Pricing & Unlock Action */}
          <div className="p-4 rounded-2xl bg-neutral-900 border border-white/10 text-center space-y-3">
            <div className="flex items-center justify-center gap-3">
              <span className="text-neutral-500 line-through text-sm">299 TL</span>
              <span className="text-2xl font-black text-white font-mono">149 TL</span>
              <span className="px-2 py-0.5 rounded bg-emerald-500/20 text-emerald-400 text-[10px] font-bold">
                Lansman İndirimi
              </span>
            </div>

            {unlocked ? (
              <div className="p-3 rounded-xl bg-emerald-950/60 border border-emerald-500/40 text-emerald-300 text-xs font-medium flex items-center justify-center gap-2">
                <ShieldCheck className="w-4 h-4" />
                <span>Deneme sürümü simülasyonu: Kılavuz erişimi açıldı! (Demo PDF hazırlanıyor...)</span>
              </div>
            ) : (
              <button
                onClick={() => setUnlocked(true)}
                className="w-full py-3.5 rounded-xl bg-gradient-to-r from-amber-500 via-rose-500 to-purple-600 text-white font-bold text-sm shadow-lg shadow-rose-500/20 hover:shadow-rose-500/40 hover:scale-[1.01] active:scale-[0.99] transition-all flex items-center justify-center gap-2 cursor-pointer"
              >
                <Sparkles className="w-4 h-4" />
                <span>Deneme Sürümünde Kılavuz Önizlemesini Aç (Ücretsiz Demo)</span>
              </button>
            )}

            <div className="text-[11px] text-neutral-500">
              * Bu modül taslak dokümandaki 'Monetizasyon & Freemium Deep Report' vizyonunun çalışan prototipidir.
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
