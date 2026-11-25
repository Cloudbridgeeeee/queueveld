import { useEffect, useMemo, useState, type CSSProperties } from 'react';
import { NavLink, Navigate, Route, Routes } from 'react-router-dom';
import { BarChart3, CalendarClock, LayoutGrid, ListChecks, Info } from 'lucide-react';
import { Container } from '@/components/Layout';
import { CANCELLATIONS, DAYS, SERVICES, dayPlan, hourlyCapacity, recommendRooms, type Day, type Service } from '@/lib/forecast';
import { useMeta } from '@/lib/motion';

const tabs = [
  { to: '', label: 'Week overview', icon: LayoutGrid },
  { to: 'forecast', label: 'Day forecast', icon: CalendarClock },
  { to: 'cancellations', label: 'Cancellations', icon: BarChart3 },
  { to: 'capacity', label: 'Capacity review', icon: ListChecks },
];

function SvcPicker({ svc, set }: { svc: Service; set: (s: Service) => void }) {
  return (
    <label className="text-sm font-medium">Service{' '}
      <select className="ml-2 rounded-full border border-line bg-white px-3 py-2" value={svc.id} onChange={(e) => set(SERVICES.find((s) => s.id === e.target.value)!)}>
        {SERVICES.map((s) => <option key={s.id} value={s.id}>{s.name}</option>)}
      </select>
    </label>
  );
}

const loadColor = (l: number) => (l > 1 ? '#e2553a' : l > 0.85 ? '#f2a93b' : l > 0.6 ? '#fbe6c3' : '#d7e7e1');

function Overview() {
  const [svc, setSvc] = useState<Service>(SERVICES[0]!);
  return (
    <div>
      <div className="flex flex-wrap items-center justify-between gap-4"><h2 className="text-2xl font-semibold">Load by hour, next week</h2><SvcPicker svc={svc} set={setSvc} /></div>
      <div className="panel mt-6 overflow-x-auto p-5">
        <table className="w-full min-w-[560px] border-separate border-spacing-1.5 text-sm">
          <thead><tr><th className="w-14" />{dayPlan(svc, 'Mon').map((h) => <th key={h.hour} className="font-medium text-ink-3">{h.hour}:00</th>)}</tr></thead>
          <tbody>
            {DAYS.map((d, r) => (
              <tr key={d}><th className="text-left font-semibold">{d}</th>
                {dayPlan(svc, d).map((h, c) => (
                  <td key={h.hour} title={`${d} ${h.hour}:00 · load ${Math.round(h.load * 100)}% · wait ${h.wait} min`} className="bar-grow h-12 rounded-lg text-center font-semibold" style={{ background: loadColor(h.load), '--d': `${(r * 9 + c) * 15}ms` } as CSSProperties}>
                    {Math.round(h.load * 100)}%
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
        <div className="mt-4 flex flex-wrap gap-4 text-sm text-ink-2">
          {[['#d7e7e1', 'Under 60%'], ['#fbe6c3', '60–85%'], ['#f2a93b', '85–100%'], ['#e2553a', 'Over capacity']].map(([c, l]) => <span key={l} className="flex items-center gap-2"><span className="h-3 w-3 rounded" style={{ background: c }} />{l}</span>)}
        </div>
      </div>
    </div>
  );
}

function Forecast() {
  const [svc, setSvc] = useState<Service>(SERVICES[0]!);
  const [day, setDay] = useState<Day>('Mon');
  const [rooms, setRooms] = useState<number>(svc.rooms);
  useEffect(() => setRooms(svc.rooms), [svc]);
  const plan = useMemo(() => dayPlan(svc, day, rooms), [svc, day, rooms]);
  const max = Math.max(...plan.map((p) => Math.max(p.arrivals, p.capacity))) * 1.15;
  const peak = Math.max(...plan.map((p) => p.wait));
  return (
    <div>
      <div className="flex flex-wrap items-center gap-4">
        <h2 className="mr-auto text-2xl font-semibold">Day forecast</h2>
        <SvcPicker svc={svc} set={setSvc} />
        <label className="text-sm font-medium">Day <select className="ml-2 rounded-full border border-line bg-white px-3 py-2" value={day} onChange={(e) => setDay(e.target.value as Day)}>{DAYS.map((d) => <option key={d}>{d}</option>)}</select></label>
      </div>
      <div className="mt-6 grid gap-5 lg:grid-cols-[1fr_280px]">
        <div className="panel p-5">
          <div className="flex h-64 items-end gap-2" role="img" aria-label="Arrivals per hour against capacity">
            {plan.map((p, i) => (
              <div key={p.hour + rooms} className="relative flex h-full flex-1 flex-col justify-end">
                <div className="absolute inset-x-0 border-t-2 border-dashed border-ink" style={{ bottom: `${(p.capacity / max) * 100}%` }} />
                <div className="bar-grow rounded-t-lg" style={{ height: `${(p.arrivals / max) * 100}%`, background: p.arrivals > p.capacity ? '#e2553a' : '#f2a93b', '--d': `${i * 50}ms` } as CSSProperties} />
                <span className="mt-2 text-center text-xs text-ink-3">{p.hour}</span>
              </div>
            ))}
          </div>
          <p className="mt-3 text-sm text-ink-3">Bars: expected arrivals after cancellations. Dashed line: patients your rooms can see per hour.</p>
        </div>
        <div className="space-y-4">
          <div className="panel p-5">
            <label htmlFor="rooms" className="text-sm font-medium">Rooms open: <b className="text-lg">{rooms}</b></label>
            <input id="rooms" type="range" min={1} max={10} value={rooms} onChange={(e) => setRooms(+e.target.value)} className="mt-3 w-full accent-[#14233b]" />
            <p className="mt-2 text-sm text-ink-3">Capacity {hourlyCapacity(svc, rooms)} patients/hour</p>
          </div>
          <div className="panel p-5"><p className="text-sm text-ink-3">Peak estimated wait</p><p className={`font-display text-4xl font-bold ${peak > 30 ? 'text-coral' : 'text-sage'}`}>{peak} min</p></div>
          <div className="panel p-5"><p className="text-sm text-ink-3">Patients still waiting at close</p><p className="font-display text-4xl font-bold">{plan.at(-1)!.backlog}</p></div>
        </div>
      </div>
    </div>
  );
}

function Cancellations() {
  const max = Math.max(...CANCELLATIONS.map((c) => c.rate));
  return (
    <div>
      <h2 className="text-2xl font-semibold">Cancellation rate by booking lead time</h2>
      <p className="mt-2 max-w-2xl text-ink-2">Appointments booked three or more weeks ahead are cancelled six times as often as same-day bookings. A reminder five days before could recover some of those slots.</p>
      <div className="mt-6 grid gap-5 lg:grid-cols-2">
        <div className="panel space-y-4 p-6">
          {CANCELLATIONS.map((c, i) => (
            <div key={c.lead}>
              <div className="flex justify-between text-sm"><span className="font-medium">{c.lead}</span><span>{Math.round(c.rate * 100)}%</span></div>
              <div className="mt-1.5 h-4 overflow-hidden rounded-full bg-mist"><div className="h-full origin-left rounded-full bg-saffron" style={{ width: `${(c.rate / max) * 100}%`, animation: `grow-x .8s ${i * 80}ms both` }} /></div>
            </div>
          ))}
        </div>
        <div className="panel p-6">
          <h3 className="text-lg font-semibold">By service</h3>
          <table className="mt-4 w-full text-left">
            <thead className="text-sm text-ink-3"><tr><th className="pb-2 font-medium">Service</th><th className="pb-2 font-medium">Rate</th><th className="pb-2 font-medium">Slots lost / week</th></tr></thead>
            <tbody className="divide-y divide-line">{SERVICES.map((s) => <tr key={s.id}><td className="py-3">{s.name}</td><td>{Math.round(s.cancel * 100)}%</td><td>{Math.round(s.base * 7 * 5 * s.cancel)}</td></tr>)}</tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

type Decision = 'accepted' | 'declined';
function Capacity() {
  const [log, setLog] = useState<Record<string, Decision>>(() => JSON.parse(localStorage.getItem('qv-decisions') ?? '{}'));
  useEffect(() => localStorage.setItem('qv-decisions', JSON.stringify(log)), [log]);
  const recs = SERVICES.flatMap((s) => DAYS.map((d) => ({ s, d, now: s.rooms, rec: recommendRooms(s, d) }))).filter((r) => r.rec !== r.now);
  return (
    <div>
      <div className="flex flex-wrap items-end justify-between gap-4">
        <div><h2 className="text-2xl font-semibold">Capacity suggestions to review</h2><p className="mt-1 text-ink-2">Room counts that keep every hour under 90% load. Nothing changes until your team decides.</p></div>
        <button className="btn-ghost py-2" onClick={() => setLog({})}>Reset decisions</button>
      </div>
      <ul className="mt-6 space-y-3">
        {recs.map(({ s, d, now, rec }) => {
          const key = `${s.id}-${d}`;
          const st = log[key];
          return (
            <li key={key} className="panel flex flex-wrap items-center gap-4 p-5">
              <div className="mr-auto">
                <p className="font-semibold">{s.name}, {d}</p>
                <p className="text-sm text-ink-2">{rec > now ? `Open ${rec - now} more room${rec - now > 1 ? 's' : ''}` : `Release ${now - rec} room${now - rec > 1 ? 's' : ''}`} ({now} → {rec}). Peak wait drops from {Math.max(...dayPlan(s, d, now).map((h) => h.wait))} to {Math.max(...dayPlan(s, d, rec).map((h) => h.wait))} min.</p>
              </div>
              {st ? (
                <span className={`rounded-full px-3 py-1.5 text-sm font-semibold ${st === 'accepted' ? 'bg-sage-soft' : 'bg-coral-soft'}`}>{st === 'accepted' ? 'Accepted' : 'Declined'}</span>
              ) : (
                <div className="flex gap-2">
                  <button className="btn-primary py-2" onClick={() => setLog({ ...log, [key]: 'accepted' })}>Accept</button>
                  <button className="btn-ghost py-2" onClick={() => setLog({ ...log, [key]: 'declined' })}>Decline</button>
                </div>
              )}
            </li>
          );
        })}
      </ul>
    </div>
  );
}

export default function Demo() {
  useMeta('Demo workspace');
  return (
    <section className="py-10">
      <Container>
        <div className="flex items-start gap-3 rounded-2xl bg-saffron-soft px-5 py-4 text-[15px]"><Info className="mt-0.5 h-5 w-5 shrink-0" aria-hidden />Demo workspace for Lagos Island Clinic. Forecasts come from a rule-based model running on sample data in your browser; no AI service is called.</div>
        <nav className="mt-6 flex gap-1 overflow-x-auto rounded-full bg-white p-1.5" aria-label="Demo sections">
          {tabs.map((t) => (
            <NavLink key={t.to} to={t.to} end className={({ isActive }) => `flex shrink-0 items-center gap-2 rounded-full px-4 py-2.5 text-[15px] font-medium transition-colors ${isActive ? 'bg-ink text-white' : 'text-ink-2 hover:bg-mist'}`}><t.icon className="h-4 w-4" aria-hidden />{t.label}</NavLink>
          ))}
        </nav>
        <div className="mt-8">
          <Routes>
            <Route index element={<Overview />} />
            <Route path="forecast" element={<Forecast />} />
            <Route path="cancellations" element={<Cancellations />} />
            <Route path="capacity" element={<Capacity />} />
            <Route path="*" element={<Navigate to="" replace />} />
          </Routes>
        </div>
      </Container>
    </section>
  );
}
