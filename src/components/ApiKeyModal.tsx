'use client';

import React, { useState } from 'react';
import { X, Key, ShieldCheck, Cpu, Sparkles, ExternalLink } from 'lucide-react';

interface ApiKeyModalProps {
  isOpen: boolean;
  onClose: () => void;
  apiKey: string;
  onSaveApiKey: (key: string) => void;
}

export const ApiKeyModal: React.FC<ApiKeyModalProps> = ({
  isOpen,
  onClose,
  apiKey,
  onSaveApiKey
}) => {
  const [val, setVal] = useState(apiKey);

  if (!isOpen) return null;

  const handleSave = () => {
    onSaveApiKey(val.trim());
    onClose();
  };

  const handleClear = () => {
    setVal('');
    onSaveApiKey('');
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md">
      <div className="relative w-full max-w-md bg-neutral-950 border border-white/10 rounded-3xl p-6 sm:p-8 shadow-2xl">
        <div className="flex items-center justify-between pb-4 border-b border-white/10 mb-6">
          <div className="flex items-center gap-2">
            <Key className="w-5 h-5 text-purple-400" />
            <h3 className="font-bold text-white text-base">Yapay Zeka (AI) Motoru Ayarı</h3>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-lg text-neutral-400 hover:text-white hover:bg-neutral-900 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="space-y-4">
          <p className="text-xs text-neutral-400 leading-relaxed">
            Bu simülatör varsayılan olarak dahili <strong>yüksek hassasiyetli psikometrik kurallar motoruyla</strong> sıfır kurulumla %100 çalışır. Dilerseniz kendi <strong>Google Gemini API</strong> anahtarınızı girerek sonuçların doğrudan büyük dil modeli tarafından gerçek zamanlı üretilmesini sağlayabilirsiniz.
          </p>

          <div>
            <label className="block text-xs font-semibold text-neutral-300 uppercase tracking-wider mb-2">
              Gemini API Anahtarı (Opsiyonel)
            </label>
            <input
              type="password"
              value={val}
              onChange={(e) => setVal(e.target.value)}
              placeholder="AIzaSy..."
              className="w-full px-4 py-3 rounded-xl bg-neutral-900 border border-white/10 text-white placeholder-neutral-600 focus:outline-none focus:border-purple-500 font-mono text-xs transition-colors"
            />
          </div>

          <div className="flex items-center justify-between text-[11px] text-neutral-400">
            <a
              href="https://aistudio.google.com/app/apikey"
              target="_blank"
              rel="noreferrer"
              className="text-purple-400 hover:underline flex items-center gap-1"
            >
              <span>Ücretsiz API anahtarı al</span>
              <ExternalLink className="w-3 h-3" />
            </a>
            <span>Anahtarınız yalnızca tarayıcınızda tutulur.</span>
          </div>

          <div className="grid grid-cols-2 gap-3 pt-4 border-t border-white/10">
            {apiKey ? (
              <button
                onClick={handleClear}
                className="py-2.5 rounded-xl border border-rose-500/20 text-rose-400 hover:bg-rose-500/10 text-xs font-semibold transition-colors cursor-pointer"
              >
                Anahtarı Kaldır
              </button>
            ) : (
              <button
                onClick={onClose}
                className="py-2.5 rounded-xl border border-white/10 text-neutral-400 hover:text-white hover:bg-neutral-900 text-xs font-semibold transition-colors cursor-pointer"
              >
                Vazgeç
              </button>
            )}

            <button
              onClick={handleSave}
              className="py-2.5 rounded-xl bg-purple-600 hover:bg-purple-500 text-white font-semibold text-xs transition-colors cursor-pointer"
            >
              Kaydet
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
