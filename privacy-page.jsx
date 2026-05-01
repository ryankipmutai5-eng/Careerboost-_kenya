"use client";
import { useEffect } from "react";

export default function PrivacyPage() {
  useEffect(() => {
    // Set dynamic dates
    const now = new Date();
    const fmt = { year: "numeric", month: "long", day: "numeric" };
    const dateStr = now.toLocaleDateString("en-KE", fmt);
    const yearStr = now.getFullYear().toString();

    const effDate = document.getElementById("eff-date");
    const lastUp  = document.getElementById("last-updated");
    const year    = document.getElementById("year");

    if (effDate) effDate.textContent = dateStr;
    if (lastUp)  lastUp.textContent  = dateStr;
    if (year)    year.textContent    = yearStr;

    // TOC scroll highlighting
    const sections = document.querySelectorAll(".section[id]");
    const tocItems  = document.querySelectorAll(".toc-item");

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const id = entry.target.getAttribute("id");
            tocItems.forEach((item) => {
              item.classList.remove("active");
              if (item.querySelector(`a[href="#${id}"]`)) {
                item.classList.add("active");
              }
            });
          }
        });
      },
      { rootMargin: "-20% 0px -70% 0px" }
    );

    sections.forEach((s) => observer.observe(s));
    return () => observer.disconnect();
  }, []);

  return (
    <>
      <style>{`
        *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
        @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,400;0,600;0,700;1,400;1,700&family=Outfit:wght@300;400;500;600&display.swap');
        :root {
          --bg:#f9f7f3; --ink:#18140f; --ink2:#4a4540; --ink3:#9a948e;
          --red:#b5451b; --red-lt:#e8956d; --red-pale:#fff5f2;
          --surface:#ffffff; --surface2:#f0ede8;
          --border:#e2ddd8; --border2:#ccc8c2;
          --blue:#1a4a8a; --blue-pale:#f0f4ff; --green:#1a6b3c;
        }
        html { scroll-behavior: smooth; }
        body { background:var(--bg); color:var(--ink); font-family:'Outfit',sans-serif; font-weight:300; line-height:1.7; min-height:100vh; }
        .nav { display:flex; justify-content:space-between; align-items:center; padding:0 48px; height:62px; border-bottom:1px solid var(--border); background:rgba(249,247,243,0.95); backdrop-filter:blur(10px); position:sticky; top:0; z-index:100; }
        .logo { font-family:'Cormorant Garamond',serif; font-size:22px; font-weight:700; color:var(--ink); text-decoration:none; }
        .logo i { color:var(--red); font-style:italic; }
        .logo sub { font-family:'Outfit',sans-serif; font-size:10px; color:var(--ink3); font-weight:400; vertical-align:baseline; margin-left:2px; }
        .nav-back { display:inline-flex; align-items:center; gap:6px; font-size:13px; font-weight:500; color:var(--ink2); text-decoration:none; padding:7px 16px; border:1px solid var(--border2); border-radius:6px; background:var(--surface); transition:all 0.15s; }
        .nav-back:hover { border-color:var(--red); color:var(--red); }
        .hero-band { background:var(--ink); padding:56px 48px 48px; position:relative; overflow:hidden; }
        .hero-band::before { content:'PRIVACY'; position:absolute; right:-20px; top:50%; transform:translateY(-50%); font-family:'Cormorant Garamond',serif; font-size:180px; font-weight:700; color:rgba(255,255,255,0.03); letter-spacing:-6px; line-height:1; pointer-events:none; user-select:none; }
        .hero-band-inner { max-width:820px; margin:0 auto; position:relative; }
        .hero-tag { display:inline-flex; align-items:center; gap:8px; background:rgba(181,69,27,0.15); border:1px solid rgba(181,69,27,0.3); color:var(--red-lt); font-size:11px; font-weight:600; letter-spacing:2px; text-transform:uppercase; padding:5px 14px; border-radius:100px; margin-bottom:20px; }
        .hero-band h1 { font-family:'Cormorant Garamond',serif; font-size:clamp(38px,5vw,60px); font-weight:700; color:#fff; letter-spacing:-1.5px; line-height:1.05; margin-bottom:16px; }
        .hero-band h1 i { font-style:italic; color:var(--red-lt); }
        .hero-band p { font-size:15px; color:#aaa; font-weight:300; line-height:1.7; max-width:560px; margin-bottom:28px; }
        .meta-row { display:flex; gap:20px; flex-wrap:wrap; }
        .meta-item { display:flex; flex-direction:column; gap:2px; }
        .meta-label { font-size:10px; text-transform:uppercase; letter-spacing:1.5px; color:#666; }
        .meta-value { font-size:13px; color:#ccc; font-weight:400; }
        .compliance-strip { background:var(--blue-pale); border-bottom:1px solid #c5d5f0; padding:14px 48px; }
        .compliance-inner { max-width:820px; margin:0 auto; display:flex; align-items:center; gap:16px; flex-wrap:wrap; }
        .compliance-badge { display:inline-flex; align-items:center; gap:6px; background:var(--blue); color:#fff; font-size:11px; font-weight:600; letter-spacing:0.5px; padding:4px 12px; border-radius:100px; }
        .compliance-text { font-size:12px; color:var(--blue); font-weight:400; }
        .page { max-width:820px; margin:0 auto; padding:56px 48px 80px; display:grid; grid-template-columns:220px 1fr; gap:48px; align-items:start; }
        .toc { position:sticky; top:80px; }
        .toc-title { font-size:10px; font-weight:600; letter-spacing:2px; text-transform:uppercase; color:var(--ink3); margin-bottom:14px; }
        .toc-list { list-style:none; }
        .toc-item { border-left:2px solid var(--border); padding:7px 0 7px 14px; transition:border-color 0.15s; }
        .toc-item:hover { border-color:var(--red); }
        .toc-item.active { border-color:var(--red); }
        .toc-link { font-size:12px; color:var(--ink3); text-decoration:none; font-weight:400; display:block; transition:color 0.15s; line-height:1.4; }
        .toc-link:hover { color:var(--red); }
        .toc-item.active .toc-link { color:var(--red); font-weight:500; }
        .toc-contact { margin-top:24px; padding:16px; background:var(--red-pale); border:1px solid #f5c4b5; border-radius:8px; }
        .toc-contact-label { font-size:10px; text-transform:uppercase; letter-spacing:1.5px; color:var(--red); font-weight:600; margin-bottom:8px; }
        .toc-contact p { font-size:12px; color:var(--ink2); line-height:1.6; }
        .toc-contact a { color:var(--red); text-decoration:none; font-weight:500; }
        .section { margin-bottom:52px; animation:fadeUp 0.5s ease both; }
        @keyframes fadeUp { from{opacity:0;transform:translateY(14px)} to{opacity:1;transform:translateY(0)} }
        .section-num { font-family:'Cormorant Garamond',serif; font-size:13px; color:var(--red); font-weight:600; letter-spacing:1px; margin-bottom:6px; text-transform:uppercase; }
        .section h2 { font-family:'Cormorant Garamond',serif; font-size:28px; font-weight:700; color:var(--ink); letter-spacing:-0.5px; margin-bottom:16px; line-height:1.1; padding-bottom:14px; border-bottom:1px solid var(--border); }
        .section p { font-size:14px; color:var(--ink2); line-height:1.8; margin-bottom:14px; font-weight:300; }
        .section strong { font-weight:600; color:var(--ink); }
        .highlight { border-radius:8px; padding:16px 20px; margin:18px 0; font-size:13px; line-height:1.7; }
        .highlight.blue { background:var(--blue-pale); border:1px solid #c5d5f0; color:var(--blue); }
        .highlight.red  { background:var(--red-pale); border:1px solid #f5c4b5; color:#7a2d10; }
        .highlight.green { background:#f0faf4; border:1px solid #b7dfc7; color:var(--green); }
        .highlight.gray { background:var(--surface2); border:1px solid var(--border); color:var(--ink2); }
        .highlight strong { font-weight:600; }
        .data-table { width:100%; border-collapse:collapse; margin:18px 0; font-size:13px; }
        .data-table th { text-align:left; padding:10px 14px; background:var(--surface2); border:1px solid var(--border); font-size:11px; font-weight:600; text-transform:uppercase; letter-spacing:1px; color:var(--ink2); }
        .data-table td { padding:11px 14px; border:1px solid var(--border); font-size:13px; color:var(--ink2); font-weight:300; vertical-align:top; line-height:1.55; }
        .data-table tr:hover td { background:var(--surface2); }
        .badge { display:inline-block; padding:2px 8px; border-radius:100px; font-size:10px; font-weight:600; letter-spacing:0.5px; }
        .badge-yes { background:#d4edda; color:#155724; }
        .badge-no  { background:#f8d7da; color:#721c24; }
        .badge-limited { background:#fff3cd; color:#856404; }
        .rights-grid { display:grid; grid-template-columns:1fr 1fr; gap:12px; margin:18px 0; }
        .right-card { background:var(--surface); border:1px solid var(--border); border-radius:10px; padding:16px; transition:border-color 0.15s; }
        .right-card:hover { border-color:var(--blue); }
        .right-card-icon { font-size:20px; margin-bottom:8px; }
        .right-card-name { font-size:13px; font-weight:600; color:var(--ink); margin-bottom:4px; }
        .right-card-desc { font-size:12px; color:var(--ink3); line-height:1.5; font-weight:300; }
        .right-card-law  { font-size:10px; color:var(--blue); margin-top:6px; font-weight:500; }
        .tp-table { width:100%; border-collapse:collapse; margin:18px 0; }
        .tp-table th { text-align:left; padding:10px 14px; background:var(--surface2); border:1px solid var(--border); font-size:11px; font-weight:600; text-transform:uppercase; letter-spacing:1px; color:var(--ink2); }
        .tp-table td { padding:11px 14px; border:1px solid var(--border); font-size:12px; color:var(--ink2); font-weight:300; vertical-align:top; line-height:1.55; }
        .contact-card { background:var(--ink); border-radius:12px; padding:28px 32px; margin-top:18px; display:grid; grid-template-columns:1fr 1fr; gap:20px; }
        .cc-label { font-size:10px; text-transform:uppercase; letter-spacing:1.5px; color:#666; margin-bottom:5px; }
        .cc-value { font-size:14px; color:#fff; font-weight:400; }
        .cc-value a { color:var(--red-lt); text-decoration:none; }
        .odpc-box { background:var(--blue-pale); border:1px solid #c5d5f0; border-radius:10px; padding:20px 24px; margin-top:18px; }
        .odpc-title { font-size:13px; font-weight:600; color:var(--blue); margin-bottom:10px; }
        .odpc-desc { font-size:13px; color:var(--blue); font-weight:300; line-height:1.65; }
        .odpc-desc a { color:var(--blue); font-weight:500; }
        .timeline { margin:18px 0; }
        .tl-item { display:flex; gap:16px; padding:14px 0; border-bottom:1px solid var(--border); }
        .tl-item:last-child { border-bottom:none; }
        .tl-dot { width:10px; height:10px; border-radius:50%; background:var(--red); flex-shrink:0; margin-top:6px; }
        .tl-text { font-size:13px; color:var(--ink2); line-height:1.6; font-weight:300; }
        .tl-text strong { font-weight:600; color:var(--ink); }
        .footer { background:var(--ink); padding:36px 48px; border-top:1px solid #222; }
        .footer-inner { max-width:820px; margin:0 auto; display:flex; justify-content:space-between; align-items:center; flex-wrap:wrap; gap:16px; }
        .footer-logo { font-family:'Cormorant Garamond',serif; font-size:20px; font-weight:700; color:#fff; text-decoration:none; }
        .footer-logo i { color:var(--red-lt); font-style:italic; }
        .footer-links { display:flex; gap:18px; flex-wrap:wrap; }
        .footer-link { font-size:12px; color:#888; text-decoration:none; transition:color 0.15s; }
        .footer-link:hover { color:#fff; }
        .footer-legal { width:100%; text-align:center; font-size:11px; color:#444; font-weight:300; padding-top:16px; border-top:1px solid #2a2a2a; margin-top:16px; }
        @media (max-width:820px) {
          .nav { padding:0 18px; }
          .hero-band { padding:40px 20px 36px; }
          .compliance-strip { padding:12px 20px; }
          .page { grid-template-columns:1fr; padding:36px 20px 60px; gap:0; }
          .toc { display:none; }
          .contact-card { grid-template-columns:1fr; gap:14px; }
          .rights-grid { grid-template-columns:1fr; }
          .footer { padding:28px 20px; }
          .footer-inner { flex-direction:column; align-items:flex-start; }
        }
        @media print {
          .nav, .toc, .footer { display:none; }
          .page { grid-template-columns:1fr; }
          body { background:white; }
        }
      `}</style>

      {/* NAV */}
      <nav className="nav">
        <a href="/" className="logo">Career<i>Boost</i><sub>Kenya 🇰🇪</sub></a>
        <a href="/" className="nav-back">← Back to App</a>
      </nav>

      {/* HERO */}
      <div className="hero-band">
        <div className="hero-band-inner">
          <div className="hero-tag">🛡️ Legal Document</div>
          <h1>Privacy <i>Policy</i></h1>
          <p>How CareerBoost Kenya collects, uses, and protects your personal data — in full compliance with the Kenya Data Protection Act No. 24 of 2019.</p>
          <div className="meta-row">
            <div className="meta-item"><span className="meta-label">Effective Date</span><span className="meta-value" id="eff-date"></span></div>
            <div className="meta-item"><span className="meta-label">Last Updated</span><span className="meta-value" id="last-updated"></span></div>
            <div className="meta-item"><span className="meta-label">Governing Law</span><span className="meta-value">Kenya DPA 2019, Constitution Art. 31</span></div>
            <div className="meta-item"><span className="meta-label">Controller</span><span className="meta-value">CareerBoost Kenya, Nairobi</span></div>
          </div>
        </div>
      </div>

      {/* COMPLIANCE STRIP */}
      <div className="compliance-strip">
        <div className="compliance-inner">
          <span className="compliance-badge">✓ DPA 2019 Compliant</span>
          <span className="compliance-badge" style={{background:"#1a6b3c"}}>✓ Constitution Art. 31</span>
          <span className="compliance-badge" style={{background:"#6b4c1a"}}>✓ Consumer Protection Act 2012</span>
          <span className="compliance-text">This policy meets all requirements of Kenya's data protection framework.</span>
        </div>
      </div>

      {/* PAGE */}
      <div className="page">
        {/* TOC */}
        <aside className="toc">
          <div className="toc-title">Contents</div>
          <ul className="toc-list">
            {["Who We Are","Data We Collect","How We Use It","Data Retention","Third Parties","Your Rights","Security","Children","Cross-Border Transfers","Cookies","Changes","Contact & Complaints"].map((t,i)=>(
              <li key={i} className="toc-item"><a className="toc-link" href={`#s${i+1}`}>{i+1}. {t}</a></li>
            ))}
          </ul>
          <div className="toc-contact">
            <div className="toc-contact-label">Privacy Contact</div>
            <p><strong>CareerBoost Kenya</strong><br/><a href="mailto:careerboostkenya598@gmail.com">careerboostkenya598@gmail.com</a><br/>Nairobi, Kenya<br/><br/><strong>ODPC (regulator)</strong><br/><a href="https://www.odpc.go.ke" target="_blank">www.odpc.go.ke</a></p>
          </div>
        </aside>

        {/* CONTENT */}
        <main>
          <div className="highlight blue" style={{marginBottom:36}}>
            <strong>Summary (Plain English):</strong> You paste your CV and a job description. We send that to Google Gemini AI which rewrites it. <strong>We never store your CV on our servers.</strong> When you close the page, your data is gone. We don't sell your data. You have full rights under Kenyan law.
          </div>

          {/* S1 */}
          <div className="section" id="s1">
            <div className="section-num">Section 01</div>
            <h2>Who We Are</h2>
            <p><strong>CareerBoost Kenya</strong> is a digital career services platform operating in Nairobi, Kenya. We are a <strong>data controller</strong> under the Kenya Data Protection Act No. 24 of 2019.</p>
            <div className="highlight gray"><strong>Data Controller:</strong> CareerBoost Kenya<br/><strong>Address:</strong> Nairobi, Kenya<br/><strong>Privacy Email:</strong> careerboostkenya598@gmail.com<br/><strong>Regulatory Body:</strong> ODPC — <a href="https://www.odpc.go.ke" target="_blank">www.odpc.go.ke</a></div>
          </div>

          {/* S2 */}
          <div className="section" id="s2">
            <div className="section-num">Section 02</div>
            <h2>What Data We Collect</h2>
            <p>We operate on a <strong>data minimisation principle</strong> — only what is strictly necessary (DPA 2019, Section 25).</p>
            <table className="data-table">
              <thead><tr><th>Data Type</th><th>What it includes</th><th>Stored?</th><th>Purpose</th></tr></thead>
              <tbody>
                <tr><td><strong>CV / Resume</strong></td><td>Work history, education, skills you paste</td><td><span className="badge badge-no">Not stored</span></td><td>Sent to Gemini AI — discarded after session</td></tr>
                <tr><td><strong>Job description</strong></td><td>Job advert text you paste</td><td><span className="badge badge-no">Not stored</span></td><td>Sent to Gemini AI — discarded after session</td></tr>
                <tr><td><strong>Payment data</strong></td><td>Card details, billing address</td><td><span className="badge badge-no">Not stored by us</span></td><td>Processed by Lemon Squeezy only</td></tr>
                <tr><td><strong>Transaction records</strong></td><td>Transaction ID, amount, date</td><td><span className="badge badge-limited">7 years (tax law)</span></td><td>Kenya Revenue Authority compliance</td></tr>
                <tr><td><strong>Consent record</strong></td><td>When you accepted this policy</td><td><span className="badge badge-limited">Browser only</span></td><td>DPA 2019 consent compliance</td></tr>
              </tbody>
            </table>
            <div className="highlight red"><strong>We do NOT collect:</strong> Your name, email, phone number, national ID, or location unless you voluntarily include it in your CV text.</div>
          </div>

          {/* S3 */}
          <div className="section" id="s3">
            <div className="section-num">Section 03</div>
            <h2>How We Use Your Data</h2>
            <p>Under DPA 2019 Section 30 we must have a <strong>lawful basis</strong> for processing:</p>
            <div className="timeline">
              <div className="tl-item"><div className="tl-dot"></div><div className="tl-text"><strong>Contractual Necessity</strong> — Your CV is processed by Gemini AI solely to provide the optimization you requested.</div></div>
              <div className="tl-item"><div className="tl-dot"></div><div className="tl-text"><strong>Legal Obligation</strong> — Transaction records retained 7 years per Kenya Revenue Authority requirements.</div></div>
              <div className="tl-item"><div className="tl-dot"></div><div className="tl-text"><strong>Consent</strong> — Analytics only with your freely given consent (DPA 2019 Section 32). Withdraw anytime.</div></div>
              <div className="tl-item"><div className="tl-dot"></div><div className="tl-text"><strong>We will NEVER</strong> sell your data, use your CV for advertising, or share it with employers without your request.</div></div>
            </div>
          </div>

          {/* S4 */}
          <div className="section" id="s4">
            <div className="section-num">Section 04</div>
            <h2>Data Retention</h2>
            <table className="data-table">
              <thead><tr><th>Data</th><th>Retention</th><th>Reason</th></tr></thead>
              <tbody>
                <tr><td>CV content & job descriptions</td><td><strong>Zero — never stored</strong></td><td>In-memory only, discarded immediately</td></tr>
                <tr><td>Browser se
