import { describe, expect, it } from 'vitest';
import { validateLead } from './lead';
describe('validateLead', () => {
  it('flags missing fields', () => expect(Object.keys(validateLead({ name: '', email: 'x', organisation: '', type: 'pilot', message: '' }))).toEqual(['name', 'email', 'organisation']));
  it('accepts a complete lead', () => expect(validateLead({ name: 'Ada', email: 'ada@clinic.org', organisation: 'Clinic', type: 'pilot', message: '' })).toEqual({}));
});
