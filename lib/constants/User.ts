// Veritabanındaki 'profession_type' ENUM değerleriyle BİREBİR aynı olmalı

export const PROFESSIONS = {
  DIETITIAN: 'dietitian',
  PT: 'pt',
  PSYCHOLOGIST: 'psychologist',
  PHYSIOTHERAPIST: 'physiotherapist', // Veritabanı enum'una bunu eklediysen kullan
} as const;

// Dropdown (Select) menüsü için hazır liste
export const PROFESSION_OPTIONS = [
  { value: PROFESSIONS.DIETITIAN, label: 'Diyetisyen' },
  { value: PROFESSIONS.PT, label: 'Kişisel Antrenör (PT)' },
  { value: PROFESSIONS.PSYCHOLOGIST, label: 'Psikolog' },
  { value: PROFESSIONS.PHYSIOTHERAPIST, label: 'Fizyoterapist' },
];

