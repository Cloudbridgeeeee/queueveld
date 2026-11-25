export interface Lead { name: string; email: string; organisation: string; type: string; message: string }
export function validateLead(l: Lead) {
  const e: Partial<Record<keyof Lead, string>> = {};
  if (l.name.trim().length < 2) e.name = 'Enter your name.';
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(l.email)) e.email = 'Enter a valid work email, like name@clinic.org.';
  if (l.organisation.trim().length < 2) e.organisation = 'Enter your facility or organisation.';
  return e;
}
export function saveLead(l: Lead) {
  const all = JSON.parse(localStorage.getItem('qv-leads') ?? '[]');
  all.push({ ...l, at: new Date().toISOString() });
  localStorage.setItem('qv-leads', JSON.stringify(all));
}
