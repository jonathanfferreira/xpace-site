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
const linkTrial = $('#btn-trial-nav')?.dataset.href || '';
const linkMatriculas = $('#btn-matriculas')?.dataset.href || '';

/* ===== Dados (carregados via JSON) ===== */
let TEACHERS = [];
let HORARIOS = [];
let PLANS = [];
let AWARDS = [];

async function loadData(){
  const [teachers, horarios, plans, awards] = await Promise.all([
    fetch('assets/data/teachers.json').then(r=>r.json()),
    fetch('assets/data/horarios.json').then(r=>r.json()),
    fetch('assets/data/plans.json').then(r=>r.json()),
    fetch('assets/data/awards.json').then(r=>r.json()),
  ]);
  TEACHERS = teachers;
  HORARIOS = horarios;
  PLANS = plans;
  AWARDS = awards;
}

/* ===== Render: Professores ===== */
function renderTeachers(){
  const wrap = $('#teachers-target'); if (!wrap) return;
  TEACHERS.forEach(t=>{
    const img = `https://unavatar.io/instagram/${t.ig}`;
    const card = $h(`
      <li class="teacher-card reveal">
        <img src="${img}" alt="${t.name}" loading="lazy">
        <div>
          <strong>${t.name}</strong>
          <div class="muted small">${t.styles.join(' • ')}</div>
          <a class="small" target="_blank" rel="noreferrer" href="https://instagram.com/${t.ig}">@${t.ig}</a>
        </div>
      </li>
    `);
    wrap.append(card);
  });
}

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
          <a class="btn small" target="_blank" rel="noreferrer" href="${linkTrial}">Agendar experimental</a>
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
function renderPlans(){
  const wrap = $('#plans-target'); if (!wrap) return;
  PLANS.forEach(p=>{
    const card = $h(`
      <li class="card reveal" style="${p.featured?'border-color: rgba(167,139,250,.6); box-shadow: var(--shadow);':''}">
        <strong>${p.title}</strong>
        <div class="muted mt-sm">${p.price}</div>
        <div class="mt">
          <a class="btn small primary" href="${linkMatriculas}" target="_blank" rel="noreferrer">Assinar</a>
        </div>
      </li>
    `);
    wrap.append(card);
  });
}

/* ===== Render: Premiações ===== */
function renderAwards(){
  const wrap = $('#awards-timeline'); if (!wrap) return;
  AWARDS.forEach(a=>{
    const note = a.note ? `<small class="muted block mt-sm">${a.note}</small>` : '';
    wrap.append($h(`
      <div class="timeline-item reveal">
        <div class="timeline-node">🏆</div>
        <div class="timeline-content">
          <strong>${a.year} — ${a.title}</strong>
          <div class="mt-sm">${a.desc}</div>
          ${note}
        </div>
      </div>
    `));
  });
}

/* ===== Interações ===== */
function initUI(){
  // ano no rodapé
  const y = $('#year'); if (y) y.textContent = new Date().getFullYear();

  // links
  ['btn-trial-nav','btn-trial-hero','btn-trial-card','btn-whats-hero','link-whats','btn-matriculas'].forEach(id=>{
    const el = document.getElementById(id);
    if (el?.dataset.href) el.setAttribute('href', el.dataset.href);
  });
  if ($('#link-whats')) $('#link-whats').textContent = '+55 47 99946‑3474';

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
  burger?.addEventListener('click', () => {
    const open = menu.classList.toggle('open');
    burger.setAttribute('aria-expanded', open ? 'true' : 'false');
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
}

loadData().then(()=>{
  renderTeachers();
  renderPlans();
  renderAwards();
  initUI();
});

/* ===== Loader ===== */
window.addEventListener('load', ()=>{
  const bar = $('#top-loader');
  if (bar){
    bar.classList.add('hide');
    setTimeout(()=>bar.remove(),300);
  }
});
