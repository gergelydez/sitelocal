# Site Local — Landing page + Meta Pixel + Conversions API

Next.js 14 (App Router) + TypeScript + Tailwind CSS. Gata de deploy pe Vercel (gratis pentru început).

## Ce conține

Design dark, glassmorphism, gradient (violet/cyan/roz), animat cu Framer Motion — parallax pe fundal, scroll-reveal pe fiecare secțiune, stagger pe carduri, FAQ accordion animat, contor animat pe statistici.

- `app/page.tsx` — asamblează toate secțiunile
- `app/components/AmbientBackground.tsx` — blob-uri gradient cu parallax real (useScroll + useTransform)
- `app/components/Navbar.tsx` — navbar glass, sticky
- `app/components/Hero.tsx` — hero + elementul semnătură (cardul browser cu inel gradient rotativ + morph 404→site)
- `app/components/Marquee.tsx` — bandă cu tipuri de afaceri, scroll infinit
- `app/components/HowItWorks.tsx` — cei 3 pași zero-risc
- `app/components/Niches.tsx` — nișele pe care le validăm (auto, horeca, saloane/clinici, meseriași)
- `app/components/CTABanner.tsx` — banner CTA intermediar
- `app/components/FAQ.tsx` — accordion animat (height + fade)
- `app/components/DemoSection.tsx` + `LeadForm.tsx` — formularul, trimite datele + evenimentul Pixel din browser
- `app/components/WhatsAppButton.tsx` — buton flotant WhatsApp, colț dreapta-jos
- `app/components/Reveal.tsx` — wrapper-e reutilizabile pentru animații scroll-triggered
- `app/api/lead/route.ts` — ruta server care primește lead-ul și-l trimite către Meta Conversions API
- `app/layout.tsx` — include scriptul de Meta Pixel

## Rulare locală

```bash
npm install
npm run dev
```

Deschide http://localhost:3000

## Configurare Pixel + Conversions API

1. Copiază `.env.example` în `.env.local`
2. Mergi în [Meta Events Manager](https://business.facebook.com/events_manager2) → Data Sources → Pixel-ul tău
3. Copiază **Pixel ID** și pune-l atât la `NEXT_PUBLIC_META_PIXEL_ID` cât și la `META_PIXEL_ID`
4. Mergi la Settings → Conversions API → Generate Access Token
5. Pune token-ul la `META_CAPI_ACCESS_TOKEN`

**De ce ai nevoie de amândouă (Pixel din browser + Conversions API din server)?**
Pixel-ul din browser poate fi blocat de ad-blockere sau de Safari (ITP). Conversions API trimite același eveniment direct de pe server, ca backup — Meta le combină automat (deduplică prin `event_id`) și îți dă un semnal mult mai complet pentru optimizarea reclamelor.

## Unde primești notificarea de lead nou

Prin email, automat, de fiecare dată când cineva completează formularul.

**Pași de configurare (o singură dată, 3 minute):**

1. Mergi pe [myaccount.google.com/security](https://myaccount.google.com/security)
2. Activează **Verificarea în 2 pași** (dacă n-o ai deja activă — e obligatorie pentru pasul următor)
3. Mergi pe [myaccount.google.com/apppasswords](https://myaccount.google.com/apppasswords)
4. Generează o parolă nouă de aplicație (alege "Mail" ca tip) — primești un cod de 16 caractere
5. În `.env.local` (sau în Environment Variables din Vercel), completează:
   - `GMAIL_USER` — adresa ta de Gmail
   - `GMAIL_APP_PASSWORD` — codul de 16 caractere de la pasul 4 (fără spații)
   - `NOTIFY_EMAIL` — unde vrei să primești lead-urile (poate fi același Gmail sau alt email)

Gata. La fiecare completare de formular primești un email cu numele, firma, telefonul (cu link direct spre WhatsApp) și domeniul de activitate.

**Notă:** dacă lași aceste 3 variabile necompletate, site-ul tot funcționează — doar că lead-ul apare exclusiv în log-urile din Vercel (Deployments → View Function Logs), nu în email.

## Deploy pe Vercel

1. Pune codul pe GitHub (repo nou)
2. Mergi pe [vercel.com](https://vercel.com) → New Project → importă repo-ul
3. La secțiunea Environment Variables, adaugă cele 3 variabile din `.env.example`
4. Deploy — primești un URL gen `sitelocal.vercel.app`
5. Opțional: adaugi un domeniu propriu (ex. sitelocal.ro) din Vercel → Settings → Domains

## Testare Pixel + Conversions API

În Meta Events Manager → Test Events, introdu un cod de test (apare acolo), pune-l temporar în request-ul către CAPI (`test_event_code`), trimite formularul, și verifică live că evenimentul "Lead" apare corect.

## Numărul de WhatsApp

Numărul apare în trei locuri — caută `40700000000` și înlocuiește-l cu numărul tău real (format internațional, fără +):
- `app/components/WhatsAppButton.tsx` (butonul flotant)
- `app/components/LeadForm.tsx` (mesajul de succes după trimiterea formularului)
