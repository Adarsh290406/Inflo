import LeadForm from '@/components/LeadForm';
import Link from 'next/link';

export default function HomePage() {
  return (
    <div className="bg-[#F4EFE6] text-[#0E0E0E] min-h-screen">
      {/* Hero Section */}
      <section id="hero" className="relative border-b-2 border-black">
        <div className="max-w-[1400px] mx-auto px-6 md:px-10 py-14 md:py-20 grid lg:grid-cols-12 gap-10">
          
          {/* Left Hero Column */}
          <div className="lg:col-span-7 flex flex-col justify-between">
            <div>
              <div className="flex items-center gap-3 font-mono text-[11px] uppercase tracking-[0.22em] text-black/60">
                <span className="inline-block w-6 h-px bg-black/40"></span>
                <span>§ 01</span>
                <span className="text-black/40">—</span>
                <span>The manifesto</span>
              </div>

              <h1 className="font-serif text-[56px] sm:text-[72px] md:text-[100px] lg:text-[110px] leading-[0.9] tracking-[-0.02em] mt-8 font-normal">
                Never lose <br />
                <span className="italic">a lead</span>{' '}
                <span className="text-[#E4572E]">again.</span>
              </h1>

              <div className="mt-10 grid md:grid-cols-[1fr_auto] gap-6 items-end">
                <p className="text-lg leading-relaxed max-w-xl text-black/75">
                  Inflo is a ruthlessly simple lead-capture and mini-CRM for teams that would rather ship than shuffle spreadsheets. One form. One clean pipeline. Zero ceremony.
                </p>
                <div className="flex flex-wrap items-center gap-4">
                  <a 
                    href="#form" 
                    className="inline-flex items-center gap-2 bg-[#E4572E] text-[#F4EFE6] px-5 py-3 font-mono text-xs uppercase tracking-[0.22em] hover:bg-black transition-colors"
                  >
                    File a lead ↗
                  </a>
                  <Link 
                    href="/admin" 
                    className="font-mono text-xs uppercase tracking-[0.22em] hover:text-[#E4572E] transition-colors inline-flex items-center gap-1.5"
                  >
                    See dashboard ↗
                  </Link>
                </div>
              </div>
            </div>

            {/* Hero Metrics (Bottom Left) */}
            <div className="mt-14 border-t-2 border-black pt-6 grid grid-cols-3 gap-6 max-w-xl">
              <div>
                <div className="font-serif text-3xl sm:text-4xl">38<span className="text-black/40 text-xl sm:text-2xl">s</span></div>
                <div className="font-mono text-[10px] uppercase tracking-[0.22em] text-black/60 mt-1">Avg. capture</div>
              </div>
              <div>
                <div className="font-serif text-3xl sm:text-4xl">1<span className="text-black/40 text-xl sm:text-2xl">-click</span></div>
                <div className="font-mono text-[10px] uppercase tracking-[0.22em] text-black/60 mt-1">Status change</div>
              </div>
              <div>
                <div className="font-serif text-3xl sm:text-4xl">0</div>
                <div className="font-mono text-[10px] uppercase tracking-[0.22em] text-black/60 mt-1">Spreadsheets</div>
              </div>
            </div>
          </div>

          {/* Right Hero Column: Rotating Compass Orb Illustration */}
          <aside className="lg:col-span-5 relative lg:border-l-2 lg:border-black lg:pl-10 flex flex-col justify-between gap-8">
            <div className="flex items-center gap-3">
              <span className="text-black">◆</span>
              <div className="font-mono text-[10px] uppercase tracking-[0.22em]">Plate 01 — The Orb</div>
            </div>

            {/* Rotating SVG & Glowing Orb Visual */}
            <div className="flex-grow flex items-center justify-center py-8">
              <div className="relative w-full max-w-[400px] aspect-square orb-drift">
                {/* Spinning text outer ring */}
                <div className="absolute inset-0 orb-spin">
                  <svg viewBox="0 0 400 400" className="w-full h-full">
                    <defs>
                      <path id="circ" d="M 200,200 m -170,0 a 170,170 0 1,1 340,0 a 170,170 0 1,1 -340,0" />
                    </defs>
                    <circle cx="200" cy="200" r="196" fill="none" stroke="#0E0E0E" strokeWidth="1" opacity="0.4" />
                    <circle cx="200" cy="200" r="170" fill="none" stroke="#0E0E0E" strokeWidth="1" opacity="0.2" />
                    <circle cx="200" cy="200" r="120" fill="none" stroke="#0E0E0E" strokeWidth="1" opacity="0.15" />
                    <text fill="#0E0E0E" fontSize="10.5" fontFamily="var(--font-mono), monospace" letterSpacing="5.8">
                      <textPath href="#circ" startOffset="0">
                        INFLO · CAPTURE · QUALIFY · CLOSE · EST. 2025 · INFLO · CAPTURE · QUALIFY · CLOSE · EST. 2025 ·
                      </textPath>
                    </text>
                  </svg>
                </div>

                {/* Central Glowing terracotta 3D-effect sphere */}
                <div className="absolute inset-0 flex items-center justify-center">
                  <div 
                    className="w-[42%] h-[42%] rounded-full bg-[#E4572E] relative transition-transform hover:scale-105"
                    style={{
                      boxShadow: '0 20px 60px -20px rgba(228,87,46,0.6), inset -8px -12px 40px rgba(0,0,0,0.2), inset 8px 12px 40px rgba(255,255,255,0.3)'
                    }}
                  >
                    <div 
                      className="absolute inset-0 rounded-full" 
                      style={{
                        background: 'radial-gradient(circle at 32% 28%, rgba(255,255,255,0.55), transparent 45%)'
                      }}
                    ></div>
                  </div>
                </div>

                {/* Compass Layout Labels */}
                <div className="absolute top-0 left-0 font-mono text-[9px] text-black/50">01 — orb.01</div>
                <div className="absolute top-0 right-0 font-mono text-[9px] text-black/50">no. 240724</div>
                <div className="absolute bottom-0 left-0 font-mono text-[9px] text-black/50">rev. a</div>
                <div className="absolute bottom-0 right-0 font-mono text-[9px] text-black/50">△ auto</div>
              </div>
            </div>

            {/* Card Quote */}
            <p className="font-serif italic text-lg text-black/70 border-t border-black/10 pt-4">
              “A CRM should feel like a well-kept ledger, not a control panel.”
              <span className="block font-mono not-italic text-[10px] uppercase tracking-[0.22em] text-black/50 mt-2">— The Inflo Team</span>
            </p>
          </aside>

        </div>
      </section>

      {/* Marquee Ticker Tape Banner */}
      <div className="border-b-2 border-black overflow-hidden bg-[#0E0E0E] text-[#F4EFE6]">
        <div className="flex whitespace-nowrap marquee-track py-3 font-mono text-xs uppercase tracking-[0.24em] select-none">
          <span className="px-6">Never lose a lead ◆ Capture — Qualify — Close ◆ A quiet CRM for loud teams ◆ No spreadsheets. No ceremony. ◆ Built in the open ◆ Ships this quarter ◆ Never lose a lead ◆ Capture — Qualify — Close ◆ A quiet CRM for loud teams ◆ No spreadsheets. No ceremony. ◆ Built in the open ◆ Ships this quarter ◆</span>
          <span className="px-6">Never lose a lead ◆ Capture — Qualify — Close ◆ A quiet CRM for loud teams ◆ No spreadsheets. No ceremony. ◆ Built in the open ◆ Ships this quarter ◆ Never lose a lead ◆ Capture — Qualify — Close ◆ A quiet CRM for loud teams ◆ No spreadsheets. No ceremony. ◆ Built in the open ◆ Ships this quarter ◆</span>
        </div>
      </div>

      {/* Index Section */}
      <section id="index" className="border-b-2 border-black">
        <div className="max-w-[1400px] mx-auto px-6 md:px-10 py-20">
          <div className="flex items-end justify-between flex-wrap gap-6 mb-12">
            <div>
              <div className="flex items-center gap-3 font-mono text-[11px] uppercase tracking-[0.22em] text-black/60">
                <span className="inline-block w-6 h-px bg-black/40"></span>
                <span><span>§ 02</span></span>
                <span className="text-black/40">—</span>
                <span>The index</span>
              </div>
              <h2 className="font-serif text-5xl md:text-7xl mt-6 tracking-[-0.02em] leading-[0.95] font-normal">
                Three moving parts. <br />
                <span className="italic">That's the whole thing.</span>
              </h2>
            </div>
            <p className="max-w-sm text-black/70 text-sm leading-relaxed">
              Inflo replaces the spreadsheet-plus-Notion-plus-Airtable chaos with a single sharp surface. Nothing more, nothing less.
            </p>
          </div>

          <ol className="border-t-2 border-black">
            <li className="grid md:grid-cols-[80px_1fr_2fr] gap-6 items-start py-8 border-b border-black/10 group hover:bg-black hover:text-[#F4EFE6] transition-colors duration-200">
              <div className="font-mono text-xs uppercase tracking-[0.22em] pt-1">§ 01</div>
              <div className="font-serif text-2xl md:text-3xl tracking-[-0.01em]">Capture, in one form</div>
              <div className="text-black/70 group-hover:text-[#F4EFE6]/70 text-base leading-relaxed">
                A single, honest form on your landing page. Name, email, budget, message. No modal, no funnel, no ten-step wizard.
              </div>
            </li>
            <li className="grid md:grid-cols-[80px_1fr_2fr] gap-6 items-start py-8 border-b border-black/10 group hover:bg-black hover:text-[#F4EFE6] transition-colors duration-200">
              <div className="font-mono text-xs uppercase tracking-[0.22em] pt-1">§ 02</div>
              <div className="font-serif text-2xl md:text-3xl tracking-[-0.01em]">Server-validated on the way in</div>
              <div className="text-black/70 group-hover:text-[#F4EFE6]/70 text-base leading-relaxed">
                Every field is re-checked on the edge. Bots bounce, real prospects get a receipt. You never see the noise.
              </div>
            </li>
            <li className="grid md:grid-cols-[80px_1fr_2fr] gap-6 items-start py-8 border-b border-black/10 group hover:bg-black hover:text-[#F4EFE6] transition-colors duration-200">
              <div className="font-mono text-xs uppercase tracking-[0.22em] pt-1">§ 03</div>
              <div className="font-serif text-2xl md:text-3xl tracking-[-0.01em]">A pipeline you can steer</div>
              <div className="text-black/70 group-hover:text-[#F4EFE6]/70 text-base leading-relaxed">
                New → Contacted → Closed. Inline dropdowns. Optimistic UI. No page reloads. No mystery statuses.
              </div>
            </li>
          </ol>
        </div>
      </section>

      {/* Numbers Section */}
      <section id="numbers" className="border-b-2 border-black bg-[#0E0E0E] text-[#F4EFE6]">
        <div className="max-w-[1400px] mx-auto px-6 md:px-10 py-20 grid lg:grid-cols-2 gap-14 items-center">
          <div>
            <div className="font-mono text-[10px] uppercase tracking-[0.22em] text-[#F4EFE6]/60">§ 03 — A pull quote</div>
            <blockquote className="font-serif text-4xl md:text-6xl leading-[1.05] tracking-[-0.01em] mt-8 font-normal">
              “We went from <span className="text-[#E4572E]">forty-eight hours</span> of reply time <br /> to under <span className="italic">ninety minutes</span>. Nothing else changed.”
            </blockquote>
            <div className="mt-8 flex items-center gap-4 font-mono text-[11px] uppercase tracking-[0.22em] text-[#F4EFE6]/70">
              <div className="h-px w-8 bg-[#F4EFE6]/40"></div>
              A founder, somewhere warm
            </div>
          </div>

          <div className="border border-[#F4EFE6]/20 p-8 md:p-10">
            <div className="grid grid-cols-2 gap-x-8 gap-y-10">
              <div className="border-l-2 border-[#E4572E] pl-4">
                <div className="font-serif text-5xl md:text-6xl leading-none">92%</div>
                <div className="font-mono text-[10px] uppercase tracking-[0.22em] text-[#F4EFE6]/60 mt-3">Response rate</div>
              </div>
              <div className="border-l-2 border-[#E4572E] pl-4">
                <div className="font-serif text-5xl md:text-6xl leading-none">1.4h</div>
                <div className="font-mono text-[10px] uppercase tracking-[0.22em] text-[#F4EFE6]/60 mt-3">Avg. reply</div>
              </div>
              <div className="border-l-2 border-[#E4572E] pl-4">
                <div className="font-serif text-5xl md:text-6xl leading-none">0</div>
                <div className="font-mono text-[10px] uppercase tracking-[0.22em] text-[#F4EFE6]/60 mt-3">Ceremonial fields</div>
              </div>
              <div className="border-l-2 border-[#E4572E] pl-4">
                <div className="font-serif text-5xl md:text-6xl leading-none">∞</div>
                <div className="font-mono text-[10px] uppercase tracking-[0.22em] text-[#F4EFE6]/60 mt-3">Peace of mind</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Form Section */}
      <section id="form" className="border-b-2 border-black">
        <div className="max-w-[1400px] mx-auto px-6 md:px-10 py-20 grid lg:grid-cols-[1fr_1.1fr] gap-14">
          <div>
            <div className="flex items-center gap-3 font-mono text-[11px] uppercase tracking-[0.22em] text-black/60">
              <span className="inline-block w-6 h-px bg-black/40"></span>
              <span>§ 04</span>
              <span className="text-black/40">—</span>
              <span>File a lead</span>
            </div>
            <h2 className="font-serif text-5xl md:text-7xl mt-6 tracking-[-0.02em] leading-[0.95] font-normal">
              Drop a note. <br />
              <span className="italic">We reply in one</span> <br />
              business day.
            </h2>
            <p className="text-black/70 mt-8 max-w-md leading-relaxed">
              Tell us what you're building. Every submission is triaged by a human — no auto-responders, no drip funnels, no invented urgency.
            </p>
            <ul className="mt-10 space-y-3 font-mono text-xs uppercase tracking-[0.22em]">
              <li className="flex items-center gap-3"><span className="text-[#E4572E]">■</span> No newsletter. No spam. Ever.</li>
              <li className="flex items-center gap-3"><span className="text-[#E4572E]">■</span> A real person replies</li>
              <li className="flex items-center gap-3"><span className="text-[#E4572E]">■</span> Free strategy call if you qualify</li>
            </ul>
          </div>

          <div>
            <LeadForm />
          </div>
        </div>
      </section>
    </div>
  );
}
