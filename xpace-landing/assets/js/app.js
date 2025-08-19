/* ===== Helpers ===== */
const $  = (sel) => document.querySelector(sel);
const $$ = (sel) => Array.from(document.querySelectorAll(sel));
const $h = (html) => { const t = document.createElement('template'); t.innerHTML = html.trim(); return t.content.firstChild; };

/* ===== Theme toggle ===== */
(function initTheme(){
  const storageKey = 'theme';
  const body = document.body;
  const btn = document.getElementById('theme-toggle');
  const apply = (theme) => {
    body.classList.remove('theme-light','theme-dark');
    body.classList.add(`theme-${theme}`);
    if (btn) btn.textContent = theme === 'light' ? '🌙' : '☀️';
  };
  let theme = localStorage.getItem(storageKey);
  if (!theme){
    theme = window.matchMedia('(prefers-color-scheme: light)').matches ? 'light' : 'dark';
  }
  apply(theme);
  btn?.addEventListener('click', ()=>{
    theme = body.classList.contains('theme-light') ? 'dark' : 'light';
    apply(theme);
    localStorage.setItem(storageKey, theme);
  });
})();

/* ===== Reveal on scroll ===== */
(function initReveal(){
  if (!('IntersectionObserver' in window)) return;
  const ro = new IntersectionObserver((entries)=>{
    entries.forEach(e=>{
      if (e.isIntersecting){ e.target.classList.add('show'); ro.unobserve(e.target); }
    });
  },{threshold:.12});
  // observar itens já na página
  document.querySelectorAll('.reveal').forEach(n=>ro.observe(n));
  // observar novos itens inseridos
  const mo = new MutationObserver(()=>{
    document.querySelectorAll('.reveal:not(.show)').forEach(n=>ro.observe(n));
  });
  mo.observe(document.body, {childList:true, subtree:true});
})();

/* ===== Links ===== */
const LINKS = {
  trial: 'https://agendamento.nextfit.com.br/f9b1ea53-0e0e-4f98-9396-3dab7c9fbff4',
  whats: 'https://wa.me/5547999463474?text=' + encodeURIComponent('Olá! Quero informações sobre matrículas na XPACE.'),
  matriculas: 'https://venda.nextfit.com.br/54a0cf4a-176f-46d3-b552-aad35019a4ff/contratos'
};

/* ===== Dados: Professores ===== */
const TEACHERS = [
  { name: 'Alana Veiga', styles: ['Hip Hop'], ig: 'veigalanaa' },
  { name: 'Alisson Felipe', styles: ['Hip Hop'], ig: 'alissonfelipes' },
  { name: 'Alisson Morpheu', styles: ['Locking'], ig: 'alisson_morpheu' },
  { name: 'Bianca Marcela', styles: ['Contemporâneo','Jazz'], ig: 'biancamarceela' },
  { name: 'Dil', styles: ['Vogue','Jazz Funk','Waacking','Hip Hop','House'], ig: 'dilschulz' },
  { name: 'Eduarda Rodrigues', styles: ['Jazz Funk','Heels'], ig: 'eduarda.r.l' },
  { name: 'Engels', styles: ['Vogue','Waacking','Jazz Funk'], ig: 'engelsmatheus_' },
  { name: 'Gus', styles: ['Waacking','Jazz Funk','House'], ig: 'gusjoesting' },
  { name: 'Guilherme Riku', styles: ['Acrobacias'], ig: 'guilhermeriku' },
  { name: 'Isis', styles: ['Hip Hop'], ig: 'isislkr' },
  { name: 'Jhonney', styles: ['Hip Hop','Dancehall','Jazz Funk','Waacking'], ig: 'jhonney.xp' },
  { name: 'Lóren Stefany', styles: ['Hip Hop','House'], ig: 'ftloren' },
  { name: 'Lucas Maciel', styles: ['Dancehall'], ig: 'lucasmacieldx' },
  { name: 'Marcelinho', styles: ['Hip Hop'], ig: 'marcelinho_hiphop' },
  { name: 'Natália Lessin', styles: ['Ritmos'], ig: 'nataliatflessin' },
  { name: 'Ruan Amorim', styles: ['Hip Hop','House'], ig: 'ruan_amrm' },
  { name: 'Ruan Santos', styles: ['Hip Hop'], ig: 'ruansanttoz' },
  { name: 'Samuel Maros', styles: ['Danças Urbanas'], ig: 'samuzek' },
];

/* ===== Dados: Horários ===== */
const HORARIOS = [
  { dias:['seg','qua'], hora:'18:00', modalidade:'Contemporâneo', grupo:'Adulto', nivel:'Iniciante', professor:'Bianca Marcela', dur:60 },
  { dias:['seg','qua'], hora:'19:00', modalidade:'Danças Urbanas', grupo:'Infantil', nivel:'Iniciante', professor:'Ruan Amorim', extras:['Lóren Stefany','Jhonney'], faixa:'Infantil 5–11', dur:60 },
  { dias:['seg','qua'], hora:'20:00', modalidade:'Danças Urbanas', grupo:'Sênior', nivel:'Avançado (aberto)', professor:'Equipe XPACE (escala)', dur:60 },
  { dias:['seg','qua'], hora:'21:00', modalidade:'Jazz', grupo:'Adulto', nivel:'Intermediário', professor:'Bianca Marcela', dur:60 },

  { dias:['ter','qui'], hora:'18:30', modalidade:'Ritmos', grupo:'Adulto', nivel:'Iniciante', professor:'Natália Lessin', dur:45 },
  { dias:['ter','qui'], hora:'19:15', modalidade:'Danças Urbanas', grupo:'Júnior', nivel:'Avançado (aberto)', professor:'Equipe XPACE (escala)', dur:60 },
  { dias:['ter','qui'], hora:'20:15', modalidade:'Acrobacias', grupo:'Adulto', nivel:'Iniciante', professor:'Guilherme Riku', dur:60 },
  { dias:['ter','qui'], hora:'21:15', modalidade:'Dança de Salão', grupo:'Adulto', nivel:'Iniciante', professor:'Professor a definir', dur:60 },

  { dias:['sex'], hora:'19:00', modalidade:'Danças Urbanas', grupo:'Adulto', nivel:'Iniciante', professor:'Ruan Amorim (apoio Jhonney)', dur:60 },
  { dias:['sex'], hora:'20:30', modalidade:'Ensaio CIA', grupo:'Companhia', nivel:'Reservado', professor:'—', dur:90, reservado:true },

  { dias:['sab'], hora:'09:00', modalidade:'Jazz Funk', grupo:'Adulto', nivel:'Iniciante', professor:'Eduarda Rodrigues', dur:60 },
  { dias:['sab'], hora:'10:00', modalidade:'Danças Urbanas', grupo:'Adulto', nivel:'Intermediário', professor:'Samuel Maros (apoio Jhonney/Ruan Amorim)', dur:60 },
  { dias:['sab'], hora:'11:00', modalidade:'Heels', grupo:'Adulto', nivel:'Iniciante', professor:'Eduarda Rodrigues', dur:60 },
];

/* ===== Dados: Planos ===== */
const PLANS = [
  { title:'2x/semana (Mensal)', price:'R$ 160/mês' },
  { title:'1x/semana (Mensal)', price:'R$ 120/mês' },
  { title:'2x/semana (Semestral 6x)', price:'R$ 150/mês • 6x' },
  { title:'1x/semana (Semestral 6x)', price:'R$ 110/mês • 6x' },
  { title:'2x/semana (Anual 12x)', price:'R$ 130/mês • 12x', featured:true },
  { title:'1x/semana (Anual 12x)', price:'R$ 100/mês • 12x' },
  { title:'Modalidade adicional', price:'R$ 90/mês' },
];

/* ===== Dados: Premiações ===== */
const AWARDS = [
  { year:2024, title:'Hip Hop Unite Brasil', desc:'🥇 Duo Júnior • 🥇 Small Crew Cadet • 🥈 Small Crew Júnior' },
  { year:2025, title:'Hip Hop Unite Brasil', desc:'🥇 Duo Cadet • 🥇 Duo Júnior • 🥇 Small Crew Cadet', note:'Seleção Brasileira de Hip Hop (HHU).' },
  { year:2025, title:'Festival Internacional de Hip Hop (FIH2)', desc:'🥈 Small Crew — Categoria Avançada', note:'Único grupo de Joinville a conquistar o 2º lugar no Avançado.' },
  { year:2025, title:'Festival de Dança de Joinville', desc:'🥈 Solo Masculino Sênior (Marcelinho) • ✅ 3 coreografias autorais aprovadas', note:'Feito inédito para grupos urbanos de Joinville.' },
];

/* ===== Render: Professores ===== */
(function renderTeachers(){
  const wrap = $('#teachers-target'); if (!wrap) return;
  TEACHERS.forEach(t=>{
    const img = `https://unavatar.io/instagram/${t.ig}`;
    const card = $h(`
      <li class="teacher-card reveal">
        <img src="${img}" alt="${t.name}">
        <div>
          <strong>${t.name}</strong>
          <div class="muted small">${t.styles.join(' • ')}</div>
          <a class="small" target="_blank" rel="noreferrer" href="https://instagram.com/${t.ig}">@${t.ig}</a>
        </div>
      </li>
    `);
    wrap.append(card);
  });
})();

/* ===== Render: Horários ===== */
function renderHorarios(){
  const sWrap = $('#schedule-target'); if (!sWrap) return;
  sWrap.innerHTML = '';
  const weekOrder=['seg','ter','qua','qui','sex','sab'];
  const weekName={seg:'Segunda',ter:'Terça',qua:'Quarta',qui:'Quinta',sex:'Sexta',sab:'Sábado'};
  const diaSel = $('#filter-dia')?.value || '';
  const modSel = $('#filter-modalidade')?.value || '';
  weekOrder.forEach(dia=>{
    if (diaSel && dia !== diaSel) return;
    const items = HORARIOS
      .filter(h=>h.dias.includes(dia) && (!modSel || h.modalidade === modSel))
      .sort((a,b)=>a.hora.localeCompare(b.hora));
    if (!items.length) return;
    const col = $h(`<div class="day reveal" data-dia="${dia}"><h3>${weekName[dia]}</h3><ul></ul></div>`);
    const list = col.querySelector('ul');
    items.forEach(h=>{
      const tag = h.reservado ? '🔒 Reservado' : (h.faixa || '');
      const cta = h.reservado ? '' : `
        <div class="mt">
          <a class="btn small" target="_blank" rel="noreferrer" href="${LINKS.trial}">Agendar experimental</a>
          <a class="btn small ghost" target="_blank" rel="noreferrer"
             href="https://wa.me/5547999463474?text=${encodeURIComponent(`Olá! Quero reservar vaga em ${h.modalidade} • ${h.grupo} • ${h.nivel} (${weekName[dia]} ${h.hora}).`)}">
             WhatsApp
          </a>
        </div>`;
      const li = $h(`
        <li class="reveal" data-modalidade="${h.modalidade}">
          <div class="row"><b>${h.hora}</b> • ${h.dur || 60} min</div>
          <div class="muted small">${h.modalidade} • ${h.grupo} • ${h.nivel} ${tag?`• ${tag}`:''}</div>
          <div class="muted small">Professor(a): ${h.professor}</div>
          ${cta}
        </li>
      `);
      list.append(li);
    });
    sWrap.append(col);
  });
}

/* ===== Render: Planos ===== */
(function renderPlans(){
  const wrap = $('#plans-target'); if (!wrap) return;
  PLANS.forEach(p=>{
    const card = $h(`
      <li class="card reveal" style="${p.featured?'border-color: rgba(167,139,250,.6); box-shadow: var(--shadow);':''}">
        <strong>${p.title}</strong>
        <div class="muted mt-sm">${p.price}</div>
        <div class="mt">
          <a class="btn small primary" href="${LINKS.matriculas}" target="_blank" rel="noreferrer">Assinar</a>
        </div>
      </li>
    `);
    wrap.append(card);
  });
})();

/* ===== Render: Premiações ===== */
(function renderAwards(){
  const wrap = $('#awards-timeline'); if (!wrap) return;
  AWARDS.forEach(a=>{
    const note = a.note ? `<small class=\"muted block mt-sm\">${a.note}</small>` : '';
    wrap.append($h(`
      <div class=\"timeline-item reveal\">
        <div class=\"timeline-node\">🏆</div>
        <div class=\"timeline-content\">
          <strong>${a.year} — ${a.title}</strong>
          <div class=\"mt-sm\">${a.desc}</div>
          ${note}
        </div>
      </div>
    `));
  });
})();

/* ===== Interações ===== */
(function initUI(){
  // ano no rodapé
  const y = $('#year'); if (y) y.textContent = new Date().getFullYear();

  // links
  $('#btn-trial-nav')?.setAttribute('href', LINKS.trial);
  $('#btn-trial-hero')?.setAttribute('href', LINKS.trial);
  $('#btn-trial-card')?.setAttribute('href', LINKS.trial);
  $('#btn-whats-hero')?.setAttribute('href', LINKS.whats);
  $('#link-whats')?.setAttribute('href', LINKS.whats);
  if ($('#link-whats')) $('#link-whats').textContent = '+55 47 99946‑3474';
  $('#btn-matriculas')?.setAttribute('href', LINKS.matriculas);

  // filtros de horários
  const fDia = $('#filter-dia');
  const fMod = $('#filter-modalidade');
  try {
    const sd = localStorage.getItem('filterDia');
    const sm = localStorage.getItem('filterModalidade');
    if (fDia && sd) fDia.value = sd;
    if (fMod && sm) fMod.value = sm;
  } catch(e) {}
  fDia?.addEventListener('change', ()=>{
    try { localStorage.setItem('filterDia', fDia.value); } catch(e) {}
    renderHorarios();
  });
  fMod?.addEventListener('change', ()=>{
    try { localStorage.setItem('filterModalidade', fMod.value); } catch(e) {}
    renderHorarios();
  });

  renderHorarios();

  // menu mobile
  const burger = document.querySelector('.burger');
  const menu = document.querySelector('.menu');
  burger?.addEventListener('click', ()=>{
    const open = menu.classList.toggle('open');
    burger.setAttribute('aria-expanded', String(open));
  });

  // smooth scroll
  $$('.menu a[href^="#"]').forEach(a=>{
    a.addEventListener('click', e=>{
      e.preventDefault();
      const id = a.getAttribute('href');
      const tgt = $(id);
      if (!tgt) return;
      const top = tgt.getBoundingClientRect().top + window.scrollY - 72;
      window.scrollTo({top, behavior:'smooth'});
      menu.classList.remove('open');
      burger && burger.setAttribute('aria-expanded','false');
    });
  });

  // word rotator (ritmos -> estilos)
  const words = ['ritmos','hip hop','jazz','contemporâneo','heels','dancehall','waacking','house'];
  const rot = $('#word-rotator');
  let i=0;
  setInterval(()=>{ i=(i+1)%words.length; if(rot){ rot.textContent = words[i]; } }, 2000);

  // mídia do herói (rotaciona imagens simples) — preencha quando tiver assets
  const HERO_MEDIA = [
    'https://picsum.photos/seed/hero1/1280/720',
    'https://picsum.photos/seed/hero2/1280/720'
  ];
  const heroBox = $('#hero-media');
  if (heroBox && HERO_MEDIA.length && !heroBox.querySelector('video')){
    let hi = 0;
    const apply = ()=> heroBox.style.backgroundImage = `url('${HERO_MEDIA[hi]}')`;
    apply();
    setInterval(()=>{ hi=(hi+1)%HERO_MEDIA.length; apply(); }, 4000);
  }

  // contato - envio de formulário
  const contactForm = $('#contact-form');
  const formStatus = $('#form-status');
  if (contactForm) {
    contactForm.addEventListener('submit', async (e) => {
      e.preventDefault();
      if (!contactForm.checkValidity()) {
        contactForm.reportValidity();
        return;
      }
      formStatus.textContent = 'Enviando...';
      try {
        const data = new FormData(contactForm);
        const res = await fetch('https://formspree.io/f/xjkvzvgz', {
          method: 'POST',
          body: data,
          headers: { 'Accept': 'application/json' }
        });
        if (res.ok) {
          formStatus.textContent = 'Mensagem enviada com sucesso!';
          formStatus.classList.add('success');
          formStatus.classList.remove('error');
          contactForm.reset();
        } else {
          formStatus.textContent = 'Ocorreu um erro. Tente novamente.';
          formStatus.classList.add('error');
          formStatus.classList.remove('success');
        }
      } catch (err) {
        formStatus.textContent = 'Ocorreu um erro. Tente novamente.';
        formStatus.classList.add('error');
        formStatus.classList.remove('success');
      }
    });
  }
})();

/* ===== Loader ===== */
window.addEventListener('load', ()=>{
  const bar = $('#top-loader');
  if (bar){
    bar.classList.add('hide');
    setTimeout(()=>bar.remove(),300);
  }
});
