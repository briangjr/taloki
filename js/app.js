/* Taloki — app logic: wallet, collection, pack opening flow. Loaded after data.js. */
const SELL_RATE = 0.9;

/* ============ STATE ============ */
const KEY = 'taloki-v1';
let S = {bal:50, col:{}, spent:0, earned:0, opened:0, best:null, filter:'all'};
try { const s = JSON.parse(localStorage.getItem(KEY) || 'null'); if (s) S = Object.assign(S, s); } catch(e) {}
if (S.v !== 2) { for (let i = 101; i <= 110; i++) delete S.col[i]; if (S.best > 100 && S.best <= 110) S.best = null; if ('ML'.includes(S.filter)) S.filter = 'all'; S.v = 2; }
for (const id in S.col) if (!CARD[id]) delete S.col[id];
if (S.best && !CARD[S.best]) S.best = null;
function save(){ try { localStorage.setItem(KEY, JSON.stringify(S)); } catch(e) {} }

/* ============ HELPERS ============ */
const $ = s => document.querySelector(s);
const money = v => '$' + v.toLocaleString('en-US',{minimumFractionDigits:2,maximumFractionDigits:2});
const rand = () => { const a = new Uint32Array(1); crypto.getRandomValues(a); return a[0] / 4294967296; };
const pick = arr => arr[Math.floor(rand() * arr.length)];
function roll(table){ let x = rand(), acc = 0; for (const r of ORDER) { if (!table[r]) continue; acc += table[r]; if (x < acc) return r; } return ORDER.filter(r => table[r]).pop(); }
function avg(r){ return BY[r].reduce((a,c) => a + c.value, 0) / BY[r].length; }
function sellPrice(c){ return Math.round(c.value * SELL_RATE * 100) / 100; }
function toast(t){ const el = $('#toast'); el.textContent = t; el.classList.add('on'); clearTimeout(el._t); el._t = setTimeout(() => el.classList.remove('on'), 1800); }

function cardHTML(c, qty){
  if (c.slab) { const [l,t,w,h] = c.slab.box;
    return `<div class="card r${c.r} full" style="aspect-ratio:${(w*c.slab.ar/h).toFixed(4)}">${qty > 1 ? `<span class="qty">×${qty}</span>` : ''}<img src="${c.slab.src}" alt="${c.name}" style="position:absolute;width:${(100/w).toFixed(3)}%;height:${(100/h).toFixed(3)}%;left:${(-l/w*100).toFixed(3)}%;top:${(-t/h*100).toFixed(3)}%;max-width:none"></div>`; }
  const art = CARD_ART[c.id] ? `<img src="${CARD_ART[c.id]}" alt="">` : `<span class="glyph">${c.el.icon}</span>`;
  return `<div class="card r${c.r}" style="--a:${c.el.a};--b:${c.el.b}">
    ${qty > 1 ? `<span class="qty">×${qty}</span>` : ''}
    <div class="in">
      <div class="hd"><span>${c.name}</span><span>${c.el.icon}</span></div>
      <div class="art">${art}</div>
      <div class="ft"><span class="r">${RAR[c.r].name}</span><span>#${c.num}</span></div>
    </div></div>`;
}
const graded = c => !!(c.slab && !c.slab.raw);
function slabHTML(c){ return `<img class="slabImg" src="${c.slab.src}" alt="${c.name}, graded ${GRADE[c.grade]}">`; }
function packHTML(p){ return `<div class="pack" style="--pk:${p.pk};--glow:${p.glow}"><div class="tearTop"></div><span class="ptint"></span><span class="gem">${p.gem}</span><span class="pname"><b>${p.name}</b><small>Astral Beasts</small></span></div>`; }
const POOLS = {};
function bandPool(p, i){
  const k = p.id + i;
  return POOLS[k] || (POOLS[k] = CARDS.filter(c => !'APX'.includes(c.r) && c.value >= BANDS[i].lo * p.price && c.value < BANDS[i].hi * p.price));
}
function goldWeight(c){ return Math.pow(c.value, -GOLD_SKEW); }
function pickGold(pool){ const tot = pool.reduce((a,c) => a + goldWeight(c), 0); let x = rand() * tot;
  for (const c of pool) { x -= goldWeight(c); if (x < 0) return c; } return pool[pool.length - 1]; }
function bandMean(p, i){ const pool = bandPool(p, i);
  return i === 5 ? pool.reduce((a,c) => a + c.value * goldWeight(c), 0) / pool.reduce((a,c) => a + goldWeight(c), 0)
                 : pool.reduce((a,c) => a + c.value, 0) / pool.length; }
function jackpotTotal(p){ return p.jackpot.A + p.jackpot.P + p.jackpot.X; }
function bandRange(p, i){ const b = BANDS[i]; return i === 5 ? `${money(b.lo * p.price)}+` : `${money(b.lo * p.price)} – ${money(b.hi * p.price)}`; }
function packStats(p){
  let ev = 0;
  p.odds.forEach((q, i) => { ev += (i === 5 ? q - jackpotTotal(p) : q) * bandMean(p, i); });
  for (const r of ['A','P','X']) ev += p.jackpot[r] * avg(r);
  return {ev, profit: p.odds.slice(2).reduce((a,b) => a + b, 0), jp: jackpotTotal(p)};
}
function pullFrom(p){
  let x = rand(), i = 0, acc = 0;
  for (; i < 5; i++) { acc += p.odds[i]; if (x < acc) break; }
  if (i === 5) { let y = rand() * p.odds[5];
    for (const r of ['X','P','A']) { if (y < p.jackpot[r]) return {band:5, card:pick(BY[r]), jackpot:true}; y -= p.jackpot[r]; } }
  return {band:i, card: i === 5 ? pickGold(bandPool(p, 5)) : pick(bandPool(p, i))};
}
const MAX_PULL = () => Math.max(...CARDS.map(c => c.value));
const pct = x => x >= 1 ? '100%' : x === 0 ? '—' : x >= .1 ? (x*100).toFixed(0)+'%' : x >= .01 ? (x*100).toFixed(1)+'%' : x >= .001 ? (x*100).toFixed(2)+'%' : +(x*100).toPrecision(2)+'%';
const oneIn = x => x <= 0 ? '' : x >= .5 ? '' : `1 in ${Math.round(1/x).toLocaleString('en-US')}`;

/* ============ RENDER ============ */
function renderBal(){ $('#bal').textContent = money(S.bal); document.querySelectorAll('.buy[data-p]').forEach(b => b.disabled = S.bal < PACKS.find(p => p.id === b.dataset.p).price); }

function renderPacks(){
  $('#packList').innerHTML = PACKS.map(p => {
    const st = packStats(p);
    return `<div class="packTile">${packHTML(p)}
      <div class="packInfo"><b class="pt">${p.name}</b><div class="meta">1 card · avg value ${money(st.ev)}<br>${Math.round(st.profit*100)}% chance to profit<br>Jackpot ${oneIn(st.jp)}</div>
      <button class="buy" data-p="${p.id}">Rip for ${money(p.price)}</button></div></div>`;
  }).join('');
  document.querySelectorAll('.buy[data-p]').forEach(b => b.onclick = () => openPack(b.dataset.p));
  renderBal();
}

function bandBars(p){
  const top = Math.max(...p.odds);
  return p.odds.map((q, i) => `<div class="bandRow"><span class="bl">${bandRange(p, i)}</span>
    <span class="bb"><i style="width:${q/top*100}%;--c:${BANDS[i].rgb}"></i></span><span class="bp">${(q*100).toFixed(1)}%</span></div>`).join('');
}
function renderOdds(){
  const maxPull = MAX_PULL();
  $('#oddsList').innerHTML = PACKS.map(p => {
    const st = packStats(p);
    return `<div class="oddsCard"><header><b>${p.gem} ${p.name}</b><span class="meta">${money(p.price)} · 1 card · avg value ${money(st.ev)} (${Math.round(st.ev/p.price*100)}%)</span></header>
    <div class="bands">${bandBars(p)}</div>
    <p class="meta">Min value <strong>${money(BANDS[0].lo * p.price)}</strong> · Max pull <strong>${money(maxPull)}</strong><br>
    Gold includes a jackpot: Ascended ${oneIn(p.jackpot.A)}, Apex ${oneIn(p.jackpot.P)}, Mythic Legend ${oneIn(p.jackpot.X)}.</p></div>`;
  }).join('');
  $('#valTable').innerHTML = `<tr><th>Rarity</th><th>Cards in set</th><th>Value range</th></tr>` +
    ORDER.map(r => `<tr><td><span class="dot" style="background:var(--${r})"></span>${RAR[r].name}</td><td>${RAR[r].count}</td><td>${money(Math.min(...BY[r].map(c => c.value)))} – ${money(Math.max(...BY[r].map(c => c.value)))}</td></tr>`).join('') +
    ['X','P','A'].map(r => `<tr><th>${RAR[r].name}</th><th>Grade</th><th>Value</th></tr>` + BY[r].map(c => `<tr><td>#${c.num} ${c.name}</td><td>${c.grade}</td><td>${money(c.value)}</td></tr>`).join('')).join('');
}

function colValue(){ return Object.entries(S.col).reduce((a,[id,q]) => a + CARD[id].value * q, 0); }
function renderCol(){
  const owned = Object.keys(S.col).filter(id => S.col[id] > 0).length;
  $('#colStats').innerHTML = `
    <div class="stat"><b>${owned}/${CARDS.length}</b><span>Set complete</span><div class="bar"><i style="width:${owned/CARDS.length*100}%"></i></div></div>
    <div class="stat"><b>${money(colValue())}</b><span>Collection value</span></div>
    <div class="stat"><b>${S.opened}</b><span>Packs ripped</span></div>
    <div class="stat"><b>${S.best ? CARD[S.best].name : '—'}</b><span>Best pull${S.best ? ' · ' + money(CARD[S.best].value) : ''}</span></div>`;
  const filters = [['all','All'],['owned','Owned'],...ORDER.map(r => [r, RAR[r].name])];
  $('#chips').innerHTML = filters.map(([k,l]) => `<button class="chip ${S.filter===k?'on':''}" data-f="${k}">${l}</button>`).join('');
  document.querySelectorAll('.chip').forEach(b => b.onclick = () => { S.filter = b.dataset.f; save(); renderCol(); });
  let list = CARDS.slice();
  if (S.filter === 'owned') list = list.filter(c => S.col[c.id] > 0);
  else if (S.filter !== 'all') list = list.filter(c => c.r === S.filter);
  list.sort((a,b) => b.value - a.value);
  $('#colGrid').innerHTML = list.length ? list.map(c => S.col[c.id] > 0
    ? `<div data-id="${c.id}" tabindex="0" role="button" aria-label="${c.name}">${cardHTML(c, S.col[c.id])}</div>`
    : `<div class="card locked"><div class="in">#${c.num}</div></div>`).join('')
    : `<div class="empty">No cards here yet. Rip a pack to start your collection.</div>`;
  document.querySelectorAll('#colGrid [data-id]').forEach(el => { el.onclick = () => showCard(+el.dataset.id); el.onkeydown = e => { if (e.key === 'Enter') showCard(+el.dataset.id); }; });
}

function showCard(id){
  const c = CARD[id], q = S.col[id] || 0;
  $('#sheet').innerHTML = `${graded(c) ? slabHTML(c) : cardHTML(c)}<h3>${c.name}</h3>
    <div class="meta">${RAR[c.r].name} · ${c.el.name} · #${c.num}${c.grade ? ' · ' + GRADE[c.grade] : ''}${c.basic ? '<br>Basic creature' : ''}${c.stage ? `<br>Stage ${c.stage}${c.from ? ' · evolves from ' + c.from : ''}${c.into ? ' · into ' + c.into : ''}` : ''}<br>Value <strong>${money(c.value)}</strong> · You own ${q}</div>
    <div class="actions" style="justify-content:center">
      ${q ? `<button class="buy" id="sell1" style="width:auto">Sell 1 for ${money(sellPrice(c))}</button>` : ''}
      <button class="ghost" id="closeM">Close</button></div>`;
  $('#modal').classList.add('on');
  $('#closeM').onclick = closeModal;
  if (q) $('#sell1').onclick = () => { sell([[id,1]]); closeModal(); };
}
function closeModal(){ $('#modal').classList.remove('on'); }
$('#modal').onclick = e => { if (e.target.id === 'modal') closeModal(); };

function sell(pairs){
  let total = 0, n = 0;
  for (const [id,q] of pairs) { const have = S.col[id] || 0, k = Math.min(q, have); if (!k) continue; S.col[id] = have - k; if (!S.col[id]) delete S.col[id]; total += sellPrice(CARD[id]) * k; n += k; }
  total = Math.round(total * 100) / 100;
  if (!n) { toast('Nothing to sell'); return 0; }
  S.bal = Math.round((S.bal + total) * 100) / 100; S.earned += total; save(); renderBal(); renderCol();
  toast(`Sold ${n} card${n>1?'s':''} for ${money(total)}`);
  return total;
}
$('#sellCommons').onclick = () => sell(Object.entries(S.col).filter(([id]) => 'CU'.includes(CARD[id].r)).map(([id,q]) => [+id,q]));
$('#sellDupes').onclick = () => sell(Object.entries(S.col).filter(([,q]) => q > 1).map(([id,q]) => [+id,q-1]));

/* ============ PACK OPENING ============ */
const RM = () => matchMedia('(prefers-reduced-motion: reduce)').matches;
let cur = null, lastPack = null;   // cur = {p, band, card, jackpot}
function openPack(pid){
  const p = PACKS.find(x => x.id === pid);
  if (S.bal < p.price) { toast('Not enough funds. Tap + to add play money.'); return; }
  lastPack = pid;
  S.bal = Math.round((S.bal - p.price) * 100) / 100; S.spent += p.price; S.opened++;
  cur = Object.assign({p}, pullFrom(p));
  const c = cur.card;
  S.col[c.id] = (S.col[c.id] || 0) + 1; if (!S.best || c.value > CARD[S.best].value) S.best = c.id;
  save(); renderBal();
  document.body.style.overflow = 'hidden';
  $('#stage').classList.add('on');
  showChooser();
}

/* Step 1: scroll a looping row of 6 packs and pick one */
function showChooser(){
  const p = cur.p, st = $('#stage'), LOOPS = 9, N = 6;
  const serials = Array.from({length:N}, () => String(1000 + Math.floor(rand() * 9000)));
  const items = [];
  for (let l = 0; l < LOOPS; l++) for (let k = 0; k < N; k++)
    items.push(`<div class="cItem" data-k="${k}" style="--tilt:${[-4,3,-2,4,-3,2][k]}deg">${packHTML(p)}<span class="serial">No. ${serials[k]}</span></div>`);
  st.innerHTML = `<div class="hint">Pick your pack</div><div class="carousel" id="car">${items.join('')}</div>
    <button class="buy pickBtn" id="pickBtn">Open this pack</button><div class="meta hintSm">Swipe to browse · tap a pack to choose it</div>`;
  const car = $('#car'), els = [...car.children];
  const w = () => els[1].offsetLeft - els[0].offsetLeft;
  const centerIdx = () => Math.round(car.scrollLeft / w());
  const paint = () => { const cx = car.scrollLeft + car.clientWidth / 2;
    els.forEach(el => { const d = Math.min(1, Math.abs(el.offsetLeft + el.offsetWidth / 2 - cx) / (w() * 1.6));
      el.style.transform = `scale(${1 - d * .22}) rotate(calc(var(--tilt) * ${d}))`; el.style.opacity = 1 - d * .5; el.classList.toggle('mid', d < .2); }); };
  const jumpTo = i => { car.scrollLeft = i * w(); };
  requestAnimationFrame(() => { jumpTo(N * Math.floor(LOOPS / 2)); paint(); });
  let t;
  car.addEventListener('scroll', () => { paint(); clearTimeout(t); t = setTimeout(() => {
    const i = centerIdx();   // keep the loop endless: quietly hop back to the middle copy
    if (i < N * 2 || i >= N * (LOOPS - 2)) { jumpTo(N * Math.floor(LOOPS / 2) + (i % N)); paint(); } }, 140); }, {passive:true});
  const choose = el => { $('#pickBtn').disabled = true; el.classList.add('chosen'); setTimeout(showRip, RM() ? 0 : 380); };
  els.forEach((el, i) => el.onclick = () => {
    if (i === centerIdx()) choose(el); else car.scrollTo({left: i * w(), behavior: RM() ? 'auto' : 'smooth'}); });
  $('#pickBtn').onclick = () => choose(els[centerIdx()]);
}

/* Step 2: rip the chosen pack */
function showRip(){
  const st = $('#stage'), glow = cur.jackpot ? ' gold' : cur.band >= 4 ? ' fire' : cur.band >= 2 ? ' teal' : '';
  st.innerHTML = `<div class="hint">Tap the pack to rip it</div><div class="bigpack${glow}" id="bp" tabindex="0" role="button" aria-label="Rip pack">${packHTML(cur.p)}</div>`;
  const bp = $('#bp');
  const go = () => { bp.onclick = null; bp.classList.add('ripping'); setTimeout(showSpin, RM() ? 0 : 950); };
  bp.onclick = go; bp.onkeydown = e => { if (e.key === 'Enter' || e.key === ' ') go(); };
}

/* Step 3: spin through the payout tiers and land on this pack's tier */
function showSpin(){
  const p = cur.p, st = $('#stage'), H = 68, LOOPS = 8;
  const chips = [];
  for (let l = 0; l < LOOPS; l++) BANDS.forEach((b, i) =>
    chips.push(`<div class="rchip"><span style="--c:${b.rgb}" class="${i === 5 ? 'gold' : ''}"><b>${b.name}</b>${bandRange(p, i)}</span></div>`));
  st.innerHTML = `<button class="skip" id="skip">Skip</button><div class="hint">Your card is in…</div>
    <div class="reelWin"><div class="reel" id="reel">${chips.join('')}</div></div><div class="pulled" id="tierTxt"></div>`;
  const target = 6 * (LOOPS - 2) + cur.band, reel = $('#reel');
  let done = false;
  const land = () => { if (done) return; done = true;
    reel.style.transition = 'none'; reel.style.transform = `translateY(${-(target - 1) * H}px)`;
    reel.children[target].classList.add('hit');
    flashRGB(BANDS[cur.band].rgb, cur.jackpot);
    $('#tierTxt').innerHTML = cur.jackpot ? 'JACKPOT<small>You hit the Gold lottery</small>'
      : `${BANDS[cur.band].name} tier<small>${bandRange(p, cur.band)}</small>`;
    setTimeout(showReveal, RM() ? 300 : cur.jackpot ? 1800 : 1100); };
  $('#skip').onclick = () => { land(); };
  requestAnimationFrame(() => requestAnimationFrame(() => {
    reel.style.transition = `transform ${RM() ? 0 : cur.jackpot ? 5.2 : 3.6}s cubic-bezier(.1,.75,.15,1)`;
    reel.style.transform = `translateY(${-(target - 1) * H}px)`;
    setTimeout(land, RM() ? 0 : cur.jackpot ? 5300 : 3700);
  }));
}

/* Step 4: flip the card */
function showReveal(){
  const c = cur.card, st = $('#stage');
  st.innerHTML = `<button class="skip" id="skip">Skip</button>
    <div class="revealWrap${graded(c) ? ' slabW' : ''}"><div class="flip${graded(c) ? ' slab' : ''}" id="flip" tabindex="0" role="button" aria-label="Reveal card">${graded(c) ? `<div class="back slabBack"><img src="${BACKS.slab}" alt=""></div>` : `<div class="back"></div>`}<div class="face">${graded(c) ? slabHTML(c) : cardHTML(c)}</div></div></div>
    <div class="pulled" id="pulled"></div><div class="hint" id="h">Tap to reveal</div>`;
  const f = $('#flip');
  $('#skip').onclick = showResults;
  const act = () => {
    if (!f.classList.contains('up')) {
      f.classList.add('up');
      const diff = c.value - cur.p.price;
      $('#pulled').innerHTML = `${c.name}<small>${RAR[c.r].name}${c.grade ? ' · ' + GRADE[c.grade] : ''} · ${money(c.value)}</small><small class="${diff >= 0 ? 'up' : 'down'}">${diff >= 0 ? '+' : '−'}${money(Math.abs(diff))} vs pack price</small>`;
      $('#pulled').classList.toggle('x', c.r === 'X'); $('#pulled').classList.toggle('a', c.r === 'A'); $('#pulled').classList.toggle('p', c.r === 'P');
      $('#h').textContent = 'Tap to continue';
      if ('APX'.includes(c.r)) flash(c.r); else if (cur.band >= 3) flashRGB(BANDS[cur.band].rgb);
    } else showResults();
  };
  f.onclick = act; f.onkeydown = e => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); act(); } };
}
function flash(r){ flashRGB({A:'25,200,230', P:'255,122,47', X:'255,215,60'}[r]); }
function flashRGB(rgb, big){
  const b = $('#burst');
  b.style.background = big
    ? 'conic-gradient(from 0deg,rgba(255,61,154,.7),rgba(255,210,31,.8),rgba(25,198,255,.7),rgba(155,77,255,.7),rgba(255,61,154,.7))'
    : `radial-gradient(circle at 50% 45%, rgba(${rgb},.85), rgba(${rgb},0) 60%)`;
  b.classList.remove('go'); void b.offsetWidth; b.classList.add('go');
}

/* Step 5: keep, sell, or go again */
function showResults(){
  const c = cur.card, st = $('#stage'), diff = c.value - cur.p.price;
  st.style.justifyContent = 'flex-start';
  st.innerHTML = `<div class="results">
    <div class="total">${money(c.value)}<small>${c.name} · ${BANDS[cur.band].name} tier · <span class="${diff >= 0 ? 'up' : 'down'}">${diff >= 0 ? '+' : '−'}${money(Math.abs(diff))}</span></small></div>
    <div class="oneCard">${graded(c) ? slabHTML(c) : cardHTML(c)}</div>
    <div class="actions">
      <button class="buy" id="again" style="width:auto">Rip another · ${money(cur.p.price)}</button>
      <button class="ghost" id="sellPull">Sell for ${money(sellPrice(c))}</button>
      <button class="ghost" id="keep">Keep</button>
    </div></div>`;
  $('#keep').onclick = closeStage;
  $('#sellPull').onclick = () => { sell([[c.id, 1]]); closeStage(); };
  $('#again').onclick = () => { closeStage(); openPack(lastPack); };
}
function closeStage(){ const st = $('#stage'); st.classList.remove('on'); st.style.justifyContent = ''; document.body.style.overflow = ''; renderCol(); renderBal(); }

/* ============ NAV + INIT ============ */
document.querySelectorAll('.nav button').forEach(b => b.onclick = () => {
  document.querySelectorAll('.nav button').forEach(x => x.classList.toggle('on', x === b));
  document.querySelectorAll('.view').forEach(v => v.classList.toggle('on', v.id === 'v-' + b.dataset.v));
  if (b.dataset.v === 'col') renderCol();
  scrollTo(0,0);
});
$('#addFunds').onclick = () => { S.bal = Math.round((S.bal + 50) * 100) / 100; save(); renderBal(); toast('Added $50 play money'); };
renderPacks(); renderOdds(); renderCol();
