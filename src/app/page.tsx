'use client';

import React, { useState } from 'react';
import { Navbar } from '@/components/Navbar';
import { Hero } from '@/components/Hero';
import { Questionnaire } from '@/components/Questionnaire';
import { SimulationScanning } from '@/components/SimulationScanning';
import { SimulationResult } from '@/components/SimulationResult';
import { ShareCardModal } from '@/components/ShareCardModal';
import { DeepReportModal } from '@/components/DeepReportModal';
import { ApiKeyModal } from '@/components/ApiKeyModal';
import { UserInput, SimulationResultData } from '@/types/simulation';
import { runSimulationEngine } from '@/lib/simulation-engine';

type AppState = 'hero' | 'questionnaire' | 'scanning' | 'result';

export default function Home() {
  const [appState, setAppState] = useState<AppState>('hero');
  const [userInput, setUserInput] = useState<UserInput>({
    name: '',
    age: 27,
    focus: 'corporate_trap',
    riskTolerance: 5,
    biggestFear: 'mediocrity',
    decisionStyle: 'overthinking',
    delayTime: '6_12_months',
    radicalPivot: 'İstifa edip kendi dijital işimi / girişimimi başlatmak'
  });
  const [simulationData, setSimulationData] = useState<SimulationResultData | null>(null);

  // Modals state
  const [isShareModalOpen, setIsShareModalOpen] = useState(false);
  const [isDeepReportModalOpen, setIsDeepReportModalOpen] = useState(false);
  const [isApiKeyModalOpen, setIsApiKeyModalOpen] = useState(false);
  const [customApiKey, setCustomApiKey] = useState('');

  // Start simulation with input
  const handleRunSimulation = async (inputToUse: UserInput) => {
    setUserInput(inputToUse);
    setAppState('scanning');

    try {
      // Simulate real neural network calculation time (2.5 seconds minimum for great immersion)
      const minDelayPromise = new Promise((resolve) => setTimeout(resolve, 2500));

      const apiPromise = fetch('/api/simulate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          input: inputToUse,
          apiKey: customApiKey || undefined
        })
      })
        .then((res) => (res.ok ? res.json() : null))
        .catch(() => null);

      const [, apiResponse] = await Promise.all([minDelayPromise, apiPromise]);

      if (apiResponse && apiResponse.success && apiResponse.data) {
        setSimulationData(apiResponse.data);
      } else {
        // Safe and guaranteed local fallback
        const localData = runSimulationEngine(inputToUse);
        setSimulationData(localData);
      }

      setAppState('result');
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } catch (err) {
      console.error('Simulation execution failed:', err);
      const fallbackData = runSimulationEngine(inputToUse);
      setSimulationData(fallbackData);
      setAppState('result');
    }
  };

  // Preset quick selector
  const handleSelectPreset = (presetData: UserInput) => {
    handleRunSimulation(presetData);
  };

  const handleReset = () => {
    setAppState('hero');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen bg-black text-neutral-100 flex flex-col font-sans selection:bg-purple-500 selection:text-white">
      {/* Top Navbar */}
      <Navbar
        onSelectPreset={handleSelectPreset}
        onOpenApiKeyModal={() => setIsApiKeyModalOpen(true)}
        onReset={handleReset}
        hasCustomApiKey={!!customApiKey}
        isSimulating={appState === 'scanning'}
      />

      {/* Main View Router */}
      <main className="flex-1">
        {appState === 'hero' && (
          <Hero
            onStart={() => setAppState('questionnaire')}
            onSelectPreset={handleSelectPreset}
          />
        )}

        {appState === 'questionnaire' && (
          <Questionnaire
            initialData={userInput}
            onSubmit={(data) => handleRunSimulation(data)}
            onCancel={() => setAppState('hero')}
          />
        )}

        {appState === 'scanning' && <SimulationScanning />}

        {appState === 'result' && simulationData && (
          <SimulationResult
            result={simulationData}
            input={userInput}
            onOpenShareModal={() => setIsShareModalOpen(true)}
            onOpenDeepReportModal={() => setIsDeepReportModalOpen(true)}
            onReset={handleReset}
          />
        )}
      </main>

      {/* Footer */}
      <footer className="border-t border-white/10 py-8 bg-neutral-950 text-neutral-500 text-xs">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <span className="font-mono font-bold text-neutral-300">LIFEPIVOT // NEXT 5 YEARS</span>
            <span>•</span>
            <span>Kırılma Noktaları & Pişmanlık Simülatörü v0.9 MVP</span>
          </div>
          <div className="text-neutral-500">
            Kurgusal ve psikometrik analiz amaçlıdır. &copy; 2026 LifePivot.
          </div>
        </div>
      </footer>

      {/* Modals */}
      {simulationData && (
        <>
          <ShareCardModal
            isOpen={isShareModalOpen}
            onClose={() => setIsShareModalOpen(false)}
            result={simulationData}
            input={userInput}
          />

          <DeepReportModal
            isOpen={isDeepReportModalOpen}
            onClose={() => setIsDeepReportModalOpen(false)}
            result={simulationData}
            input={userInput}
          />
        </>
      )}

      <ApiKeyModal
        isOpen={isApiKeyModalOpen}
        onClose={() => setIsApiKeyModalOpen(false)}
        apiKey={customApiKey}
        onSaveApiKey={(key) => setCustomApiKey(key)}
      />
    </div>
  );
}
