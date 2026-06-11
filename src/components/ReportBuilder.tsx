import { useState, useRef } from 'react';
import { ScreenshotData } from '../data/auditData';
import inamigosLogo from '../assets/images/inamigos_logo_1779708827859.png';
import { Check, Clipboard, Download, Edit3, Eye, FileText, RefreshCw } from 'lucide-react';

interface ReportBuilderProps {
  data: ScreenshotData[];
  technicalSEO: any;
}

export default function ReportBuilder({ data, technicalSEO }: ReportBuilderProps) {
  const [activeTab, setActiveTab] = useState<'preview' | 'raw'>('preview');
  const [copiedEntire, setCopiedEntire] = useState(false);
  const [studentName, setStudentName] = useState('NGO Portfolio Intern');
  const [academicInstitution, setAcademicInstitution] = useState('School of Design & Creative Technologies');
  const [submissionDate, setSubmissionDate] = useState('2026-05-25');
  const [projectName, setProjectName] = useState('InAmigos Foundation Usability Audit');

  const richTextRef = useRef<HTMLDivElement>(null);

  // Compile the entire professional markdown report
  const compileMarkdownReport = () => {
    let report = `# FOUNDATION WEBSITE IMPROVEMENT ANALYSIS REPORT
**Academic Portfolio Assignment: Heuristic Evaluation & Design Optimization**

---

### METADATA PROFILE
*   **Project Title:** Website Usability Audit and Design Transformation Roadmap
*   **Target Charity:** InAmigos Foundation (inamigosfoundation.org.in)
*   **Prepared By:** ${studentName}
*   **Academic Affiliate:** ${academicInstitution}
*   **Date of Submission:** ${submissionDate}
*   **Scope:** UI Alignment, UX Friction Point Analysis, Trust & compliance, Performance Optimization

---

## EXECUTIVE SUMMARY
This professional audit offers a comprehensive evaluation of the online platforms operated by the **InAmigos Foundation**. The evaluation was conducted during an internship assignment focusing on identifying design friction, improving trust indicators, and optimizing performance. 

By applying industry-standard heuristic frameworks, this analysis identifies four critical operational layouts that hinder user interaction and corporate sponsorship. It maps a detailed roadmap to upgrade the foundation's design language, elevate credibility, secure registrations (80G/12A/NGO Darpan), and implement modern technical specifications.

---

`;

    data.forEach((screen, index) => {
      report += `## SECTION ${index + 1}: ${screen.title.toUpperCase()}
*Target Domain Coordinate: ${screen.url}*

### 1. Visual/UI Review
${screen.analysis.visualUI.replace(/### \d\. Visual\/UI Review\n/, '')}

### 2. User Experience (UX) & Friction Points
${screen.analysis.uxFriction.replace(/### \d\. User Experience \(UX\) \& Friction Points\n/, '')}

### 3. Content & Trust Analysis
${screen.analysis.trustContent.replace(/### \d\. Content \& Trust Analysis\n/, '')}

### 4. Actionable Suggestions for Improvement
${screen.analysis.suggestions.map((s, idx) => `*   **Recommendation ${idx + 1}:** ${s}`).join('\n')}

---

`;
    });

    // Append Technical Evaluation
    report += `## SECTION 5: TECHNICAL PERFORMANCE & SEO SUMMARY
Based on standard layout sizes, image configurations, and network structures observed across the operational live site.

### 1. ${technicalSEO.webpCompression.title}
*   **Current Performance State:** ${technicalSEO.webpCompression.rating} (Impact: ${technicalSEO.webpCompression.impact})
*   **Heuristic Assessment:** ${technicalSEO.webpCompression.current}
*   **Actionable Implementation Strategy:** ${technicalSEO.webpCompression.recommendation}

### 2. ${technicalSEO.responsiveness.title}
*   **Current Performance State:** ${technicalSEO.responsiveness.rating} (Impact: ${technicalSEO.responsiveness.impact})
*   **Heuristic Assessment:** ${technicalSEO.responsiveness.current}
*   **Actionable Implementation Strategy:** ${technicalSEO.responsiveness.recommendation}

### 3. ${technicalSEO.pageSpeed.title}
*   **Current Performance State:** ${technicalSEO.pageSpeed.rating} (Impact: ${technicalSEO.pageSpeed.impact})
*   **Heuristic Assessment:** ${technicalSEO.pageSpeed.current}
*   **Actionable Implementation Strategy:** ${technicalSEO.pageSpeed.recommendation}

### 4. ${technicalSEO.trustSignals.title}
*   **Current Performance State:** ${technicalSEO.trustSignals.rating} (Impact: ${technicalSEO.trustSignals.impact})
*   **Heuristic Assessment:** ${technicalSEO.trustSignals.current}
*   **Actionable Implementation Strategy:** ${technicalSEO.trustSignals.recommendation}

---

## CONCLUSION
By addressing these aesthetic misalignments, streamlining registration flows, and adding verified Trust Badges, the InAmigos Foundation can establish a professional web presence. These changes will build stronger connections with individual volunteers and secure larger corporate social responsibility (CSR) sponsorships.
`;

    return report;
  };

  const markdownReportText = compileMarkdownReport();

  const handleCopyMarkdown = () => {
    navigator.clipboard.writeText(markdownReportText);
    setCopiedEntire(true);
    setTimeout(() => setCopiedEntire(false), 2000);
  };

  const handleCopyRichText = () => {
    if (richTextRef.current) {
      const type = 'text/html';
      const blob = new Blob([richTextRef.current.innerHTML], { type });
      const data = [new ClipboardItem({ [type]: blob })];
      
      navigator.clipboard.write(data).then(() => {
        setCopiedEntire(true);
        setTimeout(() => setCopiedEntire(false), 2000);
      });
    }
  };

  const handleDownloadMarkdown = () => {
    const element = document.createElement('a');
    const file = new Blob([markdownReportText], { type: 'text/plain' });
    element.href = URL.createObjectURL(file);
    element.download = 'inamigos_website_audit_report.md';
    document.body.appendChild(element);
    element.click();
    document.body.removeChild(element);
  };

  return (
    <div className="space-y-8 animate-fade-in" id="report-builder-root">
      <div>
        <h2 className="text-xl font-extrabold text-slate-900 tracking-tight font-sans">Structured Report Exporter</h2>
        <p className="text-sm text-slate-500 font-medium font-sans">Customise authorship metadata card below, then copy results in Markdown or Rich Text formatted lines.</p>
      </div>

      {/* Student Informational Profile Inputs card in Bento outline pattern */}
      <div className="bg-white border-2 border-slate-950 rounded-2xl p-6 shadow-[4px_4px_0px_0px_rgba(15,23,42,1)]" id="metadata-customizer">
        <h4 className="font-extrabold text-slate-900 text-sm mb-4 flex items-center gap-1.5"><Edit3 className="w-4 h-4 text-indigo-600" /> Complete Report Cover Metadata</h4>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4" id="metadata-inputs-grid">
          <div className="space-y-1.5">
            <label className="text-[10px] font-bold text-slate-700 uppercase tracking-wider block font-mono">Your Full Name</label>
            <input
              type="text"
              value={studentName}
              onChange={(e) => setStudentName(e.target.value)}
              className="border border-slate-200 focus:border-indigo-600 focus:ring-2 focus:ring-indigo-100 p-2 text-xs text-slate-800 bg-white rounded-lg w-full outline-hidden transition-all font-sans"
            />
          </div>
          <div className="space-y-1.5">
            <label className="text-[10px] font-bold text-slate-700 uppercase tracking-wider block font-mono">Affiliation / Institution</label>
            <input
              type="text"
              value={academicInstitution}
              onChange={(e) => setAcademicInstitution(e.target.value)}
              className="border border-slate-200 focus:border-indigo-600 focus:ring-2 focus:ring-indigo-100 p-2 text-xs text-slate-800 bg-white rounded-lg w-full outline-hidden transition-all font-sans"
            />
          </div>
          <div className="space-y-1.5">
            <label className="text-[10px] font-bold text-slate-700 uppercase tracking-wider block font-mono">Submission Date</label>
            <input
              type="date"
              value={submissionDate}
              onChange={(e) => setSubmissionDate(e.target.value)}
              className="border border-slate-200 focus:border-indigo-600 focus:ring-2 focus:ring-indigo-100 p-2 text-xs text-slate-800 bg-white rounded-lg w-full outline-hidden transition-all font-mono"
            />
          </div>
          <div className="space-y-1.5">
            <label className="text-[10px] font-bold text-slate-700 uppercase tracking-wider block font-mono">Assignment Title</label>
            <input
              type="text"
              value={projectName}
              onChange={(e) => setProjectName(e.target.value)}
              className="border border-slate-200 focus:border-indigo-600 focus:ring-2 focus:ring-indigo-100 p-2 text-xs text-slate-800 bg-white rounded-lg w-full outline-hidden transition-all font-sans"
            />
          </div>
        </div>
      </div>

      {/* Editor Toggler Controls bar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-200 pb-3" id="builder-nav-tabs">
        <div className="flex gap-2 bg-slate-100 p-1.5 rounded-2xl border border-slate-200 self-start" id="builder-mode-selectors">
          <button
            onClick={() => setActiveTab('preview')}
            className={`px-3.5 py-2 rounded-xl text-xs font-bold flex items-center gap-1.5 cursor-pointer transition-all ${
              activeTab === 'preview' 
                ? 'bg-white text-indigo-700 border border-slate-900 shadow-[2px_2px_0px_0px_rgba(15,23,42,1)] font-extrabold' 
                : 'text-slate-600 hover:text-slate-950 bg-transparent'
            }`}
          >
            <Eye className="w-3.5 h-3.5" /> Formatted Layout
          </button>
          <button
            onClick={() => setActiveTab('raw')}
            className={`px-3.5 py-2 rounded-xl text-xs font-bold flex items-center gap-1.5 cursor-pointer transition-all ${
              activeTab === 'raw' 
                ? 'bg-white text-indigo-700 border border-slate-900 shadow-[2px_2px_0px_0px_rgba(15,23,42,1)] font-extrabold' 
                : 'text-slate-600 hover:text-slate-950 bg-transparent'
            }`}
          >
            <FileText className="w-3.5 h-3.5" /> Raw Markdown Source
          </button>
        </div>

        <div className="flex flex-wrap gap-2.5" id="exporter-controls">
          <button
            onClick={handleCopyMarkdown}
            className="px-4 py-2 bg-slate-900 hover:bg-slate-800 text-white border border-slate-950 rounded-xl text-xs font-bold shadow-xs flex items-center gap-1.5 cursor-pointer transition-colors"
            id="btn-copy-md"
          >
            <Clipboard className="w-3.5 h-3.5" /> Copy Markdown
          </button>
          <button
            onClick={handleCopyRichText}
            className="px-4 py-2 bg-indigo-650 hover:bg-indigo-705 text-white border-2 border-slate-900 shadow-[2px_2px_0px_0px_rgba(15,23,42,1)] rounded-xl text-xs font-extrabold flex items-center gap-1.5 cursor-pointer transition-all"
            id="btn-copy-rich"
          >
            {copiedEntire ? <Check className="w-3.5 h-3.5 text-white" /> : <Clipboard className="w-3.5 h-3.5" />}
            Copy for MS Word / PDF
          </button>
          <button
            onClick={handleDownloadMarkdown}
            className="px-4 py-2 bg-white hover:bg-slate-50 text-slate-800 border border-slate-200 rounded-xl text-xs font-bold shadow-xs flex items-center gap-1.5 cursor-pointer transition-colors"
            id="btn-download-md"
          >
            <Download className="w-3.5 h-3.5" /> Download File
          </button>
        </div>
      </div>

      {/* Copy Alert Badge Indicator */}
      {copiedEntire && (
        <div className="bg-indigo-50 border border-indigo-150 p-3.5 rounded-xl text-xs text-indigo-800 text-center font-bold animate-pulse" id="copied-toast">
          🎉 Document content copied to clipboard successfully! Select your target document template and hit (Ctrl+V) or (Cmd+V) to insert.
        </div>
      )}

      {/* Worksheets Frame Canvas Area */}
      <div className="bg-slate-100 p-6 rounded-2xl border border-slate-200 max-h-[600px] overflow-y-auto" id="document-frame">
        {activeTab === 'preview' ? (
          /* RICH TEXT A4 PREVIEW INTERFACE */
          <div 
            ref={richTextRef}
            className="max-w-3xl mx-auto bg-white p-8 md:p-12 shadow-xl border-2 border-slate-900 rounded-2xl text-slate-800 text-xs space-y-6 select-text font-sans"
            id="formatted-doc-body"
          >
            {/* Report Header Logo Cover */}
            <div className="text-center pb-6 border-b-2 border-slate-900 space-y-3" id="doc-title-section">
              <div className="flex justify-center mb-2" id="doc-logo-container">
                <img 
                  src={inamigosLogo} 
                  alt="InAmigos Foundation" 
                  className="h-16 object-contain" 
                  id="doc-logo-img"
                  referrerPolicy="no-referrer"
                />
              </div>
              <h1 className="text-xl font-black tracking-tight text-slate-900 uppercase font-sans m-0">InAmigos Foundation Website</h1>
              <h2 className="text-lg font-black text-indigo-650 m-0">Improvement Analysis Assessment Portfolio</h2>
              <span className="text-[9px] font-mono font-bold tracking-widest text-slate-400 block mt-1 uppercase">Heuristic Usability Integrity Audit Portfolio</span>
            </div>

            {/* Document metadata table */}
            <div className="grid grid-cols-2 gap-4 bg-slate-50 p-4 border border-slate-200 rounded-xl text-[11px] font-sans" id="doc-metadata-subtable">
              <div>
                <span className="font-bold text-slate-400 block text-[9px] uppercase font-mono">Assignment Subject</span>
                <span className="font-extrabold text-slate-800 text-xs">{projectName}</span>
              </div>
              <div>
                <span className="font-bold text-slate-400 block text-[9px] uppercase font-mono">Prepared By</span>
                <span className="font-extrabold text-slate-800 text-xs">{studentName}</span>
              </div>
              <div>
                <span className="font-bold text-slate-400 block text-[9px] uppercase font-mono">Affiliated Entity</span>
                <span className="font-extrabold text-slate-800 text-xs">{academicInstitution}</span>
              </div>
              <div>
                <span className="font-bold text-slate-400 block text-[9px] uppercase font-mono">Audit Benchmark Date</span>
                <span className="font-extrabold text-[#111827] text-xs font-mono">{submissionDate}</span>
              </div>
            </div>

            <hr className="border-slate-200 m-0" />

            {/* Introduction Overview block */}
            <div className="space-y-2 font-sans" id="doc-intro">
              <h3 className="text-sm font-black text-slate-900 uppercase m-0 tracking-tight">Introduction & Scope of Audit</h3>
              <p className="text-[11.5px] leading-relaxed text-slate-600 m-0 font-medium">
                This document serves as an exhaustive, heuristics-grounded web design evaluation covering the critical user interface (UI) templates, registration workflows, trust anchors, and assets compression models across the public domain portals of the <strong>InAmigos Foundation</strong> (inamigosfoundation.org.in).
              </p>
              <p className="text-[11.5px] leading-relaxed text-slate-600 m-0 font-medium">
                Using visual evidence extracted from target screenshot layouts, this analysis identifies UI gaps that contribute to user friction. It provides actionable solutions to build trust and update the site's design language, helping the NGO connect with individual volunteers and secure corporate social responsibility (CSR) sponsorships.
              </p>
            </div>

            {/* Iterated Screenshots analyses */}
            {data.map((screen, sIdx) => (
              <div key={screen.id} className="space-y-4 pt-4 border-t border-slate-100 font-sans" id={`doc-section-${screen.id}`}>
                <h3 className="text-sm font-black text-slate-900 uppercase m-0 tracking-tight">
                  Section {sIdx + 1}: {screen.title}
                </h3>
                <span className="text-[9.5px] font-mono text-slate-400 block m-0">Audit Target: {screen.url}</span>

                {/* UI Review Text block */}
                <div className="space-y-1.5" id={`doc-ui-${screen.id}`}>
                  <h4 className="text-xs font-bold text-slate-800 m-0">1. Visual & UI Review</h4>
                  <div className="text-[11px] text-slate-600 leading-relaxed whitespace-pre-wrap pl-3 border-l-2 border-indigo-400">
                    {screen.analysis.visualUI.replace(/### \d\. Visual\/UI Review\n/, '')}
                  </div>
                </div>

                {/* UX Review */}
                <div className="space-y-1.5" id={`doc-ux-${screen.id}`}>
                  <h4 className="text-xs font-bold text-slate-800 m-0">2. User Experience (UX) & Friction Points</h4>
                  <div className="text-[11px] text-slate-600 leading-relaxed whitespace-pre-wrap pl-3 border-l-2 border-orange-400 font-sans">
                    {screen.analysis.uxFriction.replace(/### \d\. User Experience \(UX\) \& Friction Points\n/, '')}
                  </div>
                </div>

                {/* Trust and Compliance */}
                <div className="space-y-1.5" id={`doc-trust-${screen.id}`}>
                  <h4 className="text-xs font-bold text-slate-800 m-0">3. Content & Trust Analysis</h4>
                  <div className="text-[11px] text-slate-600 leading-relaxed whitespace-pre-wrap pl-3 border-l-2 border-green-400">
                    {screen.analysis.trustContent.replace(/### \d\. Content \& Trust Analysis\n/, '')}
                  </div>
                </div>

                {/* Actionable recommendations lists */}
                <div className="space-y-1.5" id={`doc-recs-${screen.id}`}>
                  <h4 className="text-xs font-bold text-slate-800 m-0">4. Actionable Suggestions for Improvement</h4>
                  <ul className="list-decimal pl-5 text-[11px] text-slate-600 space-y-1 m-0 font-medium">
                    {screen.analysis.suggestions.map((suggestion, rIdx) => (
                      <li key={rIdx}>{suggestion}</li>
                    ))}
                  </ul>
                </div>
              </div>
            ))}

            {/* Technical SEO Summary Section of Document */}
            <div className="space-y-4 pt-6 border-t font-sans" id="doc-section-seo">
              <h3 className="text-sm font-black text-slate-900 uppercase m-0 tracking-tight">Section 5: Technical Performance & SEO Assessment</h3>
              <p className="text-[11px] leading-relaxed text-slate-600 m-0">
                Below is a checklist evaluating performance metrics like mobile layout scaling, asset optimization, and structured metadata based on the static viewport layouts.
              </p>

              {/* Grid of SEO items in Doc preview */}
              <div className="space-y-4" id="doc-seo-items font-sans">
                {Object.values(technicalSEO).map((item: any, idx: number) => (
                  <div key={idx} className="p-4 bg-slate-50 border border-slate-200 rounded-xl text-[11px]" id={`doc-seo-item-${idx}`}>
                    <span className="font-extrabold text-slate-900 block mb-1">5.{idx + 1} {item.title}</span>
                    <div className="grid grid-cols-2 gap-2 text-[10px] pl-2 border-l border-indigo-500">
                      <div>
                        <strong>Heuristic Grade:</strong> <span className="text-amber-700 font-bold">{item.rating} (Impact: {item.impact})</span>
                      </div>
                      <div>
                        <strong>Assessment:</strong> {item.current}
                      </div>
                      <div className="col-span-2 mt-1.5 pt-1.5 border-t border-slate-200">
                        <strong>Recommendation Roadmap:</strong> {item.recommendation}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Document Signature Sign-Off */}
            <div className="pt-8 border-t-2 border-slate-800 flex justify-between items-center text-xs text-slate-500" id="doc-signoff text-slate-400">
              <span className="font-medium font-sans">Prepared for Academic Portfolio Placement Evaluation</span>
              <span className="font-mono text-[10px]">InAmigos Website Audit Framework (v1.0)</span>
            </div>
          </div>
        ) : (
          /* RAW MARKDOWN CODE FIELD */
          <div className="max-w-2xl mx-auto space-y-3" id="raw-markdown-editor">
            <span className="text-[10px] font-mono uppercase tracking-widest text-slate-500 font-bold block">Editable Raw Report Draft</span>
            <textarea
              readOnly
              value={markdownReportText}
              className="w-full h-[500px] border-2 border-slate-900 rounded-2xl bg-white p-4 font-mono text-xs text-slate-700 focus:ring-2 focus:ring-indigo-100 leading-relaxed outline-hidden select-all shadow-[4px_4px_0px_0px_rgba(15,23,42,1)]"
            />
            <p className="text-[10.5px] text-slate-500 font-sans">
              💡 Use (Ctrl+A) and then (Ctrl+C) inside the textarea, or click the Copy buttons in the top right to export. Your authorship inputs are compiled into this markdown dynamically.
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
