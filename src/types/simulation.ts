export type QuestionId = 'focus' | 'risk_tolerance' | 'biggest_fear' | 'decision_style' | 'delay_time' | 'radical_pivot';

export interface UserInput {
  name: string;
  age: number | string;
  focus: string; // Current focus & dilemma
  riskTolerance: number; // 1 - 10
  biggestFear: string; // The fear keeping them awake
  decisionStyle: string; // How they make decisions
  delayTime: string; // How long they have delayed the big step
  radicalPivot: string; // The alternate radical decision
}

export interface TimelineNode {
  year: number;
  phase: string;
  title: string;
  narrative: string;
  warning?: string;
  criticalDecision: string;
  regretScoreImpact: number;
  badge: string;
}

export interface MultiverseTimeline {
  id: 'current_path' | 'radical_path';
  name: string;
  tagline: string;
  themeColor: string;
  regretScore: number; // 0 - 100
  comfortZoneDecay: 'Düşük' | 'Orta' | 'Kritik Seviye';
  bottleneckYear3: string;
  hiddenBlindspot: string;
  summary: string;
  timeline: TimelineNode[];
}

export interface ActionStep {
  timeframe: 'Önümüzdeki 72 Saat' | '90 Gün İçinde' | '12. Ay Dönümünde';
  title: string;
  description: string;
  impact: string;
}

export interface SimulationResultData {
  archetype: {
    title: string;
    description: string;
    tagline: string;
    warningQuote: string;
  };
  metrics: {
    regretIndex: number; // e.g. 74
    comfortDecayRate: number; // e.g. 88
    courageScore: number; // e.g. 45
    potentialWasteRisk: number; // e.g. 82
    primaryBottleneck: string; // e.g. "Altın Kelepçe Sendromu"
    hiddenBlindspot: string; // e.g. "Görünmeyen Zaman Sızıntısı"
    lostHoursPerWeek: number; // e.g. 16
  };
  timelines: {
    current: MultiverseTimeline;
    radical: MultiverseTimeline;
  };
  emergencyProtocol: ActionStep[];
  viralQuotes: string[];
}
