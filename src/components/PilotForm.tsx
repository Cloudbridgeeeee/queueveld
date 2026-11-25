import { useState, type FormEvent } from 'react';
import { CheckCircle2 } from 'lucide-react';
import { saveLead, validateLead, type Lead } from '@/lib/lead';
import { site } from '@/data/site';

const empty: Lead = { name: '', email: '', organisation: '', type: 'Outpatient clinic', message: '' };

export default function PilotForm() {
  const [v, setV] = useState(empty);
  const [err, setErr] = useState<Partial<Record<keyof Lead, string>>>({});
  const [sent, setSent] = useState(false);
  const set = (k: keyof Lead) => (e: { target: { value: string } }) => setV({ ...v, [k]: e.target.value });
  const submit = (e: FormEvent) => {
    e.preventDefault();
    const found = validateLead(v);
    setErr(found);
    if (Object.keys(found).length) return;
    saveLead(v);
    setSent(true);
  };
  if (sent)
    return (
      <div className="tick-in py-10 text-center" role="status">
        <CheckCircle2 className="mx-auto h-12 w-12 text-sage" aria-hidden />
        <h3 className="mt-4 text-2xl font-semibold">Pilot request saved</h3>
        <p className="mt-2 text-ink-2">Ayomide replies within two working days. In this demo the request is kept in your browser; you can also email <a className="underline" href={`mailto:${site.email}?subject=QueueVeld pilot`}>{site.email}</a>.</p>
      </div>
    );
  const field = 'mt-1.5 w-full rounded-xl border border-line bg-white px-4 py-3 text-[15px] outline-none transition-colors focus:border-ink';
  const F = ({ k, label, type = 'text' }: { k: keyof Lead; label: string; type?: string }) => (
    <label className="block text-sm font-medium">
      {label}
      <input type={type} value={v[k]} onChange={set(k)} className={field} aria-invalid={!!err[k]} name={k} />
      {err[k] && <span className="mt-1 block text-sm text-coral">{err[k]}</span>}
    </label>
  );
  return (
    <form onSubmit={submit} noValidate className="space-y-4">
      <h3 className="text-2xl font-semibold">Request a pilot</h3>
      <div className="grid gap-4 sm:grid-cols-2">{F({ k: 'name', label: 'Your name' })}{F({ k: 'email', label: 'Work email', type: 'email' })}</div>
      {F({ k: 'organisation', label: 'Facility or organisation' })}
      <label className="block text-sm font-medium">Facility type
        <select value={v.type} onChange={set('type')} className={field} name="type">
          {['Outpatient clinic', 'Hospital outpatient department', 'Diagnostic centre', 'Clinic network'].map((o) => <option key={o}>{o}</option>)}
        </select>
      </label>
      <label className="block text-sm font-medium">What would you like to plan better? (optional)
        <textarea rows={3} value={v.message} onChange={set('message')} className={field} name="message" />
      </label>
      <button className="btn-primary w-full">Send pilot request</button>
    </form>
  );
}
