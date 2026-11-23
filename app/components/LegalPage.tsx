import type { ReactNode } from "react";
import Footer from "./Footer";

export default function LegalPage({ title, children }: { title: string; children: ReactNode }) {
  return (
    <div className="relative z-10">
      <nav className="border-b border-white/8">
        <div className="max-w-[820px] mx-auto px-6 py-4">
          <a href="/" className="font-display font-bold text-[15px]">
            Site <span className="text-trust">Local</span>
          </a>
        </div>
      </nav>
      <main className="max-w-[820px] mx-auto px-6 py-12 legal">
        <h1 className="font-display font-bold text-[30px] md:text-[36px] mb-8 tracking-tight">{title}</h1>
        <div className="space-y-5 text-[15px] leading-relaxed text-muted [&_h2]:text-text [&_h2]:font-display [&_h2]:font-bold [&_h2]:text-[19px] [&_h2]:mt-9 [&_h2]:mb-2 [&_strong]:text-text [&_a]:text-trust [&_a]:underline [&_ul]:list-disc [&_ul]:pl-5 [&_ul]:space-y-1.5">
          {children}
        </div>
      </main>
      <Footer />
    </div>
  );
}
