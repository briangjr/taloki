/* Taloki — card set data: art, values, tiers, packs and odds.
   Card art lives in images/cards/. Each card's value is fixed. */
/* ============ ADD YOUR CARD ART HERE ============
   Key = card number (1-100). Value = image data URI or same-origin path.
   Example: 1: "data:image/png;base64,....."            */
const BACKS = {slab:"images/brand/back-graded.webp"};
const CARD_ART = {};
/* Graded card art: one slab image per card. box = where the card sits inside the slab [left, top, width, height] as fractions */
const SLABS = {
  x1: {"src": "images/cards/001-thundrake.webp", "box": [0.1151, 0.1989, 0.7762, 0.7486], "ar": 0.75},
  x2: {"src": "images/cards/002-aquarion.webp", "box": [0.1151, 0.1989, 0.7762, 0.7486], "ar": 0.75},
  x3: {"src": "images/cards/003-knoxara.webp", "box": [0.1151, 0.1989, 0.7762, 0.7486], "ar": 0.75},
  x4: {"src": "images/cards/004-pleezer.webp", "box": [0.1151, 0.1989, 0.7762, 0.7486], "ar": 0.75},
  x5: {"src": "images/cards/005-gracious.webp", "box": [0.1151, 0.1989, 0.7762, 0.7486], "ar": 0.75},
  x6: {"src": "images/cards/006-montunzer.webp", "box": [0.1151, 0.1989, 0.7762, 0.7486], "ar": 0.75},
  x7: {"src": "images/cards/007-velmora.webp", "box": [0.1151, 0.1989, 0.7762, 0.7486], "ar": 0.75},
  x8: {"src": "images/cards/008-loz.webp", "box": [0.1151, 0.1989, 0.7762, 0.7486], "ar": 0.75},
  x9: {"src": "images/cards/009-phoenixon.webp", "box": [0.1151, 0.1989, 0.7762, 0.7486], "ar": 0.75},
  x10: {"src": "images/cards/010-flamingopp.webp", "box": [0.1151, 0.1989, 0.7762, 0.7486], "ar": 0.75},
  a1: {"src": "images/cards/022-stormaryn.webp", "box": [0.1529, 0.2017, 0.6961, 0.7293], "ar": 0.75},
  a2: {"src": "images/cards/023-tiderion.webp", "box": [0.1529, 0.2017, 0.6961, 0.7293], "ar": 0.75},
  a3: {"src": "images/cards/024-duskara.webp", "box": [0.1529, 0.2017, 0.6961, 0.7293], "ar": 0.75},
  a4: {"src": "images/cards/025-terrunzer.webp", "box": [0.1529, 0.2017, 0.6961, 0.7293], "ar": 0.75},
  a5: {"src": "images/cards/026-emberopp.webp", "box": [0.1529, 0.2017, 0.6961, 0.7293], "ar": 0.75},
  a6: {"src": "images/cards/027-frostalon.webp", "box": [0.1529, 0.2017, 0.6961, 0.7293], "ar": 0.75},
  a7: {"src": "images/cards/028-coralith.webp", "box": [0.1529, 0.2017, 0.6961, 0.7293], "ar": 0.75},
  a8: {"src": "images/cards/029-vesperyn.webp", "box": [0.1529, 0.2017, 0.6961, 0.7293], "ar": 0.75},
  a9: {"src": "images/cards/030-ironox.webp", "box": [0.1529, 0.2017, 0.6961, 0.7293], "ar": 0.75},
  a10: {"src": "images/cards/031-venomara.webp", "box": [0.1529, 0.2017, 0.6961, 0.7293], "ar": 0.75},
  a11: {"src": "images/cards/032-solaryn.webp", "box": [0.1453, 0.2019, 0.6747, 0.729], "ar": 0.80029},
  a12: {"src": "images/cards/033-glacivex.webp", "box": [0.1453, 0.2019, 0.6747, 0.729], "ar": 0.80029},
  a13: {"src": "images/cards/034-briarclaw.webp", "box": [0.1453, 0.2019, 0.6747, 0.729], "ar": 0.80029},
  a14: {"src": "images/cards/035-riptalon.webp", "box": [0.1453, 0.2019, 0.6747, 0.729], "ar": 0.80029},
  a15: {"src": "images/cards/036-astrowl.webp", "box": [0.1453, 0.2019, 0.6747, 0.729], "ar": 0.80029},
  a16: {"src": "images/cards/037-mirefang.webp", "box": [0.1453, 0.2019, 0.6747, 0.729], "ar": 0.80029},
  a17: {"src": "images/cards/038-gravorn.webp", "box": [0.1453, 0.2019, 0.6747, 0.729], "ar": 0.80029},
  a18: {"src": "images/cards/039-scorpinox.webp", "box": [0.1586, 0.2033, 0.6809, 0.7275], "ar": 0.80029},
  a19: {"src": "images/cards/040-cloudane.webp", "box": [0.1453, 0.2019, 0.6747, 0.729], "ar": 0.80029},
  a20: {"src": "images/cards/041-crystara.webp", "box": [0.1586, 0.2033, 0.6738, 0.7275], "ar": 0.80029},
  p1: {"src": "images/cards/011-helioris.webp", "box": [0.1035, 0.2324, 0.793, 0.709], "ar": 0.66667},
  p2: {"src": "images/cards/012-cryontra.webp", "box": [0.1035, 0.2324, 0.793, 0.709], "ar": 0.66667},
  p3: {"src": "images/cards/013-verdantor.webp", "box": [0.1035, 0.2324, 0.793, 0.709], "ar": 0.66667},
  p4: {"src": "images/cards/014-leviathanis.webp", "box": [0.1035, 0.2324, 0.793, 0.709], "ar": 0.66667},
  p5: {"src": "images/cards/015-celestaris.webp", "box": [0.1035, 0.2324, 0.793, 0.709], "ar": 0.66667},
  p6: {"src": "images/cards/016-bogmaw.webp", "box": [0.1035, 0.2324, 0.793, 0.709], "ar": 0.66667},
  p7: {"src": "images/cards/017-nulltusk.webp", "box": [0.1035, 0.2324, 0.793, 0.709], "ar": 0.66667},
  p8: {"src": "images/cards/018-tyrannox.webp", "box": [0.1035, 0.2324, 0.793, 0.709], "ar": 0.66667},
  p9: {"src": "images/cards/019-zephyron.webp", "box": [0.1035, 0.2324, 0.793, 0.709], "ar": 0.66667},
  p10: {"src": "images/cards/020-pristelle.webp", "box": [0.1035, 0.2324, 0.793, 0.709], "ar": 0.66667},
  p11: {"src": "images/cards/021-pyrozarok.webp", "box": [0.1035, 0.2324, 0.793, 0.709], "ar": 0.66667},
  e1: {"src": "images/cards/047-voltryn.webp", "box": [0.1156, 0.1958, 0.7754, 0.7465], "ar": 0.70758},
  e2: {"src": "images/cards/048-marivex.webp", "box": [0, 0, 1, 1], "ar": 0.70758, "raw": true},
  e3: {"src": "images/cards/049-umbrix.webp", "box": [0, 0, 1, 1], "ar": 0.70758, "raw": true},
  e4: {"src": "images/cards/050-cragorn.webp", "box": [0, 0, 1, 1], "ar": 0.70758, "raw": true},
  e5: {"src": "images/cards/051-rosaflare.webp", "box": [0, 0, 1, 1], "ar": 0.70758, "raw": true},
  e6: {"src": "images/cards/052-solenith.webp", "box": [0.1024, 0.173, 0.7962, 0.7827], "ar": 0.70758},
  e7: {"src": "images/cards/053-frostlup.webp", "box": [0, 0, 1, 1], "ar": 0.70758, "raw": true},
  e8: {"src": "images/cards/054-thornkit.webp", "box": [0, 0, 1, 1], "ar": 0.70758, "raw": true},
  e9: {"src": "images/cards/055-finclaw.webp", "box": [0, 0, 1, 1], "ar": 0.70758, "raw": true},
  e10: {"src": "images/cards/056-lunowl.webp", "box": [0, 0, 1, 1], "ar": 0.70758, "raw": true},
  r1: {"src": "images/cards/057-marshclaw.webp", "box": [0, 0, 1, 1], "ar": 0.70758, "raw": true},
  r2: {"src": "images/cards/058-gravoltan.webp", "box": [0, 0, 1, 1], "ar": 0.70758, "raw": true},
  r3: {"src": "images/cards/059-skorven.webp", "box": [0, 0, 1, 1], "ar": 0.70758, "raw": true},
  r4: {"src": "images/cards/060-aeralyn.webp", "box": [0, 0, 1, 1], "ar": 0.70758, "raw": true},
  r5: {"src": "images/cards/061-luminae.webp", "box": [0.0986, 0.1677, 0.8019, 0.7767], "ar": 0.70758},
  b062: {"src": "images/cards/062-dunestag.webp", "box": [0, 0, 1, 1], "ar": 0.72029, "raw": true},
  b063: {"src": "images/cards/063-mirehop.webp", "box": [0, 0, 1, 1], "ar": 0.73082, "raw": true},
  b065: {"src": "images/cards/065-tiderock.webp", "box": [0, 0, 1, 1], "ar": 0.71514, "raw": true},
  b066: {"src": "images/cards/066-vinetail.webp", "box": [0, 0, 1, 1], "ar": 0.71344, "raw": true},
  b067: {"src": "images/cards/067-whispling.webp", "box": [0, 0, 1, 1], "ar": 0.72551, "raw": true},
  b068: {"src": "images/cards/068-cragrip.webp", "box": [0, 0, 1, 1], "ar": 0.72376, "raw": true}
};

/* ============ SET DATA ============ */
const RAR = {
  X:{name:'Mythic Legend', count:10},
  P:{name:'Apex Rare', count:11},
  A:{name:'Ascended Rare', count:20},
  E:{name:'Epic',     count:10, min:2.00, max:6.00},
  R:{name:'Rare',     count:15, min:0.40, max:1.25},
  U:{name:'Uncommon', count:25, min:0.06, max:0.20},
  C:{name:'Common',   count:40, min:0.01, max:0.05}
};
const ORDER = ['C','U','R','E','A','P','X'];
const EL = [
  {name:'Blaze', icon:'🔥', a:'#FF7A1A', b:'#FFD21F', pre:['Ember','Cinder','Pyro','Scorch','Flare']},
  {name:'Tide',  icon:'💧', a:'#1FA2FF', b:'#6FF0FF', pre:['Ripple','Coral','Aqua','Brine','Surf']},
  {name:'Volt',  icon:'⚡', a:'#FFB300', b:'#FFF36B', pre:['Zap','Spark','Static','Ion','Jolt']},
  {name:'Leaf',  icon:'🌿', a:'#1FBF6A', b:'#C8F56B', pre:['Moss','Sprout','Bramble','Fern','Thorn']},
  {name:'Frost', icon:'❄️', a:'#56C8FF', b:'#E8F9FF', pre:['Glacia','Rime','Sleet','Crystal','Hail']},
  {name:'Shade', icon:'🌙', a:'#6A3DFF', b:'#D07BFF', pre:['Umbra','Dusk','Gloom','Nyx','Hex']},
  {name:'Stone', icon:'🪨', a:'#B07A4A', b:'#F0C98A', pre:['Boulder','Quartz','Crag','Pebble','Flint']},
  {name:'Aero',  icon:'🌪️', a:'#2FD0CE', b:'#C8FFF2', pre:['Gale','Zephyr','Cirrus','Swoop','Drift']}
];
const SUF = ['pup','fang','wing','tail','horn','claw','drake','mite','lynx','roo','byte','moth','kit','rex','ling'];
const MYTHIC_LEGENDS = [ // [name, element, icon, value] — all graded Gem Mint 10
  ['Thundrake', 'Volt',  '⚡', 49119.16], ['Aquarion',  'Tide',  '💧', 43428.82],
  ['Knoxara',   'Shade', '🌙', 40603.74], ['Pleezer',   'Trickster','🌀', 33503.53],
  ['Gracious',  'Light', '🌟', 30107.65], ['Montunzer', 'Stone', '⛰️', 24664.22],
  ['Velmora',   'Spirit','👻', 19116.37], ['Loz',       'Leaf',  '🍃', 15011.15],
  ['Phoenixon', 'Blaze', '🔥', 11921.87], ['Flamingopp','Blaze', '🔥', 10187.42]
];
const ASCENDED = [ // [name, element, icon, grade, value] — value follows the grade
  ["Stormaryn", "Volt", "⚡", 10, 2342.86],
  ["Tiderion", "Tide", "💧", 9, 1291.84],
  ["Duskara", "Shade", "🌙", 10, 2909.05],
  ["Terrunzer", "Stone", "⛰️", 8, 636.26],
  ["Emberopp", "Blaze", "🔥", 9, 1255.49],
  ["Frostalon", "Frost", "❄️", 10, 2504.86],
  ["Coralith", "Tide", "🌊", 8, 523.86],
  ["Vesperyn", "Shade", "🌙", 9, 1258.34],
  ["Ironox", "Metal", "⚙️", 10, 2555.86],
  ["Venomara", "Poison", "☣️", 9, 1455.08],
  ["Solaryn", "Light", "☀️", 10, 1912.95],
  ["Glacivex", "Frost", "❄️", 9, 1112.38],
  ["Briarclaw", "Leaf", "🍃", 8, 486.27],
  ["Riptalon", "Tide", "💧", 10, 2771.57],
  ["Astrowl", "Cosmic", "✨", 9, 1385.41],
  ["Mirefang", "Poison", "☠️", 8, 466.75],
  ["Gravorn", "Gravity", "🪐", 9, 1587.54],
  ["Scorpinox", "Shade", "🦂", 10, 2957.71],
  ["Cloudane", "Aero", "🌪️", 8, 711.57],
  ["Crystara", "Crystal", "💎", 10, 2538.68],
];
const APEX = [ // [name, element, icon, grade, value, evolves from] — Stage 4
  ["Helioris", "Light", "☀️", 9, 6742.22, "Solaryn"],
  ["Cryontra", "Frost", "❄️", 9, 6792.07, "Glacivex"],
  ["Verdantor", "Leaf", "🍃", 10, 9341.84, "Briarclaw"],
  ["Leviathanis", "Tide", "💧", 8, 3400.26, "Riptalon"],
  ["Celestaris", "Cosmic", "✨", 9, 6043.26, "Astrowl"],
  ["Bogmaw", "Poison", "🐊", 10, 8216.99, "Mirefang"],
  ["Nulltusk", "Gravity", "🪐", 8, 3936.11, "Gravorn"],
  ["Tyrannox", "Blaze", "🦂", 10, 7512.73, "Scorpinox"],
  ["Zephyron", "Aero", "🌪️", 9, 5203.19, "Cloudane"],
  ["Pristelle", "Crystal", "💎", 9, 5733.6, "Crystara"],
  ["Pyrozarok", "Blaze", "🔥", 10, 7730.49, "Emberjaw"],
];
/* Placeholder-tier values (ids 11-100), spread so every pack's payout tiers have cards in them */
const LOW_VALUES = [0.48, 1.87, 1.34, 0.13, 1.67, 1.73, 0.79, 0.73, 0.31, 0.68, 0.3, 0.72, 1.71, 1.13, 1.23, 1.31, 1.49, 1.55, 0.3, 0.18, 0.65, 1.96, 1.55, 0.16, 0.64, 1.88, 1.43, 2.28, 1.16, 0.3, 2.45, 1.72, 0.24, 2.41, 2.23, 0.44, 2.42, 1.58, 0.57, 1.32, 2.8, 2.63, 3.34, 4.84, 7.56, 3.18, 3.79, 3.17, 2.58, 3.4, 2.58, 4.03, 4.31, 4.59, 5.64, 4.48, 6.45, 8.98, 9.47, 6.84, 2.77, 6.69, 7.87, 6.48, 6.04, 15.03, 12.62, 27.53, 22.9, 32.4, 14.31, 12.94, 25.09, 19.26, 14.18, 11.75, 14.93, 28.77, 30.71, 32.22, 199.67, 62.96, 40.07, 94.61, 77.27, 133.79, 52.99, 71.36, 56.69, 36.71];
const EPICS = [ // #047-#056: [name, element, icon, evolves from, evolves into, grade or null if ungraded] — Stage 2
  ["Voltryn", "Volt", "⚡", "Sparklin", "Stormaryn", 10],
  ["Marivex", "Tide", "💧", "Aquini", "Tiderion", null],
  ["Umbrix", "Shade", "🌙", "Noxlet", "Duskara", null],
  ["Cragorn", "Stone", "⛰️", "Pebblor", "Terrunzer", null],
  ["Rosaflare", "Blaze", "🔥", "Flicko", "Emberopp", null],
  ["Solenith", "Light", "☀️", "Raycub", "Solaryn", 9],
  ["Frostlup", "Frost", "❄️", "Chillpup", "Glacivex", null],
  ["Thornkit", "Leaf", "🍃", "Sprigpaw", "Briarclaw", null],
  ["Finclaw", "Tide", "💧", "Ripfin", "Riptalon", null],
  ["Lunowl", "Shade", "🌙", "Starlit", "Astrowl", null],
];
const RARES = [ // #057-#061: same format as EPICS — Stage 2
  ["Marshclaw", "Leaf", "🍃", "Mireling", "Mirefang", null],
  ["Gravoltan", "Gravity", "🪐", "Gravbit", "Gravorn", null],
  ["Skorven", "Blaze", "🔥", "Skritch", "Scorpinox", null],
  ["Aeralyn", "Aero", "🌪️", "Mistkit", "Cloudane", null],
  ["Luminae", "Crystal", "💎", "Shardlet", "Crystara", 9],
];
const BASIC_RARES = [ // [card number, name, element, icon] — Basic creatures, no evolution line
  [62, "Dunestag", "Stone", "⛰️"],
  [63, "Mirehop", "Leaf", "🐸"],
  [65, "Tiderock", "Tide", "🐢"],
  [66, "Vinetail", "Leaf", "🍃"],
  [67, "Whispling", "Shade", "🏮"],
  [68, "Cragrip", "Tide", "🦀"],
];
const ASC_EVO = {"Stormaryn": ["Voltryn", "Thundrake"], "Tiderion": ["Marivex", "Aquarion"], "Duskara": ["Umbrix", "Knoxara"], "Terrunzer": ["Cragorn", "Montunzer"], "Emberopp": ["Rosaflare", "Flamingopp"], "Solaryn": ["Solenith", "Helioris"], "Glacivex": ["Frostlup", "Cryontra"], "Briarclaw": ["Thornkit", "Verdantor"], "Riptalon": ["Finclaw", "Leviathanis"], "Astrowl": ["Lunowl", "Celestaris"], "Mirefang": ["Marshclaw", "Bogmaw"], "Gravorn": ["Gravoltan", "Nulltusk"], "Scorpinox": ["Skorven", "Tyrannox"], "Cloudane": ["Aeralyn", "Zephyron"], "Crystara": ["Luminae", "Pristelle"]}; // Ascended (Stage 3): [evolves from, evolves into]
const MYTH_FROM = {"Thundrake": "Stormaryn", "Aquarion": "Tiderion", "Knoxara": "Duskara", "Montunzer": "Terrunzer", "Flamingopp": "Emberopp"}; // Mythic Legends that are Stage 4
const GRADE = {10:'Gem Mint 10', 9:'Mint 9', 8:'NM-MT 8'};

/* Card ids stay fixed so saved collections keep working; the printed number (num) follows tier order from the top. */
const CARDS = []; const BY = {C:[],U:[],R:[],E:[],A:[],P:[],X:[]};
(function build(){
  const add = c => { CARDS.push(c); BY[c.r].push(c); };
  MYTHIC_LEGENDS.forEach(([name, eln, icon, value], i) =>
    add({id:i+1, n:i+1, name, r:'X', el:{name:eln, icon}, value, grade:10, slab:SLABS['x'+(i+1)]}));
  APEX.forEach(([name, eln, icon, grade, value, evo], i) =>
    add({id:141+i, n:11+i, name, r:'P', el:{name:eln, icon}, value, grade, evo, slab:SLABS['p'+(i+1)]}));
  ASCENDED.forEach(([name, eln, icon, grade, value], i) =>
    add({id:111+i, n:22+i, name, r:'A', el:{name:eln, icon}, value, grade, slab:SLABS['a'+(i+1)]}));
  // placeholder tiers, printed #047 onward (#042-#046 are held for the last 5 Ascended Rares)
  const start = {E:47, R:57, U:72, C:97};
  let n = 0, id = 11;
  for (const r of ['C','U','R','E']) {
    const k = RAR[r];
    for (let i = 0; i < k.count; i++) {
      const el = EL[n % 8], name = el.pre[Math.floor(n/8) % 5] + SUF[(n*7) % 15]; n++;
      add({id, n:start[r]+i, name, r, el, value: LOW_VALUES[id - 11]});
      id++;
    }
  }
  // real Epic art replaces the placeholders at #047-#056
  EPICS.forEach(([name, eln, icon, from, into, grade], i) => {
    const c = BY.E[i]; Object.assign(c, {name, el:{name:eln, icon}, stage:2, from, into, slab:SLABS['e'+(i+1)]});
    if (grade) c.grade = grade;
  });
  RARES.forEach(([name, eln, icon, from, into, grade], i) => {
    const c = BY.R[i]; Object.assign(c, {name, el:{name:eln, icon}, stage:2, from, into, slab:SLABS['r'+(i+1)]});
    if (grade) c.grade = grade;
  });
  BASIC_RARES.forEach(([n, name, eln, icon]) => {
    const c = BY.R[n - 57]; Object.assign(c, {name, el:{name:eln, icon}, basic:true, slab:SLABS['b' + String(n).padStart(3,'0')]});
  });
  BY.A.forEach(c => { const e = ASC_EVO[c.name]; if (e) Object.assign(c, {stage:3, from:e[0], into:e[1]}); });
  BY.P.forEach(c => Object.assign(c, {stage:4, from:c.evo}));
  BY.X.forEach(c => { if (MYTH_FROM[c.name]) Object.assign(c, {stage:4, from:MYTH_FROM[c.name]}); });
  CARDS.forEach(c => c.num = String(c.n).padStart(3,'0'));
})();
const CARD = Object.fromEntries(CARDS.map(c => [c.id, c]));

/* Payout tiers, as multiples of the pack price. Blue is always a small profit; Gold also holds the jackpot. */
const BANDS = [
  {name:'Gray',   lo:0.10, hi:0.35, rgb:'154,163,178'},
  {name:'Green',  lo:0.35, hi:0.95, rgb:'34,197,94'},
  {name:'Blue',   lo:1.12, hi:1.35, rgb:'59,130,246'},
  {name:'Purple', lo:1.35, hi:1.80, rgb:'168,85,247'},
  {name:'Red',    lo:1.80, hi:2.60, rgb:'239,68,68'},
  {name:'Gold',   lo:2.60, hi:Infinity, rgb:'250,204,21'}   // no ceiling: pricier cards are rarer inside Gold
];
/* One card per pack. odds = chance of each payout tier; jackpot = chance (per pack, inside Gold) of each chase tier */
const PACKS = [
  {id:'starter', name:'Starter Pack', price:1, gem:'🌱', pk:'linear-gradient(160deg,#2FD0CE,#1FBF6A)', glow:'#1FBF6A',
   odds:[0.427, 0.273, 0.14, 0.08, 0.05, 0.03], jackpot:{A:1/60000, P:1/300000, X:1/2000000}},
  {id:'base',    name:'Base Pack',    price:2, gem:'💠', pk:'linear-gradient(160deg,#19C6FF,#2447F5)', glow:'#2447F5',
   odds:[0.427, 0.273, 0.14, 0.08, 0.05, 0.03], jackpot:{A:1/30000, P:1/150000, X:1/1000000}},
  {id:'pro',     name:'Pro Pack',     price:5, gem:'🔮', pk:'linear-gradient(160deg,#C07BFF,#6A3DFF)', glow:'#6A3DFF',
   odds:[0.356, 0.344, 0.14, 0.08, 0.05, 0.03], jackpot:{A:1/12000, P:1/60000, X:1/400000}}
];
const GOLD_SKEW = 1.5; // inside Gold, a card's chance falls with value^1.5
