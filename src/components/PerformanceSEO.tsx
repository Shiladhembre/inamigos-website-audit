import { useState } from 'react';
import { Check, Copy, Cpu, FileCode, HelpCircle, Layout, RefreshCw, Server, Smartphone } from 'lucide-react';

interface PerformanceSEOProps {
  technicalSEO: any;
}

export default function PerformanceSEO({ technicalSEO }: PerformanceSEOProps) {
  const [copiedCode, setCopiedCode] = useState<string | null>(null);
  const [activeTab, setActiveTab] = useState<'webp' | 'mobile' | 'speed' | 'trust'>('webp');

  const handleCopyCode = (id: string, code: string) => {
    navigator.clipboard.writeText(code);
    setCopiedCode(id);
    setTimeout(() => setCopiedCode(null), 2000);
  };

  const codeSnippets = {
    webp: `<!-- Proposed Modern Responsive Image Loading with WebP Fallback -->
<picture>
  <!-- Load high-performance custom compressed .webp assets -->
  <source srcset="/assets/udaan-banner-mobile.webp 600w,
                  /assets/udaan-banner-tablet.webp 1200w,
                  /assets/udaan-banner-desktop.webp 2000w"
          sizes="(max-width: 600px) 100vw, (max-width: 1200px) 80vw, 100vw"
          type="image/webp" />

  <!-- Standard high-resolution traditional fallback with lazy load settings -->
  <img src="/assets/udaan-banner-fallback.jpg"
       alt="Smiling schoolchildren of Udaan educational model initiative"
       loading="lazy"
       decoding="async"
       class="w-full h-full object-cover rounded-xl filter contrast-[1.05] brightness-95" />
</picture>`,
    
    mobile: `/* Tailwind Responsive CSS Grid Specifications supporting Fluid Widths */
<div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 p-4 md:p-6 w-full max-w-7xl mx-auto">
  <!-- Interactive Project Cards -->
  <div class="group bg-white rounded-2xl border border-slate-100 shadow-sm hover:translate-y-[-4px] hover:shadow-md transition-all duration-300 overflow-hidden">
    <!-- Card Picture -->
    <div class="h-48 md:h-52 bg-slate-900 relative">
      <img src="project-image.webp" class="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" loading="lazy" />
      <span class="absolute left-3 bottom-3 px-2.5 py-1 bg-slate-900/80 text-emerald-400 text-[10px] font-bold rounded-full filter backdrop-blur-md">Community Support</span>
    </div>
  </div>
</div>`,

    speed: `# Proposed .htaccess Cache Configuration settings (Asset Weight Control)
<IfModule mod_expires.c>
  ExpiresActive On
  # Compress and cache WebP images and icons for 1 year
  ExpiresByType image/webp "access plus 1 year"
  ExpiresByType image/png "access plus 1 year"
  ExpiresByType image/jpg "access plus 1 year"
  ExpiresByType image/jpeg "access plus 1 year"
  ExpiresByType image/svg+xml "access plus 1 month"
  # Compress CSS and Javascript elements
  ExpiresByType text/css "access plus 1 month"
  ExpiresByType application/javascript "access plus 1 month"
</IfModule>`,

    trust: `<!-- JSON-LD Charity Certification Structured Schema Metadata -->
<script type="application/ld+json">
{
  "@context": "https://schema.org",
  "@type": "NGO",
  "name": "InAmigos Foundation",
  "url": "http://inamigosfoundation.org.in",
  "logo": "http://inamigosfoundation.org.in/logo.png",
  "description": "ISO 9001:2015 Accredited NGO, licensed under Central Government with 80G and 12A educational compliance certifications.",
  "address": {
    "@type": "PostalAddress",
    "addressCountry": "IN"
  },
  "taxID": "80G Certified / 12A Certified / CSR-1 Registered",
  "parentOrganization": {
    "@type": "NGO",
    "name": "NITI Aayog DARPAN Registered ID: IN/2025/xxxxx"
  }
}
</script>`
  };

  const tabsInfo = {
    webp: {
      title: "webpCompression",
      metric: "Image Packaging",
      score: 35,
      impact: "High",
      icon: Cpu,
      snippet: codeSnippets.webp,
      lang: "html"
    },
    mobile: {
      title: "responsiveness",
      metric: "Responsiveness Grid",
      score: 48,
      impact: "High",
      icon: Smartphone,
      snippet: codeSnippets.mobile,
      lang: "html"
    },
    speed: {
      title: "pageSpeed",
      metric: "Asset Weight speed",
      score: 42,
      impact: "Critical",
      icon: Server,
      snippet: codeSnippets.speed,
      lang: "apache"
    },
    trust: {
      title: "trustSignals",
      metric: "SEO Trust schemas",
      score: 50,
      impact: "High",
      icon: FileCode,
      snippet: codeSnippets.trust,
      lang: "html"
    }
  };

  const currentTab = tabsInfo[activeTab];
  const auditItem = technicalSEO[currentTab.title];

  return (
    <div className="space-y-8 animate-fade-in" id="performance-seo-root">
      <div>
        <h2 className="text-xl font-extrabold text-slate-900 tracking-tight font-sans">Diagnostics & Technical SEO Analyzer</h2>
        <p className="text-sm text-slate-500 font-medium font-sans">Dive deeper into core asset optimization, viewport grids, and schema templates supporting academic proposals.</p>
      </div>

      {/* PageSpeed Style Scoring Dial Grid */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4" id="google-speed-grid">
        {Object.entries(tabsInfo).map(([key, info]) => {
          const ScoreIcon = info.icon;
          const isActive = activeTab === key;

          return (
            <button
              key={key}
              onClick={() => setActiveTab(key as any)}
              className={`bg-white rounded-2xl p-5 border text-left cursor-pointer flex flex-col justify-between transition-all ${
                isActive 
                  ? 'border-2 border-slate-950 shadow-[4px_4px_0px_0px_rgba(15,23,42,1)] scale-[1.01]' 
                  : 'border-slate-200 hover:border-slate-800 hover:shadow-xs'
              }`}
              id={`tab-seo-${key}`}
            >
              <div className="flex justify-between items-start" id={`tab-header-${key}`}>
                <span className="text-[10px] font-mono tracking-wider font-extrabold text-slate-400 uppercase">
                  {info.impact} Impact
                </span>
                <ScoreIcon className={`w-4 h-4 ${isActive ? 'text-indigo-650' : 'text-slate-400'}`} />
              </div>

              <div className="my-3 flex items-center gap-3.5" id={`tab-performance-${key}`}>
                <div className={`w-12 h-12 rounded-full border-2 flex items-center justify-center font-bold font-mono text-sm ${
                  info.score < 40 
                    ? 'text-red-500 border-red-200 bg-red-50' 
                    : 'text-amber-500 border-amber-250 bg-amber-50'
                }`}>
                  {info.score}%
                </div>
                <div>
                  <span className="block text-xs font-extrabold text-slate-800 font-sans">{info.metric}</span>
                  <span className="text-[10px] text-slate-400 font-mono">Current Grade</span>
                </div>
              </div>
            </button>
          );
        })}
      </div>

      {/* Main Diagnostic Split View */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8" id="diagnostic-split-grid">
        {/* Left Hand: Diagnostic metrics & evaluations (5 cols) */}
        <div className="lg:col-span-5 space-y-6" id="critical-diagnostics-column">
          <div className="bg-white border-2 border-slate-950 rounded-2xl p-6 shadow-[4px_4px_0px_0px_rgba(15,23,42,1)] space-y-5" id="diagnostic-result-card">
            <div>
              <span className="text-[10px] font-mono tracking-widest text-[#059669] font-bold block mb-1 font-sans">Diagnostic Report</span>
              <h3 className="text-lg font-black text-slate-900 font-sans leading-tight">{auditItem.title}</h3>
              <p className="text-xs text-slate-500 font-sans mt-0.5">Detailed heuristic categorization representing core interface trust drivers</p>
            </div>

            <div className="space-y-3.5" id="diagnostic-body">
              <div className="p-4 bg-red-50/50 border border-red-100 rounded-xl" id="diagnostic-current-bug">
                <span className="text-[9px] font-bold text-red-500 uppercase block mb-1 font-mono">Observed Flaw / Friction</span>
                <p className="text-xs text-slate-700 leading-relaxed font-semibold font-sans">{auditItem.current}</p>
              </div>

              <div className="p-4 bg-indigo-50/50 border border-indigo-100 rounded-xl" id="diagnostic-solution-fix">
                <span className="text-[9px] font-bold text-indigo-600 uppercase block mb-1 font-mono">Recommended Optimization Roadmap</span>
                <p className="text-xs text-slate-700 leading-relaxed font-sans font-medium">{auditItem.recommendation}</p>
              </div>
            </div>

            <div className="border-t border-slate-200 pt-4 flex justify-between items-center text-xs text-slate-500" id="diagnostic-footer">
              <span className="font-sans">Severity impact: <strong className="text-red-500 text-xs font-extrabold uppercase font-mono">{auditItem.impact}</strong></span>
              <span className="font-mono text-[10px]">Metric Target Code</span>
            </div>
          </div>
        </div>

        {/* Right Hand: Structured CSS / HTML implementation snippets (7 cols) */}
        <div className="lg:col-span-7 space-y-4" id="sample-code-column">
          <div className="flex justify-between items-center" id="code-header-bar">
            <span className="text-xs font-bold text-slate-500 uppercase tracking-widest flex items-center gap-1.5">
              <FileCode className="w-4 h-4 text-indigo-650" id="header-logo-icon" /> Proposed Implementation Code Snippet
            </span>
            <button
              onClick={() => handleCopyCode(activeTab, currentTab.snippet)}
              className="px-3 py-1.5 bg-slate-900 hover:bg-slate-850 text-white rounded-lg text-xs font-bold flex items-center gap-1 cursor-pointer transition-colors border border-slate-950"
              id="btn-copy-snippet"
            >
              {copiedCode === activeTab ? <Check className="w-3.5 h-3.5 text-white" /> : <Copy className="w-3.5 h-3.5" />}
              {copiedCode === activeTab ? 'Copied' : 'Copy Snippet'}
            </button>
          </div>

          <div className="border-2 border-slate-950 bg-slate-900 rounded-2xl overflow-hidden shadow-[4px_4px_0px_0px_rgba(15,23,42,1)]" id="snippet-viewer">
            {/* Window controls */}
            <div className="bg-slate-850 px-4 py-2 border-b border-slate-800 flex items-center gap-2" id="snippet-os-bar">
              <span className="w-2.5 h-2.5 rounded-full bg-red-500 block"></span>
              <span className="w-2.5 h-2.5 rounded-full bg-yellow-500 block"></span>
              <span className="w-2.5 h-2.5 rounded-full bg-green-500 block"></span>
              <span className="text-[10px] text-slate-400 font-mono ml-2">proposed_solution.{currentTab.lang === 'html' ? 'html' : currentTab.lang === 'apache' ? 'htaccess' : 'json'}</span>
            </div>
            {/* Print Code segment */}
            <pre className="p-4 overflow-x-auto font-mono text-[11px] leading-relaxed text-slate-300 max-h-[320px]" id="raw-code-print">
              <code>{currentTab.snippet}</code>
            </pre>
          </div>

          <p className="text-[10.5px] text-slate-500 font-sans text-center leading-normal">
            💡 Simply insert these proposed structural codes directly into the website's project manifest configurations to accomplish the audited Heuristic target.
          </p>
        </div>
      </div>
    </div>
  );
}
