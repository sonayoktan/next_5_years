'use client';

import React from 'react';
import { Compass, Sparkles, Key, RotateCcw, ShieldCheck } from 'lucide-react';
import { PRESET_PROFILES } from '@/lib/constants';
import { UserInput } from '@/types/simulation';

interface NavbarProps {
  onSelectPreset: (preset: UserInput) => void;
  onOpenApiKeyModal: () => void;
  onReset: () => void;
  hasCustomApiKey: boolean;
  isSimulating: boolean;
}

export const Navbar: React.FC<NavbarProps> = ({
  onSelectPreset,
  onOpenApiKeyModal,
  onReset,
  hasCustomApiKey,
  isSimulating
}) => {
  return (
    <header className="sticky top-0 z-40 w-full border-b border-white/10 bg-neutral-950/80 backdrop-blur-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between gap-4">
        {/* Brand */}
        <div
          onClick={onReset}
          className="flex items-center gap-3 cursor-pointer group select-none"
        >
          <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-rose-500 via-purple-600 to-indigo-500 flex items-center justify-center p-0.5 shadow-lg shadow-purple-500/20 group-hover:scale-105 transition-transform">
            <div className="w-full h-full bg-neutral-950 rounded-[10px] flex items-center justify-center">
              <Compass className="w-5 h-5 text-indigo-400 group-hover:rotate-45 transition-transform duration-300" />
            </div>
          </div>
          <div className="flex flex-col">
            <div className="flex items-center gap-2">
              <span className="font-black text-sm tracking-wider uppercase text-white font-mono">
                LifePivot
              </span>
              <span className="px-1.5 py-0.5 text-[10px] font-semibold bg-rose-500/10 text-rose-400 border border-rose-500/20 rounded">
                NEXT 5 YEARS
              </span>
            </div>
            <span className="text-[11px] text-neutral-400 hidden sm:inline">
              Kırılma Noktaları & Pişmanlık Simülatörü
            </span>
          </div>
        </div>

        {/* Quick presets & Actions */}
        <div className="flex items-center gap-2 sm:gap-3">
          {/* Presets dropdown / pill list for fast trial testing */}
          <div className="hidden md:flex items-center gap-1.5 bg-neutral-900/90 border border-white/10 rounded-full px-2 py-1 text-xs text-neutral-400">
            <Sparkles className="w-3.5 h-3.5 text-amber-400 ml-1" />
            <span className="text-[11px] font-medium pr-1 text-neutral-300">Hazır Profil:</span>
            {PRESET_PROFILES.map((preset) => (
              <button
                key={preset.name}
                onClick={() => onSelectPreset(preset.data)}
                disabled={isSimulating}
                className="px-2 py-0.5 rounded-full hover:bg-white/10 hover:text-white transition-colors text-[11px] font-medium text-neutral-300"
                title={`${preset.name} (${preset.tag})`}
              >
                {preset.name.split(' ')[0]}
              </button>
            ))}
          </div>

          {/* API Key Modal Button */}
          <button
            onClick={onOpenApiKeyModal}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium border transition-colors ${
              hasCustomApiKey
                ? 'bg-emerald-950/40 text-emerald-400 border-emerald-500/30 hover:bg-emerald-900/40'
                : 'bg-neutral-900 text-neutral-300 border-white/10 hover:bg-neutral-800 hover:text-white'
            }`}
            title="Google Gemini AI anahtarı ekle veya yerleşik motoru kullan"
          >
            {hasCustomApiKey ? (
              <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
            ) : (
              <Key className="w-3.5 h-3.5 text-neutral-400" />
            )}
            <span className="hidden sm:inline">
              {hasCustomApiKey ? 'Gemini AI Aktif' : 'AI Motoru'}
            </span>
          </button>

          {/* Reset Button */}
          <button
            onClick={onReset}
            className="p-2 rounded-lg bg-neutral-900 text-neutral-400 border border-white/10 hover:text-white hover:bg-neutral-800 transition-colors"
            title="Başa Dön"
          >
            <RotateCcw className="w-4 h-4" />
          </button>
        </div>
      </div>
    </header>
  );
};
