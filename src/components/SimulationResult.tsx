'use client';

import React, { useState } from 'react';
import {
  Compass,
  GitFork,
  ShieldAlert,
  Flame,
  Clock,
  Sparkles,
  Share2,
  BookOpen,
  ArrowRight,
  TrendingDown,
  RotateCcw,
  AlertTriangle,
  CheckCircle,
  Eye,
  Sliders,
  Download
} from 'lucide-react';
import { SimulationResultData, UserInput } from '@/types/simulation';

interface SimulationResultProps {
  result: SimulationResultData;
  input: UserInput;
  onOpenShareModal: () => void;
  onOpenDeepReportModal: () => void;
  onReset: () => void;
}

export const SimulationResult: React.FC<SimulationResultProps> = ({
  result,
  input,
  onOpenShareModal,
  onOpenDeepReportModal,
  onReset
}) => {
  const [activeTimeline, setActiveTimeline] = useState<'current' | 'radical'>('current');
  const [viewMode, setViewMode] = useState<'tab' | 'compare'>('tab');

  const selectedTimelineData =
    activeTimeline === 'current' ? result.timelines.current : result.timelines.radical;

  const nameDisplay = input.name?.trim() || 'Gezgin';

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 py-10 space-y-12">
      {/* 1. Header Archetype & Cold Reading Banner */}
      <div className="relative overflow-hidden rounded-3xl bg-neutral-950 border border-white/10 p-6 sm:p-10 shadow-2xl">
        <div className="absolute top-0 right-0 w-96 h-96 bg-gradient-to-bl from-rose-500/15 via-purple-600/15 to-transparent blur-3xl pointer-events-none -z-10" />

        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-6">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-rose-500/10 border border-rose-500/20 text-rose-400 text-xs font-mono font-semibold">
            <ShieldAlert className="w-3.5 h-3.5" />
            <span>Kişiselleştirilmiş 5 Yıllık Kırılma Raporu</span>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={onOpenShareModal}
              className="px-4 py-2 rounded-xl bg-purple-600 hover:bg-purple-500 text-white font-semibold text-xs transition-all flex items-center gap-2 shadow-lg shadow-purple-600/25 cursor-pointer"
            >
              <Share2 className="w-3.5 h-3.5" />
              <span>Story Kartını Üret</span>
            </button>
            <button
              onClick={onReset}
              className="p-2 rounded-xl bg-neutral-900 border border-white/10 text-neutral-400 hover:text-white transition-colors cursor-pointer"
              title="Yeni Simülasyon"
            >
              <RotateCcw className="w-4 h-4" />
            </button>
          </div>
        </div>

        <div className="space-y-4">
          <div className="text-neutral-400 text-xs font-mono uppercase tracking-wider">
            {nameDisplay} ({input.age || 27} Yaş) İçin Karakter Teşhisi:
          </div>
          <h1 className="text-3xl sm:text-5xl font-black text-white tracking-tight leading-tight">
            {result.archetype.title}
          </h1>
          <p className="text-base sm:text-lg text-purple-300 font-medium">
            {result.archetype.tagline}
          </p>
          <p className="text-sm sm:text-base text-neutral-300 leading-relaxed max-w-3xl">
            {result.archetype.description}
          </p>

          <blockquote className="mt-4 p-4 rounded-xl bg-neutral-900/70 border-l-4 border-rose-500 text-xs sm:text-sm italic text-neutral-300">
            &ldquo;{result.archetype.warningQuote}&rdquo;
          </blockquote>
        </div>
      </div>

      {/* 2. Critical Metrics Bento Grid */}
      <div>
        <div className="flex items-center gap-2 mb-4">
          <Sparkles className="w-4 h-4 text-purple-400" />
          <h2 className="text-lg font-bold text-white tracking-tight">Kritik Risk Metrikleri</h2>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {/* Pişmanlık Endeksi */}
          <div className="p-5 rounded-2xl bg-neutral-950 border border-rose-500/30 flex flex-col justify-between">
            <div className="flex items-center justify-between text-neutral-400 text-xs mb-3">
              <span className="font-mono">PİŞMANLIK ENDEKSİ</span>
              <TrendingDown className="w-4 h-4 text-rose-400" />
            </div>
            <div className="text-4xl font-black font-mono text-rose-400 mb-2">
              %{result.metrics.regretIndex}
            </div>
            <div className="w-full bg-neutral-900 rounded-full h-2 overflow-hidden mb-2">
              <div
                className="bg-rose-500 h-full rounded-full"
                style={{ width: `${result.metrics.regretIndex}%` }}
              />
            </div>
            <span className="text-[11px] text-neutral-400">
              {result.metrics.regretIndex > 70
                ? 'Kritik Risk Seviyesi (Hemen Müdahale Şart)'
                : 'Yüksek Risk Seviyesi'}
            </span>
          </div>

          {/* Konfor Alanı Çürümesi */}
          <div className="p-5 rounded-2xl bg-neutral-950 border border-amber-500/30 flex flex-col justify-between">
            <div className="flex items-center justify-between text-neutral-400 text-xs mb-3">
              <span className="font-mono">KONFOR ÇÜRÜMESİ</span>
              <ShieldAlert className="w-4 h-4 text-amber-400" />
            </div>
            <div className="text-3xl font-black font-mono text-amber-400 mb-2">
              %{result.metrics.comfortDecayRate}
            </div>
            <div className="w-full bg-neutral-900 rounded-full h-2 overflow-hidden mb-2">
              <div
                className="bg-amber-500 h-full rounded-full"
                style={{ width: `${result.metrics.comfortDecayRate}%` }}
              />
            </div>
            <span className="text-[11px] text-neutral-400">
              Mevcut rutinde paslanma katsayısı
            </span>
          </div>

          {/* 3. Yıl Darboğazı */}
          <div className="p-5 rounded-2xl bg-neutral-950 border border-purple-500/30 flex flex-col justify-between">
            <div className="flex items-center justify-between text-neutral-400 text-xs mb-3">
              <span className="font-mono">3. YIL TUZAĞI</span>
              <AlertTriangle className="w-4 h-4 text-purple-400" />
            </div>
            <div className="text-base font-bold text-white mb-2 leading-snug">
              {result.metrics.primaryBottleneck}
            </div>
            <span className="text-[11px] text-purple-300">
              36. ayda karşına dikilecek en büyük psikolojik duvar
            </span>
          </div>

          {/* Gizli Kör Nokta & Zaman Kaybı */}
          <div className="p-5 rounded-2xl bg-neutral-950 border border-indigo-500/30 flex flex-col justify-between">
            <div className="flex items-center justify-between text-neutral-400 text-xs mb-3">
              <span className="font-mono">GİZLİ KÖR NOKTA</span>
              <Clock className="w-4 h-4 text-indigo-400" />
            </div>
            <div className="text-sm font-bold text-white mb-1">
              {result.metrics.hiddenBlindspot}
            </div>
            <div className="text-xs text-rose-400 font-semibold mb-1">
              ~{result.metrics.lostHoursPerWeek} Saat / Hafta
            </div>
            <span className="text-[11px] text-neutral-400">
              Erteleme & aşırı analize harcanan zihinsel enerji
            </span>
          </div>
        </div>
      </div>

      {/* 3. Multiverse Parallel Timelines */}
      <div className="space-y-6">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <GitFork className="w-5 h-5 text-indigo-400" />
            <div>
              <h2 className="text-xl font-bold text-white tracking-tight">
                Multiverse: Çift Zaman Çizgisi Simülasyonu
              </h2>
              <p className="text-xs text-neutral-400">
                Mevcut rotayı korumakla o radikal kararı almak arasındaki 5 yıllık uçurum.
              </p>
            </div>
          </div>

          {/* Timeline Switcher Tabs */}
          <div className="flex items-center gap-1.5 p-1 rounded-xl bg-neutral-900 border border-white/10 text-xs">
            <button
              onClick={() => setActiveTimeline('current')}
              className={`px-3 py-1.5 rounded-lg font-semibold transition-all cursor-pointer ${
                activeTimeline === 'current'
                  ? 'bg-rose-500/20 text-rose-300 border border-rose-500/30 shadow'
                  : 'text-neutral-400 hover:text-white'
              }`}
            >
              🛑 Çizgi A: Mevcut Rota
            </button>
            <button
              onClick={() => setActiveTimeline('radical')}
              className={`px-3 py-1.5 rounded-lg font-semibold transition-all cursor-pointer ${
                activeTimeline === 'radical'
                  ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 shadow'
                  : 'text-neutral-400 hover:text-white'
              }`}
            >
              🚀 Çizgi B: Radikal Hamle
            </button>
          </div>
        </div>

        {/* Selected Timeline Card */}
        <div
          className={`p-6 sm:p-8 rounded-3xl border transition-all ${
            activeTimeline === 'current'
              ? 'bg-rose-950/10 border-rose-500/30'
              : 'bg-emerald-950/10 border-emerald-500/30'
          }`}
        >
          {/* Timeline Header Info */}
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 pb-6 border-b border-white/10 mb-8">
            <div>
              <span
                className={`text-xs font-mono font-bold uppercase tracking-wider px-2.5 py-1 rounded border inline-block mb-2 ${
                  activeTimeline === 'current'
                    ? 'bg-rose-500/10 border-rose-500/20 text-rose-400'
                    : 'bg-emerald-500/10 border-emerald-500/20 text-emerald-400'
                }`}
              >
                {selectedTimelineData.name}
              </span>
              <h3 className="text-xl sm:text-2xl font-black text-white">
                {selectedTimelineData.tagline}
              </h3>
              <p className="text-xs sm:text-sm text-neutral-300 mt-1 max-w-2xl">
                {selectedTimelineData.summary}
              </p>
            </div>

            <div className="text-right shrink-0">
              <span className="text-[11px] font-mono text-neutral-400 block mb-1">
                BU ROTADA PİŞMANLIK
              </span>
              <span
                className={`text-3xl font-black font-mono ${
                  activeTimeline === 'current' ? 'text-rose-400' : 'text-emerald-400'
                }`}
              >
                %{selectedTimelineData.regretScore}
              </span>
            </div>
          </div>

          {/* Timeline Nodes */}
          <div className="space-y-6 relative before:absolute before:inset-0 before:left-4 before:w-0.5 before:bg-white/10 before:hidden sm:before:block">
            {selectedTimelineData.timeline.map((node) => (
              <div
                key={node.year}
                className="relative flex flex-col sm:flex-row items-start gap-4 sm:pl-10"
              >
                {/* Year Marker */}
                <div
                  className={`w-8 h-8 rounded-full border flex items-center justify-center text-xs font-black font-mono shrink-0 z-10 ${
                    activeTimeline === 'current'
                      ? 'bg-neutral-900 border-rose-500 text-rose-400 shadow-md shadow-rose-500/20'
                      : 'bg-neutral-900 border-emerald-500 text-emerald-400 shadow-md shadow-emerald-500/20'
                  }`}
                >
                  Y{node.year}
                </div>

                {/* Node Box */}
                <div className="flex-1 p-5 rounded-2xl bg-neutral-950/80 border border-white/10 hover:border-white/20 transition-all">
                  <div className="flex flex-wrap items-center justify-between gap-2 mb-2">
                    <div className="flex items-center gap-2">
                      <span className="text-xs font-bold font-mono text-purple-400 uppercase">
                        {node.phase}
                      </span>
                      <span className="text-neutral-500 text-xs">•</span>
                      <h4 className="text-base font-bold text-white">{node.title}</h4>
                    </div>

                    <span
                      className={`text-[10px] font-mono font-bold px-2 py-0.5 rounded border ${
                        node.regretScoreImpact > 0
                          ? 'bg-rose-500/10 border-rose-500/20 text-rose-400'
                          : 'bg-emerald-500/10 border-emerald-500/20 text-emerald-400'
                      }`}
                    >
                      {node.badge}
                    </span>
                  </div>

                  <p className="text-xs sm:text-sm text-neutral-300 leading-relaxed mb-3">
                    {node.narrative}
                  </p>

                  {node.warning && (
                    <div className="p-2.5 rounded-xl bg-neutral-900 border border-white/5 text-[11px] text-neutral-400 flex items-start gap-2">
                      <ShieldAlert className="w-3.5 h-3.5 text-amber-400 shrink-0 mt-0.5" />
                      <span>{node.warning}</span>
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* 4. 3-Step Emergency Action Protocol */}
      <div className="p-6 sm:p-8 rounded-3xl bg-neutral-950 border border-white/10 space-y-6">
        <div className="flex items-center gap-2">
          <CheckCircle className="w-5 h-5 text-emerald-400" />
          <div>
            <h2 className="text-xl font-bold text-white tracking-tight">
              Pişmanlık Önleme Acil Eylem Protokolü
            </h2>
            <p className="text-xs text-neutral-400">
              3. yıldaki kırılma tuzağına düşmemek için derhal başlatılması gereken 3 hamle.
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {result.emergencyProtocol.map((step, idx) => (
            <div
              key={idx}
              className="p-5 rounded-2xl bg-neutral-900/60 border border-white/5 flex flex-col justify-between"
            >
              <div>
                <span className="text-[10px] font-mono uppercase font-bold text-purple-400 px-2 py-0.5 rounded bg-purple-500/10 border border-purple-500/20 inline-block mb-3">
                  {step.timeframe}
                </span>
                <h4 className="text-sm font-bold text-white mb-2">{step.title}</h4>
                <p className="text-xs text-neutral-400 leading-relaxed mb-4">
                  {step.description}
                </p>
              </div>

              <div className="text-[11px] text-emerald-400/90 font-medium pt-3 border-t border-white/5">
                ⚡ Etki: {step.impact}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* 5. Bottom Action Bar & Monetization Teaser */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-4 p-6 rounded-2xl bg-gradient-to-r from-purple-950/40 via-neutral-900 to-indigo-950/40 border border-white/10">
        <div>
          <h3 className="text-base font-bold text-white mb-1">
            Görsel Raporunu Sosyal Medyada Paylaş
          </h3>
          <p className="text-xs text-neutral-400">
            Instagram Story (9:16) veya Bento Grid (1:1) formatında tek tıkla indir.
          </p>
        </div>

        <div className="flex items-center gap-3 w-full sm:w-auto">
          <button
            onClick={onOpenDeepReportModal}
            className="flex-1 sm:flex-none px-4 py-2.5 rounded-xl border border-emerald-500/30 bg-emerald-500/10 hover:bg-emerald-500/20 text-emerald-300 font-semibold text-xs transition-colors flex items-center justify-center gap-2 cursor-pointer"
          >
            <Download className="w-4 h-4 text-emerald-400" />
            <span>Ücretsiz Kılavuzu İndir (PDF)</span>
          </button>

          <button
            onClick={onOpenShareModal}
            className="flex-1 sm:flex-none px-5 py-2.5 rounded-xl bg-gradient-to-r from-rose-500 via-purple-600 to-indigo-600 text-white font-semibold text-xs shadow-lg shadow-purple-500/25 hover:shadow-purple-500/40 transition-all flex items-center justify-center gap-2 cursor-pointer"
          >
            <Share2 className="w-4 h-4" />
            <span>Kartı İndir</span>
          </button>
        </div>
      </div>
    </div>
  );
};
