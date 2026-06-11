import { AlertOctagon, Award, CheckCircle, FileText, Layout, ShieldCheck, Sparkles, TrendingUp } from 'lucide-react';
import { ScreenshotData } from '../data/auditData';

interface DashboardHomeProps {
  data: ScreenshotData[];
  onSelectPage: (id: string) => void;
  onNavigate: (tab: string) => void;
}

export default function DashboardHome({ data, onSelectPage, onNavigate }: DashboardHomeProps) {
  // Calculate average scores
  const getAverage = (key: 'visual' | 'ux' | 'trust' | 'technical') => {
    const total = data.reduce((acc, curr) => acc + curr.heuristicScores[key], 0);
    return Math.round(total / data.length);
  };

  const avgVisual = getAverage('visual');
  const avgUX = getAverage('ux');
  const avgTrust = getAverage('trust');
  const avgTechnical = getAverage('technical');
  const overallScore = Math.round((avgVisual + avgUX + avgTrust + avgTechnical) / 4);

  const getScoreColor = (score: number) => {
    if (score < 40) return 'text-red-500 bg-red-50 border-red-200';
    if (score < 60) return 'text-amber-500 bg-amber-50 border-amber-200';
    return 'text-emerald-500 bg-emerald-50 border-emerald-200';
  };

  const getGrade = (score: number) => {
    if (score >= 90) return { grade: 'A', text: 'Excellent', color: 'text-emerald-600 border-emerald-500 bg-emerald-50' };
    if (score >= 80) return { grade: 'B', text: 'Good Performance', color: 'text-teal-600 border-teal-500 bg-teal-50' };
    if (score >= 70) return { grade: 'C', text: 'Satisfactory', color: 'text-cyan-600 border-cyan-500 bg-cyan-50' };
    if (score >= 50) return { grade: 'D', text: 'Friction-Heavy / Legacy', color: 'text-amber-600 border-amber-500 bg-amber-50' };
    return { grade: 'F', text: 'Critical Rebuild Needed', color: 'text-red-600 border-red-500 bg-red-50' };
  };

  const gradeInfo = getGrade(overallScore);

  return (
    <div className="space-y-8 animate-fade-in" id="dashboard-home">
      {/* Top Welcome Title Banner in Bento Midnight style */}
      <div className="bg-indigo-950 text-white rounded-2xl p-8 shadow-md relative overflow-hidden border-2 border-slate-900 shadow-[4px_4px_0px_0px_rgba(15,23,42,1)]" id="welcome-banner">
        <div className="absolute right-0 top-0 w-80 h-80 bg-indigo-500/10 rounded-full blur-3xl pointer-events-none"></div>
        <div className="absolute left-1/3 bottom-0 w-60 h-60 bg-teal-500/5 rounded-full blur-3xl pointer-events-none"></div>
        
        <div className="relative z-10 max-w-3xl" id="banner-text">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 bg-indigo-500/30 text-indigo-300 rounded-full text-xs font-bold mb-4 border border-indigo-400/30" id="badge-portfolio">
            <Sparkles className="w-3.5 h-3.5" id="sparkle-icon" /> Academic Audit Portfolio Companion
          </div>
          <h1 className="text-3xl font-black tracking-tight text-white mb-3 font-sans sm:text-4xl" id="banner-title">
            InAmigos Foundation Web Audit Suite
          </h1>
          <p className="text-indigo-200/90 text-sm sm:text-base leading-relaxed mb-6" id="banner-description">
            A meticulous UI/UX assessment and technical performance optimization plan for the 
            <strong> Foundation Website Improvement Analysis</strong> portfolio assignment. Evaluate core friction points and access copy-paste ready documentation built on master heuristic principles.
          </p>
          <div className="flex flex-wrap gap-3" id="banner-actions">
            <button
              onClick={() => onNavigate('report')}
              className="px-5 py-2.5 bg-indigo-600 hover:bg-indigo-700 text-white font-bold rounded-xl shadow-xs transition-transform hover:translate-y-[-1px] flex items-center gap-2 cursor-pointer border border-indigo-500"
              id="cta-report"
            >
              <FileText className="w-4 h-4" /> Copy Complete Report
            </button>
            <button
              onClick={() => onNavigate('pages')}
              className="px-5 py-2.5 bg-slate-900 hover:bg-slate-800 text-slate-100 font-bold rounded-xl border border-slate-700 transition-transform hover:translate-y-[-1px] flex items-center gap-2 cursor-pointer"
              id="cta-pages"
            >
              <Layout className="w-4 h-4" /> Interactive Analysis
            </button>
          </div>
        </div>
      </div>

      {/* Heuristics Bento Scorecard Section */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6" id="statistics-row">
        {/* Core Letter Grade Card: Emphasized with signature Bento outline/shadow */}
        <div className="bg-white rounded-2xl p-6 border-2 border-slate-900 shadow-[4px_4px_0px_0px_rgba(15,23,42,1)] flex flex-col justify-between" id="overall-grade-card">
          <div id="grade-header">
            <span className="text-[10px] font-mono tracking-widest text-indigo-600 font-extrabold uppercase block mb-1">Audit Score Overview</span>
            <p className="text-xs text-slate-500 leading-normal">Aggregated heuristic quality rating of the current operational live environment</p>
          </div>
          
          <div className="my-6 flex items-center gap-5 justify-center" id="grade-numerical-view">
            <div className={`w-24 h-24 rounded-full border-4 flex flex-col items-center justify-center font-bold relative ${gradeInfo.color} border-slate-900`} id="grade-circle">
              <span className="text-4xl leading-none font-sans font-black text-slate-900">{gradeInfo.grade}</span>
              <span className="text-[9px] uppercase font-bold text-slate-600 mt-1">Heuristics</span>
            </div>
            <div className="space-y-1.5" id="grade-text-view">
              <span className="text-xs font-bold text-slate-800 block">Current Status</span>
              <span className="px-2.5 py-1 text-[10.5px] font-bold rounded-lg bg-orange-100 text-orange-800 border border-orange-200 inline-block">
                {overallScore}% (Friction-Heavy)
              </span>
              <p className="text-[11px] text-slate-500 leading-normal">Requires structural UI alignment and domain registration trust improvements.</p>
            </div>
          </div>

          <div className="bg-indigo-50 rounded-xl p-4 border border-indigo-100 flex items-center gap-3" id="grade-footer-metrics">
            <TrendingUp className="w-5 h-5 text-indigo-600 shrink-0" />
            <div id="impact-estimate">
              <p className="text-xs font-bold text-slate-800 font-sans">Estimated Upgrade Potential</p>
              <p className="text-[11px] text-slate-500 font-sans">Proposed modifications target an audit uplift to <strong className="text-indigo-600">A (94/100)</strong>.</p>
            </div>
          </div>
        </div>

        {/* Heuristic Breakdown Slider Metrics */}
        <div className="lg:col-span-2 bg-white rounded-2xl p-6 border border-slate-200/80 shadow-sm space-y-5" id="heuristics-bars-card">
          <div id="heuristics-header">
            <h3 className="text-slate-900 font-extrabold text-lg tracking-tight font-sans">Foundation Audit Performance Metrics</h3>
            <p className="text-xs text-slate-500 font-medium">Detailed heuristic categorization representing core interface trust drivers</p>
          </div>

          <div className="space-y-4" id="heuristics-bars-container">
            {/* Visual Design */}
            <div className="space-y-1.5" id="metric-visual">
              <div className="flex justify-between items-center text-xs">
                <span className="font-bold text-slate-700 flex items-center gap-1.5 font-sans">
                  <Layout className="w-3.5 h-3.5 text-indigo-500" /> Visual Symmetries & Contrast Alignment
                </span>
                <span className="font-bold text-indigo-600"> {avgVisual}% </span>
              </div>
              <div className="w-full bg-slate-100 rounded-full h-2.5 overflow-hidden border border-slate-200">
                <div className="bg-indigo-600 h-2.5 rounded-full" style={{ width: `${avgVisual}%` }}></div>
              </div>
              <p className="text-[10px] text-slate-400 font-mono">Issues: Eye-jarring top bar green, low contrast over children profiles on banner, crop irregularities.</p>
            </div>

            {/* User Experience */}
            <div className="space-y-1.5" id="metric-ux">
              <div className="flex justify-between items-center text-xs">
                <span className="font-bold text-slate-700 flex items-center gap-1.5 font-sans">
                  <AlertOctagon className="w-3.5 h-3.5 text-orange-500" /> UX Architecture & Navigation Clarity
                </span>
                <span className="font-bold text-orange-600"> {avgUX}% </span>
              </div>
              <div className="w-full bg-slate-100 rounded-full h-2.5 overflow-hidden border border-slate-200">
                <div className="bg-orange-500 h-2.5 rounded-full" style={{ width: `${avgUX}%` }}></div>
              </div>
              <p className="text-[10px] text-slate-400 font-mono">Issues: Unlinked card objects, stagnant portrait panels, heavy blocky margins, raw text buttons.</p>
            </div>

            {/* Content & Trust */}
            <div className="space-y-1.5" id="metric-trust">
              <div className="flex justify-between items-center text-xs">
                <span className="font-bold text-slate-700 flex items-center gap-1.5 font-sans">
                  <ShieldCheck className="w-3.5 h-3.5 text-green-600" /> Content Cohesion & Donor Trust Signifiers
                </span>
                <span className="font-bold text-green-700"> {avgTrust}% </span>
              </div>
              <div className="w-full bg-slate-100 rounded-full h-2.5 overflow-hidden border border-slate-200">
                <div className="bg-green-600 h-2.5 rounded-full" style={{ width: `${avgTrust}%` }}></div>
              </div>
              <p className="text-[10px] text-slate-400 font-mono">Issues: Redirecting forms to exterior Google Forms urls, no verification badges, lack of testimonials.</p>
            </div>

            {/* Technical SEO */}
            <div className="space-y-1.5" id="metric-technical">
              <div className="flex justify-between items-center text-xs">
                <span className="font-bold text-slate-700 flex items-center gap-1.5 font-sans">
                  <Award className="w-3.5 h-3.5 text-indigo-500" /> Technical Packaging & Mobile Responsiveness
                </span>
                <span className="font-bold text-indigo-600"> {avgTechnical}% </span>
              </div>
              <div className="w-full bg-slate-100 rounded-full h-2.5 overflow-hidden border border-slate-200">
                <div className="bg-indigo-505 h-2.5 rounded-full" style={{ width: `${avgTechnical}%` }}></div>
              </div>
              <p className="text-[10px] text-slate-400 font-mono">Issues: Raw image formats (.png/.jpg), no structured metadata schemas, basic desktop mobile grids.</p>
            </div>
          </div>
        </div>
      </div>

      {/* Screen Targets Detailed List */}
      <div className="space-y-4" id="individual-screens-audit-list">
        <div>
          <h2 className="text-xl font-extrabold text-slate-900 tracking-tight font-sans">Individual Screen Audits</h2>
          <p className="text-sm text-slate-500 font-medium">Direct analysis pathways mapped from the screenshots submitted</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6" id="screens-grid">
          {data.map((screen) => {
            const screenOverall = Math.round(
              (screen.heuristicScores.visual +
                screen.heuristicScores.ux +
                screen.heuristicScores.trust +
                screen.heuristicScores.technical) / 4
            );
            const scoreColor = getScoreColor(screenOverall);

            return (
              <div
                key={screen.id}
                id={`screen-card-${screen.id}`}
                className="group bg-white rounded-2xl border border-slate-200 p-6 shadow-sm hover:translate-y-[-4px] hover:shadow-md hover:border-slate-800 transition-all duration-300 flex flex-col justify-between"
              >
                <div className="space-y-2.5" id={`screen-desc-${screen.id}`}>
                  <div className="flex justify-between items-start" id={`screen-header-${screen.id}`}>
                    <span className="text-[10px] font-mono tracking-wider font-bold text-indigo-600 uppercase">
                      {screen.url}
                    </span>
                    <span className={`px-2.5 py-1 rounded-full text-xs font-bold border ${scoreColor}`}>
                      Score: {screenOverall}%
                    </span>
                  </div>
                  
                  <h4 className="font-bold text-slate-900 text-lg group-hover:text-indigo-600 transition-colors font-sans">
                    {screen.title}
                  </h4>
                  <p className="text-xs text-slate-500 leading-relaxed font-semibold">
                    {screen.subtitle}
                  </p>
                </div>

                <div className="mt-6 pt-4 border-t border-slate-100 flex justify-between items-center" id={`screen-footer-${screen.id}`}>
                  <div className="text-[10.5px] font-mono text-slate-400" id={`hotspots-count-${screen.id}`}>
                    Located Hotspots: <strong className="text-slate-700">{screen.hotspots.length} points</strong>
                  </div>
                  <button
                    onClick={() => onSelectPage(screen.id)}
                    className="px-4 py-2 bg-slate-100 hover:bg-indigo-600 text-slate-700 hover:text-white border border-slate-200 hover:border-indigo-600 text-xs font-bold rounded-xl transition-all cursor-pointer shadow-xs"
                    id={`btn-explore-${screen.id}`}
                  >
                    Examine Audit & Proposals
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Structured Copy Banner Quick Trigger */}
      <div className="bg-indigo-900 text-white rounded-2xl p-6 border-2 border-slate-900 shadow-[4px_4px_0px_0px_rgba(15,23,42,1)] flex flex-col md:flex-row md:items-center justify-between gap-4" id="quick-copy-alert">
        <div className="space-y-1" id="copy-brief">
          <h4 className="font-extrabold text-white text-base flex items-center gap-1.5 font-sans">
            <CheckCircle className="text-indigo-400 w-5 h-5" /> Fast Document Integration Available
          </h4>
          <p className="text-xs text-indigo-200 leading-normal max-w-2xl font-sans">
            This workspace includes an expert report compiler. Access the <strong>Structured Report Builder</strong> 
            to generate fully structured and compliant analyses for clean copy-pasting directly into Word documents or portfolios.
          </p>
        </div>
        <button
          onClick={() => onNavigate('report')}
          className="px-5 py-2.5 bg-white text-indigo-900 hover:bg-indigo-50 font-bold rounded-xl text-xs shadow-xs transition-transform hover:scale-105 self-start md:self-auto cursor-pointer border-2 border-slate-900"
          id="btn-quick-report"
        >
          Open Report Exporter
        </button>
      </div>
    </div>
  );
}
