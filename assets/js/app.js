const activities = [
  {id:1,subject:'Biology',icon:'🧬',title:'Plant Cell Investigation',description:'Explore plant cell structures and learn how each part supports life.',level:'Beginner',time:'25 min',steps:['Collect a leaf sample and prepare a simple observation.','Identify the visible structures using the guided diagram.','Record observations and compare them with the expected cell structures.']},
  {id:2,subject:'Chemistry',icon:'🧪',title:'Acid–Base Reactions',description:'Investigate acids and bases using indicators and everyday materials.',level:'Beginner',time:'30 min',steps:['Prepare indicator solution and label your test samples.','Test each sample and record the colour change.','Classify the samples and explain the observed reaction.']},
  {id:3,subject:'Physics',icon:'⚡',title:'Build a Simple Circuit',description:'Discover current, voltage, and conductivity by building a working circuit.',level:'Intermediate',time:'35 min',steps:['Connect the battery, wires, switch, and lamp.','Open and close the switch to observe the circuit.','Test another conductor and explain the result.']},
  {id:4,subject:'Biology',icon:'🌱',title:'Seed Germination Study',description:'Observe how water, air, and temperature influence seed germination.',level:'Beginner',time:'7 days',steps:['Place equal seeds in labelled containers.','Change one condition while keeping the others consistent.','Measure growth each day and summarize your findings.']},
  {id:5,subject:'Chemistry',icon:'⚗️',title:'Separation of Mixtures',description:'Use simple physical methods to separate a mixture into its components.',level:'Intermediate',time:'40 min',steps:['Prepare a safe mixture of different-sized materials.','Choose filtration, sieving, or evaporation as appropriate.','Explain why each method works for the selected component.']},
  {id:6,subject:'Physics',icon:'🔭',title:'Measure Acceleration',description:'Use repeated measurements to investigate motion and acceleration.',level:'Intermediate',time:'45 min',steps:['Set up a simple inclined track and mark distances.','Measure travel time over repeated trials.','Calculate acceleration and discuss measurement error.']}
];

let selectedSubject = 'All';
const $ = (selector) => document.querySelector(selector);

function renderActivities(){
  const query = ($('#searchInput')?.value || '').trim().toLowerCase();
  const results = activities.filter(a => (selectedSubject === 'All' || a.subject === selectedSubject) && `${a.title} ${a.description} ${a.subject}`.toLowerCase().includes(query));
  const grid = $('#courseGrid');
  const empty = $('#emptyState');
  if(!grid) return;
  empty.hidden = results.length !== 0;
  grid.innerHTML = results.map(a => `
    <article class="course-card">
      <div class="course-cover"><span class="course-subject">${a.subject}</span>${a.icon}</div>
      <div class="course-body">
        <h3>${a.title}</h3>
        <p>${a.description}</p>
        <div class="course-meta"><span>${a.level} · ${a.time}</span><button data-course="${a.id}">View activity →</button></div>
      </div>
    </article>`).join('');
  grid.querySelectorAll('[data-course]').forEach(btn => btn.addEventListener('click', () => openActivity(Number(btn.dataset.course))));
}

function openActivity(id){
  const a = activities.find(item => item.id === id);
  if(!a) return;
  $('#modalBody').innerHTML = `<span class="section-kicker">${a.subject.toUpperCase()} · ${a.level.toUpperCase()}</span><h2>${a.icon} ${a.title}</h2><p>${a.description}</p><p><strong>Estimated time:</strong> ${a.time}</p><div class="modal-steps">${a.steps.map((step,i)=>`<div><b>Step ${i+1}</b><br>${step}</div>`).join('')}</div>`;
  $('#courseModal').classList.add('open');
  $('#courseModal').setAttribute('aria-hidden','false');
  document.body.style.overflow='hidden';
}
function closeModal(){ $('#courseModal').classList.remove('open'); $('#courseModal').setAttribute('aria-hidden','true'); document.body.style.overflow=''; }

function setupNav(){
  const toggle = $('#menuToggle'); const links = $('#navLinks');
  toggle?.addEventListener('click',()=>{const open=links.classList.toggle('open');toggle.setAttribute('aria-expanded',String(open));});
  links?.querySelectorAll('a').forEach(a=>a.addEventListener('click',()=>links.classList.remove('open')));
}
function setupTheme(){
  const saved=localStorage.getItem('ps-theme');
  if(saved==='dark') document.body.classList.add('dark');
  $('#themeToggle')?.addEventListener('click',()=>{document.body.classList.toggle('dark');localStorage.setItem('ps-theme',document.body.classList.contains('dark')?'dark':'light');});
}
function setupFilters(){
  $('#searchInput')?.addEventListener('input',renderActivities);
  $('#filters')?.querySelectorAll('.filter').forEach(btn=>btn.addEventListener('click',()=>{selectedSubject=btn.dataset.subject;$('#filters').querySelectorAll('.filter').forEach(b=>b.classList.remove('active'));btn.classList.add('active');renderActivities();}));
}
function setupForm(){
  $('#contactForm')?.addEventListener('submit',e=>{e.preventDefault();const name=$('#contactName').value.trim();$('#formStatus').textContent=`Thanks, ${name}! Your question has been captured locally. Backend API integration can be added next.`;e.target.reset();});
}
function animateStats(){
  const counters=[['#statExperiments',24],['#statSubjects',3]];
  counters.forEach(([selector,target])=>{let n=0;const el=$(selector);const timer=setInterval(()=>{n=Math.min(target,n+2);el.textContent=n+'+';if(n>=target)clearInterval(timer);},45);});
}

document.addEventListener('DOMContentLoaded',()=>{
  $('#year').textContent=new Date().getFullYear();
  renderActivities(); setupNav(); setupTheme(); setupFilters(); setupForm(); animateStats();
  document.querySelectorAll('[data-close-modal]').forEach(el=>el.addEventListener('click',closeModal));
  document.addEventListener('keydown',e=>{if(e.key==='Escape')closeModal();});
});
