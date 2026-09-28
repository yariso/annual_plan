// Local storage only. Nothing leaves the device.

const KEY = 'steady.v1';

export const SEED_EVIDENCE = {
  date: '2026-09-28',
  source: 'National board meeting',
  what_happened: 'The quality insights pack was described as fantastic by several very senior members. My deputy said they had never heard such positive feedback from so senior an audience.',
  claim: 1,
  strength: 5,
  yes_but: '',
  read_count: 0,
};

// Neutral starting menu. Loading profile.json replaces it with your own.
export const SEED_ACTIVITIES = [
  ['Walk', 'outdoors', 'Shoes on, out the door, to the end of the road'],
  ['Read', 'rest', 'Open the book and read one page'],
  ['Tidy', 'physical', 'Clear one surface'],
  ['Message a friend', 'social', 'Send one friend a message'],
  ['Plants', 'outdoors', 'Water one plant'],
  ['Cook', 'craft', 'Choose one meal and check you have the ingredients'],
];

export const TABLES = ['checkins', 'activities', 'activity_log', 'evidence', 'exercise_log', 'signals', 'plan_log', 'events', 'reviews', 'reading_log', 'thought_records'];

function empty() {
  const db = {
    version: 1,
    next_id: 1,
    profile: null,
    settings: {
      thresholds: null,
      friend_name: '',
      friend_questions: [],
      show_drinks: true,
      work_rules: [],
      tip_protocol: '',
    },
    early_warnings: [],
    values: [],
    steady_markers: [],
    gp_notes: [],
    baselines: {},
    path: {},
    beliefs: [],
    today: null, // { date, checkin_id, state, overridden, step, extras }
  };
  for (const t of TABLES) db[t] = [];
  return db;
}

let db = null;

export function load() {
  if (db) return db;
  try {
    const raw = localStorage.getItem(KEY);
    db = raw ? { ...empty(), ...JSON.parse(raw) } : null;
  } catch { db = null; }
  if (!db) {
    db = empty();
    for (const [name, category, start] of SEED_ACTIVITIES) insert('activities', { name, category, two_minute_start: start, active: true });
    insert('evidence', { ...SEED_EVIDENCE });
    save();
  }
  return db;
}

export function save() {
  try { localStorage.setItem(KEY, JSON.stringify(db)); } catch { /* storage full or blocked */ }
}

export function insert(table, row) {
  const r = { id: db.next_id++, created_at: new Date().toISOString(), ...row };
  db[table].push(r);
  save();
  return r;
}

export function update(table, id, patch) {
  const r = db[table].find(x => x.id === id);
  if (r) Object.assign(r, patch);
  save();
  return r;
}

export function replaceAll(next) {
  db = { ...empty(), ...next };
  save();
}

// Maps the onboarding interview (data/profile.json) onto the app's tables.
export function importProfile(p) {
  const acts = [
    ...(p.q2_enjoyed_activities?.activities ?? []),
    ...(p.q3_putting_off?.activities ?? []),
  ];
  if (acts.length) {
    db.activities.forEach(a => { a.active = false; });
    for (const [name, category, start] of acts) {
      const existing = db.activities.find(a => a.name === name);
      const boost = /bread/i.test(name) ? 1.5 : /wife|kids|friend|invitation/i.test(name) ? 0.5 : 0;
      if (existing) Object.assign(existing, { category, two_minute_start: start, active: true, boost });
      else insert('activities', { name, category, two_minute_start: start, active: true, boost });
    }
  }
  const w = p.q5_early_warning;
  if (w) db.early_warnings = [...(w.before ?? []), ...(w.during ?? [])];
  if (p.q6_steady_markers?.markers) db.steady_markers = p.q6_steady_markers.markers;
  if (p.q7_values) db.values = p.q7_values;
  if (p.q8_friend) {
    db.settings.friend_name = p.q8_friend.who ?? '';
    db.settings.friend_questions = p.q8_friend.questions_drafted ?? [];
  }
  if (p.q10_work_rules?.rules) db.settings.work_rules = p.q10_work_rules.rules;
  if (p.notes_for_gp) db.gp_notes = [...new Set([...db.gp_notes, ...p.notes_for_gp])];
  db.profile = p;
  save();
}

export function exportJSON() {
  return JSON.stringify(db, null, 2);
}

function csvCell(v) {
  if (v == null) return '';
  const s = typeof v === 'object' ? JSON.stringify(v) : String(v);
  return /[",\n]/.test(s) ? `"${s.replace(/"/g, '""')}"` : s;
}

export function exportCSV(table) {
  const rows = db[table];
  const cols = [...new Set(rows.flatMap(r => Object.keys(r)))];
  return [cols.join(','), ...rows.map(r => cols.map(c => csvCell(r[c])).join(','))].join('\n');
}
