/** Deterministic demo forecasting model. Runs in the browser on seeded data; no AI service is called. */

export const HOURS = ['08', '09', '10', '11', '12', '13', '14', '15', '16'] as const;
export const DAYS = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri'] as const;
export type Day = (typeof DAYS)[number];

const WEEKDAY: Record<Day, number> = { Mon: 1.28, Tue: 1.05, Wed: 0.97, Thu: 0.84, Fri: 0.9 };
const SHAPE = [0.62, 1.18, 1.32, 1.12, 0.74, 0.66, 0.98, 0.86, 0.52];

export interface Service { id: string; name: string; base: number; rooms: number; minutes: number; cancel: number }
export const SERVICES: Service[] = [
  { id: 'gen', name: 'General outpatient', base: 17, rooms: 6, minutes: 15, cancel: 0.11 },
  { id: 'ant', name: 'Antenatal', base: 6, rooms: 3, minutes: 20, cancel: 0.07 },
  { id: 'rad', name: 'Radiology', base: 5, rooms: 3, minutes: 25, cancel: 0.16 },
  { id: 'lab', name: 'Laboratory draws', base: 22, rooms: 3, minutes: 6, cancel: 0.05 },
];

/** Patients a service can see per hour at full staffing. */
export const hourlyCapacity = (s: Service, rooms = s.rooms) => Math.round((60 / s.minutes) * rooms);

/** Expected arrivals per hour for a service on a day, after expected cancellations. */
export function arrivals(s: Service, day: Day, cancelOverride?: number) {
  const c = cancelOverride ?? s.cancel;
  return SHAPE.map((f) => Math.round(s.base * f * WEEKDAY[day] * (1 - c)));
}

/** Average wait in minutes for a queue whose load is arrivals/capacity (simple M/M/1-style approximation, capped). */
export function waitMinutes(load: number, serviceMin: number) {
  if (load <= 0) return 0;
  const l = Math.min(load, 0.95);
  const base = (serviceMin * l) / (2 * (1 - l));
  const over = load > 0.95 ? (load - 0.95) * serviceMin * 12 : 0;
  return Math.min(120, Math.round(base + over));
}

export function dayPlan(s: Service, day: Day, rooms = s.rooms) {
  const cap = hourlyCapacity(s, rooms);
  let backlog = 0;
  return arrivals(s, day).map((a, i) => {
    const demand = a + backlog;
    const seen = Math.min(cap, demand);
    backlog = demand - seen;
    const load = demand / cap;
    return { hour: HOURS[i]!, arrivals: a, capacity: cap, backlog, load, wait: waitMinutes(Math.min(load, 1.4), s.minutes) };
  });
}

/** Smallest room count that keeps every hour's load at or below `target`. */
export function recommendRooms(s: Service, day: Day, target = 0.9) {
  for (let r = 1; r <= 12; r++) if (dayPlan(s, day, r).every((h) => h.load <= target)) return r;
  return 12;
}

export const CANCELLATIONS = [
  { lead: 'Same day', rate: 0.04 },
  { lead: '1–3 days', rate: 0.08 },
  { lead: '4–7 days', rate: 0.12 },
  { lead: '1–2 weeks', rate: 0.17 },
  { lead: '3+ weeks', rate: 0.26 },
];
