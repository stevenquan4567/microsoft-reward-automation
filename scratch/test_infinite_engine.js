const fs = require('fs');

const bank = JSON.parse(fs.readFileSync('data/quotes_bank.json', 'utf8'));

function getRandom(arr) {
  return arr && arr.length > 0 ? arr[Math.floor(Math.random() * arr.length)] : '';
}

function generateProceduralQuery() {
  const templates = bank.templates;
  let query = templates[Math.floor(Math.random() * templates.length)];

  const authors = bank.authors_and_thinkers;
  const topics = bank.topics_and_concepts;
  const snippets = bank.snippets;

  query = query
    .replace('{authors_and_thinkers}', () => getRandom(authors))
    .replace('{author}', () => getRandom(authors))
    .replace('{topics_and_concepts}', () => getRandom(topics))
    .replace('{topic}', () => getRandom(topics))
    .replace('{snippets}', () => getRandom(snippets))
    .replace('{snippet}', () => getRandom(snippets))
    .replace('{tech_and_programming}', () => getRandom(bank.tech_and_programming))
    .replace('{science_and_cosmos}', () => getRandom(bank.science_and_cosmos))
    .replace('{history_and_civilizations}', () => getRandom(bank.history_and_civilizations))
    .replace('{geography_and_cities}', () => getRandom(bank.geography_and_cities))
    .replace('{nature_and_wildlife}', () => getRandom(bank.nature_and_wildlife))
    .replace('{cuisine_and_cooking}', () => getRandom(bank.cuisine_and_cooking));

  const modifiers = bank.modifiers;
  const mod = getRandom(modifiers);
  if (mod) query += ` ${mod}`;

  return query;
}

console.log('🧪 GENERATING 15 RANDOM PROMPT EXAMPLES ACROSS DOMAINS:');
console.log('==================================================');
const set = new Set();
for (let i = 0; i < 15; i++) {
  const q = generateProceduralQuery();
  set.add(q);
  console.log(`${i+1}. "${q}"`);
}
console.log('==================================================');
console.log(`Unique generated: ${set.size}/15`);
