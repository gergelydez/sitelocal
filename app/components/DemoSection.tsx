import LeadForm from "./LeadForm";
import { Reveal } from "./Reveal";

export default function DemoSection() {
  return (
    <section className="max-w-[1120px] mx-auto px-6 py-20 md:py-28" id="demo">
      <Reveal>
        <div
          className="max-w-[520px] mx-auto rounded-[26px] p-9 md:p-11"
          style={{
            background:
              "linear-gradient(180deg,rgba(255,255,255,0.06),rgba(255,255,255,0.02))",
            border: "1px solid rgba(255,255,255,0.12)",
          }}
        >
          <div className="text-cyan text-[12.5px] font-bold uppercase tracking-wider text-center mb-3">
            Fără obligații
          </div>
          <h2 className="font-display font-bold text-[26px] text-center mb-2">
            Primește gratuit un demo personalizat
          </h2>
          <p className="text-center text-muted text-[14px] mb-7">
            Completezi acum, primești prima variantă a site-ului tău în 24 de
            ore.
          </p>
          <LeadForm />
        </div>
      </Reveal>
    </section>
  );
}
