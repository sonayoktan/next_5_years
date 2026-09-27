'use client';

import React from 'react';
import { ArrowRight, Flame, GitFork, ShieldAlert, Sparkles, UserCheck, Share2 } from 'lucide-react';
import { PRESET_PROFILES } from '@/lib/constants';
import { UserInput } from '@/types/simulation';

interface HeroProps {
  onStart: () => void;
  onSelectPreset: (preset: UserInput) => void;
}

export const Hero: React.FC<HeroProps> = ({ onStart, onSelectPreset }) => {
  return (
    <section className="relative overflow-hidden pt-12 pb-20 md:pt-20 md:pb-32">
      {/* Background Glows */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[350px] bg-gradient-to-tr from-rose-500/15 via-purple-600/15 to-indigo-500/15 blur-[120px] pointer-events-none -z-10 rounded-full" />
      <div className="absolute top-1/3 left-10 w-72 h-72 bg-rose-500/10 blur-[100px] pointer-events-none -z-10 rounded-full" />
      <div className="absolute top-1/3 right-10 w-72 h-72 bg-indigo-500/10 blur-[100px] pointer-events-none -z-10 rounded-full" />

      <div className="max-w-5xl mx-auto px-4 sm:px-6 text-center">
        {/* Ticker / Live Pill */}
        <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-white/10 bg-neutral-900/60 backdrop-blur-md mb-8 animate-fade-in shadow-inner">
          <span className="flex h-2 w-2 relative">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-rose-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2 w-2 bg-rose-500"></span>
          </span>
          <span className="text-xs font-mono text-neutral-300">
            Simülatör Canlı: Son 24 saatte <strong className="text-white">1,482</strong> kırılma haritası çıkarıldı
          </span>
        </div>

        {/* Main Title */}
        <h1 className="text-4xl sm:text-6xl md:text-7xl font-extrabold tracking-tight text-white mb-6 leading-[1.1]">
          Önümüzdeki 5 Yılın En Büyük{' '}
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-rose-400 via-purple-400 to-indigo-400">
            Kırılma Noktasını
          </span>{' '}
          ve Pişmanlık Riskini Simüle Et.
        </h1>

        {/* Subtitle */}
        <p className="max-w-2xl mx-auto text-base sm:text-lg text-neutral-400 mb-10 leading-relaxed">
          Mevcut rotanda kalırsan 3. yılda hangi tuzağa düşeceksin? O radikal kararı alırsan paralel evrende seni ne bekliyor? 
          Spotify Wrapped & MBTI estetiğinde kişiselleştirilmiş 5 yıllık yol haritan.
        </p>

        {/* CTA Buttons */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-16">
          <button
            onClick={onStart}
            className="w-full sm:w-auto px-8 py-4 rounded-xl bg-gradient-to-r from-rose-500 via-purple-600 to-indigo-600 text-white font-semibold text-base shadow-xl shadow-purple-500/25 hover:shadow-purple-500/40 hover:scale-[1.02] active:scale-[0.98] transition-all flex items-center justify-center gap-2 group cursor-pointer"
          >
            <span>Simülasyonu Başlat (60 Saniye)</span>
            <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
          </button>

          <div className="text-xs text-neutral-500 font-mono sm:hidden">veya hızlı hazır profille dene:</div>
        </div>

        {/* Fast presets pill container */}
        <div className="max-w-2xl mx-auto p-4 rounded-2xl bg-neutral-900/40 border border-white/5 backdrop-blur-sm mb-16">
          <div className="flex items-center justify-center gap-2 text-xs font-semibold text-neutral-400 uppercase tracking-wider mb-3">
            <Sparkles className="w-3.5 h-3.5 text-amber-400" />
            <span>Deneme Sürümü: Tek Tıkla Hazır Senaryoları Test Et</span>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            {PRESET_PROFILES.map((preset) => (
              <button
                key={preset.name}
                onClick={() => onSelectPreset(preset.data)}
                className="p-3 text-left rounded-xl bg-neutral-900/80 border border-white/10 hover:border-purple-500/40 hover:bg-neutral-800/80 transition-all group cursor-pointer"
              >
                <div className="flex items-center justify-between mb-1">
                  <span className="text-xs font-bold text-white group-hover:text-purple-300">
                    {preset.name}
                  </span>
                  <UserCheck className="w-3.5 h-3.5 text-neutral-500 group-hover:text-purple-400" />
                </div>
                <div className="text-[11px] text-rose-400/90 font-medium">
                  {preset.tag}
                </div>
                <div className="text-[10px] text-neutral-400 truncate mt-1">
                  {preset.data.radicalPivot}
                </div>
              </button>
            ))}
          </div>
        </div>

        {/* Core Value Props Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-left">
          <div className="p-6 rounded-2xl bg-neutral-900/40 border border-white/5 hover:border-white/10 transition-colors">
            <div className="w-10 h-10 rounded-xl bg-rose-500/10 border border-rose-500/20 flex items-center justify-center mb-4">
              <ShieldAlert className="w-5 h-5 text-rose-400" />
            </div>
            <h3 className="text-lg font-bold text-white mb-2">3. Yıl Kırılma Teşhisi</h3>
            <p className="text-sm text-neutral-400 leading-relaxed">
              Maaşın artarken öz saygının eridiği "Altın Kelepçe" ve erteleme tuzaklarını rahatsız edici bir netlikle ortaya çıkarır.
            </p>
          </div>

          <div className="p-6 rounded-2xl bg-neutral-900/40 border border-white/5 hover:border-white/10 transition-colors">
            <div className="w-10 h-10 rounded-xl bg-purple-500/10 border border-purple-500/20 flex items-center justify-center mb-4">
              <GitFork className="w-5 h-5 text-purple-400" />
            </div>
            <h3 className="text-lg font-bold text-white mb-2">Multiverse Zaman Çizgisi</h3>
            <p className="text-sm text-neutral-400 leading-relaxed">
              Çizgi A (Mevcut Rota) ile Çizgi B (Radikal Hamle) senaryolarını yan yana koyarak pişmanlık endeksini karşılaştırır.
            </p>
          </div>

          <div className="p-6 rounded-2xl bg-neutral-900/40 border border-white/5 hover:border-white/10 transition-colors">
            <div className="w-10 h-10 rounded-xl bg-indigo-500/10 border border-indigo-500/20 flex items-center justify-center mb-4">
              <Share2 className="w-5 h-5 text-indigo-400" />
            </div>
            <h3 className="text-lg font-bold text-white mb-2">Spotify Wrapped Tarzı Kart</h3>
            <p className="text-sm text-neutral-400 leading-relaxed">
              Instagram Story veya X formatında estetik Bento kartını tek tıkla indirip sosyal medyada veya arkadaş gruplarında paylaş.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};
