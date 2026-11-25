export const site = {
  name: 'QueueVeld',
  domain: 'queueveld.com',
  tagline: 'Make every service appointment count.',
  email: 'ayomide@queueveld.com',
};

export const FOUNDERS = [
  {
    name: 'Ayomide Akinola',
    initials: 'AA',
    role: 'Founder & CEO',
    bio: 'Ayomide spent six years running outpatient operations at a teaching hospital in Ibadan, where she watched Monday clinics overflow while Thursday rooms sat empty. She started QueueVeld to give operations teams a forecast they can plan against, and leads product, pilots and every customer conversation.',
    focus: ['Clinic operations', 'Pilots', 'Product'],
  },
  {
    name: 'Emmanuel Nwafor',
    initials: 'EN',
    role: 'Co-founder & CTO',
    bio: 'Emmanuel built demand-forecasting systems for retail logistics before turning to healthcare scheduling. He leads the forecasting models, the appointment-history import pipeline and the AWS platform QueueVeld runs on.',
    focus: ['Forecasting models', 'Data imports', 'Cloud platform'],
  },
];

export const NAV = [
  { to: '/product', label: 'Product' },
  { to: '/how-it-works', label: 'How it works' },
  { to: '/pricing', label: 'Pricing' },
  { to: '/security', label: 'Security' },
  { to: '/about', label: 'Company' },
];

export const PLANS = [
  { name: 'Clinic', price: 180, unit: 'per month', fit: 'One outpatient clinic, up to 8 consulting rooms', features: ['Appointment history import', '14-day arrival forecast', 'Waiting-time estimates', 'Weekly capacity report'] },
  { name: 'Facility', price: 640, unit: 'per month', fit: 'A hospital outpatient department or diagnostic centre', features: ['Everything in Clinic', 'Up to 40 rooms and 12 services', 'Cancellation pattern analysis', 'Capacity recommendations', 'Administrator dashboards'], featured: true },
  { name: 'Network', price: null, unit: 'custom', fit: 'Groups running several sites', features: ['Everything in Facility', 'Cross-site comparisons', 'Single sign-on', 'Dedicated onboarding lead'] },
];

export const FAQ = [
  ['Does QueueVeld decide who gets an appointment?', 'No. QueueVeld forecasts demand and suggests where capacity could move. Your scheduling team reviews every recommendation and makes every booking decision.'],
  ['What data do we need to start?', 'Twelve months of appointment history as a CSV or EHR export: booking date, appointment date and time, service, room and status. No clinical notes are needed or accepted.'],
  ['How accurate are the forecasts?', 'During the pilot we measure accuracy against your own past weeks and show the error band on every chart. We would rather show uncertainty than hide it.'],
  ['Where is our data stored?', 'In an isolated AWS account in the region you choose, encrypted at rest and in transit. Patient identifiers are removed at import.'],
  ['How long does a pilot take?', 'Eight weeks: two for import and baseline, six of live forecasting alongside your current process.'],
];

export const ROADMAP = [
  { when: 'Q1 2027', title: 'Pilot programme', body: 'History imports, arrival forecasts and scheduling dashboards with three outpatient partners.' },
  { when: 'Q2 2027', title: 'Cancellation insights', body: 'Pattern analysis by service, weekday and lead time, with reminder-timing suggestions.' },
  { when: 'Q3 2027', title: 'Capacity planner', body: 'Room and session recommendations that staff accept, adjust or decline.' },
  { when: 'Q4 2027', title: 'Network view', body: 'Compare demand across sites and share capacity between clinics.' },
];
