# Site Local — Landing page + Meta Pixel + Conversions API

Next.js 14 (App Router) + TypeScript + Tailwind CSS. Gata de deploy pe Vercel (gratis pentru început).

## Ce conține

Design dark, glassmorphism, gradient (violet/cyan/roz), animat cu Framer Motion — parallax pe fundal, scroll-reveal pe fiecare secțiune, stagger pe carduri, FAQ accordion animat, contor animat pe statistici.

- `app/page.tsx` — asamblează toate secțiunile
- `app/components/AmbientBackground.tsx` — blob-uri gradient cu parallax real (useScroll + useTransform)
- `app/components/Navbar.tsx` — navbar glass, sticky
- `app/components/Hero.tsx` — hero + elementul semnătură (cardul browser cu inel gradient rotativ + morph 404→site)
- `app/components/Marquee.tsx` — bandă cu tipuri de afaceri, scroll infinit
- `app/components/TrustSection.tsx` — 4 motive de încredere (zero risc, local, preț corect, suport direct)
- `app/components/HowItWorks.tsx` — cei 3 pași zero-risc (demo în 24h, site complet în 3 zile)
- `app/components/Niches.tsx` — nișele pe care le validăm (auto, horeca, saloane/clinici, meseriași)
- `app/components/ProjectsShowcase.tsx` — carusel cu concepte vizuale ilustrative pe nișă (nu capturi de la clienți reali)
- `app/components/Testimonials.tsx` — recenzii clienți; **array `REVIEWS` gol intenționat** — vezi nota de mai jos
- `app/components/Pricing.tsx` — 3 pachete de preț; **cifrele sunt de completat** — vezi nota de mai jos
- `app/components/CTABanner.tsx` — banner CTA intermediar
- `app/components/FAQ.tsx` — accordion animat (height + fade)
- `app/components/DemoSection.tsx` + `LeadForm.tsx` — formularul, trimite datele + evenimentul Pixel din browser
- `app/components/WhatsAppButton.tsx` — buton flotant WhatsApp, colț dreapta-jos, trimite evenimentul `Contact`
- `app/components/TiltCard.tsx` — wrapper pentru efectul de tilt 3D la hover (carduri interactive)
- `app/components/Reveal.tsx` — wrapper-e reutilizabile pentru animații scroll-triggered
- `app/formular/` — pagină separată, doar cu formularul (pentru trafic din reclame); trimite evenimentul `ViewContent` și lasă vizitatorul să exploreze restul site-ului dintr-un link
- `app/lib/meta.ts` — helper comun pentru trimiterea evenimentelor către Meta Conversions API
- `app/lib/pixel-client.ts` — helper client-side pentru evenimente `Contact`/`ViewContent`, cu event_id comun
- `app/lib/db.ts` — conexiune Postgres + salvare/citire lead-uri și evenimente, pentru dashboard-urile din `/admin`
- `app/admin/page.tsx` — dashboard cu toate lead-urile primite, protejat cu parolă
- `app/admin/analytics/page.tsx` — dashboard cu trafic (page views, contact, lead-uri) pe surse
- `app/lib/attribution-client.ts` — capturează sursa de trafic (Facebook Ads, Google Ads, UTM, referrer) la prima vizită și o păstrează într-un cookie 30 de zile
- `app/components/AnalyticsTracker.tsx` — loghează un PageView (cu sursa) la fiecare încărcare de pagină, exceptând `/admin`
- `middleware.ts` — protejează `/admin` (inclusiv `/admin/analytics`) cu autentificare HTTP Basic (user + parolă)

## De completat cu date reale

- **Prețuri** (`app/components/Pricing.tsx`): 3 pachete reale — Startup (699 lei), Professional (1.199 lei, evidențiat), E-commerce/Premium (2.199 lei).
- **Portofoliu** (`app/components/ProjectsShowcase.tsx`): 5 proiecte reale, cu link direct (deschis în tab nou) — Flo Detailing Auto, Create Beauty Salon, Dentist Site, Magic Gym, Karma Fitness.
- **Recenzii** (`app/components/Testimonials.tsx`): array-ul `REVIEWS` e gol intenționat — nu am inventat citate sau nume de clienți (recenziile false sunt ilegale în UE și riscă suspendarea contului de Meta Ads). Adaugă recenzii reale în array pe măsură ce le primești; secțiunea devine automat un carusel.

## Meta Pixel — evenimente trackuite

Fiecare eveniment se trimite dublu (Pixel din browser + Conversions API server-side), cu **același `event_id`**, ca Meta să dedupleze corect și să nu numere conversia de două ori:

- `PageView` — automat, pe fiecare încărcare de pagină (`app/layout.tsx`)
- `Lead` — la trimiterea formularului (`LeadForm.tsx` → `/api/lead`)
- `Contact` — la click pe butonul flotant de WhatsApp (`WhatsAppButton.tsx` → `/api/track`)
- `ViewContent` — la vizitarea paginii `/formular` (`FormularClient.tsx` → `/api/track`)

Pixel ID-ul (`1983304235646415`) e hardcodat ca fallback în `app/layout.tsx` și `app/lib/meta.ts`, deci funcționează fără nicio configurare suplimentară. `META_CAPI_ACCESS_TOKEN` rămâne opțional — fără el, evenimentele merg doar prin Pixel-ul din browser, nu și prin Conversions API.
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

## Dashboard de lead-uri (`/admin`)

Pe lângă email, fiecare lead se salvează și într-o bază de date Postgres, vizibilă într-un tabel simplu la `tu-domeniul.ro/admin` (protejat cu user + parolă).

**Pași de configurare:**

1. În Vercel → proiectul tău → tab-ul **Storage** → **Create Database** → alege Postgres (Neon) → urmează pașii → **Connect** la proiect. Asta adaugă automat `POSTGRES_URL` (și variantele lui) în Environment Variables — nu trebuie completat manual.
2. Tot în Environment Variables, adaugă:
   - `ADMIN_PASSWORD` — parola ta pentru dashboard (obligatoriu; fără ea, `/admin` răspunde cu eroare 503, nu rămâne deschis din greșeală)
   - `ADMIN_USER` — opțional, implicit `admin`
3. Redeploy (Vercel o face automat după ce salvezi variabilele, sau declanșezi manual din Deployments)
4. Deschide `tu-domeniul.ro/admin` — browserul cere user + parolă, apoi vezi toate lead-urile: dată, nume, firmă, telefon (link direct spre WhatsApp), email (link direct de scris), domeniu.

**Notă:** tabelul din baza de date se creează automat la primul lead trimis după ce ai conectat baza de date — nu e nevoie de nicio migrare manuală. Lead-urile trimise înainte de configurare nu apar retroactiv (dar tot ajung prin email, dacă ai configurat pasul de mai sus).

## Analytics de trafic (`/admin/analytics`)

Folosește aceeași bază de date Postgres — nu necesită configurare suplimentară față de dashboard-ul de lead-uri de mai sus. Arată:

- **Page Views, Contact (click WhatsApp), ViewContent, Lead-uri** — totaluri, plus rata de conversie (lead-uri / page views)
- **Trafic pe zi**, ultimele 30 de zile
- **Pe surse de trafic** — un tabel cu fiecare sursă (Facebook/Instagram Ads, Google Ads, Direct, sau orice `utm_source` folosit în linkurile tale) și câte page views/contact/lead-uri a produs, cu rata de conversie proprie

**Cum se determină sursa:** la prima vizită dintr-o sesiune, se citește `utm_source` din URL (dacă ai adăugat unul manual la linkuri), altfel `fbclid`/`gclid` (adăugate automat de Facebook/Google la click pe reclamă), altfel domeniul din care a venit vizitatorul (referrer). Sursa se salvează într-un cookie de 30 de zile, deci dacă cineva navighează mai multe pagini înainte să completeze formularul, lead-ul tot e atribuit corect sursei inițiale — nu ultimei pagini vizitate.

**Notă:** vizitele tale proprii pe `/admin` nu sunt logate, ca să nu umple statisticile cu zgomot.

## Deploy pe Vercel

1. Pune codul pe GitHub (repo nou)
2. Mergi pe [vercel.com](https://vercel.com) → New Project → importă repo-ul
3. La secțiunea Environment Variables, adaugă cele 3 variabile din `.env.example`
4. Deploy — primești un URL gen `sitelocal.vercel.app`
5. Opțional: adaugi un domeniu propriu (ex. sitelocal.ro) din Vercel → Settings → Domains

## Testare Pixel + Conversions API

În Meta Events Manager → Test Events, introdu un cod de test (apare acolo), pune-l temporar în request-ul către CAPI (`test_event_code`), trimite formularul, și verifică live că evenimentul "Lead" apare corect.

## Numărul de WhatsApp

Setat la `40758656192` în două locuri — dacă se schimbă vreodată, caută acest număr și înlocuiește-l:
- `app/components/WhatsAppButton.tsx` (butonul flotant)
- `app/components/LeadForm.tsx` (mesajul de succes după trimiterea formularului)
