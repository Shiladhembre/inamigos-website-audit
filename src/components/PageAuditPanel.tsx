import { useState } from 'react';
import { ScreenshotData } from '../data/auditData';
import { 
  AlertCircle, 
  ArrowRight, 
  Award, 
  BookOpen, 
  Calendar, 
  Check, 
  Copy, 
  ExternalLink, 
  Eye, 
  HelpCircle, 
  Info, 
  MapPin, 
  Maximize2, 
  RefreshCw, 
  ShieldCheck, 
  User, 
  Users 
} from 'lucide-react';

interface PageAuditPanelProps {
  data: ScreenshotData[];
  selectedId: string;
  onSelectPage: (id: string) => void;
}

export default function PageAuditPanel({ data, selectedId, onSelectPage }: PageAuditPanelProps) {
  const [viewMode, setViewMode] = useState<'before' | 'after'>('before');
  const [activeHotspot, setActiveHotspot] = useState<{
    title: string;
    description: string;
    impact: string;
  } | null>(null);
  const [copyStatus, setCopyStatus] = useState<Record<string, boolean>>({});

  const currentPage = data.find(p => p.id === selectedId) || data[0];

  const handleCopyText = (key: string, text: string) => {
    navigator.clipboard.writeText(text);
    setCopyStatus(prev => ({ ...prev, [key]: true }));
    setTimeout(() => {
      setCopyStatus(prev => ({ ...prev, [key]: false }));
    }, 2000);
  };

  const getImpactBadgeColor = (impact: string) => {
    switch (impact) {
      case 'High': return 'bg-red-50 text-red-700 border-red-200';
      case 'Medium': return 'bg-amber-50 text-amber-700 border-amber-200';
      default: return 'bg-blue-50 text-blue-700 border-blue-200';
    }
  };

  return (
    <div className="space-y-8 animate-fade-in" id="page-audit-panel-root">
      {/* Subpage Header Navigation */}
      <div className="flex flex-wrap items-center justify-between gap-4 border-b border-slate-200 pb-4" id="audit-subnav">
        <div>
          <h2 className="text-xl font-extrabold text-slate-900 tracking-tight font-sans">Focus Page Analysis</h2>
          <p className="text-xs text-slate-500 font-medium">Pick any core screenshot to explore interactive hotspots and tailored design suggestions.</p>
        </div>
        <div className="flex gap-2 bg-slate-100 p-1.5 rounded-2xl border border-slate-200" id="screen-selector-tabs">
          {data.map(p => (
            <button
              key={p.id}
              onClick={() => {
                onSelectPage(p.id);
                setActiveHotspot(null);
              }}
              className={`px-4 py-2 rounded-xl text-xs font-bold whitespace-nowrap cursor-pointer transition-all ${
                p.id === selectedId 
                  ? 'bg-white text-indigo-700 border border-slate-900 shadow-[2px_2px_0px_0px_rgba(15,23,42,1)] font-black' 
                  : 'text-slate-600 hover:text-slate-900 bg-transparent hover:bg-slate-200/50'
              }`}
            >
              Page {p.id.split('-')[1]}
            </button>
          ))}
        </div>
      </div>

      {/* Screen Summary Card */}
      <div className="bg-slate-50 border border-slate-200 rounded-2xl p-6" id="selected-screen-brief">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4" id="screen-brief-header">
          <div className="space-y-1">
            <span className="px-2.5 py-1 text-[10px] font-mono font-bold uppercase tracking-wider bg-slate-200/80 text-slate-600 rounded-md border border-slate-300/30">
              Target URL: {currentPage.url}
            </span>
            <h3 className="text-xl font-extrabold text-slate-800">{currentPage.title}</h3>
            <p className="text-xs text-slate-500 leading-relaxed max-w-2xl">{currentPage.subtitle}</p>
          </div>
          <div className="flex items-center gap-4 bg-white p-3 rounded-xl border border-slate-200 shrink-0" id="screen-grade-meters">
            <div className="text-center" id="visual-mini-score">
              <span className="block text-[10px] font-bold text-slate-400 uppercase tracking-wider">Visual UI</span>
              <span className={`text-md font-bold px-2 py-0.5 rounded-sm bg-neutral-100 ${currentPage.heuristicScores.visual < 50 ? 'text-amber-600' : 'text-emerald-600'}`}>
                {currentPage.heuristicScores.visual}%
              </span>
            </div>
            <div className="w-px h-8 bg-slate-200"></div>
            <div className="text-center" id="ux-mini-score">
              <span className="block text-[10px] font-bold text-slate-400 uppercase tracking-wider">UX Friction</span>
              <span className={`text-md font-bold px-2 py-0.5 rounded-sm bg-neutral-100 ${currentPage.heuristicScores.ux < 50 ? 'text-amber-600' : 'text-emerald-600'}`}>
                {currentPage.heuristicScores.ux}%
              </span>
            </div>
            <div className="w-px h-8 bg-slate-200"></div>
            <div className="text-center" id="trust-mini-score">
              <span className="block text-[10px] font-bold text-slate-400 uppercase tracking-wider">Trust Value</span>
              <span className={`text-md font-bold px-2 py-0.5 rounded-sm bg-neutral-100 ${currentPage.heuristicScores.trust < 50 ? 'text-amber-600' : 'text-emerald-600'}`}>
                {currentPage.heuristicScores.trust}%
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Screen Interactive Playground (Mockup Builder Before vs After) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8" id="interactive-editor-grid">
        {/* Left Column: Visual Mockup Visualizer (7 cols) */}
        <div className="lg:col-span-7 space-y-4" id="visual-simulation-column">
          <div className="flex items-center justify-between" id="view-mode-toggle-bar">
            <span className="text-xs font-bold text-slate-500 uppercase tracking-wider flex items-center gap-1.5">
              <Info className="w-4 h-4 text-emerald-600" /> Interactive UI Visualizer
            </span>
            <div className="bg-slate-100 p-1 rounded-xl border border-slate-200 flex" id="toggle-buttons">
              <button
                onClick={() => {
                  setViewMode('before');
                  setActiveHotspot(null);
                }}
                className={`px-3 py-1 rounded-lg text-xs font-bold flex items-center gap-1 cursor-pointer transition-colors ${
                  viewMode === 'before' 
                    ? 'bg-red-500 text-white shadow-xs' 
                    : 'text-slate-600 hover:text-slate-900'
                }`}
                id="toggle-view-before"
              >
                <AlertCircle className="w-3.5 h-3.5" /> Legacy Web UI
              </button>
              <button
                onClick={() => {
                  setViewMode('after');
                  setActiveHotspot(null);
                }}
                className={`px-3 py-1 rounded-lg text-xs font-bold flex items-center gap-1 cursor-pointer transition-colors ${
                  viewMode === 'after' 
                    ? 'bg-emerald-600 text-white shadow-xs' 
                    : 'text-slate-600 hover:text-slate-900'
                }`}
                id="toggle-view-after"
              >
                <Check className="w-3.5 h-3.5" /> Optimised UI Draft
              </button>
            </div>
          </div>

          {/* Interactive Frame Simulator */}
          <div className="relative border border-slate-350 rounded-2xl bg-slate-900 overflow-hidden shadow-2xl h-[400px] flex flex-col justify-between select-none" id="simulated-browser-frame">
            {/* Fake OS Browser Bar */}
            <div className="bg-slate-800 px-4 py-3 border-b border-slate-700/80 flex items-center justify-between shrink-0" id="fake-os-bar">
              <div className="flex gap-1.5 shrink-0" id="browser-dots">
                <span className="w-3 h-3 rounded-full bg-red-500/80 inline-block"></span>
                <span className="w-3 h-3 rounded-full bg-yellow-500/80 inline-block"></span>
                <span className="w-3 h-3 rounded-full bg-green-500/80 inline-block"></span>
              </div>
              <div className="bg-slate-950 px-4 py-1 rounded-lg text-[11px] font-mono text-slate-400 w-3/5 text-center truncate border border-slate-800/80 flex items-center justify-center gap-1" id="fake-url">
                {viewMode === 'before' ? '⚠️ ' : '🛡️ '} {currentPage.url}
              </div>
              <div className="w-12" id="fake-pad"></div>
            </div>

            {/* Simulated Live View Body Container */}
            <div className="relative w-full h-[348px] bg-white overflow-hidden overflow-y-auto shrink" id="viewport-body">
              {viewMode === 'before' ? (
                /* BEFORE (LEGACY) INTERFACE RECREATION */
                <div className="w-full relative" id="legacy-mockup-body">
                  {/* Screenshot 1 BEFORE Layout */}
                  {currentPage.id === 'screenshot-1' && (
                    <div className="w-full text-slate-800" id="legacy-header-sim">
                      {/* Jarring Neon Top bar */}
                      <div className="bg-[#00E676] text-white px-4 py-1.5 text-[10px] flex items-center justify-between font-medium">
                        <span>✉️ support@inamigosfoundation.org.in</span>
                        <span className="tracking-widest text-[#FFF]/90">FB TW G+ PI IG</span>
                      </div>
                      {/* Nav row */}
                      <div className="px-4 py-2 border-b border-neutral-100 flex items-center justify-between bg-white shadow-xs">
                        <div className="w-8 h-8 rounded-sm bg-neutral-200 border border-neutral-300 flex items-center justify-center text-[8px] font-bold text-center p-0.5 leading-none">InAmigos Logo</div>
                        <div className="flex gap-2 text-[10px] text-neutral-800 font-medium scale-95 origin-right">
                          <span>Home</span> <span>Causes</span> <span>About Us</span> <span className="font-bold underline text-[#00E676]">Volunteers</span> <span>Gallery</span> <span>Events</span>
                        </div>
                      </div>
                      {/* Hero Image slider mock */}
                      <div className="relative bg-teal-900/10 h-64 flex flex-col justify-center items-center text-center p-6 relative">
                        {/* Simulate face assets in background */}
                        <div className="absolute inset-0 bg-gradient-to-r from-teal-500/10 via-amber-200/10 to-emerald-600/10"></div>
                        <div className="absolute left-2 top-1/2 -translate-y-1/2 w-6 h-6 rounded-full border border-neutral-300 bg-white/75 flex items-center justify-center text-[10px] font-bold">&lt;</div>
                        <div className="absolute right-2 top-1/2 -translate-y-1/2 w-6 h-6 rounded-full border border-neutral-300 bg-white/75 flex items-center justify-center text-[10px] font-bold">&gt;</div>
                        
                        <div className="relative z-10 space-y-1 mt-6">
                          <span className="text-[10px] tracking-widest font-mono text-charcoal block">UDAAN</span>
                          <h1 className="text-2xl font-bold text-white tracking-normal font-sans drop-shadow-xs">Soaring Towards a Brighter Future</h1>
                          <div className="w-16 h-0.5 bg-[#00E676] mx-auto mt-2"></div>
                          <span className="text-[9px] text-[#222] font-semibold bg-white/40 px-1 rounded block">Book: স্বাস্থ্য ও শারীরশিক্ষা</span>
                        </div>
                      </div>
                    </div>
                  )}

                  {/* Screenshot 2 BEFORE Layout */}
                  {currentPage.id === 'screenshot-2' && (
                    <div className="w-full text-slate-800 p-4 space-y-4" id="legacy-events-sim">
                      <div className="grid grid-cols-3 gap-3">
                        {/* Event Card 1 */}
                        <div className="border border-neutral-200 rounded-md bg-white overflow-hidden shadow-xs relative">
                          <div className="h-28 bg-[#1E293B]/10 flex items-center justify-center relative">
                            <span className="text-xl">💧</span>
                            <span className="absolute left-0 bottom-0 bg-[#00E676] text-white px-2 py-0.5 text-[8px]">Community</span>
                          </div>
                          <div className="p-2.5 space-y-1.5">
                            <span className="text-[9px] text-[#777] block">📅 22 March 2025</span>
                            <h5 className="font-bold text-xs text-[#00E676] tracking-tight leading-tight">World Water Day 2025</h5>
                            <p className="text-[10px] text-neutral-500 leading-normal line-clamp-2">This event highlights the importance of water conservation and...</p>
                            <span className="inline-block bg-[#00E676] text-white text-[8px] px-2 py-1 rounded-sm">read more</span>
                          </div>
                        </div>
                        {/* Event Card 2 */}
                        <div className="border border-neutral-200 rounded-md bg-white overflow-hidden shadow-xs relative">
                          <div className="h-28 bg-[#1E293B]/10 flex items-center justify-center relative">
                            <span className="text-xl">😃</span>
                            <span className="absolute left-0 bottom-0 bg-[#00E676] text-white px-2 py-0.5 text-[8px]">Community</span>
                          </div>
                          <div className="p-2.5 space-y-1.5">
                            <span className="text-[9px] text-[#777] block">📅 20 March 2025</span>
                            <h5 className="font-bold text-xs text-[#00E676] tracking-tight leading-tight font-sans">International Day of Happiness</h5>
                            <p className="text-[10px] text-neutral-500 leading-normal line-clamp-2">Join us in spreading joy, positivity, and well-being through...</p>
                            <span className="inline-block bg-[#00E676] text-white text-[8px] px-2 py-1 rounded-sm">read more</span>
                          </div>
                        </div>
                        {/* Event Card 3 */}
                        <div className="border border-neutral-200 rounded-md bg-white overflow-hidden shadow-xs relative">
                          <div className="h-28 bg-[#1E293B]/10 flex items-center justify-center relative">
                            <span className="text-xl">👩‍🔬</span>
                            <span className="absolute left-0 bottom-0 bg-[#00e676] text-white px-2 py-0.5 text-[8px]">Education</span>
                          </div>
                          <div className="p-2.5 space-y-1.5">
                            <span className="text-[9px] text-[#777] block">📅 11 February 2025</span>
                            <h5 className="font-bold text-xs text-[#00E676] tracking-tight leading-tight">Women & Girls in Science</h5>
                            <p className="text-[10px] text-neutral-500 leading-normal line-clamp-2">Join us on February 11, 2025, to celebrate the International...</p>
                            <span className="inline-block bg-[#00E676] text-white text-[8px] px-2 py-1 rounded-sm">read more</span>
                          </div>
                        </div>
                      </div>
                      {/* Back to top fixed overlay (fake) */}
                      <div className="absolute bottom-4 right-4 w-7 h-7 bg-[#00E676] flex items-center justify-center text-white text-xs font-bold font-sans">▲</div>
                    </div>
                  )}

                  {/* Screenshot 3 BEFORE Layout */}
                  {currentPage.id === 'screenshot-3' && (
                    <div className="w-full text-slate-800" id="legacy-volunteer-sim">
                      {/* Massive dark block */}
                      <div className="bg-[#111111] text-white py-12 text-center space-y-1.5">
                        <h1 className="text-3xl font-bold font-sans">Volunteers</h1>
                        <p className="text-[10px] text-neutral-400">Home / <span className="text-[#00E676]">Volunteers</span></p>
                      </div>
                      {/* Raw portrait grid block */}
                      <div className="grid grid-cols-3 bg-white">
                        <div className="h-36 bg-neutral-350 border border-neutral-200 p-0 flex items-end justify-center relative overflow-hidden">
                          <div className="absolute inset-0 bg-neutral-200 flex items-center justify-center text-xl">👨🧔</div>
                          <span className="absolute bottom-1 bg-black/50 text-white text-[8px] px-1 rounded">Portrait 1 (Sharp edge)</span>
                        </div>
                        <div className="h-36 bg-neutral-350 border border-neutral-200 p-0 flex items-end justify-center relative overflow-hidden">
                          <div className="absolute inset-0 bg-neutral-300 flex items-center justify-center text-xl">👩👩‍🦰</div>
                          <span className="absolute bottom-1 bg-black/50 text-white text-[8px] px-1 rounded">Portrait 2 (Unspaced)</span>
                        </div>
                        <div className="h-36 bg-neutral-350 border border-neutral-200 p-0 flex items-end justify-center relative overflow-hidden">
                          <div className="absolute inset-0 bg-neutral-200 flex items-center justify-center text-xl">👨‍💼🧑</div>
                          <span className="absolute bottom-1 bg-black/50 text-white text-[8px] px-1 rounded">Portrait 3 (No Text)</span>
                        </div>
                      </div>
                    </div>
                  )}

                  {/* Screenshot 4 BEFORE Layout */}
                  {currentPage.id === 'screenshot-4' && (
                    <div className="w-full text-slate-800 bg-[#E8F0FE] p-4 space-y-4" id="google-form-sim">
                      <div className="max-w-md mx-auto bg-white border border-neutral-250 rounded-lg shadow-sm overflow-hidden">
                        {/* Cartoon hand mockup */}
                        <div className="h-14 bg-gradient-to-r from-purple-200 via-pink-100 to-amber-200 flex items-center justify-center">
                          <span className="text-[12px] font-medium text-pink-700">🎨 Pre-set Google Form Cartoon Header</span>
                        </div>
                        <div className="p-4 space-y-3">
                          <h2 className="text-base font-extrabold text-[#222] border-b border-neutral-200 pb-2">IMAMIGOS FOUNDATION Permanent Volunteer Form</h2>
                          <div className="text-[9px] text-neutral-600 space-y-1">
                            <p>Thank you for submitting registration details.</p>
                            <p className="font-extrabold mt-1">Why Choose InAmigos Foundation?</p>
                            <ul className="list-disc pl-3">
                              <li>Licensed by Central Government</li>
                              <li>Transparent Financial Records</li>
                              <li>80G & 12A Certified</li>
                              <li>NGO DARPAN Registered</li>
                            </ul>
                            <p className="bg-amber-100 text-[#854d0e] p-1 rounded font-bold border border-amber-200 mt-2">
                              Note- WhatsApp group join line mandate for all.
                            </p>
                          </div>
                          {/* Fake inputs */}
                          <div className="space-y-1.5 pt-2">
                            <span className="block text-[10px] font-bold">Name *</span>
                            <div className="border border-neutral-250 p-1.5 text-[9px] text-[#777] bg-neutral-50 rounded">Your answer</div>
                          </div>
                        </div>
                      </div>
                    </div>
                  )}

                  {/* Absolute Overlaid Hotspots */}
                  {currentPage.hotspots.map((spot, idx) => (
                    <button
                      key={idx}
                      onClick={() => setActiveHotspot({
                        title: spot.title,
                        description: spot.description,
                        impact: spot.impact
                      })}
                      className={`absolute w-6 h-6 rounded-full border-2 border-white flex items-center justify-center text-xs font-bold text-white shadow-md transform -translate-x-1/2 -translate-y-1/2 active:scale-90 select-none cursor-pointer hover:scale-110 transition-transform ${
                        spot.impact === 'High' 
                          ? 'bg-red-500 hover:bg-red-650' 
                          : spot.impact === 'Medium' 
                            ? 'bg-amber-500 hover:bg-amber-650' 
                            : 'bg-blue-500 hover:bg-blue-650'
                      }`}
                      style={{ left: `${spot.x}%`, top: `${spot.y}%` }}
                      id={`hotspot-${currentPage.id}-${idx}`}
                    >
                      !
                    </button>
                  ))}
                </div>
              ) : (
                /* AFTER (PROPOSED MODERNIZED) INTERFACE RECREATION */
                <div className="w-full text-slate-800 animate-fade-in" id="modern-mockup-body">
                  {/* Screenshot 1 AFTER Layout */}
                  {currentPage.id === 'screenshot-1' && (
                    <div className="w-full text-slate-800" id="modern-header-sim">
                      {/* Premium Charcoal Dark Top bar */}
                      <div className="bg-slate-900 text-slate-300 px-5 py-2 text-[10px] flex items-center justify-between font-medium">
                        <span className="flex items-center gap-1.5">✉️ <strong className="text-white hover:underline cursor-pointer">support@inamigosfoundation.org.in</strong></span>
                        <span className="flex gap-3 text-slate-400">
                          <strong className="hover:text-emerald-500 cursor-pointer">LinkedIn</strong>
                          <strong className="hover:text-emerald-500 cursor-pointer">YouTube</strong>
                          <strong className="hover:text-emerald-500 cursor-pointer">Instagram</strong>
                        </span>
                      </div>
                      
                      {/* Symmetrical Elegant White Nav Bar */}
                      <div className="px-5 py-3 border-b border-slate-100 flex items-center justify-between bg-white shadow-xs">
                        <div className="flex items-center gap-2">
                          <div className="w-9 h-9 rounded-lg bg-emerald-500 flex items-center justify-center text-white text-md font-extrabold shadow-sm">IA</div>
                          <span className="font-extrabold text-[#111827] text-xs tracking-tight font-sans">InAmigos<span className="text-emerald-600 block text-[9px] -mt-1 font-medium">Foundation</span></span>
                        </div>
                        <div className="flex items-center gap-4 text-[10px] text-slate-600 font-semibold">
                          <span className="hover:text-emerald-600 transition-colors cursor-pointer">Home</span>
                          <span className="hover:text-emerald-600 transition-colors cursor-pointer">Causes</span>
                          <span className="hover:text-emerald-600 transition-colors cursor-pointer">About</span>
                          <span className="hover:text-emerald-600 transition-colors cursor-pointer text-emerald-600">Volunteers</span>
                          <span className="hover:text-emerald-600 transition-colors cursor-pointer">Blog</span>
                        </div>
                        <button className="px-3.5 py-1.5 bg-emerald-600 hover:bg-emerald-700 text-white font-bold rounded-lg text-[9px] shadow-sm transition-transform hover:scale-105 cursor-pointer">Donate Now</button>
                      </div>

                      {/* Premium Scrim Layer Overlay Image Sliders */}
                      <div className="relative h-64 flex items-center p-6 relative bg-slate-950">
                        {/* Simulation of beautiful overlay filter */}
                        <div className="absolute inset-0 bg-radial from-transparent to-slate-950/80"></div>
                        <div className="absolute inset-0 bg-emerald-500/10 mix-blend-overlay"></div>
                        <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-900/40 to-transparent"></div>
                        
                        <div className="relative z-10 space-y-2 text-left max-w-sm mt-8">
                          <div className="inline-flex items-center gap-1.5 px-2 py-0.5 bg-emerald-500/20 text-emerald-400 font-extrabold text-[8px] rounded-full border border-emerald-500/30 font-sans tracking-widest uppercase">PROJECT UDAAN</div>
                          <h1 className="text-xl sm:text-2xl font-black text-white leading-tight tracking-tight font-sans">Soaring Towards a Brighter Future</h1>
                          <p className="text-[10px] text-slate-300 leading-normal font-sans">Empowering vulnerable minds in rural domains through robust foundational education models.</p>
                          <div className="flex gap-2 pt-1">
                            <span className="px-2.5 py-1 bg-emerald-600 hover:bg-emerald-700 text-white rounded-md text-[8px] font-bold shadow-xs cursor-pointer">Explore Cause</span>
                            <span className="px-2.5 py-1 bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700 rounded-md text-[8px] font-bold cursor-pointer">Join as Partner</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  )}

                  {/* Screenshot 2 AFTER Layout */}
                  {currentPage.id === 'screenshot-2' && (
                    <div className="w-full text-slate-800 p-4 space-y-4" id="modern-projects-sim">
                      <div className="grid grid-cols-3 gap-3.5">
                        {/* Modern Card 1 */}
                        <div className="border border-slate-100 rounded-xl bg-white overflow-hidden shadow-xs hover:shadow-md transition-shadow relative duration-200">
                          <div className="h-28 bg-[#0F172A] flex items-center justify-center relative overflow-hidden">
                            <span className="text-xl z-10">💧</span>
                            <div className="absolute inset-0 bg-radial from-transparent to-black/60"></div>
                            <span className="absolute left-2.5 bottom-2.5 bg-slate-900/70 text-emerald-400 border border-slate-700/60 backdrop-blur-xs px-2 py-0.5 rounded-full text-[8px] font-bold">Community Support</span>
                          </div>
                          <div className="p-3 space-y-2">
                            <span className="text-[8px] text-slate-400 font-semibold flex items-center gap-1"><Calendar className="w-3 h-3 text-slate-300" /> 22 March 2025</span>
                            <h5 className="font-extrabold text-xs text-slate-800 leading-snug font-sans hover:text-emerald-600 transition-colors">World Water Day 2025</h5>
                            <p className="text-[9px] text-slate-500 leading-normal line-clamp-2">This event highlights the importance of water conservation and collective dynamic action...</p>
                            <span className="inline-flex items-center gap-1 text-emerald-600 text-[9px] font-bold hover:underline cursor-pointer">Learn More <ArrowRight className="w-3 h-3" /></span>
                          </div>
                        </div>
                        {/* Modern Card 2 */}
                        <div className="border border-slate-100 rounded-xl bg-white overflow-hidden shadow-xs hover:shadow-md transition-shadow relative duration-200">
                          <div className="h-28 bg-[#0F172A] flex items-center justify-center relative overflow-hidden">
                            <span className="text-xl z-10">😃</span>
                            <div className="absolute inset-0 bg-radial from-transparent to-black/60"></div>
                            <span className="absolute left-2.5 bottom-2.5 bg-slate-900/70 text-emerald-400 border border-slate-700/60 backdrop-blur-xs px-2 py-0.5 rounded-full text-[8px] font-bold">Community Support</span>
                          </div>
                          <div className="p-3 space-y-2">
                            <span className="text-[8px] text-slate-400 font-semibold flex items-center gap-1"><Calendar className="w-3 h-3 text-slate-300" /> 20 March 2025</span>
                            <h5 className="font-extrabold text-xs text-slate-800 leading-snug font-sans hover:text-emerald-600 transition-colors">Day of Happiness</h5>
                            <p className="text-[9px] text-slate-500 leading-normal line-clamp-2">Join us in spreading joy, positivity, and healthy social well-being in local spheres...</p>
                            <span className="inline-flex items-center gap-1 text-emerald-600 text-[9px] font-bold hover:underline cursor-pointer">Learn More <ArrowRight className="w-3 h-3" /></span>
                          </div>
                        </div>
                        {/* Modern Card 3 */}
                        <div className="border border-slate-100 rounded-xl bg-white overflow-hidden shadow-xs hover:shadow-md transition-shadow relative duration-200">
                          <div className="h-28 bg-[#0F172A] flex items-center justify-center relative overflow-hidden">
                            <span className="text-xl z-10">👩‍🔬</span>
                            <div className="absolute inset-0 bg-radial from-transparent to-black/60"></div>
                            <span className="absolute left-2.5 bottom-2.5 bg-slate-900/70 text-emerald-400 border border-slate-700/60 backdrop-blur-xs px-2 py-0.5 rounded-full text-[8px] font-bold">Special Education</span>
                          </div>
                          <div className="p-3 space-y-2">
                            <span className="text-[8px] text-slate-400 font-semibold flex items-center gap-1"><Calendar className="w-3 h-3 text-slate-300" /> 11 Feb 2025</span>
                            <h5 className="font-extrabold text-xs text-slate-800 leading-snug font-sans hover:text-emerald-600 transition-colors">Women in Science</h5>
                            <p className="text-[9px] text-slate-500 leading-normal line-clamp-2">Join us in celebrating the international community profiles of girls leading in labs...</p>
                            <span className="inline-flex items-center gap-1 text-emerald-600 text-[9px] font-bold hover:underline cursor-pointer">Learn More <ArrowRight className="w-3 h-3" /></span>
                          </div>
                        </div>
                      </div>
                      {/* Beautiful back to top trigger */}
                      <div className="absolute bottom-4 right-4 w-7 h-7 bg-slate-900 text-white text-xs font-bold font-sans rounded-full shadow-lg border border-slate-700 flex items-center justify-center hover:bg-emerald-600 transition-colors pointer-events-auto cursor-pointer">↑</div>
                    </div>
                  )}

                  {/* Screenshot 3 AFTER Layout */}
                  {currentPage.id === 'screenshot-3' && (
                    <div className="w-full text-slate-800" id="modern-volunteer-layout">
                      {/* Sophisticated Soft Title block */}
                      <div className="bg-slate-50 text-slate-800 py-8 px-6 text-center space-y-2 border-b border-slate-150">
                        <span className="text-[9px] uppercase tracking-widest text-slate-400 font-bold block">We are stronger together</span>
                        <h1 className="text-xl font-extrabold font-sans text-slate-900">Our Pillars of Devotion</h1>
                        <p className="text-[10px] text-slate-500 max-w-xs mx-auto">Meet the certified volunteers coordinating educational kits and medical camps.</p>
                      </div>
                      {/* Profile Grid Block */}
                      <div className="grid grid-cols-3 bg-white p-4 gap-4">
                        <div className="border border-slate-100 rounded-xl bg-white p-2.5 shadow-xs flex flex-col items-center text-center space-y-1.5 hover:border-emerald-200 transition-all">
                          <div className="w-14 h-14 rounded-full bg-slate-900 text-white flex items-center justify-center text-lg font-bold shadow-xs">AM</div>
                          <h6 className="font-extrabold text-[10px] text-slate-800 leading-tight">Aman Mehta</h6>
                          <span className="px-1.5 py-0.5 bg-emerald-50 text-emerald-700 text-[8px] font-bold rounded">Lead Mentor</span>
                        </div>
                        <div className="border border-slate-100 rounded-xl bg-white p-2.5 shadow-xs flex flex-col items-center text-center space-y-1.5 hover:border-emerald-200 transition-all">
                          <div className="w-14 h-14 rounded-full bg-slate-900 text-white flex items-center justify-center text-lg font-bold shadow-xs">SR</div>
                          <h6 className="font-extrabold text-[10px] text-slate-800 leading-tight">Shreya Roy</h6>
                          <span className="px-1.5 py-0.5 bg-emerald-50 text-emerald-700 text-[8px] font-bold rounded">Educator Coordinator</span>
                        </div>
                        <div className="border border-slate-100 rounded-xl bg-white p-2.5 shadow-xs flex flex-col items-center text-center space-y-1.5 hover:border-emerald-200 transition-all">
                          <div className="w-14 h-14 rounded-full bg-slate-900 text-white flex items-center justify-center text-lg font-bold shadow-xs">RK</div>
                          <h6 className="font-extrabold text-[10px] text-slate-800 leading-tight">Rajesh Kumar</h6>
                          <span className="px-1.5 py-0.5 bg-emerald-50 text-emerald-700 text-[8px] font-bold rounded">Field Logistics</span>
                        </div>
                      </div>
                    </div>
                  )}

                  {/* Screenshot 4 AFTER Layout */}
                  {currentPage.id === 'screenshot-4' && (
                    <div className="w-full text-slate-800 bg-[#F8FAFC] p-4 space-y-4" id="modern-integrations-layout">
                      <div className="max-w-md mx-auto bg-white border border-slate-150 rounded-xl shadow-md overflow-hidden">
                        {/* Elegant Form Hero Header banner */}
                        <div className="bg-slate-900 p-4 border-b border-slate-800 text-left">
                          <div className="inline-flex items-center gap-1 px-2 py-0.5 bg-emerald-500/20 text-emerald-400 font-bold text-[8px] rounded-full mb-1">
                            <ShieldCheck className="w-3 h-3" /> Secure domain
                          </div>
                          <h2 className="text-cs font-extrabold text-white leading-tight font-sans">Apply as a Permanent Volunteer</h2>
                          <p className="text-[9px] text-slate-400 mt-1">Submit registration details directly within our centralized database system.</p>
                        </div>
                        <div className="p-4 space-y-3">
                          {/* Structured Grid of Compliance Badges */}
                          <div className="bg-slate-50 rounded-lg p-2.5 border border-slate-100" id="trust-grid-sim">
                            <span className="text-[8px] font-bold text-slate-500 uppercase tracking-widest block mb-1.5 text-center">Verified Government Credentials</span>
                            <div className="grid grid-cols-3 gap-1.5 text-center">
                              <span className="bg-white border border-emerald-100 text-emerald-700 text-[7px] py-1 font-bold rounded-md block shadow-xxs">80G Tax Cert</span>
                              <span className="bg-white border border-emerald-100 text-emerald-700 text-[7px] py-1 font-bold rounded-md block shadow-xxs">NGO Darpan</span>
                              <span className="bg-white border border-emerald-100 text-emerald-700 text-[7px] py-1 font-bold rounded-md block shadow-xxs">ISO 9001</span>
                            </div>
                          </div>
                          
                          {/* Customized Inputs with verification badge */}
                          <div className="space-y-1.5">
                            <label className="text-[10px] font-bold text-slate-700 flex justify-between">Applicant Name <strong className="text-red-500">*</strong></label>
                            <input
                              disabled
                              placeholder="e.g. Aman Mehta"
                              className="border border-slate-200 p-1.5 text-[9px] text-slate-800 bg-white rounded-lg w-full outline-hidden"
                            />
                          </div>

                          {/* Privacy assurance disclosure */}
                          <p className="text-[8px] text-slate-400 leading-normal bg-blue-50/50 p-2 rounded-lg border border-blue-100/40">
                            🔒 Your personal details are stored under secure SSL-encrypted databases and will not be shared with external channels.
                          </p>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              )}
            </div>

            {/* Fake OS browser footer informational notes (Active popup on top) */}
            <div className="bg-slate-950 px-4 py-2 border-t border-slate-850 text-[10px] text-slate-300 relative z-20 shrink-0" id="browser-simulation-footer">
              {activeHotspot ? (
                <div className="flex justify-between items-start gap-4 animate-slide-up" id="hotspot-popup">
                  <div className="space-y-0.5">
                    <div className="flex items-center gap-1.5">
                      <span className={`px-1.5 py-0.5 rounded-sm font-bold text-[8px] border shrink-0 ${getImpactBadgeColor(activeHotspot.impact)}`}>
                        {activeHotspot.impact} Severity
                      </span>
                      <strong className="text-slate-100 text-xs font-semibold">{activeHotspot.title}</strong>
                    </div>
                    <p className="text-[10px] text-slate-400 leading-normal">{activeHotspot.description}</p>
                  </div>
                  <button
                    onClick={() => setActiveHotspot(null)}
                    className="text-slate-500 hover:text-slate-350 font-bold px-1 text-xs select-none cursor-pointer"
                  >
                    ✕
                  </button>
                </div>
              ) : (
                <div className="flex justify-between items-center text-[9px] text-slate-500" id="browser-cta-instructions">
                  <span>{viewMode === 'before' ? '🔴 CLICK ON THE RED MARKS (!) IN THE VIEWPORT TO DISCOVER HEURISTIC FLAWS' : '🟢 ENJOY THE ALIGNED INTERFACES CREATED FROM PROPOSED SPECIFICATIONS'}</span>
                  {viewMode === 'before' && <button onClick={() => setViewMode('after')} className="text-emerald-400 font-bold hover:underline cursor-pointer flex items-center gap-0.5">Upgrade View <RefreshCw className="w-3 h-3" /></button>}
                </div>
              )}
            </div>
          </div>

          {/* Quick Specifications Comparison Traits block */}
          <div className="bg-white rounded-2xl border border-slate-200/80 p-5 shadow-xs" id="specs-comparison-card">
            <h4 className="font-bold text-slate-850 text-sm mb-3">Symmetry Specs Comparison Checklist</h4>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs" id="specs-checklist-grid">
              <div className="space-y-2.5" id="specs-before-list">
                <span className="font-bold text-red-600 block uppercase tracking-wider text-[10px]">Legacy UI Characteristics</span>
                <ul className="space-y-1.5 text-slate-500 font-mono text-[10.5px]">
                  {currentPage.beforeTraits.map((t, i) => (
                    <li key={i} className="flex items-start gap-1.5">
                      <span className="text-red-500">❌</span>
                      <span><strong>{t.label}:</strong> {t.value}</span>
                    </li>
                  ))}
                </ul>
              </div>
              <div className="space-y-2.5" id="specs-after-list">
                <span className="font-bold text-emerald-600 block uppercase tracking-wider text-[10px]">Proposed Improvement Roadmap</span>
                <ul className="space-y-1.5 text-slate-700 font-sans text-[10.5px]">
                  {currentPage.afterTraits.map((t, i) => (
                    <li key={i} className="flex items-start gap-1.5">
                      <span className="text-emerald-500">✅</span>
                      <span><strong>{t.label}:</strong> {t.value}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </div>

        {/* Right Column: Tailored Portfolio Analysis Pages (5 cols) */}
        <div className="lg:col-span-5 space-y-6" id="comprehensive-analysis-review-column">
          <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-xs flex flex-col justify-between" id="comprehensive-analysis">
            <div>
              <div className="flex justify-between items-center mb-4" id="analysis-header">
                <span className="inline-flex items-center gap-1.5 text-xs font-bold text-indigo-700 bg-indigo-50 border border-indigo-150 px-2.5 py-1 rounded-lg uppercase tracking-wider">
                  <BookOpen className="w-4 h-4" /> Assessment Reports
                </span>
                <div className="text-[11px] text-slate-400 font-medium">Double-click headers to toggle view options</div>
              </div>

              {/* SECTION 1: Visual/UI */}
              <div className="p-4 bg-slate-50 rounded-xl border border-slate-100 hover:border-slate-250 transition-colors mb-4 relative group" id="sec-1-card">
                <div className="flex justify-between items-start" id="sec-1-header">
                  <h4 className="font-bold text-slate-850 text-sm mb-1.5 flex items-center gap-1.5"><Eye className="w-4 h-4 text-sky-500" /> 1. Visual/UI Review</h4>
                  <button
                    onClick={() => handleCopyText('visual', currentPage.analysis.visualUI)}
                    className="opacity-0 group-hover:opacity-100 text-slate-400 hover:text-emerald-600 transition-opacity p-1 rounded-md hover:bg-white border border-slate-200/50 cursor-pointer"
                    title="Copy this section text"
                  >
                    {copyStatus['visual'] ? <Check className="w-3.5 h-3.5 text-emerald-500" /> : <Copy className="w-3.5 h-3.5" />}
                  </button>
                </div>
                <div className="text-xs text-slate-600 leading-relaxed space-y-2 whitespace-pre-wrap" id="sec-1-content">
                  {currentPage.analysis.visualUI.replace(/### \d\. Visual\/UI Review\n/, '')}
                </div>
              </div>

              {/* SECTION 2: UX Friction */}
              <div className="p-4 bg-slate-50 rounded-xl border border-slate-100 hover:border-slate-250 transition-colors mb-4 relative group" id="sec-2-card">
                <div className="flex justify-between items-start" id="sec-2-header">
                  <h4 className="font-bold text-slate-850 text-sm mb-1.5 flex items-center gap-1.5"><AlertCircle className="w-4 h-4 text-amber-500" /> 2. UX & Friction Points</h4>
                  <button
                    onClick={() => handleCopyText('ux', currentPage.analysis.uxFriction)}
                    className="opacity-0 group-hover:opacity-100 text-slate-400 hover:text-emerald-600 transition-opacity p-1 rounded-md hover:bg-white border border-slate-200/50 cursor-pointer"
                    title="Copy this section text"
                  >
                    {copyStatus['ux'] ? <Check className="w-3.5 h-3.5 text-emerald-500" /> : <Copy className="w-3.5 h-3.5" />}
                  </button>
                </div>
                <div className="text-xs text-slate-600 leading-relaxed space-y-2 whitespace-pre-wrap font-sans" id="sec-2-content">
                  {currentPage.analysis.uxFriction.replace(/### \d\. User Experience \(UX\) \& Friction Points\n/, '')}
                </div>
              </div>

              {/* SECTION 3: Content Trust */}
              <div className="p-4 bg-slate-50 rounded-xl border border-slate-100 hover:border-slate-250 transition-colors mb-4 relative group" id="sec-3-card">
                <div className="flex justify-between items-start" id="sec-3-header">
                  <h4 className="font-bold text-slate-850 text-sm mb-1.5 flex items-center gap-1.5"><ShieldCheck className="w-4 h-4 text-emerald-500" /> 3. Content & Trust Analysis</h4>
                  <button
                    onClick={() => handleCopyText('trust', currentPage.analysis.trustContent)}
                    className="opacity-0 group-hover:opacity-100 text-slate-400 hover:text-emerald-600 transition-opacity p-1 rounded-md hover:bg-white border border-slate-200/50 cursor-pointer"
                    title="Copy this section text"
                  >
                    {copyStatus['trust'] ? <Check className="w-3.5 h-3.5 text-emerald-500" /> : <Copy className="w-3.5 h-3.5" />}
                  </button>
                </div>
                <div className="text-xs text-slate-600 leading-relaxed space-y-2 whitespace-pre-wrap" id="sec-3-content">
                  {currentPage.analysis.trustContent.replace(/### \d\. Content \& Trust Analysis\n/, '')}
                </div>
              </div>

              {/* SECTION 4: Suggestions */}
              <div className="p-4 bg-slate-50 rounded-xl border border-slate-100 hover:border-slate-250 transition-colors relative group" id="sec-4-card">
                <div className="flex justify-between items-start" id="sec-4-header">
                  <h4 className="font-bold text-slate-850 text-sm mb-2 flex items-center gap-1.5"><Award className="w-4 h-4 text-purple-500" /> 4. Actionable Improvements</h4>
                  <button
                    onClick={() => handleCopyText('suggestions', currentPage.analysis.suggestions.map((s, idx) => `${idx + 1}. ${s}`).join('\n'))}
                    className="opacity-0 group-hover:opacity-100 text-slate-400 hover:text-emerald-600 transition-opacity p-1 rounded-md hover:bg-white border border-slate-200/50 cursor-pointer"
                    title="Copy these recommendations as a list"
                  >
                    {copyStatus['suggestions'] ? <Check className="w-3.5 h-3.5 text-emerald-500" /> : <Copy className="w-3.5 h-3.5" />}
                  </button>
                </div>
                <ul className="text-xs text-slate-600 leading-relaxed space-y-2.5 list-none pl-0" id="sec-4-content">
                  {currentPage.analysis.suggestions.map((suggestion, idx) => (
                    <li key={idx} className="flex gap-2">
                      <span className="w-5 h-5 bg-emerald-50 border border-emerald-250 text-emerald-700 shrink-0 rounded-full flex items-center justify-center text-[10px] font-bold">
                        {idx + 1}
                      </span>
                      <span className="text-slate-650">{suggestion}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            {/* Quick Helper Copy Advice bar */}
            <div className="mt-6 pt-4 border-t border-slate-100 rounded-lg flex items-center justify-between text-xs text-slate-500" id="copy-guidance-footer">
              <span className="flex items-center gap-1 font-medium"><Info className="w-4 h-4 text-slate-400" /> Highlight cards to copy-paste.</span>
              <span className="text-emerald-700 font-bold hover:underline cursor-pointer select-none">Copy complete page documentation</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
