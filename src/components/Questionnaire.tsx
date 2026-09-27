'use client';

import React, { useState } from 'react';
import {
  Briefcase,
  Flame,
  Globe,
  Heart,
  BatteryLow,
  EyeOff,
  TrendingDown,
  Hourglass,
  UserX,
  Cpu,
  ShieldAlert,
  Zap,
  BookOpen,
  AlertTriangle,
  Skull,
  Rocket,
  Plane,
  Target,
  Scissors,
  ArrowLeft,
  ArrowRight,
  CheckCircle2,
  Clock
} from 'lucide-react';
import { QUESTIONS } from '@/lib/constants';
import { UserInput } from '@/types/simulation';

interface QuestionnaireProps {
  initialData?: Partial<UserInput>;
  onSubmit: (data: UserInput) => void;
  onCancel: () => void;
}

export const Questionnaire: React.FC<QuestionnaireProps> = ({
  initialData,
  onSubmit,
  onCancel
}) => {
  const [stepIndex, setStepIndex] = useState<number>(0); // 0: Name/Age, 1-6: Questions
  const [input, setInput] = useState<UserInput>({
    name: initialData?.name || '',
    age: initialData?.age || 27,
    focus: initialData?.focus || 'corporate_trap',
    riskTolerance: initialData?.riskTolerance ?? 5,
    biggestFear: initialData?.biggestFear || 'mediocrity',
    decisionStyle: initialData?.decisionStyle || 'overthinking',
    delayTime: initialData?.delayTime || '6_12_months',
    radicalPivot: initialData?.radicalPivot || 'İstifa edip kendi dijital işimi / girişimimi başlatmak'
  });

  const totalSteps = QUESTIONS.length + 1; // 1 (profile) + 6 questions = 7 steps
  const progressPercent = Math.round(((stepIndex + 1) / totalSteps) * 100);

  const getIcon = (iconName?: string) => {
    switch (iconName) {
      case 'Briefcase': return <Briefcase className="w-5 h-5" />;
      case 'Flame': return <Flame className="w-5 h-5" />;
      case 'Globe': return <Globe className="w-5 h-5" />;
      case 'Heart': return <Heart className="w-5 h-5" />;
      case 'BatteryLow': return <BatteryLow className="w-5 h-5" />;
      case 'EyeOff': return <EyeOff className="w-5 h-5" />;
      case 'TrendingDown': return <TrendingDown className="w-5 h-5" />;
      case 'Hourglass': return <Hourglass className="w-5 h-5" />;
      case 'UserX': return <UserX className="w-5 h-5" />;
      case 'Cpu': return <Cpu className="w-5 h-5" />;
      case 'ShieldAlert': return <ShieldAlert className="w-5 h-5" />;
      case 'Zap': return <Zap className="w-5 h-5" />;
      case 'BookOpen': return <BookOpen className="w-5 h-5" />;
      case 'AlertTriangle': return <AlertTriangle className="w-5 h-5" />;
      case 'Skull': return <Skull className="w-5 h-5" />;
      case 'Rocket': return <Rocket className="w-5 h-5" />;
      case 'Plane': return <Plane className="w-5 h-5" />;
      case 'Target': return <Target className="w-5 h-5" />;
      case 'Scissors': return <Scissors className="w-5 h-5" />;
      default: return <Clock className="w-5 h-5" />;
    }
  };

  const handleNext = () => {
    if (stepIndex < totalSteps - 1) {
      setStepIndex((prev) => prev + 1);
    } else {
      onSubmit(input);
    }
  };

  const handleBack = () => {
    if (stepIndex > 0) {
      setStepIndex((prev) => prev - 1);
    } else {
      onCancel();
    }
  };

  const currentQ = stepIndex > 0 ? QUESTIONS[stepIndex - 1] : null;

  return (
    <div className="max-w-2xl mx-auto px-4 sm:px-6 py-10">
      {/* Progress Header */}
      <div className="mb-8">
        <div className="flex items-center justify-between text-xs text-neutral-400 font-mono mb-2">
          <span className="uppercase tracking-wider">
            {stepIndex === 0 ? 'Profil Tanımlama' : `${currentQ?.category || 'Soru'} (${stepIndex}/${QUESTIONS.length})`}
          </span>
          <span className="text-purple-400 font-bold">%{progressPercent}</span>
        </div>
        <div className="w-full h-1.5 bg-neutral-900 rounded-full overflow-hidden border border-white/5">
          <div
            className="h-full bg-gradient-to-r from-rose-500 via-purple-500 to-indigo-500 transition-all duration-300 ease-out"
            style={{ width: `${progressPercent}%` }}
          />
        </div>
      </div>

      {/* Step Content */}
      <div className="bg-neutral-950/70 border border-white/10 rounded-2xl p-6 sm:p-8 backdrop-blur-xl shadow-2xl relative">
        {stepIndex === 0 && (
          <div className="space-y-6 animate-fade-in">
            <div>
              <span className="inline-block px-2.5 py-1 text-xs font-semibold rounded bg-purple-500/10 text-purple-400 border border-purple-500/20 mb-3">
                Adım 0 • Kişiselleştirme
              </span>
              <h2 className="text-2xl sm:text-3xl font-extrabold text-white mb-2">
                Simülasyon Kimin İçin Çalıştırılıyor?
              </h2>
              <p className="text-neutral-400 text-sm">
                Sonuç kartında ve zaman çizgisinde senin adın ve yaş döngün yer alacak.
              </p>
            </div>

            <div className="space-y-4">
              <div>
                <label className="block text-xs font-semibold text-neutral-300 uppercase tracking-wider mb-2">
                  Adın veya Takma Adın
                </label>
                <input
                  type="text"
                  value={input.name}
                  onChange={(e) => setInput({ ...input, name: e.target.value })}
                  placeholder="Örn: Can veya Gezgin"
                  className="w-full px-4 py-3 rounded-xl bg-neutral-900 border border-white/10 text-white placeholder-neutral-500 focus:outline-none focus:border-purple-500 transition-colors font-medium text-sm"
                  autoFocus
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-neutral-300 uppercase tracking-wider mb-2">
                  Şu Anki Yaşın
                </label>
                <input
                  type="number"
                  min={18}
                  max={75}
                  value={input.age}
                  onChange={(e) => setInput({ ...input, age: parseInt(e.target.value, 10) || 27 })}
                  className="w-full px-4 py-3 rounded-xl bg-neutral-900 border border-white/10 text-white placeholder-neutral-500 focus:outline-none focus:border-purple-500 transition-colors font-medium text-sm"
                />
                <span className="text-[11px] text-neutral-500 mt-1 block">
                  3. ve 5. yıl kırılma döngüleri biyolojik ve kariyer eşiklerine göre ayarlanır.
                </span>
              </div>
            </div>
          </div>
        )}

        {stepIndex > 0 && currentQ && (
          <div className="space-y-6 animate-fade-in">
            <div>
              <span className="inline-block px-2.5 py-1 text-xs font-semibold rounded bg-rose-500/10 text-rose-400 border border-rose-500/20 mb-3">
                {currentQ.category}
              </span>
              <h2 className="text-xl sm:text-2xl font-bold text-white mb-2 leading-snug">
                {currentQ.title}
              </h2>
              <p className="text-neutral-400 text-sm">{currentQ.subtitle}</p>
            </div>

            {/* Slider Type Question */}
            {currentQ.type === 'slider' && (
              <div className="py-6 space-y-6">
                <div className="flex items-center justify-between text-sm font-semibold">
                  <span className="text-neutral-400">{currentQ.lowLabel}</span>
                  <span className="text-2xl font-black font-mono text-purple-400">
                    {input.riskTolerance} / 10
                  </span>
                  <span className="text-neutral-400">{currentQ.highLabel}</span>
                </div>

                <div className="relative">
                  <input
                    type="range"
                    min={currentQ.min || 1}
                    max={currentQ.max || 10}
                    value={input.riskTolerance}
                    onChange={(e) =>
                      setInput({ ...input, riskTolerance: parseInt(e.target.value, 10) })
                    }
                    className="w-full h-2 bg-neutral-800 rounded-lg appearance-none cursor-pointer accent-purple-500"
                  />
                </div>

                <div className="p-4 rounded-xl bg-neutral-900/60 border border-white/5 text-xs text-neutral-300">
                  {input.riskTolerance <= 3 ? (
                    <span className="text-amber-400 font-medium">
                      ⚠️ Güvenlik Odaklı: Bilinmeyenden çok çekiniyorsun. En büyük riskin 'Altın Kelepçe' sendromuyla paslanmak.
                    </span>
                  ) : input.riskTolerance <= 7 ? (
                    <span className="text-purple-300 font-medium">
                      ⚖️ Hesaplanmış Risk: Hazırlık yapmayı seviyorsun fakat bazen aşırı analiz harekete geçmeni aylarca geciktirebiliyor.
                    </span>
                  ) : (
                    <span className="text-emerald-400 font-medium">
                      🔥 Yüksek Risk Toleransı: Uçurumdan atlayıp kanat yapmaya meyillisin. En büyük riskin plansız dürtüsel dağılma.
                    </span>
                  )}
                </div>
              </div>
            )}

            {/* Select Options Type Question */}
            {currentQ.type === 'select' && currentQ.options && (
              <div className="space-y-3">
                {currentQ.options.map((opt) => {
                  const currentVal = (input as unknown as Record<string, string>)[currentQ.id];
                  const isSelected = currentVal === opt.id;

                  return (
                    <button
                      key={opt.id}
                      onClick={() => {
                        setInput({ ...input, [currentQ.id]: opt.id });
                      }}
                      className={`w-full p-4 rounded-xl text-left border transition-all flex items-start gap-4 cursor-pointer ${
                        isSelected
                          ? 'bg-purple-950/40 border-purple-500/60 text-white shadow-lg shadow-purple-500/10'
                          : 'bg-neutral-900/60 border-white/5 hover:border-white/20 text-neutral-300 hover:bg-neutral-900'
                      }`}
                    >
                      <div
                        className={`p-2.5 rounded-lg border shrink-0 ${
                          isSelected
                            ? 'bg-purple-500/20 border-purple-400/30 text-purple-300'
                            : 'bg-neutral-800/80 border-white/5 text-neutral-400'
                        }`}
                      >
                        {getIcon(opt.icon)}
                      </div>
                      <div className="flex-1">
                        <div className="flex items-center justify-between">
                          <span className="text-sm font-semibold text-white">{opt.label}</span>
                          {isSelected && (
                            <CheckCircle2 className="w-4 h-4 text-purple-400 shrink-0 ml-2" />
                          )}
                        </div>
                        {opt.sublabel && (
                          <p className="text-xs text-neutral-400 mt-1">{opt.sublabel}</p>
                        )}
                      </div>
                    </button>
                  );
                })}
              </div>
            )}

            {/* Text + Select Options for Radical Pivot */}
            {currentQ.type === 'text-select' && currentQ.options && (
              <div className="space-y-4">
                <div className="space-y-2.5">
                  {currentQ.options.map((opt) => {
                    const isSelected = input.radicalPivot === opt.label;

                    return (
                      <button
                        key={opt.id}
                        onClick={() => {
                          setInput({ ...input, radicalPivot: opt.label });
                        }}
                        className={`w-full p-3.5 rounded-xl text-left border transition-all flex items-start gap-3 cursor-pointer ${
                          isSelected
                            ? 'bg-emerald-950/40 border-emerald-500/60 text-white shadow-lg shadow-emerald-500/10'
                            : 'bg-neutral-900/60 border-white/5 hover:border-white/20 text-neutral-300 hover:bg-neutral-900'
                        }`}
                      >
                        <div
                          className={`p-2 rounded-lg border shrink-0 ${
                            isSelected
                              ? 'bg-emerald-500/20 border-emerald-400/30 text-emerald-300'
                              : 'bg-neutral-800/80 border-white/5 text-neutral-400'
                          }`}
                        >
                          {getIcon(opt.icon)}
                        </div>
                        <div className="flex-1">
                          <div className="flex items-center justify-between">
                            <span className="text-xs sm:text-sm font-semibold text-white">
                              {opt.label}
                            </span>
                            {isSelected && (
                              <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 ml-2" />
                            )}
                          </div>
                          {opt.sublabel && (
                            <p className="text-[11px] text-neutral-400 mt-0.5">{opt.sublabel}</p>
                          )}
                        </div>
                      </button>
                    );
                  })}
                </div>

                <div className="pt-2">
                  <label className="block text-xs font-semibold text-neutral-400 uppercase tracking-wider mb-2">
                    Veya kendi cümlelerinle yaz:
                  </label>
                  <input
                    type="text"
                    value={input.radicalPivot}
                    onChange={(e) => setInput({ ...input, radicalPivot: e.target.value })}
                    placeholder={currentQ.placeholder}
                    className="w-full px-4 py-3 rounded-xl bg-neutral-900 border border-white/10 text-white placeholder-neutral-500 focus:outline-none focus:border-emerald-500 transition-colors text-sm"
                  />
                </div>
              </div>
            )}
          </div>
        )}

        {/* Navigation Buttons */}
        <div className="flex items-center justify-between pt-8 border-t border-white/10 mt-8">
          <button
            onClick={handleBack}
            className="px-4 py-2.5 rounded-xl border border-white/10 text-neutral-400 hover:text-white hover:bg-neutral-900 transition-all text-sm font-medium flex items-center gap-2 cursor-pointer"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>{stepIndex === 0 ? 'İptal' : 'Geri'}</span>
          </button>

          <button
            onClick={handleNext}
            className="px-6 py-2.5 rounded-xl bg-gradient-to-r from-rose-500 via-purple-600 to-indigo-600 text-white font-semibold text-sm shadow-lg shadow-purple-500/20 hover:shadow-purple-500/35 hover:scale-[1.02] active:scale-[0.98] transition-all flex items-center gap-2 cursor-pointer"
          >
            <span>{stepIndex === totalSteps - 1 ? 'Simülasyonu Çalıştır' : 'Devam Et'}</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
};
