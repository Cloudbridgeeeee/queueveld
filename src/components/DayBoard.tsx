import { useMemo, useState } from 'react';
import { DAYS, SERVICES, dayPlan, type Day } from '@/lib/forecast';

/** Hero visual: the forecast arrival curve for one service drawn against its hourly capacity. */
export default function DayBoard() {
  const [day, setDay] = useState<Day>('Mon');
  const svc = SERVICES[0]!;
  const plan = useMemo(() => dayPlan(svc, day, 5), [svc, day]);
  const W = 520, H = 220;
  const max = Math.ceil(Math.max(...plan.map((p) => Math.max(p.arrivals, p.capacity))) / 10) * 10 + 5;
  const x = (i: number) => 20 + (i * (W - 40)) / (plan.length - 1);
  const y = (v: number) => H - 20 - (v / max) * (H - 50);
  const demand = plan.map((p) => p.arrivals + (p.backlog > 0 ? 0 : 0));
  const path = demand.map((v, i) => `${i ? 'L' : 'M'}${x(i)},${y(v)}`).join(' ');
  const area = `${path} L${x(plan.length - 1)},${H - 20} L${x(0)},${H - 20} Z`;
  const capY = y(plan[0]!.capacity);
  const peakWait = Math.max(...plan.map((p) => p.wait));
  const over = plan.filter((p) => p.arrivals > p.capacity).length;

  return (
    <div className="relative">
      <div className="panel relative overflow-hidden p-5 shadow-[0_30px_60px_-30px_rgb(20_35_59/.35)] sm:p-6">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <div>
            <p className="text-sm text-ink-3">General outpatient · forecast arrivals per hour</p>
            <p className="font-display text-xl font-semibold">Lagos Island Clinic</p>
          </div>
          <div role="tablist" aria-label="Day" className="flex rounded-full bg-mist p-1">
            {DAYS.map((d) => (
              <button key={d} role="tab" aria-selected={d === day} onClick={() => setDay(d)}
                className={`rounded-full px-3 py-1.5 text-sm font-medium transition-colors ${d === day ? 'bg-ink text-white' : 'text-ink-2 hover:text-ink'}`}>{d}</button>
            ))}
          </div>
        </div>
        <svg key={day} viewBox={`0 0 ${W} ${H}`} className="mt-4 w-full" role="img" aria-label={`Forecast arrivals for ${day} against a capacity of ${plan[0]!.capacity} patients per hour`}>
          <defs>
            <clipPath id="above"><rect x="0" y="0" width={W} height={capY} /></clipPath>
          </defs>
          {[0, 10, 20, 30, 40].filter((t) => t < max).map((t) => (
            <g key={t}><line x1="20" x2={W - 20} y1={y(t)} y2={y(t)} stroke="#e2e8ec" /><text x="0" y={y(t) + 4} fontSize="10" fill="#67758a">{t}</text></g>
          ))}
          <path d={area} fill="#fbe6c3" opacity=".55" className="fill-late" />
          <path d={area} fill="#e2553a" opacity=".35" clipPath="url(#above)" className="fill-late" />
          <line x1="20" x2={W - 20} y1={capY} y2={capY} stroke="#14233b" strokeDasharray="5 5" strokeWidth="1.5" />
          <text x={W - 20} y={capY + 16} textAnchor="end" fontSize="11" fill="#14233b" fontWeight="600">Capacity {plan[0]!.capacity}/hr</text>
          <path d={path} fill="none" stroke="#f2a93b" strokeWidth="3.5" strokeLinecap="round" strokeLinejoin="round" className="draw-path" />
          {plan.map((p, i) => (
            <g key={p.hour}>
              <circle cx={x(i)} cy={y(p.arrivals)} r="4" fill={p.arrivals > p.capacity ? '#e2553a' : '#14233b'} className="fill-late" />
              <text x={x(i)} y={H - 4} textAnchor="middle" fontSize="10" fill="#67758a">{p.hour}:00</text>
            </g>
          ))}
        </svg>
        <dl className="mt-3 grid grid-cols-3 gap-3 border-t border-line pt-4">
          <div><dt className="text-xs text-ink-3">Hours over capacity</dt><dd className={`font-display text-2xl font-semibold ${over ? 'text-coral' : 'text-sage'}`}>{over}</dd></div>
          <div><dt className="text-xs text-ink-3">Peak est. wait</dt><dd className="font-display text-2xl font-semibold">{peakWait} min</dd></div>
          <div><dt className="text-xs text-ink-3">Expected patients</dt><dd className="font-display text-2xl font-semibold">{plan.reduce((a, p) => a + p.arrivals, 0)}</dd></div>
        </dl>
      </div>
      <div className="float-slow absolute -top-6 -left-5 hidden rounded-2xl border border-line bg-white px-4 py-3 shadow-lg sm:block">
        <p className="text-xs text-ink-3">Suggestion for review</p>
        <p className="text-[15px] font-semibold">{over ? 'Open a 6th room 09:00–12:00' : 'Current rooms cover demand'}</p>
      </div>
      <div className="float-slow absolute -right-3 -bottom-5 hidden items-center gap-2 rounded-full bg-ink px-4 py-2 text-sm text-white shadow-lg sm:flex" style={{ animationDelay: '-3s' }}>
        <span className="pulse-dot h-2 w-2 rounded-full bg-saffron text-saffron" aria-hidden /> Forecast refreshed 06:00
      </div>
    </div>
  );
}
