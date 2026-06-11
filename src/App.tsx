import { useState } from 'react';
import { auditData, technicalSEOAnalysis } from './data/auditData';
import DashboardHome from './components/DashboardHome';
import PageAuditPanel from './components/PageAuditPanel';
import ReportBuilder from './components/ReportBuilder';
import PerformanceSEO from './components/PerformanceSEO';
import inamigosLogo from './assets/images/inamigos_logo_1779708827859.png';
import { 
  Building2, 
  Cpu, 
  FileCheck, 
  FileText, 
  Heart, 
  Layout, 
  LayoutGrid, 
  Menu, 
  ShieldAlert, 
  X 
} from 'lucide-react';

export default function App() {
  const [activeTab, setActiveTab] = useState<string>('dashboard');
  const [selectedPageId, setSelectedPageId] = useState<string>('screenshot-1');
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState<boolean>(false);

  const handleSelectPageFromDashboard = (id: string) => {
    setSelectedPageId(id);
    setActiveTab('pages');
  };

  const handleNavFromDashboard = (tab: string) => {
    setActiveTab(tab);
  };

  return (
    <div className="min-h-screen bg-slate-100 flex flex-col font-sans text-slate-900" id="applet-root">
      
      {/* BENTO THEMED HEADER SECTION */}
      <header className="bg-white border-b border-slate-200 px-4 sm:px-8 py-4 shrink-0 sticky top-0 z-55 shadow-sm" id="master-header">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4" id="header-container">
          <div className="flex items-center space-x-4">
            <div className="h-12 sm:h-14 flex items-center justify-center shrink-0 select-none overflow-hidden" id="header-logo-container">
              <img 
                src={inamigosLogo} 
                alt="InAmigos Foundation Logo" 
                className="h-full w-auto object-contain transform scale-120 origin-left" 
                id="header-logo-img"
                referrerPolicy="no-referrer"
              />
            </div>
            <div>
              <h1 className="text-base sm:text-lg font-extrabold tracking-tight text-slate-900 leading-tight">Foundation Website Improvement Analysis</h1>
              <p className="text-[11px] text-slate-500 uppercase tracking-widest font-bold">Portfolio Case Study: InAmigos Foundation</p>
            </div>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-2 text-xs font-bold text-slate-700" id="desktop-navbar">
            <button
              onClick={() => setActiveTab('dashboard')}
              className={`px-3.5 py-2.5 rounded-xl transition-all cursor-pointer border flex items-center gap-1.5 ${
                activeTab === 'dashboard' 
                  ? 'bg-white border-slate-900 text-indigo-700 shadow-[2px_2px_0px_0px_rgba(15,23,42,1)] font-extrabold' 
                  : 'bg-slate-50 border-slate-200 hover:bg-slate-100 text-slate-600'
              }`}
            >
              <LayoutGrid className="w-3.5 h-3.5" /> General Dashboard
            </button>
            <button
              onClick={() => setActiveTab('pages')}
              className={`px-3.5 py-2.5 rounded-xl transition-all cursor-pointer border flex items-center gap-1.5 ${
                activeTab === 'pages' 
                  ? 'bg-white border-slate-900 text-indigo-700 shadow-[2px_2px_0px_0px_rgba(15,23,42,1)] font-extrabold' 
                  : 'bg-slate-50 border-slate-200 hover:bg-slate-100 text-slate-600'
              }`}
            >
              <Layout className="w-3.5 h-3.5" /> Heuristic Audits
            </button>
            <button
              onClick={() => setActiveTab('technical')}
              className={`px-3.5 py-2.5 rounded-xl transition-all cursor-pointer border flex items-center gap-1.5 ${
                activeTab === 'technical' 
                  ? 'bg-white border-slate-900 text-indigo-700 shadow-[2px_2px_0px_0px_rgba(15,23,42,1)] font-extrabold' 
                  : 'bg-slate-50 border-slate-200 hover:bg-slate-100 text-slate-600'
              }`}
            >
              <Cpu className="w-3.5 h-3.5" /> Technical SEO
            </button>
            <button
              onClick={() => setActiveTab('report')}
              className={`px-4 py-2.5 rounded-xl transition-all cursor-pointer border flex items-center gap-1.5 ${
                activeTab === 'report' 
                  ? 'bg-white border-slate-900 text-indigo-700 shadow-[2px_2px_0px_0px_rgba(15,23,42,1)] font-extrabold' 
                  : 'bg-slate-50 border-slate-200 hover:bg-slate-100 text-slate-600'
              }`}
            >
              <FileCheck className="w-3.5 h-3.5" /> Report Builder
            </button>
          </nav>

          {/* Quick Info Badges */}
          <div className="hidden sm:flex items-center gap-2 text-xs font-bold" id="badge-container">
            <span className="px-3 py-1 bg-green-100 text-green-700 rounded-full border border-green-200 uppercase tracking-wider text-[10px]">Audit Complete</span>
            <span className="px-3 py-1 bg-slate-200 text-slate-600 rounded-full uppercase text-[10px]">Active</span>
          </div>

          {/* Mobile hamburger menu button */}
          <div className="md:hidden self-end sm:self-auto">
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="p-2.5 text-slate-600 hover:text-slate-900 bg-slate-50 border border-slate-200 rounded-xl cursor-pointer"
              aria-label="Toggle Menu"
            >
              {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Drawer Menu Overlay */}
      {isMobileMenuOpen && (
        <div className="md:hidden bg-white border-b border-slate-200 text-slate-800 px-4 py-3 space-y-2 relative z-50 shadow-md" id="mobile-drawer">
          <button
            onClick={() => { setActiveTab('dashboard'); setIsMobileMenuOpen(false); }}
            className={`w-full text-left px-3.5 py-2.5 rounded-xl text-xs font-bold block ${activeTab === 'dashboard' ? 'bg-indigo-50 border border-indigo-200 text-indigo-700' : 'hover:bg-slate-50'}`}
          >
            <LayoutGrid className="w-4 h-4 inline-block -mt-0.5 mr-2" /> General Dashboard
          </button>
          <button
            onClick={() => { setActiveTab('pages'); setIsMobileMenuOpen(false); }}
            className={`w-full text-left px-3.5 py-2.5 rounded-xl text-xs font-bold block ${activeTab === 'pages' ? 'bg-indigo-50 border border-indigo-200 text-indigo-700' : 'hover:bg-slate-50'}`}
          >
            <Layout className="w-4 h-4 inline-block -mt-0.5 mr-2" /> Heuristic Audits
          </button>
          <button
            onClick={() => { setActiveTab('technical'); setIsMobileMenuOpen(false); }}
            className={`w-full text-left px-3.5 py-2.5 rounded-xl text-xs font-bold block ${activeTab === 'technical' ? 'bg-indigo-50 border border-indigo-200 text-indigo-700' : 'hover:bg-slate-50'}`}
          >
            <Cpu className="w-4 h-4 inline-block -mt-0.5 mr-2" /> Technical SEO
          </button>
          <button
            onClick={() => { setActiveTab('report'); setIsMobileMenuOpen(false); }}
            className={`w-full text-left px-3.5 py-2.5 rounded-xl text-xs font-bold block ${activeTab === 'report' ? 'bg-indigo-50 border border-indigo-200 text-indigo-700' : 'hover:bg-slate-50'}`}
          >
            <FileCheck className="w-4 h-4 inline-block -mt-0.5 mr-2" /> Report Builder
          </button>
        </div>
      )}

      {/* MAIN BODY CONTAINER WITH BENTO ALIGNMENT */}
      <main className="grow w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8" id="master-main-wrapper">
        
        {/* Dynamic Navigation Tabs content router */}
        {activeTab === 'dashboard' && (
          <DashboardHome 
            data={auditData} 
            onSelectPage={handleSelectPageFromDashboard} 
            onNavigate={handleNavFromDashboard}
          />
        )}

        {activeTab === 'pages' && (
          <PageAuditPanel 
            data={auditData} 
            selectedId={selectedPageId} 
            onSelectPage={setSelectedPageId}
          />
        )}

        {activeTab === 'technical' && (
          <PerformanceSEO 
            technicalSEO={technicalSEOAnalysis}
          />
        )}

        {activeTab === 'report' && (
          <ReportBuilder 
            data={auditData} 
            technicalSEO={technicalSEOAnalysis}
          />
        )}

      </main>

      {/* FOOTER SECTION */}
      <footer className="bg-slate-900 border-t border-slate-800 py-8 mt-16 text-slate-400 text-xs shrink-0" id="master-footer">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row justify-between items-center gap-4" id="footer-container">
          <div className="flex items-center gap-2" id="footer-creds">
            <span className="font-extrabold text-slate-300">InAmigos Audit Companion</span>
            <span className="w-1.5 h-1.5 rounded-full bg-indigo-400 animate-pulse"></span>
            <span>Developed for Academic Internship Portfolio Reviews</span>
          </div>
          <div className="flex items-center gap-1" id="footer-lic">
            <span>Constructed with dedication & precision</span> <Heart className="w-3.5 h-3.5 text-rose-500 inline fill-rose-500" /> <span>2026</span>
          </div>
        </div>
      </footer>
    </div>
  );
}
