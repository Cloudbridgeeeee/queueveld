import { describe, expect, it } from 'vitest';
import { SERVICES, dayPlan, hourlyCapacity, recommendRooms, waitMinutes } from './forecast';

const gen = SERVICES[0]!;
describe('forecast model', () => {
  it('computes hourly capacity from rooms and minutes', () => expect(hourlyCapacity(gen)).toBe(24));
  it('wait grows with load', () => expect(waitMinutes(0.9, 15)).toBeGreaterThan(waitMinutes(0.5, 15)));
  it('carries unmet demand forward as backlog', () => {
    const plan = dayPlan(gen, 'Mon', 1);
    expect(plan.at(-1)!.backlog).toBeGreaterThan(0);
  });
  it('recommends enough rooms to stay under target', () => {
    const r = recommendRooms(gen, 'Mon');
    expect(dayPlan(gen, 'Mon', r).every((h) => h.load <= 0.9)).toBe(true);
    expect(r > 1 ? dayPlan(gen, 'Mon', r - 1).some((h) => h.load > 0.9) : true).toBe(true);
  });
});
