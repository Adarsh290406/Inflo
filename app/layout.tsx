import './globals.css';
import Link from 'next/link';

export const metadata = {
  title: 'Inflo — A quiet CRM for teams that ship',
  description: 'An editorial lead-capture and mini-CRM. Capture, qualify, close — without the ceremony.',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="bg-[#F4EFE6] text-[#0E0E0E] font-sans antialiased selection:bg-[#E4572E] selection:text-[#F4EFE6] min-h-screen flex flex-col justify-between paper-noise">
        {/* Newspaper Style Header */}
        <header className="border-b-2 border-black bg-[#F4EFE6] z-50">
          <div className="max-w-[1400px] mx-auto px-6 md:px-10 grid grid-cols-3 items-center py-4 gap-4">
            <div className="font-mono text-[10px] uppercase tracking-[0.22em] text-black/60">
              Vol. 01 · Iss. 04
            </div>
            
            <div className="text-center">
              <Link href="/" className="inline-flex items-center gap-2 group">
                <div className="h-6 w-6 bg-black relative transition-transform group-hover:rotate-45">
                  <div className="absolute inset-0 border-2 border-black"></div>
                  <div className="absolute inset-1 bg-[#E4572E]"></div>
                </div>
                <span className="font-serif text-2xl font-bold leading-none tracking-tight">Inflo</span>
              </Link>
            </div>

            <div className="font-mono text-[10px] uppercase tracking-[0.22em] text-right text-black/60">
              A Quiet CRM · Est. 2025
            </div>
          </div>

          <div className="border-t border-black/10">
            <div className="max-w-[1400px] mx-auto px-6 md:px-10 py-3 flex items-center justify-between gap-4 flex-wrap">
              <nav className="flex items-center gap-6 sm:gap-8 font-mono text-[11px] uppercase tracking-[0.22em]">
                <Link href="/#hero" className="hover:text-[#E4572E] transition">01 — Manifesto</Link>
                <Link href="/#index" className="hover:text-[#E4572E] transition">02 — Index</Link>
                <Link href="/#numbers" className="hover:text-[#E4572E] transition">03 — Numbers</Link>
                <Link href="/#form" className="hover:text-[#E4572E] transition">04 — File</Link>
              </nav>

              <div className="flex items-center gap-6 font-mono text-[11px] uppercase tracking-[0.22em]">
                <Link href="/login" className="hover:text-[#E4572E] transition">
                  Sign in
                </Link>
                <Link 
                  href="/#form" 
                  className="inline-flex items-center gap-1.5 bg-black text-[#F4EFE6] px-3.5 py-1.5 hover:bg-[#E4572E] transition"
                >
                  File a lead ↗
                </Link>
              </div>
            </div>
          </div>
        </header>

        {/* Main Content Area */}
        <main className="flex-grow w-full">
          {children}
        </main>

        {/* Newspaper Style Footer */}
        <footer className="border-t-2 border-black bg-[#F4EFE6] py-10 mt-12">
          <div className="max-w-[1400px] mx-auto px-6 md:px-10 grid md:grid-cols-3 gap-6 items-center">
            <div className="font-mono text-[10px] uppercase tracking-[0.22em] text-black/60 leading-relaxed">
              Colophon — Set in Instrument Serif &amp; JetBrains Mono. Printed to screen on paper stock #F4EFE6.
            </div>
            
            <div className="text-center font-serif text-3xl font-extrabold italic text-black/10 select-none">
              Inflo
            </div>
            
            <div className="text-right">
              <a 
                href="https://digitalheroesco.com" 
                target="_blank" 
                rel="noopener noreferrer" 
                className="font-mono text-[10px] uppercase tracking-[0.22em] hover:text-[#E4572E] transition inline-flex items-center gap-1.5 justify-end text-black/80 font-bold"
              >
                Built for Digital Heroes Training Task ↗
              </a>
            </div>
          </div>
        </footer>
      </body>
    </html>
  );
}
