/* Navegación simple entre vistas y tema */
const views = {
  home: document.getElementById('view-home'),
  quiz: document.getElementById('view-quiz'),
  cases: document.getElementById('view-cases'),
  calc: document.getElementById('view-calc'),
};

const navButtons = document.querySelectorAll('.nav-btn');
navButtons.forEach((btn) => {
  btn.addEventListener('click', () => switchView(btn.dataset.view));
});

function switchView(key) {
  Object.values(views).forEach((v) => v.classList.add('hidden'));
  const target = views[key] || views.home;
  target.classList.remove('hidden');
}

// Tema oscuro con persistencia
const themeToggle = document.getElementById('theme-toggle');
function applyTheme(initial) {
  let theme = initial;
  if (!theme) {
    theme = localStorage.getItem('theme') || (window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light');
  }
  if (theme === 'dark') {
    document.documentElement.classList.add('dark');
  } else {
    document.documentElement.classList.remove('dark');
  }
}
applyTheme();
if (themeToggle) {
  themeToggle.addEventListener('click', () => {
    const isDark = document.documentElement.classList.toggle('dark');
    localStorage.setItem('theme', isDark ? 'dark' : 'light');
  });
}

// --- Quiz ---
let quizIndex = 0;
let quizScore = 0;
let quizCorrect = 0;

const qQuestion = document.getElementById('quiz-question');
const qOptions = document.getElementById('quiz-options');
const qFeedback = document.getElementById('quiz-feedback');
const qProgress = document.getElementById('quiz-progress');
const qScore = document.getElementById('quiz-score');
const qBest = document.getElementById('quiz-best');
const btnNextQ = document.getElementById('quiz-next');
const btnRestartQ = document.getElementById('quiz-restart');
const resModal = document.getElementById('result-modal');
const resTotal = document.getElementById('res-total');
const resCorrect = document.getElementById('res-correct');
const resScore = document.getElementById('res-score');
const resBest = document.getElementById('res-best');
const resClose = document.getElementById('res-close');
const resRetry = document.getElementById('res-retry');

function renderQuiz() {
  if (!Array.isArray(QUIZ_QUESTIONS) || QUIZ_QUESTIONS.length === 0) return;
  const total = QUIZ_QUESTIONS.length;
  const item = QUIZ_QUESTIONS[quizIndex];

  qQuestion.textContent = item.question;
  qOptions.innerHTML = '';
  qFeedback.textContent = '';
  item.options.forEach((opt, i) => {
    const b = document.createElement('button');
    b.className = 'w-full text-left px-3 py-2 rounded border hover:bg-slate-50';
    b.textContent = opt;
    b.onclick = () => selectAnswer(i, item.correctIndex, item.explain);
    qOptions.appendChild(b);
  });

  qProgress.style.width = `${((quizIndex) / total) * 100}%`;
  qScore.textContent = quizScore;
  if (qBest) qBest.textContent = Number(localStorage.getItem('quiz_best') || 0);
  // Enfocar primera opción para accesibilidad
  if (qOptions.firstElementChild) qOptions.firstElementChild.focus();
}

function selectAnswer(idx, correctIdx, explain) {
  [...qOptions.children].forEach((btn, i) => {
    btn.disabled = true;
    if (i === correctIdx) btn.classList.add('bg-green-50', 'border-green-400');
    if (i === idx && i !== correctIdx) btn.classList.add('bg-red-50', 'border-red-400');
  });
  if (idx === correctIdx) {
    quizScore += 10;
    quizCorrect += 1;
    qFeedback.className = 'text-sm text-green-700';
    qFeedback.textContent = '¡Correcto! ' + (explain || '');
  } else {
    qFeedback.className = 'text-sm text-red-700';
    qFeedback.textContent = 'No es correcto. ' + (explain || '');
  }
  qScore.textContent = quizScore;
}

if (btnNextQ) btnNextQ.addEventListener('click', () => {
  if (!Array.isArray(QUIZ_QUESTIONS) || QUIZ_QUESTIONS.length === 0) return;
  const total = QUIZ_QUESTIONS.length;
  if (quizIndex >= total - 1) {
    // Fin del quiz: mostrar modal y actualizar récord
    qProgress.style.width = '100%';
    const best = Number(localStorage.getItem('quiz_best') || 0);
    const newBest = Math.max(best, quizScore);
    localStorage.setItem('quiz_best', String(newBest));
    if (resTotal && resCorrect && resScore && resBest && resModal) {
      resTotal.textContent = String(total);
      resCorrect.textContent = String(quizCorrect);
      resScore.textContent = String(quizScore);
      resBest.textContent = String(newBest);
      resModal.classList.remove('hidden');
    }
  } else {
    quizIndex += 1;
    renderQuiz();
  }
});

if (btnRestartQ) btnRestartQ.addEventListener('click', () => {
  quizIndex = 0;
  quizScore = 0;
  quizCorrect = 0;
  renderQuiz();
});

if (resClose) resClose.addEventListener('click', () => {
  if (resModal) resModal.classList.add('hidden');
});
if (resRetry) resRetry.addEventListener('click', () => {
  quizIndex = 0;
  quizScore = 0;
  quizCorrect = 0;
  if (resModal) resModal.classList.add('hidden');
  renderQuiz();
});

// --- Casos ---
let caseIndex = 0;
const cText = document.getElementById('case-text');
const cOptions = document.getElementById('case-options');
const cFeedback = document.getElementById('case-feedback');
const cIdx = document.getElementById('case-index');
const cTotal = document.getElementById('case-total');
const btnNextC = document.getElementById('case-next');
const btnRestartC = document.getElementById('case-restart');

function renderCase() {
  if (!Array.isArray(CASES) || CASES.length === 0) return;
  cTotal.textContent = CASES.length;
  cIdx.textContent = caseIndex + 1;
  const item = CASES[caseIndex];
  cText.textContent = item.text;
  cOptions.innerHTML = '';
  cFeedback.textContent = '';

  item.options.forEach((opt, i) => {
    const b = document.createElement('button');
    b.className = 'w-full text-left px-3 py-2 rounded border hover:bg-slate-50';
    b.textContent = opt;
    b.onclick = () => {
      [...cOptions.children].forEach((btn, j) => {
        btn.disabled = true;
        if (j === item.correctIndex) btn.classList.add('bg-green-50', 'border-green-400');
        if (j === i && j !== item.correctIndex) btn.classList.add('bg-red-50', 'border-red-400');
      });
      cFeedback.className = i === item.correctIndex ? 'text-sm text-green-700' : 'text-sm text-red-700';
      cFeedback.textContent = item.explain || '';
    };
    cOptions.appendChild(b);
  });
  // Enfocar primera opción para accesibilidad
  if (cOptions.firstElementChild) cOptions.firstElementChild.focus();
}

if (btnNextC) btnNextC.addEventListener('click', () => {
  if (!Array.isArray(CASES) || CASES.length === 0) return;
  caseIndex = (caseIndex + 1) % CASES.length;
  renderCase();
});

if (btnRestartC) btnRestartC.addEventListener('click', () => {
  caseIndex = 0;
  renderCase();
});

// --- Calculadora ---
function money(n) {
  return new Intl.NumberFormat('es-CO', { style: 'currency', currency: 'COP', maximumFractionDigits: 0 }).format(n || 0);
}

function calcular() {
  const salario = Number(document.getElementById('salario').value) || 0;
  const smmlv = Number(document.getElementById('smmlv').value) || 0;
  const auxTrans = Number(document.getElementById('auxTrans').value) || 0;
  const hx50 = Number(document.getElementById('hxDiurnas').value) || 0;
  const hx100 = Number(document.getElementById('hxNocturnas').value) || 0;
  const pctSalud = Number(document.getElementById('pctSalud').value) || 0;
  const pctPension = Number(document.getElementById('pctPension').value) || 0;

  // Hora ordinaria: se toma referencia de 240 horas/mes (aprox 30 días * 8 h), simplificado
  const hora = salario / 240;
  const valorHx = hx50 * hora * 1.5 + hx100 * hora * 2.0;

  // Auxilio de transporte: se otorga si salario <= 2 SMMLV (parametrizable)
  const auxElegible = smmlv > 0 ? (salario <= 2 * smmlv ? auxTrans : 0) : 0;

  const devengado = salario + auxElegible + valorHx;
  const salud = (salario * pctSalud) / 100; // sobre IBC: simplificado a salario
  const pension = (salario * pctPension) / 100; // simplificado
  const neto = devengado - salud - pension;

  // Prestaciones referenciales sobre salario base (sin aux.)
  const ces = salario * 0.0833; // 8.33% mensualizado
  const intCes = ces * (0.12 / 12); // ~1% mensual
  const prima = salario * 0.0833; // 8.33% mensualizado
  const vaca = salario * 0.0417; // 4.17% mensualizado

  document.getElementById('r-salario').textContent = money(salario);
  document.getElementById('r-aux').textContent = money(auxElegible);
  document.getElementById('r-hx').textContent = money(valorHx);
  document.getElementById('r-dev').textContent = money(devengado);
  document.getElementById('r-salud').textContent = money(salud);
  document.getElementById('r-pension').textContent = money(pension);
  document.getElementById('r-neto').textContent = money(neto);

  document.getElementById('r-ces').textContent = money(ces);
  document.getElementById('r-intces').textContent = money(intCes);
  document.getElementById('r-prima').textContent = money(prima);
  document.getElementById('r-vaca').textContent = money(vaca);
}

const btnCalc = document.getElementById('calc-btn');
if (btnCalc) btnCalc.addEventListener('click', calcular);

// Presets y print
const presetSel = document.getElementById('preset');
if (presetSel) {
  presetSel.addEventListener('change', () => {
    const v = presetSel.value;
    if (v === 'co-2025') {
      const smmlv = document.getElementById('smmlv');
      const aux = document.getElementById('auxTrans');
      if (smmlv) smmlv.value = 1423000;
      if (aux) aux.value = 200000;
    }
  });
}
const printBtn = document.getElementById('print-btn');
if (printBtn) {
  printBtn.addEventListener('click', () => window.print());
}

// Inicialización
switchView('home');
renderQuiz();
renderCase();

// ---- Configuración del proyecto (branding/meta) ----
const openSettings = document.getElementById('open-settings');
const settingsModal = document.getElementById('settings-modal');
const settingsSave = document.getElementById('settings-save');
const settingsCancel = document.getElementById('settings-cancel');
const inpProject = document.getElementById('meta-project');
const inpAuthor = document.getElementById('meta-author');
const inpCourse = document.getElementById('meta-course');
const inpInst = document.getElementById('meta-inst');

const phProject = document.getElementById('ph-project');
const phAuthor = document.getElementById('ph-author');
const phCourse = document.getElementById('ph-course');
const phInst = document.getElementById('ph-inst');
const phDate = document.getElementById('ph-date');

function loadMeta() {
  const meta = JSON.parse(localStorage.getItem('project_meta') || '{}');
  if (inpProject) inpProject.value = meta.project || '';
  if (inpAuthor) inpAuthor.value = meta.author || '';
  if (inpCourse) inpCourse.value = meta.course || '';
  if (inpInst) inpInst.value = meta.inst || '';

  if (phProject) phProject.textContent = `Proyecto: ${meta.project || 'Juego Lúdico C.S.T.'}`;
  if (phAuthor) phAuthor.textContent = `Autor: ${meta.author || '-'}`;
  if (phCourse) phCourse.textContent = `Curso: ${meta.course || '-'}`;
  if (phInst) phInst.textContent = `Institución: ${meta.inst || '-'}`;
  if (phDate) phDate.textContent = new Date().toLocaleDateString('es-CO');
}

function saveMeta() {
  const meta = {
    project: inpProject ? inpProject.value.trim() : '',
    author: inpAuthor ? inpAuthor.value.trim() : '',
    course: inpCourse ? inpCourse.value.trim() : '',
    inst: inpInst ? inpInst.value.trim() : '',
  };
  localStorage.setItem('project_meta', JSON.stringify(meta));
  loadMeta();
}

if (openSettings) openSettings.addEventListener('click', () => {
  if (settingsModal) settingsModal.classList.remove('hidden');
  if (inpProject) inpProject.focus();
});
if (settingsCancel) settingsCancel.addEventListener('click', () => {
  if (settingsModal) settingsModal.classList.add('hidden');
});
if (settingsSave) settingsSave.addEventListener('click', () => {
  saveMeta();
  if (settingsModal) settingsModal.classList.add('hidden');
});

loadMeta();

// Registrar Service Worker global (requerido para PWA)
if ('serviceWorker' in navigator) {
  window.addEventListener('load', () => {
    navigator.serviceWorker.register('./service-worker.js').catch(console.error);
  });
}

// ---- Banner slider (Home) ----
const bannerTrack = document.getElementById('banner-track');
const bannerPrev = document.getElementById('banner-prev');
const bannerNext = document.getElementById('banner-next');
const bannerDotsWrap = document.getElementById('banner-dots');
let bannerDots = document.querySelectorAll('.banner-dot');
let bannerIndex = 0;
function getTotalSlides() { return bannerTrack ? bannerTrack.querySelectorAll('img').length : 0; }

function renderBanner() {
  const totalSlides = getTotalSlides();
  if (!bannerTrack || totalSlides === 0) return;
  const offset = bannerIndex * 100;
  bannerTrack.style.transform = `translateX(-${offset}%)`;
  bannerDots.forEach((d, i) => {
    d.style.backgroundColor = i === bannerIndex ? 'rgba(255,255,255,0.9)' : 'rgba(255,255,255,0.4)';
  });
}

function nextSlide() {
  const totalSlides = getTotalSlides();
  if (totalSlides === 0) return;
  bannerIndex = (bannerIndex + 1) % totalSlides;
  renderBanner();
}
function prevSlide() {
  const totalSlides = getTotalSlides();
  if (totalSlides === 0) return;
  bannerIndex = (bannerIndex - 1 + totalSlides) % totalSlides;
  renderBanner();
}

let bannerTimer = null;
function startAutoplay() {
  stopAutoplay();
  bannerTimer = setInterval(nextSlide, 5000);
}
function stopAutoplay() {
  if (bannerTimer) clearInterval(bannerTimer);
  bannerTimer = null;
}

if (bannerPrev) bannerPrev.addEventListener('click', () => { prevSlide(); startAutoplay(); });
if (bannerNext) bannerNext.addEventListener('click', () => { nextSlide(); startAutoplay(); });
function rebuildDots() {
  if (!bannerDotsWrap || !bannerTrack) return;
  bannerDotsWrap.innerHTML = '';
  const totalSlides = getTotalSlides();
  for (let i = 0; i < totalSlides; i++) {
    const dot = document.createElement('button');
    dot.className = 'banner-dot w-2 h-2 rounded-full bg-white/40';
    dot.setAttribute('aria-label', `Slide ${i+1}`);
    dot.addEventListener('click', () => { bannerIndex = i; renderBanner(); startAutoplay(); });
    bannerDotsWrap.appendChild(dot);
  }
  bannerDots = document.querySelectorAll('.banner-dot');
}

const bannerContainer = document.querySelector('#view-home .relative');
if (bannerContainer) {
  bannerContainer.addEventListener('mouseenter', stopAutoplay);
  bannerContainer.addEventListener('mouseleave', startAutoplay);
}

rebuildDots();
renderBanner();
startAutoplay();

// ---- Themed photos (Unsplash Source) with fallback ----
function applyPhotoTheme() {
  const banners = [
    { id: 'banner-img-0', url: 'https://source.unsplash.com/1200x360/?salary,payroll' },
    { id: 'banner-img-1', url: 'https://source.unsplash.com/1200x360/?team,law,work' },
    { id: 'banner-img-2', url: 'https://source.unsplash.com/1200x360/?calculator,finance' },
  ];
  const ads = [
    { id: 'ad-img-1', url: 'https://source.unsplash.com/600x360/?learning,quiz' },
    { id: 'ad-img-2', url: 'https://source.unsplash.com/600x360/?business,discussion' },
    { id: 'ad-img-3', url: 'https://source.unsplash.com/600x360/?payroll,calculator' },
  ];

  [...banners, ...ads].forEach(({ id, url }) => {
    const img = document.getElementById(id);
    if (!img) return;
    const fallback = img.getAttribute('src');
    const test = new Image();
    test.onload = () => { img.src = url; };
    test.onerror = () => { img.src = fallback; };
    test.referrerPolicy = 'no-referrer';
    test.src = url;
  });
}

applyPhotoTheme();

// ---- Banner Manager (CRUD) ----
const openBanner = document.getElementById('open-banner');
const bannerModal = document.getElementById('banner-modal');
const bannerClose = document.getElementById('banner-close');
const bannerClear = document.getElementById('banner-clear');
const bannerList = document.getElementById('banner-list');
const bannerAddUrl = document.getElementById('banner-add-url');
const bannerUrl = document.getElementById('banner-url');
const bannerFile = document.getElementById('banner-file');
const bannerAddFile = document.getElementById('banner-add-file');

function loadBannerImages() {
  try {
    return JSON.parse(localStorage.getItem('banner_images') || '[]');
  } catch { return []; }
}
function saveBannerImages(list) {
  try {
    localStorage.setItem('banner_images', JSON.stringify(list));
  } catch (e) {
    alert('No se pudo guardar la imagen del banner. Es posible que se haya superado el límite de almacenamiento local. Elimina algunas imágenes o usa archivos más livianos.');
    throw e;
  }
}
function syncBannerDom() {
  if (!bannerTrack) return;
  const items = loadBannerImages();
  if (items.length > 0) {
    bannerTrack.innerHTML = '';
    items.forEach((src, i) => {
      const img = document.createElement('img');
      img.src = src;
      img.alt = `Banner ${i+1}`;
      img.className = 'inline-block w-full h-48 md:h-64 object-cover';
      bannerTrack.appendChild(img);
    });
  }
  rebuildDots();
  bannerIndex = 0;
  renderBanner();
}
function renderBannerList() {
  if (!bannerList) return;
  const items = loadBannerImages();
  bannerList.innerHTML = '';
  items.forEach((src, i) => {
    const card = document.createElement('div');
    card.className = 'rounded overflow-hidden soft-border';
    card.innerHTML = `
      <img src="${src}" alt="banner ${i+1}" class="w-full h-24 object-cover" />
      <div class="flex justify-between items-center p-2 text-xs">
        <span>Slide ${i+1}</span>
        <div class="flex gap-2">
          <button data-idx="${i}" class="btn-del px-2 py-1 rounded border">Eliminar</button>
          <button data-idx="${i}" class="btn-up px-2 py-1 rounded border">Subir</button>
          <button data-idx="${i}" class="btn-down px-2 py-1 rounded border">Bajar</button>
        </div>
      </div>`;
    bannerList.appendChild(card);
  });
  // Eventos de control
  bannerList.querySelectorAll('.btn-del').forEach(btn => btn.addEventListener('click', () => {
    const idx = Number(btn.getAttribute('data-idx'));
    const items = loadBannerImages();
    items.splice(idx, 1);
    saveBannerImages(items);
    renderBannerList();
    syncBannerDom();
  }));
  bannerList.querySelectorAll('.btn-up').forEach(btn => btn.addEventListener('click', () => {
    const idx = Number(btn.getAttribute('data-idx'));
    const items = loadBannerImages();
    if (idx > 0) {
      [items[idx-1], items[idx]] = [items[idx], items[idx-1]];
      saveBannerImages(items);
      renderBannerList();
      syncBannerDom();
    }
  }));
  bannerList.querySelectorAll('.btn-down').forEach(btn => btn.addEventListener('click', () => {
    const idx = Number(btn.getAttribute('data-idx'));
    const items = loadBannerImages();
    if (idx < items.length - 1) {
      [items[idx+1], items[idx]] = [items[idx], items[idx+1]];
      saveBannerImages(items);
      renderBannerList();
      syncBannerDom();
    }
  }));
}

function addBannerUrl(src) {
  if (!src) return;
  const items = loadBannerImages();
  items.push(src);
  saveBannerImages(items);
  renderBannerList();
  syncBannerDom();
}
function addBannerFile(file) {
  if (!file) return;
  const reader = new FileReader();
  reader.onload = () => {
    const img = new Image();
    img.onload = () => {
      try {
        const maxW = 1200; // ancho recomendado del banner
        const scale = Math.min(1, maxW / img.width);
        const w = Math.round(img.width * scale);
        const h = Math.round(img.height * scale);
        const canvas = document.createElement('canvas');
        canvas.width = w; canvas.height = h;
        const ctx = canvas.getContext('2d');
        ctx.drawImage(img, 0, 0, w, h);
        // Intentar WebP si está soportado; si no, JPEG
        let dataUrl;
        try {
          dataUrl = canvas.toDataURL('image/webp', 0.8);
          if (!dataUrl || dataUrl.length < 50) throw new Error('webp failed');
        } catch { dataUrl = canvas.toDataURL('image/jpeg', 0.85); }
        addBannerUrl(String(dataUrl));
      } catch (err) {
        alert('No se pudo procesar la imagen seleccionada. Intenta con otra imagen.');
      }
    };
    img.onerror = () => alert('Archivo de imagen inválido.');
    img.src = String(reader.result);
  };
  reader.onerror = () => alert('No se pudo leer el archivo.');
  reader.readAsDataURL(file);
}

if (openBanner) openBanner.addEventListener('click', () => {
  if (bannerModal) bannerModal.classList.remove('hidden');
  renderBannerList();
});
if (bannerClose) bannerClose.addEventListener('click', () => {
  if (bannerModal) bannerModal.classList.add('hidden');
});
if (bannerClear) bannerClear.addEventListener('click', () => {
  saveBannerImages([]);
  renderBannerList();
  syncBannerDom();
});
if (bannerAddUrl) bannerAddUrl.addEventListener('click', () => {
  if (bannerUrl) addBannerUrl(bannerUrl.value.trim());
  if (bannerUrl) bannerUrl.value = '';
});
if (bannerAddFile) bannerAddFile.addEventListener('click', () => {
  if (bannerFile && bannerFile.files && bannerFile.files[0]) addBannerFile(bannerFile.files[0]);
  if (bannerFile) bannerFile.value = '';
});

// Inicial: sincronizar si hay imágenes guardadas
syncBannerDom();
