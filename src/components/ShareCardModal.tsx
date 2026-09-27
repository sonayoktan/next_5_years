'use client';

import React, { useRef, useState } from 'react';
import { toPng } from 'html-to-image';
import confetti from 'canvas-confetti';
import {
  Download,
  Share2,
  X,
  Sparkles,
  Check,
  ShieldAlert,
  Compass,
  Flame,
  GitCompare,
  TrendingDown
} from 'lucide-react';
import { SimulationResultData, UserInput } from '@/types/simulation';

interface ShareCardModalProps {
  isOpen: boolean;
  onClose: () => void;
  result: SimulationResultData;
  input: UserInput;
}

export const ShareCardModal: React.FC<ShareCardModalProps> = ({
  isOpen,
  onClose,
  result,
  input
}) => {
  const cardRef = useRef<HTMLDivElement>(null);
  const [format, setFormat] = useState<'story' | 'square'>('story');
  const [isExporting, setIsExporting] = useState(false);
  const [copied, setCopied] = useState(false);

  if (!isOpen) return null;

  const handleDownload = async () => {
    if (!cardRef.current) return;
    try {
      setIsExporting(true);
      // Trigger festive confetti
      confetti({
        particleCount: 50,
        spread: 60,
        origin: { y: 0.7 }
      });

      const dataUrl = await toPng(cardRef.current, {
        cacheBust: true,
        pixelRatio: 2, // High resolution for crisp stories
        quality: 0.95
      });

      const link = document.createElement('a');
      link.download = `lifepivot-5-years-${input.name || 'simulasyon'}-${format}.png`;
      link.href = dataUrl;
      link.click();
    } catch (err) {
      console.error('Görsel indirme hatası:', err);
    } finally {
      setIsExporting(false);
    }
  };

  const handleCopyText = () => {
    const text = `🧬 5 YILLIK KIRILMA SİMÜLASYONU RAPORUM 🧬
Teşhis: ${result.archetype.title}
⚠️ 3. Yıl Kritik Tuzağım: ${result.metrics.primaryBottleneck}
📊 Pişmanlık Endeksi: %${result.metrics.regretIndex}
🔮 Paralel Rota Riski: %${result.timelines.radical.regretScore}
"En tehlikeli bağımlılık düzenli maaş ve vasat bir konfordur."
Sen de 5 yılını simüle et: lifepivot.ai`;

    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  const nameDisplay = input.name?.trim() || 'Gezgin';
  const ageDisplay = input.age || 27;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md overflow-y-auto">
      <div className="relative w-full max-w-lg bg-neutral-950 border border-white/10 rounded-3xl p-6 sm:p-8 shadow-2xl my-8">
        {/* Header bar */}
        <div className="flex items-center justify-between pb-4 border-b border-white/10 mb-6">
          <div className="flex items-center gap-2">
            <Sparkles className="w-4 h-4 text-rose-400" />
            <h3 className="font-bold text-white text-base">Paylaşılabilir Kırılma Kartı</h3>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-lg text-neutral-400 hover:text-white hover:bg-neutral-900 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Format Selector */}
        <div className="flex items-center justify-center gap-2 mb-6">
          <button
            onClick={() => setFormat('story')}
            className={`px-4 py-1.5 rounded-full text-xs font-semibold border transition-all ${
              format === 'story'
                ? 'bg-purple-600 text-white border-purple-500 shadow-md shadow-purple-500/30'
                : 'bg-neutral-900 text-neutral-400 border-white/5 hover:text-white'
            }`}
          >
            📱 Instagram Story (9:16)
          </button>
          <button
            onClick={() => setFormat('square')}
            className={`px-4 py-1.5 rounded-full text-xs font-semibold border transition-all ${
              format === 'square'
                ? 'bg-purple-600 text-white border-purple-500 shadow-md shadow-purple-500/30'
                : 'bg-neutral-900 text-neutral-400 border-white/5 hover:text-white'
            }`}
          >
            ⏹️ Post / Bento Grid (1:1)
          </button>
        </div>

        {/* The Visual Card to be Exported */}
        <div className="flex justify-center mb-6 overflow-hidden">
          <div
            ref={cardRef}
            className={`w-full bg-neutral-950 border border-white/15 text-white flex flex-col justify-between relative overflow-hidden select-none shadow-2xl ${
              format === 'story'
                ? 'aspect-[9/16] p-6 max-w-[340px] rounded-3xl'
                : 'aspect-square p-6 max-w-[360px] rounded-2xl'
            }`}
            style={{
              backgroundImage:
                'radial-gradient(circle at 10% 20%, rgba(225, 29, 72, 0.15) 0%, transparent 40%), radial-gradient(circle at 90% 80%, rgba(99, 102, 241, 0.18) 0%, transparent 50%), radial-gradient(circle at 50% 50%, rgba(168, 85, 247, 0.1) 0%, transparent 60%)'
            }}
          >
            {/* Ambient Grid Lines */}
            <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff05_1px,transparent_1px),linear-gradient(to_bottom,#ffffff05_1px,transparent_1px)] bg-[size:24px_24px] pointer-events-none" />

            {/* Top Bar of Card */}
            <div className="relative z-10 flex items-center justify-between border-b border-white/10 pb-3">
              <div className="flex items-center gap-2">
                <Compass className="w-4 h-4 text-rose-400" />
                <span className="font-mono text-[10px] tracking-widest text-neutral-300 font-bold uppercase">
                  LIFEPIVOT // NEXT 5 YEARS
                </span>
              </div>
              <div className="px-2 py-0.5 rounded bg-white/10 text-[9px] font-mono font-semibold text-rose-300 border border-white/10">
                PROFIL: #{ageDisplay}Y
              </div>
            </div>

            {/* Middle Section: Persona & Cold Reading */}
            <div className="relative z-10 my-auto py-2 space-y-3">
              <div className="text-left">
                <span className="text-[10px] font-mono uppercase tracking-wider text-rose-400 font-semibold block mb-1">
                  Kişiselleştirilmiş Teşhis
                </span>
                <h4 className="text-xl sm:text-2xl font-black text-white leading-tight">
                  {result.archetype.title}
                </h4>
                <p className="text-xs text-purple-300 font-medium mt-0.5">
                  {result.archetype.tagline}
                </p>
              </div>

              {/* Bento Metrics Box */}
              <div className="grid grid-cols-2 gap-2 text-left pt-1">
                <div className="p-2.5 rounded-xl bg-neutral-900/80 border border-rose-500/30">
                  <div className="flex items-center gap-1 text-[9px] font-mono text-neutral-400 mb-0.5">
                    <TrendingDown className="w-3 h-3 text-rose-400" />
                    <span>PİŞMANLIK RİSKİ</span>
                  </div>
                  <div className="text-xl font-black font-mono text-rose-400">
                    %{result.metrics.regretIndex}
                  </div>
                  <div className="text-[9px] text-neutral-400">Mevcut rotada</div>
                </div>

                <div className="p-2.5 rounded-xl bg-neutral-900/80 border border-emerald-500/30">
                  <div className="flex items-center gap-1 text-[9px] font-mono text-neutral-400 mb-0.5">
                    <Flame className="w-3 h-3 text-emerald-400" />
                    <span>PARALEL ÇİZGİ B</span>
                  </div>
                  <div className="text-xl font-black font-mono text-emerald-400">
                    %{result.timelines.radical.regretScore}
                  </div>
                  <div className="text-[9px] text-neutral-400">Radikal hamleyle</div>
                </div>
              </div>

              {/* Bottleneck Spotlight */}
              <div className="p-3 rounded-xl bg-neutral-900/90 border border-white/10 text-left">
                <div className="text-[9px] font-mono text-amber-400 uppercase tracking-wider font-bold mb-1 flex items-center gap-1">
                  <ShieldAlert className="w-3 h-3" />
                  <span>3. Yıl Kritik Darboğazı:</span>
                </div>
                <div className="text-xs font-bold text-white leading-snug">
                  {result.metrics.primaryBottleneck}
                </div>
              </div>

              {/* Chilling Barnum Quote */}
              <div className="text-[10px] italic text-neutral-400 border-l-2 border-purple-500 pl-2.5 py-0.5 text-left">
                &ldquo;{result.archetype.warningQuote}&rdquo;
              </div>
            </div>

            {/* Bottom Bar: Watermark & User Stamp */}
            <div className="relative z-10 pt-3 border-t border-white/10 flex items-center justify-between text-[9px] font-mono text-neutral-400">
              <span className="font-bold text-white">{nameDisplay} • 2026-2031 Simülasyonu</span>
              <span className="text-purple-400">lifepivot.ai</span>
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="grid grid-cols-2 gap-3">
          <button
            onClick={handleDownload}
            disabled={isExporting}
            className="w-full py-3 rounded-xl bg-gradient-to-r from-rose-500 via-purple-600 to-indigo-600 text-white font-semibold text-xs sm:text-sm shadow-lg shadow-purple-500/25 hover:shadow-purple-500/40 hover:scale-[1.01] active:scale-[0.99] transition-all flex items-center justify-center gap-2 cursor-pointer"
          >
            <Download className="w-4 h-4" />
            <span>{isExporting ? 'Görsel Hazırlanıyor...' : 'Görseli İndir (.PNG)'}</span>
          </button>

          <button
            onClick={handleCopyText}
            className="w-full py-3 rounded-xl bg-neutral-900 border border-white/10 text-neutral-300 hover:text-white hover:bg-neutral-800 font-semibold text-xs sm:text-sm transition-all flex items-center justify-center gap-2 cursor-pointer"
          >
            {copied ? (
              <>
                <Check className="w-4 h-4 text-emerald-400" />
                <span className="text-emerald-400">Kopyalandı!</span>
              </>
            ) : (
              <>
                <Share2 className="w-4 h-4 text-purple-400" />
                <span>Metni Kopyala</span>
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  );
};
