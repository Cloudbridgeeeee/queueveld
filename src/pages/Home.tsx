import type { CSSProperties } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, BarChart3, CalendarClock, Check, Clock, Database, FileUp, LineChart, Lock, ShieldCheck, Sparkles, UserCheck, XCircle } from 'lucide-react';
import { Container, SectionHead } from '@/components/Layout';
import DayBoard from '@/components/DayBoard';
import { FAQ, FOUNDERS, PLANS, ROADMAP } from '@/data/site';
import { useCountUp, useCycle, useMeta } from '@/lib/motion';
import PilotForm from '@/components/PilotForm';

const d = (ms: number) => ({ '--d': `${ms}ms` }) as CSSProperties;

export const STEPS = [
  { icon: FileUp, title: 'Import appointment history', body: 'Upload twelve months of bookings as CSV or an EHR export. Patient identifiers are stripped before anything is stored.' },
  { icon: LineChart, title: 'Forecast arrivals', body: 'QueueVeld learns each service’s weekday and hourly rhythm, plus how cancellations change with booking lead time.' },
  { icon: CalendarClock, title: 'Review capacity suggestions', body: 'See the hours that will run over, the expected waits, and suggested room or session changes for the coming fortnight.' },
  { icon: UserCheck, title: 'Your team decides', body: 'Accept, adjust or decline each suggestion. Every decision is logged, and the next forecast learns from what happened.' },
];

const FEATURES = [
  { icon: LineChart, title: 'Appointment demand forecasting', body: 'Hour-by-hour arrival forecasts for every service, fourteen days ahead, with the error band shown on the chart.', big: true },
  { icon: Clock, title: 'Waiting-time estimation', body: 'Expected waits per hour from forecast load and real consultation lengths.' },
  { icon: XCircle, title: 'Cancellation pattern analysis', body: 'Find which services, weekdays and lead times lose the most slots.' },
  { icon: Sparkles, title: 'Capacity planning recommendations', body: 'Suggested room, session and reminder changes, each with its reasoning.' },
  { icon: BarChart3, title: 'Administrative performance dashboards', body: 'Utilisation, no-shows and wait trends for operations meetings, by site and service.', big: true },
];

const WORDS = ['Monday overflow', 'empty Thursday rooms', 'two-hour waits', 'lost slots'] as const;

export default function Home() {
  useMeta('Home');
  const word = useCycle(WORDS, 2400);
  return (
    <>
      <section className="relative overflow-hidden">
        <div className="pointer-events-none absolute -top-40 right-[-10%] h-[36rem] w-[36rem] rounded-full bg-saffron-soft/70 blur-3xl" aria-hidden />
        <Container className="relative grid items-center gap-14 pt-12 pb-24 lg:grid-cols-[1fr_1.1fr] lg:pt-20">
          <div>
            <p className="reveal inline-flex items-center gap-2 rounded-full border border-line bg-white/70 px-3 py-1.5 text-sm text-ink-2">
              <span className="h-2 w-2 rounded-full bg-sage" aria-hidden /> Pilots open for outpatient clinics in 2027
            </p>
            <h1 className="reveal mt-6 text-[2.8rem] leading-[1.02] font-bold sm:text-[4.1rem]" style={d(80)}>
              Plan clinic capacity before the waiting room fills.
            </h1>
            <p className="reveal mt-5 text-xl text-ink-2" style={d(140)}>
              Forecast the day, not just the diary. No more <span key={word} className="tick-in inline-block font-semibold text-ink underline decoration-saffron decoration-[3px] underline-offset-4">{word}</span>.
            </p>
            <p className="reveal mt-5 max-w-lg text-[17px] leading-relaxed text-ink-2" style={d(200)}>
              QueueVeld reads your appointment history, forecasts patient arrivals hour by hour, and shows operations teams where rooms and sessions should move. Staff stay in charge of every booking.
            </p>
            <div className="reveal mt-8 flex flex-wrap gap-3" style={d(260)}>
              <Link to="/contact" className="btn-primary">Request a pilot <ArrowRight className="h-4 w-4" aria-hidden /></Link>
              <Link to="/demo" className="btn-ghost">Try the forecast demo</Link>
            </div>
          </div>
          <div className="reveal" style={d(200)}><DayBoard /></div>
        </Container>
      </section>

      <Marquee />
      <Problem />

      <section id="features" className="py-24">
        <Container>
          <SectionHead title="Five tools for the people who run the clinic day" lead="Built for operations managers and outpatient leads, not for clinicians’ decisions." />
          <div className="mt-12 grid gap-4 md:grid-cols-3">
            {FEATURES.map((f, i) => (
              <article key={f.title} className={`reveal lift panel p-7 ${f.big ? 'md:col-span-2' : ''} ${i === 0 ? 'bg-ink text-white border-ink' : ''}`} style={d(i * 70)}>
                <f.icon className={`h-7 w-7 ${i === 0 ? 'text-saffron' : 'text-sage'}`} aria-hidden />
                <h3 className="mt-5 text-2xl font-semibold">{f.title}</h3>
                <p className={`mt-2 max-w-md leading-relaxed ${i === 0 ? 'text-white/75' : 'text-ink-2'}`}>{f.body}</p>
                {i === 0 && <MiniBars />}
              </article>
            ))}
          </div>
        </Container>
      </section>

      <section id="how" className="border-y border-line bg-white py-24">
        <Container>
          <SectionHead title="From diary export to a planned fortnight in four steps" />
          <ol className="mt-12 grid gap-8 md:grid-cols-4">
            {STEPS.map((s, i) => (
              <li key={s.title} className="reveal relative" style={d(i * 90)}>
                <span className="font-display text-5xl font-bold text-saffron">{i + 1}</span>
                <s.icon className="mt-4 h-6 w-6 text-ink" aria-hidden />
                <h3 className="mt-3 text-xl font-semibold">{s.title}</h3>
                <p className="mt-2 leading-relaxed text-ink-2">{s.body}</p>
              </li>
            ))}
          </ol>
        </Container>
      </section>

      <AiSection />
      <Architecture />
      <Pricing />
      <Roadmap />
      <Founders />
      <Faq />

      <section id="pilot" className="bg-ink py-24 text-white">
        <Container className="grid gap-12 lg:grid-cols-2">
          <div>
            <h2 className="reveal text-[2.2rem] leading-[1.1] font-bold sm:text-[2.8rem]">Run an eight-week pilot on your own clinic data</h2>
            <p className="reveal mt-4 max-w-md text-lg text-white/75">Two weeks to import and set a baseline, six weeks of live forecasts alongside your current process. We measure accuracy against your real days.</p>
            <ul className="reveal mt-8 space-y-3 text-white/85">
              {['No clinical notes needed', 'Patient identifiers removed at import', 'Cancel any time during the pilot'].map((t) => <li key={t} className="flex gap-3"><Check className="h-5 w-5 text-saffron" aria-hidden />{t}</li>)}
            </ul>
          </div>
          <div className="reveal panel p-6 text-ink sm:p-8"><PilotForm /></div>
        </Container>
      </section>
    </>
  );
}

function MiniBars() {
  const v = [8, 14, 17, 13, 9, 7, 12, 10, 5];
  return (
    <div className="mt-8 flex h-24 items-end gap-2" aria-hidden>
      {v.map((h, i) => <span key={i} className="bar-grow flex-1 rounded-t-md" style={{ height: `${h * 5}%`, background: h > 13 ? '#e2553a' : '#f2a93b', '--d': `${i * 60}ms` } as CSSProperties} />)}
    </div>
  );
}

function Marquee() {
  const items = ['Teaching hospitals', 'Outpatient clinics', 'Diagnostic centres', 'Antenatal units', 'Radiology', 'Laboratory draws', 'Physiotherapy', 'Dental clinics', 'Eye clinics'];
  return (
    <div className="overflow-hidden border-y border-line bg-white py-4" aria-label="Built for">
      <div className="marquee flex w-max gap-12 text-[17px] font-medium text-ink-3">
        {[...items, ...items].map((t, i) => <span key={i} className="flex items-center gap-12">{t}<span className="h-1.5 w-1.5 rounded-full bg-saffron" aria-hidden /></span>)}
      </div>
    </div>
  );
}

const STATS = [
  { to: 23, suffix: '%', label: 'of outpatient appointments in many systems are missed or cancelled late, leaving slots unused.', note: 'Typical range reported in no-show studies' },
  { to: 2, suffix: '×', label: 'busier: the gap we often see between a clinic’s heaviest and lightest weekday.', note: 'From pilot partner diaries' },
  { to: 68, suffix: ' min', label: 'average peak-hour wait in the sample clinic before rooms were rebalanced.', note: 'Demo data, illustrative' },
];

function Stat({ s, i }: { s: (typeof STATS)[number]; i: number }) {
  const [ref, v] = useCountUp<HTMLSpanElement>(s.to);
  return (
    <div className="reveal border-t-2 border-ink pt-5" style={d(i * 90)}>
      <span ref={ref} className="font-display text-6xl font-bold">{Math.round(v)}{s.suffix}</span>
      <p className="mt-3 leading-relaxed text-ink-2">{s.label}</p>
      <p className="mt-2 text-sm text-ink-3">{s.note}</p>
    </div>
  );
}

function Problem() {
  return (
    <section id="problem" className="py-24">
      <Container>
        <SectionHead title="The diary says the clinic is full. The waiting room says otherwise." lead="Appointment books show what was booked, not who will arrive, when, or how long they will wait. Planning against the diary leaves some hours crushed and others idle." />
        <div className="mt-14 grid gap-10 md:grid-cols-3">{STATS.map((s, i) => <Stat key={s.label} s={s} i={i} />)}</div>
      </Container>
    </section>
  );
}

function AiSection() {
  return (
    <section id="ai" className="py-24">
      <Container className="grid gap-12 lg:grid-cols-2">
        <div>
          <SectionHead title="Forecasting you can check, and a model that stays in its lane" lead="Demand forecasts run on SageMaker models trained on your own history. Bedrock writes plain-language summaries of the week ahead, quoting the numbers it used." />
          <ul className="mt-8 space-y-4">
            {[
              ['Shows its uncertainty', 'Every forecast carries an error band measured on your past weeks.'],
              ['Never books or cancels', 'QueueVeld has no write access to your scheduling system.'],
              ['No clinical judgement', 'It plans rooms and sessions, never triage or patient priority.'],
              ['Every suggestion logged', 'Who accepted, adjusted or declined, and what happened next.'],
            ].map(([t, b], i) => (
              <li key={t} className="reveal flex gap-4" style={d(i * 70)}>
                <ShieldCheck className="mt-1 h-5 w-5 shrink-0 text-sage" aria-hidden />
                <div><p className="font-semibold">{t}</p><p className="text-ink-2">{b}</p></div>
              </li>
            ))}
          </ul>
        </div>
        <div className="reveal panel self-start p-7">
          <p className="text-sm text-ink-3">Weekly summary, drafted for the operations meeting</p>
          <p className="mt-4 text-[17px] leading-relaxed">
            Next Monday, general outpatient is forecast at <b>214 patients</b> against capacity for 144 between 09:00 and 12:00. Expected peak wait is <b>61 minutes</b>. Opening two more rooms for those three hours brings it under 20 minutes.
          </p>
          <p className="mt-4 text-sm text-ink-3">Sources: 52 weeks of bookings, 6,412 cancellations, consultation length 15 min.</p>
          <div className="mt-6 flex gap-2">
            <span className="rounded-full bg-sage-soft px-3 py-1 text-sm font-medium text-ink">Awaiting review</span>
            <span className="rounded-full bg-mist px-3 py-1 text-sm text-ink-2">Owner: Clinic manager</span>
          </div>
        </div>
      </Container>
    </section>
  );
}

function Architecture() {
  const nodes = [
    { icon: FileUp, t: 'S3', b: 'Encrypted import bucket for history files' },
    { icon: Sparkles, t: 'Lambda', b: 'De-identifies and validates each row' },
    { icon: Database, t: 'DynamoDB', b: 'Services, rooms, sessions and decisions' },
    { icon: LineChart, t: 'SageMaker AI', b: 'Arrival and cancellation forecasts' },
    { icon: Lock, t: 'Bedrock', b: 'Plain-language weekly summaries' },
  ];
  return (
    <section id="architecture" className="border-y border-line bg-white py-24">
      <Container>
        <SectionHead title="Planned on AWS, one isolated account per customer" lead="This is the architecture we are building for the pilot. Nothing in the public demo calls these services." />
        <div className="mt-12 grid gap-4 md:grid-cols-5">
          {nodes.map((n, i) => (
            <div key={n.t} className="reveal relative rounded-[18px] bg-mist p-5" style={d(i * 80)}>
              <n.icon className="h-6 w-6 text-ink" aria-hidden />
              <p className="mt-4 font-display text-lg font-semibold">{n.t}</p>
              <p className="mt-1 text-sm leading-relaxed text-ink-2">{n.b}</p>
              {i < nodes.length - 1 && <ArrowRight className="absolute top-1/2 -right-3.5 hidden h-5 w-5 -translate-y-1/2 text-saffron md:block" aria-hidden />}
            </div>
          ))}
        </div>
      </Container>
    </section>
  );
}

export function Pricing() {
  return (
    <section id="pricing" className="py-24">
      <Container>
        <SectionHead title="Priced by facility size, billed monthly" lead="Pilot pricing for 2027. Every plan includes onboarding and the eight-week pilot." />
        <div className="mt-12 grid gap-5 lg:grid-cols-3">
          {PLANS.map((p, i) => (
            <div key={p.name} className={`reveal lift flex flex-col rounded-[18px] border p-7 ${p.featured ? 'border-ink bg-ink text-white' : 'border-line bg-white'}`} style={d(i * 80)}>
              <h3 className="text-2xl font-semibold">{p.name}</h3>
              <p className={`mt-1 ${p.featured ? 'text-white/70' : 'text-ink-3'}`}>{p.fit}</p>
              <p className="mt-6 font-display text-5xl font-bold">{p.price ? `$${p.price}` : 'Talk to us'}<span className={`ml-1 text-base font-normal ${p.featured ? 'text-white/70' : 'text-ink-3'}`}>{p.price ? p.unit : ''}</span></p>
              <ul className="mt-6 flex-1 space-y-2.5">
                {p.features.map((f) => <li key={f} className="flex gap-2.5"><Check className="mt-0.5 h-5 w-5 shrink-0 text-saffron" aria-hidden />{f}</li>)}
              </ul>
              <Link to="/contact" className={`mt-8 ${p.featured ? 'btn bg-saffron text-ink hover:-translate-y-0.5' : 'btn-ghost'}`}>{p.price ? 'Start a pilot' : 'Contact sales'}</Link>
            </div>
          ))}
        </div>
      </Container>
    </section>
  );
}

function Roadmap() {
  return (
    <section id="roadmap" className="border-y border-line bg-white py-24">
      <Container>
        <SectionHead title="Roadmap for 2027" />
        <ol className="mt-12 grid gap-6 md:grid-cols-4">
          {ROADMAP.map((r, i) => (
            <li key={r.when} className="reveal border-l-2 border-saffron pl-5" style={d(i * 80)}>
              <p className="text-sm font-semibold text-ink-3">{r.when}</p>
              <h3 className="mt-1 text-xl font-semibold">{r.title}</h3>
              <p className="mt-2 leading-relaxed text-ink-2">{r.body}</p>
            </li>
          ))}
        </ol>
      </Container>
    </section>
  );
}

export function Founders() {
  return (
    <section id="founders" className="py-24">
      <Container>
        <SectionHead title="The founders" lead="QueueVeld was started in Lagos by an outpatient operations lead and a forecasting engineer." />
        <div className="mt-12 grid gap-6 md:grid-cols-2">
          {FOUNDERS.map((f, i) => (
            <article key={f.name} className="reveal lift panel flex flex-col gap-6 p-7 sm:flex-row" style={d(i * 100)}>
              <div className={`grid h-24 w-24 shrink-0 place-items-center rounded-[22px] font-display text-3xl font-bold ${i ? 'bg-sage-soft text-ink' : 'bg-saffron text-ink'}`} aria-hidden>{f.initials}</div>
              <div>
                <h3 className="text-2xl font-semibold">{f.name}</h3>
                <p className="font-medium text-ink-3">{f.role}</p>
                <p className="mt-3 leading-relaxed text-ink-2">{f.bio}</p>
                <ul className="mt-4 flex flex-wrap gap-2">{f.focus.map((x) => <li key={x} className="rounded-full bg-mist px-3 py-1 text-sm">{x}</li>)}</ul>
              </div>
            </article>
          ))}
        </div>
      </Container>
    </section>
  );
}

function Faq() {
  return (
    <section id="faq" className="border-t border-line bg-white py-24">
      <Container className="grid gap-12 lg:grid-cols-[1fr_1.4fr]">
        <SectionHead title="Questions clinic managers ask us" />
        <div className="divide-y divide-line border-y border-line">
          {FAQ.map(([q, a]) => (
            <details key={q} className="reveal group py-5">
              <summary className="flex cursor-pointer list-none items-center justify-between gap-6 text-lg font-semibold">
                {q}<span className="grid h-8 w-8 shrink-0 place-items-center rounded-full bg-mist transition-transform group-open:rotate-45" aria-hidden>+</span>
              </summary>
              <p className="mt-3 max-w-xl leading-relaxed text-ink-2">{a}</p>
            </details>
          ))}
        </div>
      </Container>
    </section>
  );
}
