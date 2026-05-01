"use client";
import { useState, useRef, useEffect } from "react";

// ─── CONFIG ───────────────────────────────────────────────────────────────────
const GEMINI_API_KEY   = "process.env.NEXT_PUBLIC_GEMINI_API_KEY;";
const LS_PRO_LINK      = "https://getoptimized.lemonsqueezy.com/checkout/buy/fd3c4a1c-4f8a-4892-91aa-1198c10030f2";
const LS_CREDITS_LINK  = "https://getoptimized.lemonsqueezy.com/checkout/buy/4c83e847-d814-43e7-846b-ffd9e28d98a3";
const BUSINESS_NAME    = "CareerBoost Kenya";
const BUSINESS_EMAIL   = "careerboostkenya598@gmail.com";
const BUSINESS_ADDRESS = "Nairobi, Kenya";
// ─────────────────────────────────────────────────────────────────────────────

// ─── GOOGLE ANALYTICS ────────────────────────────────────────────────────────
const GA_ID = "G-C9Y2JRLNX5"; // Google Analytics Measurement ID
                               // Get it free at: analytics.google.com

// Track any event — call this anywhere in the app
const trackEvent = (eventName, params = {}) => {
  try {
    if (typeof window !== "undefined" && window.gtag) {
      window.gtag("event", eventName, {
        app_name: "CareerBoost Kenya",
        ...params,
      });
    }
    // Also log to console during development so you can see events firing
    console.log(`[Analytics] ${eventName}`, params);
  } catch (e) {
    // Fail silently — never break the app for analytics
  }
};
// ─────────────────────────────────────────────────────────────────────────────

// ─── AI PROMPTS ───────────────────────────────────────────────────────────────
const PROMPTS = {
  cv: `You are an elite CV/resume writer specializing in the Kenyan job market with 15+ years of experience. You understand Kenyan employers: NGOs, banks (Equity, KCB, Stanbic), tech firms (Safaricom, Twiga), government, and international organizations.

Key Kenyan CV rules:
- Max 2-3 pages, clean format
- Include referees section (Kenyan standard)
- Highlight certifications (CPA, ACCA, PMP are gold in Kenya)
- Lead with strong professional summary
- Quantify everything — Kenyan recruiters scan for numbers
- Mirror the exact keywords from the job description for ATS

Output in this EXACT format:

---OPTIMIZED CV---
[Full rewritten CV]

---COVER LETTER---
[3-paragraph cover letter, under 300 words, confident and professional]

---ANALYSIS---
BEFORE_SCORE: [1-100]
AFTER_SCORE: [1-100]
KEYWORDS: [keyword1, keyword2, keyword3]
TIP1: [specific tip for the Kenyan market]
TIP2: [specific tip for the Kenyan market]`,

  ngo: `You are an expert in NGO and UN job applications in Kenya and East Africa. You know exactly how UNDP, UNICEF, World Vision, Mercy Corps hire.

Rules:
- Results-based language is MANDATORY
- Reference SDGs, M&E frameworks, log frames where applicable
- Quantify beneficiaries, budgets managed, project outcomes
- Cover letter must show understanding of the organization's mandate

Output in this EXACT format:

---OPTIMIZED CV---
[Full NGO/UN-ready CV]

---COVER LETTER---
[NGO cover letter referencing the organization's Kenya mandate]

---ANALYSIS---
BEFORE_SCORE: [1-100]
AFTER_SCORE: [1-100]
KEYWORDS: [keyword1, keyword2, keyword3]
TIP1: [NGO-specific tip]
TIP2: [NGO-specific tip]`,

  interview: `You are a Kenyan interview coach. You understand: ubuntu philosophy in interviews, competency-based interviewing, Kenyan corporate culture at banks/NGOs/tech firms.

Given the job description and CV, generate:
1. Top 10 interview questions for this specific role in Kenya
2. STAR format answers for the 3 hardest questions (with Kenyan cultural notes)
3. 3 smart questions the candidate should ask
4. KES salary range for this role and negotiation tips

Output in this EXACT format:

---INTERVIEW QUESTIONS---
[10 numbered questions]

---MODEL ANSWERS---
[3 STAR-format answers]

---QUESTIONS TO ASK---
[3 questions to ask the interviewer]

---SALARY GUIDE---
[KES salary range and negotiation advice]`,

  linkedin: `You are a LinkedIn expert for the Kenyan and East African market. LinkedIn is critical for Silicon Savannah tech roles and NGO networking.

Given the job description and CV, produce:
1. An optimized headline (120 chars max)
2. A full About/Summary section (first-person, keyword-rich)
3. Top 10 skills to add
4. 3 tips for their experience section

Output in this EXACT format:

---LINKEDIN HEADLINE---
[Optimized headline]

---LINKEDIN ABOUT---
[Full about section]

---TOP SKILLS---
[10 skills, comma separated]

---EXPERIENCE TIPS---
[3 specific tips]`
};

// ─── LEGAL DOCUMENTS ──────────────────────────────────────────────────────────
const PRIVACY_POLICY = `PRIVACY POLICY
${BUSINESS_NAME} | Effective Date: ${new Date().toLocaleDateString('en-KE', {year:'numeric',month:'long',day:'numeric'})}

1. WHO WE ARE
${BUSINESS_NAME} ("we", "us", "our") is a software service operating in Kenya. We are committed to protecting your personal data in accordance with the Kenya Data Protection Act No. 24 of 2019 (DPA 2019) and Article 31 of the Constitution of Kenya 2010.

Contact: ${BUSINESS_EMAIL} | ${BUSINESS_ADDRESS}

2. WHAT DATA WE COLLECT
We process only the data you voluntarily provide:
• CV/resume content you paste into the optimizer
• Job descriptions you paste
• Usage data (which tools you use, how many times)
• Payment information (processed by Lemon Squeezy — we do not store card details)

We do NOT collect: your name, email, phone number, national ID, or any other identifying information unless you voluntarily share it in your CV text.

3. HOW WE USE YOUR DATA
Your CV and job description data is:
• Sent to Google Gemini API for AI processing (see section 5)
• NOT stored on our servers after your session ends
• NOT used to train AI models
• NOT sold, shared, or disclosed to third parties

We process your data on the lawful basis of: CONTRACTUAL NECESSITY (to provide the optimization service you requested).

4. DATA RETENTION
• Session data (CV text, job descriptions): Deleted immediately when you close or refresh the page. We do not retain this data.
• Payment records: Retained by Lemon Squeezy per their policies. We retain transaction IDs for 7 years as required by Kenyan tax law.
• Usage analytics: Aggregated and anonymized. No personal identifiers retained.

5. THIRD-PARTY PROCESSORS
Your CV data is processed by:
• Google Gemini API (Google LLC, USA) — for AI optimization. Google processes this data under their API Terms of Service. Cross-border transfer is permitted under DPA 2019 Section 48 as necessary for contract performance.
• Lemon Squeezy (payments) — processes payment data under their own privacy policy. No CV data is shared with Lemon Squeezy.

6. YOUR RIGHTS UNDER DPA 2019
You have the right to:
✓ ACCESS — Request confirmation of what data we hold about you
✓ RECTIFICATION — Request correction of inaccurate data
✓ ERASURE — Request deletion of your data (Right to be Forgotten)
✓ RESTRICTION — Request we limit processing of your data
✓ PORTABILITY — Receive your data in a portable format
✓ OBJECT — Object to processing based on legitimate interests
✓ WITHDRAW CONSENT — At any time, without affecting prior processing

To exercise any right, email: ${BUSINESS_EMAIL}
We will respond within 14 days as required by the DPA General Regulations 2021.

7. DATA SECURITY
We implement appropriate technical and organisational measures including:
• HTTPS encryption for all data transmission
• No server-side storage of CV content
• API key protection
• Regular security reviews

8. CHILDREN'S DATA
Our service is not directed at persons under 18. We do not knowingly process data of minors (DPA 2019, Section 33).

9. COMPLAINTS
If you believe we have violated your data rights, you may:
• Contact us first at: ${BUSINESS_EMAIL}
• Lodge a complaint with the Office of the Data Protection Commissioner (ODPC): www.odpc.go.ke

10. CHANGES TO THIS POLICY
We will notify users of material changes via a notice on our platform. Continued use constitutes acceptance of the updated policy.`;

const TERMS_OF_SERVICE = `TERMS OF SERVICE
${BUSINESS_NAME} | Effective Date: ${new Date().toLocaleDateString('en-KE', {year:'numeric',month:'long',day:'numeric'})}

PLEASE READ THESE TERMS CAREFULLY BEFORE USING OUR SERVICE.

1. ACCEPTANCE OF TERMS
By using ${BUSINESS_NAME} ("Service"), you agree to these Terms of Service and our Privacy Policy. If you do not agree, do not use the Service. These terms constitute a binding agreement under Kenyan law.

2. SERVICE DESCRIPTION
${BUSINESS_NAME} provides an AI-powered CV optimization, cover letter writing, interview preparation, and LinkedIn optimization tool designed for the Kenyan job market. The Service uses Google Gemini AI to process and improve career documents.

3. IMPORTANT DISCLAIMER — PLEASE READ
THE SERVICE PROVIDES SUGGESTIONS AND ASSISTANCE ONLY. WE DO NOT GUARANTEE:
• That optimized CVs will result in job interviews or employment
• The accuracy, completeness, or suitability of AI-generated content
• That content meets any specific employer's requirements
• Results for any particular job application

You are solely responsible for reviewing all AI-generated content before submitting it to employers. Always verify that the content is accurate and represents you truthfully.

4. YOUR OBLIGATIONS
You agree to:
✓ Provide accurate information in your CV and job descriptions
✓ Review all AI-generated content for accuracy before use
✓ Not misrepresent qualifications or experience in your CV
✓ Use the Service only for lawful purposes
✓ Not attempt to reverse-engineer, copy, or resell the Service

You must NOT:
✗ Submit false or fabricated information
✗ Use the Service to create fraudulent documents
✗ Attempt to access the Service's systems without authorization
✗ Violate any Kenyan law in connection with use of the Service

5. CONSUMER RIGHTS (Consumer Protection Act, 2012)
In accordance with the Consumer Protection Act No. 46 of 2012:
• You have the right to services of reasonable quality
• You have the right to accurate information about our service
• You have the right to seek redress for poor service quality
• We will not engage in false, misleading, or deceptive representations

6. PAYMENTS AND REFUNDS
• All payments are processed securely by Lemon Squeezy
• Prices are displayed in USD with KES equivalents for reference
• Pro subscriptions renew monthly and can be cancelled at any time
• Credit packs are non-refundable once used
• Unused credit packs may be refunded within 7 days of purchase — contact ${BUSINESS_EMAIL}
• We reserve the right to change pricing with 30 days notice to active subscribers

7. INTELLECTUAL PROPERTY
• You retain full ownership of your CV content and personal information
• AI-generated suggestions are provided for your personal use only
• The CareerBoost platform, design, and technology are our intellectual property

8. LIMITATION OF LIABILITY
TO THE MAXIMUM EXTENT PERMITTED BY KENYAN LAW:
• Our liability is limited to the amount you paid for the Service in the preceding month
• We are not liable for indirect, consequential, or special damages
• We are not liable for decisions made by employers or hiring managers
• We are not liable for any job application outcomes

This limitation does not affect your statutory consumer rights under the Consumer Protection Act 2012.

9. GOVERNING LAW AND DISPUTES
These Terms are governed by the laws of Kenya. Any disputes shall be resolved:
1. First through good-faith negotiation (contact: ${BUSINESS_EMAIL})
2. Then through mediation if negotiation fails
3. Finally through the courts of Kenya, specifically the courts in Nairobi

For disputes below KES 1,000,000, you may use the Small Claims Court.

10. CHANGES TO TERMS
We may update these Terms with 30 days notice. Continued use after notice constitutes acceptance.

11. CONTACT
${BUSINESS_NAME} | ${BUSINESS_EMAIL} | ${BUSINESS_ADDRESS}`;

// ─── STYLES ───────────────────────────────────────────────────────────────────
const CSS = `
  @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,600;0,700;1,600;1,700&family=Outfit:wght@300;400;500;600&display=swap');
  *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
  :root {
    --bg:#f9f7f3; --ink:#18140f; --ink2:#4a4540; --ink3:#9a948e;
    --red:#b5451b; --red-lt:#e8956d; --red-pale:#fff5f2;
    --green:#1a6b3c; --green-pale:#f0faf4;
    --surface:#ffffff; --surface2:#f0ede8;
    --border:#e2ddd8; --border2:#ccc8c2;
    --blue:#1a4a8a; --blue-pale:#f0f4ff;
  }
  html { scroll-behavior: smooth; }
  body { background:var(--bg); color:var(--ink); font-family:'Outfit',sans-serif; font-weight:300; min-height:100vh; }
  body::after { content:''; position:fixed; inset:0; background-image:url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='200' height='200'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.8' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='200' height='200' filter='url(%23n)' opacity='0.02'/%3E%3C/svg%3E"); pointer-events:none; z-index:9999; }

  /* NAV */
  .nav { display:flex; justify-content:space-between; align-items:center; padding:0 48px; height:62px; border-bottom:1px solid var(--border); background:rgba(249,247,243,0.94); backdrop-filter:blur(10px); position:sticky; top:0; z-index:200; }
  .logo { font-family:'Cormorant Garamond',serif; font-size:22px; font-weight:700; color:var(--ink); }
  .logo i { color:var(--red); font-style:italic; }
  .logo sub { font-family:'Outfit',sans-serif; font-size:10px; color:var(--ink3); font-weight:400; vertical-align:baseline; margin-left:2px; }
  .nav-right { display:flex; align-items:center; gap:10px; }
  .pill { display:inline-flex; align-items:center; gap:5px; padding:4px 13px; border-radius:100px; font-size:12px; font-weight:500; border:1px solid var(--border2); background:var(--surface); color:var(--ink2); }
  .pill.pro { border-color:var(--red); color:var(--red); background:var(--red-pale); }
  .pill .dot { width:6px; height:6px; border-radius:50%; background:currentColor; }

  /* BUTTONS */
  .btn { display:inline-flex; align-items:center; justify-content:center; gap:8px; padding:9px 20px; border-radius:6px; font-family:'Outfit',sans-serif; font-size:13px; font-weight:500; cursor:pointer; transition:all 0.18s; border:none; white-space:nowrap; }
  .btn-red { background:var(--red); color:#fff; }
  .btn-red:hover { background:#9a3a16; transform:translateY(-1px); box-shadow:0 4px 14px rgba(181,69,27,0.28); }
  .btn-green { background:var(--green); color:#fff; }
  .btn-green:hover { background:#155c33; transform:translateY(-1px); }
  .btn-blue { background:var(--blue); color:#fff; }
  .btn-blue:hover { background:#143a6e; transform:translateY(-1px); }
  .btn-outline { background:var(--surface); color:var(--ink); border:1px solid var(--border2); }
  .btn-outline:hover { border-color:var(--red); color:var(--red); }
  .btn-ghost { background:none; border:none; color:var(--ink3); font-family:'Outfit',sans-serif; font-size:13px; cursor:pointer; text-decoration:underline; padding:6px 0; }
  .btn-ghost:hover { color:var(--ink); }
  .btn:disabled { opacity:0.45; cursor:not-allowed; transform:none !important; box-shadow:none !important; }
  .btn-lg { padding:13px 32px; font-size:15px; border-radius:8px; }
  .btn-sm { padding:6px 14px; font-size:12px; }

  /* CONSENT BANNER */
  .consent-banner { position:fixed; bottom:0; left:0; right:0; background:var(--ink); color:#fff; z-index:1000; padding:20px 48px; display:flex; align-items:center; justify-content:space-between; gap:20px; flex-wrap:wrap; box-shadow:0 -4px 24px rgba(0,0,0,0.15); }
  .consent-text { font-size:13px; color:#ccc; font-weight:300; line-height:1.6; max-width:700px; }
  .consent-text strong { color:#fff; font-weight:500; }
  .consent-text a { color:var(--red-lt); cursor:pointer; text-decoration:underline; }
  .consent-btns { display:flex; gap:10px; flex-shrink:0; }

  /* HERO */
  .hero { max-width:1100px; margin:0 auto; padding:64px 48px 56px; display:grid; grid-template-columns:1fr 380px; gap:56px; align-items:center; }
  .eyebrow { display:flex; align-items:center; gap:10px; font-size:11px; font-weight:600; letter-spacing:2px; text-transform:uppercase; color:var(--red); margin-bottom:20px; }
  .eyebrow-bar { width:24px; height:1.5px; background:var(--red); }
  .hero h1 { font-family:'Cormorant Garamond',serif; font-size:clamp(44px,5vw,70px); font-weight:700; line-height:1.0; letter-spacing:-2px; margin-bottom:20px; }
  .hero h1 i { font-style:italic; color:var(--red); }
  .hero-desc { font-size:15px; color:var(--ink2); line-height:1.75; margin-bottom:28px; font-weight:300; }
  .hero-ctas { display:flex; align-items:center; gap:12px; flex-wrap:wrap; margin-bottom:18px; }
  .hero-note { font-size:12px; color:var(--ink3); }
  .trust-row { display:flex; gap:8px; flex-wrap:wrap; }
  .trust-badge { display:inline-flex; align-items:center; gap:5px; font-size:11px; color:var(--ink3); background:var(--surface2); padding:4px 10px; border-radius:100px; border:1px solid var(--border); }
  .trust-badge.legal { color:var(--blue); background:var(--blue-pale); border-color:#c5d5f0; }

  /* HERO CARD */
  .hero-card { background:var(--surface); border:1px solid var(--border); border-radius:14px; padding:22px; box-shadow:0 12px 48px rgba(24,20,15,0.07); animation:float 5s ease-in-out infinite; }
  @keyframes float { 0%,100%{transform:translateY(0)} 50%{transform:translateY(-7px)} }
  .hc-dots { display:flex; gap:5px; margin-bottom:16px; }
  .hc-dot { width:10px; height:10px; border-radius:50%; }
  .hc-dot:nth-child(1){background:#ff6058} .hc-dot:nth-child(2){background:#ffbd2e} .hc-dot:nth-child(3){background:#28ca42}
  .hc-scores { display:flex; align-items:center; justify-content:center; gap:14px; margin-bottom:16px; }
  .hc-score { text-align:center; }
  .hc-num { font-family:'Cormorant Garamond',serif; font-size:50px; font-weight:700; line-height:1; }
  .hc-num.dim{color:var(--ink3)} .hc-num.lit{color:var(--red)}
  .hc-lbl { font-size:10px; color:var(--ink3); text-transform:uppercase; letter-spacing:1px; margin-top:2px; }
  .hc-arrow { font-size:22px; color:var(--red); padding-bottom:10px; }
  .hc-kws { display:flex; flex-wrap:wrap; gap:5px; margin-bottom:14px; }
  .hc-kw { background:var(--red-pale); border:1px solid #f5c4b5; color:var(--red); padding:2px 9px; border-radius:100px; font-size:10px; font-weight:500; }
  .hc-bars { display:flex; flex-direction:column; gap:7px; }
  .hb { display:flex; flex-direction:column; gap:3px; }
  .hb-top { display:flex; justify-content:space-between; font-size:11px; color:var(--ink2); }
  .hb-track { height:4px; background:var(--surface2); border-radius:2px; overflow:hidden; }
  .hb-fill { height:100%; border-radius:2px; background:var(--red); }

  /* STATS */
  .stats { display:grid; grid-template-columns:repeat(4,1fr); border-top:1px solid var(--border); border-bottom:1px solid var(--border); max-width:1100px; margin:0 auto; padding:0 48px; }
  .stat { padding:26px 20px; border-right:1px solid var(--border); }
  .stat:last-child{border-right:none}
  .stat-n { font-family:'Cormorant Garamond',serif; font-size:36px; font-weight:700; color:var(--red); line-height:1; margin-bottom:3px; }
  .stat-l { font-size:12px; color:var(--ink3); }

  /* LEGAL NOTICE BAR */
  .legal-bar { background:var(--blue-pale); border-top:1px solid #c5d5f0; border-bottom:1px solid #c5d5f0; padding:12px 48px; display:flex; align-items:center; gap:12px; }
  .legal-bar-inner { max-width:1100px; margin:0 auto; width:100%; display:flex; align-items:center; gap:12px; flex-wrap:wrap; }
  .legal-bar-text { font-size:12px; color:var(--blue); font-weight:400; line-height:1.5; }
  .legal-bar-text a { color:var(--blue); font-weight:500; cursor:pointer; text-decoration:underline; }

  /* MODE SELECTOR */
  .mode-section { max-width:1100px; margin:0 auto; padding:48px 48px 0; }
  .mode-title { font-family:'Cormorant Garamond',serif; font-size:28px; font-weight:700; margin-bottom:6px;
