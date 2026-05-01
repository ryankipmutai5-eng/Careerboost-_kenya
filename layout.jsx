export const metadata = {
  title: "CareerBoost Kenya — AI CV Optimizer",
  description: "AI-powered CV optimization, cover letters, interview prep and LinkedIn optimization built for the Kenyan job market. First use free.",
  keywords: "CV optimization Kenya, resume writer Nairobi, NGO jobs Kenya, job application Kenya, ATS CV Kenya",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta name="theme-color" content="#f9f7f3" />
        <link rel="icon" href="data:image/svg+xml,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 100 100'><text y='.9em' font-size='90'>🚀</text></svg>" />
      </head>
      <body style={{ margin: 0, padding: 0 }}>{children}</body>
    </html>
  );
}

