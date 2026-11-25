import { Link } from 'react-router-dom';
import { Check, KeyRound, Lock, Server, ShieldCheck, UserX } from 'lucide-react';
import { Container, PageHero, SectionHead } from '@/components/Layout';
import PilotForm from '@/components/PilotForm';
import DayBoard from '@/components/DayBoard';
import { Founders, Pricing as PricingSection, STEPS } from './Home';
import { FAQ, site } from '@/data/site';
import { useMeta } from '@/lib/motion';

export function Product() {
  useMeta('Product');
  const rows = [
    ['Appointment demand forecasting', 'Fourteen-day, hour-by-hour arrival forecasts per service, with error bands.', 'In demo'],
    ['Waiting-time estimation', 'Expected waits from forecast load, rooms and real consultation length.', 'In demo'],
    ['Cancellation pattern analysis', 'Cancellation and no-show rates by lead time, weekday and service.', 'In demo'],
    ['Capacity planning recommendations', 'Suggested room counts per day that keep load under your target.', 'In demo'],
    ['Administrative dashboards', 'Utilisation and wait trends for operations meetings.', 'Pilot'],
    ['EHR and booking-system import', 'Scheduled exports from your scheduling system into S3.', 'Integration'],
  ];
  return (
    <>
      <PageHero title="One forecast for the whole clinic day" lead="QueueVeld turns appointment history into a working plan: who will arrive, when the queue will build, and where capacity should move." />
      <section className="py-20"><Container className="grid items-center gap-12 lg:grid-cols-2"><DayBoard /><div><SectionHead title="Built around the hours that matter" lead="Pick a day and watch the forecast redraw. Red fill marks hours where expected arrivals exceed what your rooms can see." /><Link to="/demo" className="btn-primary mt-8">Open the full demo</Link></div></Container></section>
      <section className="border-t border-line bg-white py-20">
        <Container>
          <SectionHead title="What is included" lead="Labels show what you can try in the public demo today, what arrives in the pilot, and what needs an integration." />
          <div className="mt-10 divide-y divide-line border-y border-line">
            {rows.map(([t, b, s]) => (
              <div key={t} className="reveal grid gap-2 py-5 md:grid-cols-[1fr_2fr_auto] md:items-center">
                <p className="text-lg font-semibold">{t}</p><p className="text-ink-2">{b}</p>
                <span className={`justify-self-start rounded-full px-3 py-1 text-sm font-medium ${s === 'In demo' ? 'bg-sage-soft' : s === 'Pilot' ? 'bg-saffron-soft' : 'bg-mist'}`}>{s}</span>
              </div>
            ))}
          </div>
        </Container>
      </section>
    </>
  );
}

export function HowItWorks() {
  useMeta('How it works');
  return (
    <>
      <PageHero title="How a QueueVeld pilot runs" lead="Eight weeks, your own data, and your team making every scheduling decision." />
      <section className="py-20">
        <Container>
          <ol className="space-y-6">
            {STEPS.map((s, i) => (
              <li key={s.title} className="reveal panel grid gap-6 p-7 md:grid-cols-[120px_1fr]">
                <span className="font-display text-6xl font-bold text-saffron">{i + 1}</span>
                <div><s.icon className="h-6 w-6" aria-hidden /><h2 className="mt-3 text-2xl font-semibold">{s.title}</h2><p className="mt-2 max-w-2xl leading-relaxed text-ink-2">{s.body}</p></div>
              </li>
            ))}
          </ol>
        </Container>
      </section>
    </>
  );
}

export function Pricing() {
  useMeta('Pricing');
  return (<><PageHero title="Simple pricing by facility size" lead="Monthly subscriptions. No per-patient fees." /><PricingSection /><section className="border-t border-line bg-white py-20"><Container><SectionHead title="Billing questions" /><div className="mt-8 grid gap-6 md:grid-cols-2">{FAQ.slice(3).map(([q, a]) => <div key={q} className="reveal"><h3 className="text-lg font-semibold">{q}</h3><p className="mt-2 text-ink-2">{a}</p></div>)}</div></Container></section></>);
}

export function About() {
  useMeta('Company');
  return (
    <>
      <PageHero title="We plan for patients who have not arrived yet" lead="QueueVeld is a Lagos-based healthcare software company building capacity planning tools for clinics across West Africa and beyond." />
      <section className="py-20"><Container className="grid gap-10 md:grid-cols-3">
        {[['Plan, don’t prescribe', 'We support operations decisions and stay out of clinical ones.'], ['Show the uncertainty', 'A forecast without an error band is a guess wearing a suit.'], ['Your data stays yours', 'Isolated accounts, de-identified imports, and deletion on request.']].map(([t, b]) => <div key={t} className="reveal border-t-2 border-ink pt-5"><h2 className="text-2xl font-semibold">{t}</h2><p className="mt-2 text-ink-2">{b}</p></div>)}
      </Container></section>
      <div className="border-t border-line bg-white"><Founders /></div>
    </>
  );
}

export function Security() {
  useMeta('Security');
  const items = [
    { icon: UserX, t: 'De-identified at import', b: 'Names, phone numbers and record numbers are removed by a Lambda function before data reaches storage.' },
    { icon: Lock, t: 'Encrypted everywhere', b: 'TLS 1.2+ in transit; S3 and DynamoDB encrypted at rest with customer-specific KMS keys.' },
    { icon: Server, t: 'One account per customer', b: 'Each facility’s data lives in its own AWS account in the region it chooses.' },
    { icon: KeyRound, t: 'Role-based access', b: 'Managers, analysts and viewers see only what their role allows. Every change is audited.' },
    { icon: ShieldCheck, t: 'No scheduling write access', b: 'QueueVeld reads exports. It cannot create, move or cancel an appointment.' },
    { icon: Check, t: 'Deletion on request', b: 'Leave at any time and we delete your data within 30 days, with written confirmation.' },
  ];
  return (
    <>
      <PageHero title="Security for appointment data" lead="Appointment histories are sensitive even without clinical notes. Here is how the pilot platform is designed to protect them." />
      <section className="py-20"><Container className="grid gap-5 md:grid-cols-3">{items.map((i) => <div key={i.t} className="reveal panel p-7"><i.icon className="h-6 w-6 text-sage" aria-hidden /><h2 className="mt-4 text-xl font-semibold">{i.t}</h2><p className="mt-2 leading-relaxed text-ink-2">{i.b}</p></div>)}</Container></section>
    </>
  );
}

export function Contact() {
  useMeta('Contact');
  return (
    <>
      <PageHero title="Talk to the founders" lead="Tell us about your clinic. Ayomide answers every pilot request personally." />
      <section className="py-20"><Container className="grid gap-12 lg:grid-cols-[1fr_1.2fr]">
        <div className="space-y-6 text-lg">
          <p>Email <a className="font-semibold underline decoration-saffron decoration-2 underline-offset-4" href={`mailto:${site.email}`}>{site.email}</a></p>
          <p className="text-ink-2">Office: Yaba, Lagos.</p>
          <p className="text-ink-2">We reply within two working days.</p>
        </div>
        <div className="panel p-6 sm:p-8"><PilotForm /></div>
      </Container></section>
    </>
  );
}

function Legal({ title, paras }: { title: string; paras: [string, string][] }) {
  useMeta(title);
  return (<><PageHero title={title} lead="Draft for the 2027 pilot programme. Last updated November 2026." /><section className="py-16"><Container className="max-w-3xl space-y-8">{paras.map(([h, p]) => <div key={h}><h2 className="text-2xl font-semibold">{h}</h2><p className="mt-2 leading-relaxed text-ink-2">{p}</p></div>)}</Container></section></>);
}
export const Privacy = () => <Legal title="Privacy notice" paras={[['What we collect', 'Contact details you send through our forms, and de-identified appointment records your facility uploads during a pilot.'], ['How we use it', 'To reply to you and to produce forecasts for your facility. We never sell data or use one customer’s data for another.'], ['Your rights', `Ask for a copy or deletion of your data at ${site.email}.`]]} />;
export const Terms = () => <Legal title="Terms of use" paras={[['The demo', 'The public demo runs on sample data in your browser. Figures are illustrative.'], ['Planning aid only', 'QueueVeld forecasts support operational planning. They are not medical advice and do not replace staff judgement.'], ['Pilots', 'Pilot terms are agreed in writing with each facility.']]} />;

export function NotFound() {
  useMeta('Page not found');
  return <PageHero title="This page is not on the schedule" lead="The link may be old or mistyped."><Link to="/" className="btn-primary mt-8">Back to the home page</Link></PageHero>;
}
