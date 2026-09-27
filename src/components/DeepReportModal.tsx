'use client';

import React, { useRef, useState } from 'react';
import {
  X,
  Check,
  Sparkles,
  BookOpen,
  Download,
  ShieldCheck,
  Eye,
  Gift,
  FileCheck
} from 'lucide-react';
import confetti from 'canvas-confetti';
import { SimulationResultData, UserInput } from '@/types/simulation';
import { PdfReportTemplate } from '@/components/PdfReportTemplate';
import { exportGuideToPdf } from '@/lib/pdf-generator';

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
  const [isExporting, setIsExporting] = useState(false);
  const [downloadSuccess, setDownloadSuccess] = useState(false);
  const [showLivePreview, setShowLivePreview] = useState(false);
  const pdfTemplateRef = useRef<HTMLDivElement>(null);

  if (!isOpen) return null;

  const handleDownloadPdf = async () => {
    if (!pdfTemplateRef.current) return;
    try {
      setIsExporting(true);
      setDownloadSuccess(false);

      const fileName = `LifePivot-5-Yillik-Eylem-Kilavuzu-${(input.name || 'Danisan').replace(/\s+/g, '_')}.pdf`;
      await exportGuideToPdf(pdfTemplateRef.current, fileName);

      confetti({
        particleCount: 70,
        spread: 70,
        origin: { y: 0.6 }
      });

      setDownloadSuccess(true);
    } catch (err) {
      console.error('PDF oluşturma hatası:', err);
    } finally {
      setIsExporting(false);
    }
  };

  const nameDisplay = input.name?.trim() || 'Gezgin';

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md overflow-y-auto">
      <div className="relative w-full max-w-2xl bg-neutral-950 border border-white/10 rounded-3xl p-6 sm:p-8 shadow-2xl my-8">
        {/* Header */}
        <div className="flex items-center justify-between pb-4 border-b border-white/10 mb-6">
          <div className="flex items-center gap-2">
            <div className="p-2 rounded-xl bg-amber-500/10 text-amber-400 border border-amber-500/20">
              <BookOpen className="w-5 h-5" />
            </div>
            <div>
              <h3 className="font-bold text-white text-base sm:text-lg">
                5 Yıllık Pişmanlık Önleme Eylem Kılavuzu
              </h3>
              <div className="flex items-center gap-2 mt-0.5">
                <span className="inline-flex items-center gap-1 text-[11px] font-semibold text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded border border-emerald-500/20">
                  <Gift className="w-3 h-3" />
                  %100 Ücretsiz Topluluk Sürümü
                </span>
                <span className="text-[11px] text-neutral-400 hidden sm:inline">• 24 Adımlı Tam Belge</span>
              </div>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-lg text-neutral-400 hover:text-white hover:bg-neutral-900 transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        <div className="space-y-6">
          {/* Persona Diagnosis Banner */}
          <div className="p-4 rounded-2xl bg-amber-500/10 border border-amber-500/20 text-amber-300 text-xs sm:text-sm">
            <span className="font-bold block mb-1">
              Özel Teşhis: {result.archetype.title} İçin Riskten Kaçınma Protokolü
            </span>
            {nameDisplay}, simülasyon sonuçlarına göre 3. yılda karşılaşacağın{' '}
            <strong className="text-white">{result.metrics.primaryBottleneck}</strong> tuzağını
            aşmak için hazırlanan derin eylem planı.
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

          {/* 100% Free PDF Action Card (Replacing previous paywall completely!) */}
          <div className="p-5 rounded-2xl bg-gradient-to-b from-neutral-900 via-neutral-900 to-neutral-950 border border-emerald-500/30 text-center space-y-4">
            <div className="flex flex-col items-center justify-center gap-1.5">
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-500/15 border border-emerald-500/30 text-emerald-400 text-xs font-semibold">
                <Sparkles className="w-3.5 h-3.5" />
                <span>Deneme Sürümünde Tamamen Ücretsiz</span>
              </div>
              <h4 className="text-base sm:text-lg font-bold text-white">
                Kişisel Eylem Kılavuzunu PDF Olarak İndir
              </h4>
              <p className="text-xs text-neutral-400 max-w-md">
                Tüm teşhisleri, multiverse zaman çizelgelerini, 72 saatlik eylem adımlarını ve imzalanabilir taahhütnameyi içeren tam belgeyi ücretsiz indirebilirsiniz.
              </p>
            </div>

            {/* Main Action Buttons */}
            <div className="flex flex-col sm:flex-row gap-3 pt-1">
              <button
                onClick={handleDownloadPdf}
                disabled={isExporting}
                className="flex-1 py-3.5 px-6 rounded-xl bg-gradient-to-r from-emerald-500 via-teal-600 to-indigo-600 text-white font-bold text-sm shadow-xl shadow-emerald-500/20 hover:shadow-emerald-500/35 hover:scale-[1.01] active:scale-[0.99] transition-all flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50"
              >
                {isExporting ? (
                  <>
                    <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                    <span>PDF Derleniyor ve İndiriliyor...</span>
                  </>
                ) : downloadSuccess ? (
                  <>
                    <FileCheck className="w-5 h-5 text-white" />
                    <span>PDF Başarıyla İndirildi!</span>
                  </>
                ) : (
                  <>
                    <Download className="w-5 h-5" />
                    <span>Kılavuzu İndir (.PDF)</span>
                  </>
                )}
              </button>

              <button
                onClick={() => setShowLivePreview(!showLivePreview)}
                className="py-3.5 px-4 rounded-xl bg-neutral-900 border border-white/10 hover:border-white/20 text-neutral-300 hover:text-white text-xs font-semibold transition-all flex items-center justify-center gap-2 cursor-pointer"
              >
                <Eye className="w-4 h-4 text-purple-400" />
                <span>{showLivePreview ? 'Önizlemeyi Gizle' : 'Ekranda Oku'}</span>
              </button>
            </div>

            {downloadSuccess && (
              <div className="p-3 rounded-xl bg-emerald-950/60 border border-emerald-500/40 text-emerald-300 text-xs font-medium flex items-center justify-center gap-2">
                <ShieldCheck className="w-4 h-4" />
                <span>Belgeniz bilgisayarınıza kaydedildi. Çıktı alıp masanıza asabilirsiniz!</span>
              </div>
            )}
          </div>

          {/* Collapsible Live Document Viewer */}
          {showLivePreview && (
            <div className="space-y-3 pt-2">
              <div className="flex items-center justify-between text-xs text-neutral-400 font-mono">
                <span>DÖKÜMAN CANLI ÖNİZLEMESİ (A4 FORMATI)</span>
                <span>{nameDisplay}</span>
              </div>
              <div className="max-h-[500px] overflow-y-auto rounded-2xl border border-white/10 p-4 bg-neutral-900/50 flex justify-center">
                <div className="scale-75 origin-top sm:scale-90">
                  <PdfReportTemplate result={result} input={input} />
                </div>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Hidden off-screen PDF Render Container */}
      <div style={{ position: 'fixed', left: '-9999px', top: '0', zIndex: -100 }}>
        <PdfReportTemplate ref={pdfTemplateRef} result={result} input={input} />
      </div>
    </div>
  );
};
