/* ===== Helpers ===== */
const el = (sel) => document.querySelector(sel)
const $$ = (sel) => Array.from(document.querySelectorAll(sel))
const $ = (html) => { const t = document.createElement('template'); t.innerHTML = html.trim(); return t.content.firstChild }

/* ===== Config ===== */
const LINKS = {
  trial: 'https://agendamento.nextfit.com.br/f9b1ea53-0e0e-4f98-9396-3dab7c9fbff4',
  whats: 'https://wa.me/5547999463474?text=Ol%C3%A1!%20Quero%20informa%C3%A7%C3%B5es%20sobre%20matr%C3%ADculas%20na%20XPACE.&utm_source=xpace-static&utm_medium=whatsapp&utm_campaign=default'
}

/* ===== Teachers data ===== */

const TEACHERS = [
  { name: 'Alana Veiga', styles: ['Hip Hop'], ig: 'veigalanaa' },
  { name: 'Alisson Felipe', styles: ['Hip Hop'], ig: 'alissonfelipes', photo: 'assets/images/teachers/alissonfelipe.jpg' },
  { name: 'Alisson Morpheu', styles: ['Locking'], ig: 'alisson_morpheu' },
  { name: 'Bianca Marcela', styles: ['Contemporâneo','Jazz'], ig: 'biancamarceela', photo: 'assets/images/teachers/bianca.jpg' },
  { name: 'Dil', styles: ['Vogue','Jazz Funk','Waacking','Hip Hop','House'], ig: 'dilschulz', photo: 'assets/images/teachers/dil.jpg' },
  { name: 'Eduarda Rodrigues', styles: ['Jazz Funk','Heels'], ig: 'eduarda.r.l', photo: 'assets/images/teachers/eduarda.jpg' },
  { name: 'Engels', styles: ['Vogue','Waacking','Jazz Funk'], ig: 'engelsmatheus_', photo: 'assets/images/teachers/engels.jpg' },
  { name: 'Gus', styles: ['Waacking','Jazz Funk','House'], ig: 'gusjoesting' },
  { name: 'Guilherme Riku', styles: ['Acrobacias'], ig: 'guilhermeriku' },
  { name: 'Isis', styles: ['Hip Hop'], ig: 'isislkr' },
  { name: 'Jhonney', styles: ['Hip Hop','Dancehall','Jazz Funk','Waacking'], ig: 'jhonney.xp', photo: 'assets/images/teachers/jhonney.jpg' },
  { name: 'Lóren Stefany', styles: ['Hip Hop','House'], ig: 'ftloren', photo: 'assets/images/teachers/loren.jpg' },
  { name: 'Lucas Maciel', styles: ['Dancehall'], ig: 'lucasmacieldx', photo: 'assets/images/teachers/lucasmaciel.jpg' },
  { name: 'Marcelinho', styles: ['Hip Hop'], ig: 'marcelinho_hiphop', photo: 'assets/images/teachers/marcelinho.jpg' },
  { name: 'Natália Lessin', styles: ['Ritmos'], ig: 'nataliatflessin' },
  { name: 'Ruan Amorim', styles: ['Hip Hop','House'], ig: 'ruan_amrm' },
  { name: 'Ruan Santos', styles: ['Hip Hop'], ig: 'ruansanttoz' },
  { name: 'Samuel Maros', styles: ['Danças Urbanas'], ig: 'samuzek' },
];

/* ===== Styles (Estilos de dança) ===== */
const STYLES = [
  { slug:'waacking', name:'Waacking',
    summary:'Nascido nas discotecas de Los Angeles nos anos 70, com foco em expressão, linhas de braços e musicalidade.',
    refs: [] },
  { slug:'vogue', name:'Vogue',
    summary:'Originado na Ballroom culture, com poses, linhas e categorias como Vogue Femme, Old Way e New Way.',
    refs: [] },
  { slug:'jazz-funk', name:'Jazz Funk',
    summary:'Mistura do jazz com a estética pop/comercial, ênfase em precisão e performance.',
    refs: [] },
  { slug:'hip-hop', name:'Hip Hop',
    summary:'Cultura urbana com danças sociais, grooves, freestyle e foundations.',
    refs: [] },
  { slug:'dancehall', name:'Dancehall',
    summary:'Da Jamaica, passos e variações com forte identidade cultural.',
    refs: [] },
  { slug:'house', name:'House',
    summary:'Clubes de Chicago/NY, com footwork, jacking e lofting.',
    refs: [] },
];

const stylesWrap = document.getElementById('styles-target');
if (stylesWrap){
  STYLES.forEach(s=>{
    const card = $(`<li class="reveal">
      <strong>${s.name}</strong>
      <div class="muted small" style="margin:8px 0 10px">${s.summary}</div>
      <div class="mt">
        <a class="btn small" href="#estilos-${s.slug}" onclick="event.preventDefault();alert('Em breve página completa de ${s.name} com história e vídeos!');">Ver mais</a>
      </div>
    </li>`);
    stylesWrap.appendChild(card);
  });
}


/* ===== Schedule data ===== */
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
]

/* ===== Render Teachers ===== */
const tWrap = el('#teachers-target')
if (tWrap){
  TEACHERS.forEach(t => {
    const imgSrc = t.photo ? `assets/images/teachers/${t.photo}` : `https://unavatar.io/instagram/${t.ig}`
    const card = $(`<li class="teacher-card reveal">
      <img src="${imgSrc}" alt="Foto de ${t.name}">
      <div class="info">
        <strong>${t.name}</strong>
        <div class="muted small">${t.styles.join(' • ')}</div>
        <a class="ig" target="_blank" rel="noreferrer" href="https://instagram.com/${t.ig}">@${t.ig}</a>
      </div>
    </li>`)
    tWrap.appendChild(card)
  })
}

/* ===== Render Schedule ===== */
const weekOrder=['seg','ter','qua','qui','sex','sab']
const weekName={seg:'Segunda',ter:'Terça',qua:'Quarta',qui:'Quinta',sex:'Sexta',sab:'Sábado'}
const sWrap = el('#schedule-target')
if (sWrap){
  weekOrder.forEach(dia => {
    const items = HORARIOS.filter(h => h.dias.includes(dia)).sort((a,b)=>a.hora.localeCompare(b.hora))
    if (!items.length) return
    const col = $(`<div class="day reveal"><h3>${weekName[dia]}</h3><ul class="cards"></ul></div>`)
    const list = col.querySelector('ul')
    items.forEach(h => {
      const tag = h.reservado ? '🔒 Reservado' : (h.faixa || '')
const cta = h.reservado ? '' : `
  <a class="btn small" target="_blank" rel="noreferrer" href="${LINKS.trial}">
    Agendar experimental
  </a>
  <a class="btn small" target="_blank" rel="noreferrer" href="https://wa.me/5547999463474?text=${encodeURIComponent(`Olá! Quero reservar vaga em ${h.modalidade} • ${h.grupo} • ${h.nivel} (${weekName[dia]} ${h.hora}).`)}&utm_source=xpace-static&utm_medium=whatsapp&utm_campaign=horario">
    WhatsApp
  </a>`;
      const li = $(`<li>
        <div class="row"><b>${h.hora}</b> • ${h.dur || 60} min</div>
        <div class="muted">${h.modalidade} • ${h.grupo} • ${h.nivel} ${tag?`• <span class='pill'>${tag}</span>`:''}</div>
        <div class="muted small">Professor(a): ${h.professor}</div>
        <div class="mt">${cta}</div>
      </li>`)
      list.appendChild(li)
    })
    sWrap.appendChild(col)
  })
}

/* ===== Footer year ===== */
const y = el('#year'); if (y) y.textContent = new Date().getFullYear()

// hero
const btnTrialHero = document.getElementById('btn-trial-hero');
if (btnTrialHero) btnTrialHero.href = LINKS.trial;

// nav (se adicionou o botão no menu)
const btnTrialNav = document.getElementById('btn-trial-nav');
if (btnTrialNav) btnTrialNav.href = LINKS.trial;


/* ===== Smooth scroll + active menu ===== */
$$('.menu a[href^="#"]').forEach(a=>{
  a.addEventListener('click',e=>{
    e.preventDefault()
    const id = a.getAttribute('href')
    const tgt = el(id)
    if(!tgt) return
    const top = tgt.getBoundingClientRect().top + window.scrollY - 72
    window.scrollTo({top, behavior:'smooth'})
  })
})
const sections = ['#horarios','#professores','#planos','#contato'].map(id=>({id,el:el(id)})).filter(s=>s.el)
const onScroll = () => {
  const pos = window.scrollY+100
  let current=null
  sections.forEach(s=>{ if(s.el.offsetTop<=pos) current=s.id })
  $$('.menu a').forEach(a=>a.classList.toggle('active', a.getAttribute('href')===current))
}
document.addEventListener('scroll', onScroll, {passive:true}); onScroll()

/* ===== Reveal on scroll (IntersectionObserver) ===== */
const ro = new IntersectionObserver(entries=>{
  entries.forEach(e=>{ if(e.isIntersecting){ e.target.classList.add('show'); ro.unobserve(e.target) } })
},{threshold:.12})
$$('.reveal, section, .teacher-card, .day').forEach(n=>ro.observe(n))

/* ===== Parallax leve nos blobs (mouse) ===== */
const blobs = $$('.blob')
if (blobs.length){
  window.addEventListener('mousemove',(e)=>{
    const {innerWidth:w, innerHeight:h} = window
    const x = (e.clientX - w/2) / w, y = (e.clientY - h/2) / h
    blobs.forEach((b,i)=>{
      const strength = 8 + i*5
      b.style.transform = `translate(${x*strength}%, ${y*strength}%)`
    })
  }, {passive:true})
}
/* ===== Awards (premiações) ===== */
const AWARDS = [
  // Exemplo de item (me manda a lista que eu preencho):
  // { title:'XP Crew – Mega Dance Sul', place:'1º lugar', city:'Florianópolis', year:2024 },
  // { title:'Coreografia “Momentum”', place:'2º lugar', city:'Curitiba', year:2023 },
];

const aWrap = document.getElementById('awards-list');
if (aWrap){
  if (AWARDS.length === 0){
    aWrap.innerHTML = `<li class="muted" style="grid-column:1/-1">Em breve atualizaremos nossa linha do tempo de conquistas ✨</li>`;
  } else {
    AWARDS.forEach(a=>{
      const card = $(`<li class="reveal">
        <strong>${a.title}</strong>
        <div class="muted small">${a.place} • ${a.city} • ${a.year}</div>
      </li>`);
      aWrap.appendChild(card);
    });
  }
}

