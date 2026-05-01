"use client";
import { useEffect } from "react";

export default function PrivacyPage() {
  useEffect(() => {
    const now = new Date();
    const fmt = { year: "numeric", month: "long", day: "numeric" };
    const d = now.toLocaleDateString("en-KE", fmt);
    ["eff-date", "last-updated"].forEach((id) => {
      const el = document.getElementById(id);
      if (el) el.textContent = d;
    });
    const yr = document.getElementById("yr");
    if (yr) yr.textContent = now.getFullYear();
  }, []);

  return (
    <>
      <style>{`
        *{box-sizing:border-box;margin:0;padding:0}
        body{background:#f9f7f3;color:#18140f;font-family:'Outfit',sans-serif;font-weight:300;line-height:1.7}
        @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,700;1,700&family=Outfit:wght@300;400;500;600&display=swap');
        .nav{display:flex;justify-content:space-between;align-items:center;padding:0 40px;height:60px;border-bottom:1px solid #e2ddd8;background:rgba(249,247,243,0.95);backdrop-filter:blur(10px);position:sticky;top:0;z-index:100}
        .logo{font-family:'Cormorant Garamond',serif;font-size:22px;font-weight:700;color:#18140f;text-decoration:none}
        .logo i{color:#b5451b;font-style:italic}
        .back{font-size:13px;color:#4a4540;text-decoration:none;padding:7px 16px;border:1px solid #ccc8c2;border-radius:6px;background:#fff}
        .back:hover{border-color:#b5451b;color:#b5451b}
        .hero{background:#18140f;padding:56px 40px 48px}
        .hero-inner{max-width:800px;margin:0 auto}
        .tag{display:inline-block;background:rgba(181,69,27,0.15);border:1px solid rgba(181,69,27,0.3);color:#e8956d;font-size:11px;font-weight:600;letter-spacing:2px;text-transform:uppercase;padding:5px 14px;border-radius:100px;margin-bottom:20px}
        .hero h1{font-family:'Cormorant Garamond',serif;font-size:clamp(36px,5vw,58px);font-weight:700;color:#fff;letter-spacing:-1.5px;line-height:1.05;margin-bottom:14px}
        .hero h1 i{font-style:italic;color:#e8956d}
        .hero p{font-size:15px;color:#aaa;font-weight:300;max-width:560px;margin-bottom:24px}
        .meta{display:flex;gap:24px;flex-wrap:wrap}
        .meta-item{display:flex;flex-direction:column;gap:2px}
        .meta-label{font-size:10px;text-transform:uppercase;letter-spacing:1.5px;color:#666}
        .meta-value{font-size:13px;color:#ccc}
        .strip{background:#f0f4ff;border-bottom:1px solid #c5d5f0;padding:12px 40px}
        .strip-inner{max-width:800px;margin:0 auto;display:flex;align-items:center;gap:12px;flex-wrap:wrap}
        .badge{display:inline-flex;align-items:center;background:#1a4a8a;color:#fff;font-size:11px;font-weight:600;padding:4px 12px;border-radius:100px}
        .main{max-width:800px;margin:0 auto;padding:48px 40px 80px}
        .summary{background:#f0f4ff;border:1px solid #c5d5f0;border-radius:8px;padding:16px 20px;margin-bottom:40px;font-size:13px;color:#1a4a8a;line-height:1.7}
        .summary strong{font-weight:600}
        .section{margin-bottom:48px}
        .sec-num{font-size:11px;font-weight:600;letter-spacing:2px;text-transform:uppercase;color:#b5451b;margin-bottom:6px}
        .section h2{font-family:'Cormorant Garamond',serif;font-size:26px;font-weight:700;color:#18140f;letter-spacing:-0.5px;margin-bottom:14px;padding-bottom:12px;border-bottom:1px solid #e2ddd8}
        .section p{font-size:14px;color:#4a4540;line-height:1.8;margin-bottom:12px;font-weight:300}
        .section strong{font-weight:600;color:#18140f}
        .box{border-radius:8px;padding:14px 18px;margin:14px 0;font-size:13px;line-height:1.7}
        .box.blue{background:#f0f4ff;border:1px solid #c5d5f0;color:#1a4a8a}
        .box.red{background:#fff5f2;border:1px solid #f5c4b5;color:#7a2d10}
        .box.green{background:#f0faf4;border:1px solid #b7dfc7;color:#1a6b3c}
        .box.gray{background:#f0ede8;border:1px solid #e2ddd8;color:#4a4540}
        .box strong{font-weight:600}
        table{width:100%;border-collapse:collapse;margin:14px 0;font-size:13px}
        th{text-align:left;padding:9px 12px;background:#f0ede8;border:1px solid #e2ddd8;font-size:11px;font-weight:600;text-transform:uppercase;letter-spacing:1px;color:#4a4540}
        td{padding:10px 12px;border:1px solid #e2ddd8;font-size:13px;color:#4a4540;font-weight:300;vertical-align:top;line-height:1.5}
        tr:hover td{background:#f9f7f3}
        .badge-no{background:#f8d7da;color:#721c24;padding:2px 8px;border-radius:100px;font-size:10px;font-weight:600}
        .badge-limited{background:#fff3cd;color:#856404;padding:2px 8px;border-radius:100px;font-size:10px;font-weight:600}
        .rights{display:grid;grid-template-columns:1fr 1fr;gap:10px;margin:14px 0}
        .right{background:#fff;border:1px solid #e2ddd8;border-radius:10px;padding:14px}
        .right-icon{font-size:18px;margin-bottom:6px}
        .right-name{font-size:13px;font-weight:600;color:#18140f;margin-bottom:3px}
        .right-desc{font-size:12px;color:#9a948e;line-height:1.4;font-weight:300}
        .right-law{font-size:10px;color:#1a4a8a;margin-top:5px;font-weight:500}
        .tl{margin:14px 0}
        .tl-item{display:flex;gap:14px;padding:12px 0;border-bottom:1px solid #e2ddd8}
        .tl-item:last-child{border-bottom:none}
        .tl-dot{width:10px;height:10px;border-radius:50%;background:#b5451b;flex-shrink:0;margin-top:5px}
        .tl-text{font-size:13px;color:#4a4540;line-height:1.6;font-weight:300}
        .tl-text strong{font-weight:600;color:#18140f}
        .contact{background:#18140f;border-radius:12px;padding:24px 28px;margin-top:14px;display:grid;grid-template-columns:1fr 1fr;gap:16px}
        .cc-label{font-size:10px;text-transform:uppercase;letter-spacing:1.5px;color:#666;margin-bottom:4px}
        .cc-value{font-size:14px;color:#fff;font-weight:400}
        .cc-value a{color:#e8956d;text-decoration:none}
        .odpc{background:#f0f4ff;border:1px solid #c5d5f0;border-radius:10px;padding:18px 22px;margin-top:14px}
        .odpc-title{font-size:13px;font-weight:600;color:#1a4a8a;margin-bottom:8px}
        .odpc-desc{font-size:13px;color:#1a4a8a;font-weight:300;line-height:1.65}
        .odpc-desc a{color:#1a4a8a;font-weight:500}
        .footer{background:#18140f;padding:32px 40px;border-top:1px solid #222}
        .footer-inner{max-width:800px;margin:0 auto;display:flex;justify-content:space-between;align-items:center;flex-wrap:wrap;gap:14px}
        .footer-logo{font-family:'Cormorant Garamond',serif;font-size:20px;font-weight:700;color:#fff;text-decoration:none}
        .footer-logo i{color:#e8956d;font-style:italic}
        .footer-links{display:flex;gap:16px;flex-wrap:wrap}
        .footer-link{font-size:12px;color:#888;text-decoration:none}
        .footer-link:hover{color:#fff}
        .footer-legal{width:100%;text-align:center;font-size:11px;color:#444;font-weight:300;padding-top:14px;border-top:1px solid #2a2a2a;margin-top:14px}
        @media(max-width:700px){
          .nav{padding:0 18px}
          .hero{padding:40px 20px 36px}
          .strip{padding:12px 20px}
          .main{padding:36px 20px 60px}
          .rights{grid-template-columns:1fr}
          .contact{grid-template-columns:1fr;gap:12px}
          .footer{padding:24px 20px}
          .footer-inner{flex-direction:column;align-items:flex-start}
        }
        @media print{.nav,.footer{display:none}}
      `}</style>

      {/* NAV */}
      <nav className="nav">
        <a href="/" className="logo">Career<i>Boost</i></a>
        <a href="/" className="back">← Back to App</a>
      </nav>

      {/* HERO */}
      <div className="hero">
        <div className="hero-inner">
          <div className="tag">🛡️ Legal Document</div>
          <h1>Privacy <i>Policy</i></h1>
          <p>How CareerBoost Kenya collects, uses, and protects your personal data — fully compliant with the Kenya Data Protection Act No. 24 of 2019.</p>
          <div className="meta">
            <div className="meta-item"><span className="meta-label">Effective Date</span><span className="meta-value" id="eff-date"></span></div>
            <div className="meta-item"><span className="meta-label">Last Updated</span><span className="meta-value" id="last-updated"></span></div>
            <div className="meta-item"><span className="meta-label">Governing Law</span><span className="meta-value">Kenya DPA 2019, Constitution Art. 31</span></div>
            <div className="meta-item"><span className="meta-label">Controller</span><span className="meta-value">CareerBoost Kenya, Nairobi</span></div>
          </div>
        </div>
      </div>

      {/* COMPLIANCE STRIP */}
      <div className="strip">
        <div className="strip-inner">
          <span className="badge">✓ DPA 2019 Compliant</span>
          <span className="badge" style={{background:"#1a6b3c"}}>✓ Constitution Art. 31</span>
          <span className="badge" style={{background:"#6b4c1a"}}>✓ Consumer Protection Act 2012</span>
        </div>
      </div>

      {/* MAIN CONTENT */}
      <div className="main">
        <div className="summary">
          <strong>Plain English Summary:</strong> You paste your CV and a job description. We send it to Google Gemini AI which rewrites it. <strong>We never store your CV on our servers.</strong> When you close the page your data is gone. We do not sell your data. You have full rights under Kenyan law.
        </div>

        {/* S1 */}
        <div className="section" id="s1">
          <div className="sec-num">Section 01</div>
          <h2>Who We Are</h2>
          <p><strong>CareerBoost Kenya</strong> is a digital career services platform operating in Nairobi, Kenya. We are a <strong>data controller</strong> under the Kenya Data Protection Act No. 24 of 2019.</p>
          <div className="box gray">
            <strong>Data Controller:</strong> CareerBoost Kenya<br/>
            <strong>Address:</strong> Nairobi, Kenya<br/>
            <strong>Privacy Email:</strong> careerboostkenya598@gmail.com<br/>
            <strong>Regulator:</strong> Office of the Data Protection Commissioner (ODPC) — www.odpc.go.ke
          </div>
        </div>

        {/* S2 */}
        <div className="section" id="s2">
          <div className="sec-num">Section 02</div>
          <h2>What Data We Collect</h2>
          <p>We operate on a <strong>data minimisation principle</strong> — only collecting what is strictly necessary (DPA 2019, Section 25).</p>
          <table>
            <thead>
              <tr><th>Data Type</th><th>Stored?</th><th>Purpose</th></tr>
            </thead>
            <tbody>
              <tr><td><strong>CV / Resume content</strong></td><td><span className="badge-no">Not stored</span></td><td>Sent to Gemini AI — discarded after session</td></tr>
              <tr><td><strong>Job description</strong></td><td><span className="badge-no">Not stored</span></td><td>Sent to Gemini AI — discarded after session</td></tr>
              <tr><td><strong>Payment data</strong></td><td><span className="badge-no">Not stored by us</span></td><td>Processed by Lemon Squeezy only</td></tr>
              <tr><td><strong>Transaction records</strong></td><td><span className="badge-limited">7 years (tax law)</span></td><td>Kenya Revenue Authority compliance</td></tr>
              <tr><td><strong>Consent record</strong></td><td><span className="badge-limited">Browser only</span></td><td>DPA 2019 consent compliance</td></tr>
              <tr><td><strong>Usage analytics</strong></td><td><span className="badge-limited">Anonymised only</span></td><td>Service improvement — no personal identifiers</td></tr>
            </tbody>
          </table>
          <div className="box red"><strong>We do NOT collect:</strong> Your name, email, phone number, national ID, or location — unless you voluntarily include it in your CV text. We have no user accounts or login system.</div>
        </div>

        {/* S3 */}
        <div className="section" id="s3">
          <div className="sec-num">Section 03</div>
          <h2>How We Use Your Data</h2>
          <p>Under DPA 2019 Section 30 we must have a <strong>lawful basis</strong> for processing:</p>
          <div className="tl">
            <div className="tl-item"><div className="tl-dot"></div><div className="tl-text"><strong>Contractual Necessity</strong> — Your CV is processed by Gemini AI solely to provide the optimization service you requested.</div></div>
            <div className="tl-item"><div className="tl-dot"></div><div className="tl-text"><strong>Legal Obligation</strong> — Transaction records retained 7 years per Kenya Revenue Authority requirements.</div></div>
            <div className="tl-item"><div className="tl-dot"></div><div className="tl-text"><strong>Consent</strong> — Analytics only with your freely given consent (DPA 2019 Section 32). Withdraw anytime.</div></div>
            <div className="tl-item"><div className="tl-dot"></div><div className="tl-text"><strong>We will NEVER</strong> sell your data, use your CV for advertising, or share it with employers without your request.</div></div>
          </div>
        </div>

        {/* S4 */}
        <div className="section" id="s4">
          <div className="sec-num">Section 04</div>
          <h2>Data Retention</h2>
          <table>
            <thead><tr><th>Data</th><th>Retention</th><th>Reason</th></tr></thead>
            <tbody>
              <tr><td>CV content and job descriptions</td><td><strong>Zero — never stored</strong></td><td>In-memory only, discarded immediately</td></tr>
              <tr><td>Browser session data</td><td><strong>Until page is closed</strong></td><td>Your browser memory only</td></tr>
              <tr><td>Consent record</td><td><strong>Until you clear browser</strong></td><td>Local browser storage only</td></tr>
              <tr><td>Transaction records</td><td><strong>7 years</strong></td><td>Tax Procedures Act</td></tr>
              <tr><td>Anonymised analytics</td><td><strong>12 months then purged</strong></td><td>No personal identifiers retained</td></tr>
            </tbody>
          </table>
        </div>

        {/* S5 */}
        <div className="section" id="s5">
          <div className="sec-num">Section 05</div>
          <h2>Third-Party Processors</h2>
          <table>
            <thead><tr><th>Processor</th><th>Purpose</th><th>Data Shared</th><th>Location</th></tr></thead>
            <tbody>
              <tr><td><strong>Google Gemini API</strong></td><td>AI processing</td><td>CV text and job description only</td><td>USA / Global</td></tr>
              <tr><td><strong>Lemon Squeezy</strong></td><td>Payments</td><td>Payment details only — no CV data</td><td>USA</td></tr>
              <tr><td><strong>Vercel</strong></td><td>Hosting</td><td>Anonymised web logs only</td><td>Global CDN</td></tr>
              <tr><td><strong>Google Analytics</strong></td><td>Usage analytics</td><td>Anonymised events — no CV data</td><td>USA / Global</td></tr>
            </tbody>
          </table>
          <div className="box blue"><strong>Cross-border notice:</strong> Your CV is processed by Google outside Kenya. Permitted under DPA 2019 Section 48 as necessary for contract performance.</div>
        </div>

        {/* S6 */}
        <div className="section" id="s6">
          <div className="sec-num">Section 06</div>
          <h2>Your Rights Under DPA 2019</h2>
          <p>Email <strong>careerboostkenya598@gmail.com</strong> to exercise any right. We respond within <strong>14 days</strong> as required by the DPA General Regulations 2021.</p>
          <div className="rights">
            {[
              {icon:"👁️",name:"Right of Access",desc:"Request a copy of data we hold about you.",law:"DPA 2019, Section 39"},
              {icon:"✏️",name:"Rectification",desc:"Request correction of inaccurate data.",law:"DPA 2019, Section 40"},
              {icon:"🗑️",name:"Right to Erasure",desc:"Request deletion of your data within 14 days.",law:"DPA 2019, Section 40"},
              {icon:"📦",name:"Portability",desc:"Receive your data in a portable format.",law:"DPA 2019, Section 40"},
              {icon:"🚫",name:"Right to Object",desc:"Object to processing based on legitimate interests.",law:"DPA 2019, Section 40"},
              {icon:"⏸️",name:"Restriction",desc:"Request we limit processing of your data.",law:"DPA 2019, Section 40"},
              {icon:"🤖",name:"Automated Decisions",desc:"Right not to be subject to solely automated decisions.",law:"DPA 2019, Section 40"},
              {icon:"↩️",name:"Withdraw Consent",desc:"Withdraw consent anytime without affecting prior processing.",law:"DPA 2019, Section 32"},
            ].map((r,i)=>(
              <div key={i} className="right">
                <div className="right-icon">{r.icon}</div>
                <div className="right-name">{r.name}</div>
                <div className="right-desc">{r.desc}</div>
                <div className="right-law">{r.law}</div>
              </div>
            ))}
          </div>
          <div className="box green"><strong>Practical note:</strong> Since we do not store your CV content after your session, most requests will confirm no personal data is held.</div>
        </div>

        {/* S7 */}
        <div className="section" id="s7">
          <div className="sec-num">Section 07</div>
          <h2>Security Measures</h2>
          <div className="tl">
            <div className="tl-item"><div className="tl-dot"></div><div className="tl-text"><strong>HTTPS Encryption</strong> — All data transmission encrypted via TLS.</div></div>
            <div className="tl-item"><div className="tl-dot"></div><div className="tl-text"><strong>No Server Storage</strong> — CV data never stored on our servers. Data that does not exist cannot be breached.</div></div>
            <div className="tl-item"><div className="tl-dot"></div><div className="tl-text"><strong>Payment Security</strong> — Lemon Squeezy is PCI DSS compliant. We never see your card details.</div></div>
            <div className="tl-item"><div className="tl-dot"></div><div className="tl-text"><strong>Breach Response</strong> — We notify affected individuals and ODPC within 72 hours of any breach (DPA 2019).</div></div>
          </div>
        </div>

        {/* S8 */}
        <div className="section" id="s8">
          <div className="sec-num">Section 08</div>
          <h2>Children's Data</h2>
          <p>Our service is for adults seeking employment. <strong>We do not knowingly process data of persons under 18</strong> (DPA 2019, Section 33).</p>
          <div className="box red">If you are under 18 please do not use this service. Contact <strong>careerboostkenya598@gmail.com</strong> if you believe a child's data was submitted.</div>
        </div>

        {/* S9 */}
        <div className="section" id="s9">
          <div className="sec-num">Section 09</div>
          <h2>Cross-Border Data Transfers</h2>
          <p>Your CV is transmitted to Google Gemini API servers outside Kenya. This is permitted under DPA 2019 Section 48 as strictly necessary for contract performance.</p>
          <div className="box blue"><strong>Your protection:</strong> Google does not use API data to train models without explicit opt-in. Data is processed transiently and not retained after the API response is returned.</div>
        </div>

        {/* S10 */}
        <div className="section" id="s10">
          <div className="sec-num">Section 10</div>
          <h2>Cookies and Local Storage</h2>
          <table>
            <thead><tr><th>Item</th><th>Type</th><th>Purpose</th><th>Duration</th></tr></thead>
            <tbody>
              <tr><td><strong>cb_consent</strong></td><td>localStorage</td><td>Records that you accepted our privacy notice</td><td>Until you clear browser data</td></tr>
            </tbody>
          </table>
          <p>We do <strong>not</strong> use advertising cookies, tracking pixels, or any non-essential cookies.</p>
  
