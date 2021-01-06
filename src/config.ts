export default {
  apiUrl: 'http://localhost:4200',
  vocabularyLevels: {
    0: 'New',
    0.1: 'New',
    0.2: 'New',
    0.4: 'Started',
    0.5: 'Started',
    0.6: 'Started',
    0.7: 'Learned',
    0.8: 'Learned',
    0.9: 'Learned',
    1: 'Mastered'
  },
  vocabularyReverseLevels: {
    New: 0,
    Started: 0.4,
    Learned: 0.7,
    Mastered: 1
  }
};
