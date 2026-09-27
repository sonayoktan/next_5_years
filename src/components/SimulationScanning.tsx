'use client';

import React, { useEffect, useState } from 'react';
import { Cpu, Terminal, ShieldAlert, GitBranch, Sparkles } from 'lucide-react';

const SCAN_STEPS = [
  { text: 'Psikometrik profil ve gizli savunma mekanizmaları taranıyor...', icon: Cpu },
  { text: 'Konfor alanı çürüme katsayısı ve kronik erteleme süresi hesaplanıyor...', icon: ShieldAlert },
  { text: '3. Yıl kritik darboğazı simüle ediliyor: [Altın Kelepçe & Tıkanma Matrisi]...', icon: Terminal },
  { text: 'Paralel Evren Çizgisi B (Radikal Karar) çatallandırılıyor...', icon: GitBranch },
  { text: 'Bento Grid ve Spotify Wrapped formatında kırılma kartı derleniyor...', icon: Sparkles }
];

export const SimulationScanning: React.FC = () => {
  const [currentStep, setCurrentStep] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentStep((prev) => (prev < SCAN_STEPS.length - 1 ? prev + 1 : prev));
    }, 800);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="max-w-xl mx-auto px-4 py-20 text-center">
      {/* Radar Pulse Graphic */}
      <div className="relative w-40 h-40 mx-auto mb-10 flex items-center justify-center">
        <div className="absolute inset-0 rounded-full border-2 border-purple-500/20 animate-ping opacity-60" />
        <div className="absolute inset-2 rounded-full border border-rose-500/30 animate-pulse" />
        <div className="absolute inset-6 rounded-full border border-indigo-500/40" />
        <div className="w-20 h-20 rounded-full bg-gradient-to-tr from-rose-500/20 via-purple-500/30 to-indigo-500/20 backdrop-blur-md border border-white/20 flex items-center justify-center shadow-2xl shadow-purple-500/40">
          <Cpu className="w-10 h-10 text-purple-400 animate-spin" style={{ animationDuration: '6s' }} />
        </div>
      </div>

      <h2 className="text-2xl sm:text-3xl font-black text-white mb-3 tracking-tight">
        Gelecek 5 Yılın Taranıyor...
      </h2>
      <p className="text-neutral-400 text-sm mb-8">
        Yapay zeka motoru önümüzdeki 1825 günün karar zincirlerini simüle ediyor.
      </p>

      {/* Terminal Steps Log */}
      <div className="bg-neutral-950 border border-white/10 rounded-2xl p-5 text-left font-mono text-xs shadow-2xl relative overflow-hidden">
        <div className="flex items-center gap-1.5 pb-3 border-b border-white/10 mb-4 text-neutral-500">
          <div className="w-2.5 h-2.5 rounded-full bg-rose-500/80" />
          <div className="w-2.5 h-2.5 rounded-full bg-amber-500/80" />
          <div className="w-2.5 h-2.5 rounded-full bg-emerald-500/80" />
          <span className="ml-2 text-[10px] text-neutral-400">neural-sim://engine.v1.process</span>
        </div>

        <div className="space-y-3">
          {SCAN_STEPS.map((step, idx) => {
            const isDone = idx < currentStep;
            const isCurrent = idx === currentStep;
            const isPending = idx > currentStep;
            const StepIcon = step.icon;

            return (
              <div
                key={idx}
                className={`flex items-start gap-2.5 transition-all duration-300 ${
                  isDone
                    ? 'text-emerald-400 opacity-90'
                    : isCurrent
                    ? 'text-purple-300 font-semibold scale-[1.01]'
                    : 'text-neutral-600 opacity-40'
                }`}
              >
                <span className="shrink-0 pt-0.5">
                  {isDone ? (
                    '✓'
                  ) : isCurrent ? (
                    <StepIcon className="w-3.5 h-3.5 animate-bounce text-purple-400" />
                  ) : (
                    '•'
                  )}
                </span>
                <span className="leading-relaxed">
                  {step.text}
                  {isCurrent && <span className="inline-block animate-pulse ml-1">_</span>}
                </span>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};
