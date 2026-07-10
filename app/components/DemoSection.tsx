import LeadForm from "./LeadForm";
import { Reveal } from "./Reveal";

export default function DemoSection() {
  return (
    <section className="max-w-[1120px] mx-auto px-6 py-20 md:py-28" id="demo">
      <Reveal>
        <div className="max-w-[520px] mx-auto rounded-2xl p-9 md:p-11 bg-surface border border-white/10">
          <div className="text-trust text-[12.5px] font-semibold uppercase tracking-wider text-center mb-3">
            Fără obligații
          </div>
          <h2 className="font-display font-bold text-[24px] text-center mb-2 tracking-tight">
            Primește gratuit demo-ul tău
          </h2>
          <p className="text-center text-muted text-[14px] mb-7">
            Completezi acum, primești demo-ul live al site-ului tău în 24h.
          </p>
          <LeadForm />
        </div>
      </Reveal>
    </section>
  );
}
