/* ==========================================================================
   MCU HUB — dados e comportamento
   Observação: sinopses e descrições abaixo são textos originais, escritos
   para fins de demonstração desta interface (dados de exemplo / "mock").
   Títulos, personagens e datas referem-se ao catálogo real do MCU.
   ========================================================================== */

(function () {
  "use strict";

  /* ---------------------------------------------------------------------
     1. DADOS
     --------------------------------------------------------------------- */
  const MOVIES = [
    { id:"iron-man", name:"Homem de Ferro", year:2008, phase:"fase1", type:"filmes",
      desc:"Um gênio da engenharia é feito refém em um conflito armado e constrói uma armadura para escapar — o ponto de partida de todo o universo compartilhado." },
    { id:"the-avengers", name:"Os Vingadores", year:2012, phase:"fase1", type:"filmes",
      desc:"Uma ameaça vinda de fora do planeta força heróis com métodos muito diferentes a dividir a mesma equipe pela primeira vez." },
    { id:"winter-soldier", name:"Capitão América: O Soldado Invernal", year:2014, phase:"fase2", type:"filmes",
      desc:"Um soldado do passado descobre que a organização que jurou proteger foi infiltrada por dentro, e precisa decidir em quem confiar." },
    { id:"guardians", name:"Guardiões da Galáxia", year:2014, phase:"fase2", type:"filmes",
      desc:"Um grupo de fora-da-lei intergalácticos se une por acidente e acaba se tornando a única linha de defesa contra uma ameaça cósmica." },
    { id:"civil-war", name:"Capitão América: Guerra Civil", year:2016, phase:"fase3", type:"filmes",
      desc:"Uma divergência sobre supervisão e responsabilidade separa amigos de longa data em dois lados de um mesmo conflito." },
    { id:"infinity-war", name:"Vingadores: Guerra Infinita", year:2018, phase:"fase3", type:"filmes",
      desc:"Um titã em busca de artefatos de poder absoluto obriga heróis dispersos por toda a galáxia a se reunirem contra o relógio." },
    { id:"endgame", name:"Vingadores: Ultimato", year:2019, phase:"fase3", type:"filmes",
      desc:"Os sobreviventes de uma perda devastadora arriscam tudo em uma última tentativa de reverter o que foi feito." },
    { id:"multiverse-madness", name:"Doutor Estranho no Multiverso da Loucura", year:2022, phase:"fase4", type:"filmes",
      desc:"A abertura de portas entre realidades paralelas expõe versões alternativas de aliados — e de ameaças conhecidas." },
    { id:"wakanda-forever", name:"Pantera Negra: Wakanda Para Sempre", year:2022, phase:"fase4", type:"filmes",
      desc:"Diante de uma grande perda, uma nação precisa proteger seus recursos e seu povo de uma potência submersa até então desconhecida." },
    { id:"quantumania", name:"Homem-Formiga e a Vespa: Quantumania", year:2023, phase:"fase5", type:"filmes",
      desc:"Uma viagem ao reino quântico apresenta um conquistador capaz de reescrever linhas do tempo inteiras." },
    { id:"marvels", name:"As Marvels", year:2023, phase:"fase5", type:"filmes",
      desc:"Três heroínas com poderes ligados descobrem que trocam de lugar sempre que usam suas habilidades ao mesmo tempo." },
  ];

  const SERIES = [
    { id:"wandavision", name:"WandaVision", year:2021, phase:"fase4", type:"series",
      desc:"Uma vida suburbana perfeita demais esconde uma dor profunda manipulando a realidade de uma cidade inteira." },
    { id:"loki", name:"Loki", year:2021, phase:"fase4", type:"series",
      desc:"Preso por uma agência que policia o tempo, um trapaceiro precisa entender as regras de um lugar onde livre-arbítrio é anomalia." },
    { id:"hawkeye", name:"Gavião Arqueiro", year:2021, phase:"fase4", type:"series",
      desc:"Um veterano tenta voltar para casa no Natal, mas seu passado como justiceiro mascarado o alcança primeiro." },
    { id:"moon-knight", name:"Cavaleiro da Lua", year:2022, phase:"fase4", type:"series",
      desc:"Um homem com identidades divididas descobre que compartilha o corpo com o avatar de um deus egípcio." },
  ];

  const CHARACTERS = [
    { id:"tony-stark", name:"Tony Stark", role:"Homem de Ferro", type:"personagens",
      desc:"Engenheiro e empresário que transforma tecnologia de ponta em uma armadura de combate, tornando-se o catalisador da equipe." },
    { id:"steve-rogers", name:"Steve Rogers", role:"Capitão América", type:"personagens",
      desc:"Um soldado da Segunda Guerra reanimado no presente, guiado por um senso rígido de dever e lealdade." },
    { id:"natasha-romanoff", name:"Natasha Romanoff", role:"Viúva Negra", type:"personagens",
      desc:"Ex-agente secreta que troca um passado de espionagem por um lugar entre os heróis que antes vigiava." },
    { id:"thor-odinson", name:"Thor Odinson", role:"Thor", type:"personagens",
      desc:"Herdeiro de um reino distante que aprende, ao longo de perdas sucessivas, que força não é a mesma coisa que sabedoria." },
  ];

  const PHASES = [
    { n:1, key:"fase1", cls:"is-red",  title:"Fase 1 — O Início", years:"2008–2012",
      desc:"A fundação do universo compartilhado: heróis apresentados individualmente até se unirem em uma só equipe.",
      titles:["Homem de Ferro","Os Vingadores"] },
    { n:2, key:"fase2", cls:"",        title:"Fase 2 — Expansão", years:"2013–2015",
      desc:"O universo cresce para o espaço e para o passado dos personagens, testando os laços formados na fase anterior.",
      titles:["Soldado Invernal","Guardiões da Galáxia"] },
    { n:3, key:"fase3", cls:"is-gold", title:"Fase 3 — O Infinito", years:"2016–2019",
      desc:"O arco que dá nome à saga: uma ameaça cósmica coloca à prova tudo o que foi construído até aqui.",
      titles:["Guerra Civil","Guerra Infinita","Ultimato"] },
    { n:4, key:"fase4", cls:"is-red",  title:"Fase 4 — Multiverso", years:"2021–2022",
      desc:"Sem os pilares originais, novas realidades e novos protagonistas assumem o centro da história.",
      titles:["WandaVision","Loki","Multiverso da Loucura"] },
    { n:5, key:"fase5", cls:"is-gold", title:"Fase 5 — Kang", years:"2023–",
      desc:"Uma nova ameaça ligada ao tempo se anuncia enquanto o elenco de heróis continua a se renovar.",
      titles:["Quantumania","As Marvels"] },
  ];

  const ALL_ITEMS = [...MOVIES, ...SERIES, ...CHARACTERS];

  /* ---------------------------------------------------------------------
     2. HELPERS DE RENDERIZAÇÃO (poster placeholder + cards)
     --------------------------------------------------------------------- */
  function posterClass(item) {
    if (item.type === "series") return "poster--series";
    if (item.type === "personagens") return "poster--char";
    return `poster--${item.phase}`;
  }

  function initials(name) {
    return name.split(" ").filter(w => w.length > 2 || w === name.split(" ")[0])
      .slice(0, 2).map(w => w[0]).join("").toUpperCase();
  }

  // Extensões tentadas nessa ordem para cada capa em /covers/<id>.<ext>
  const COVER_EXTENSIONS = ["jpg", "jpeg", "png", "webp"];

  function posterHTML(item, { badge = true } = {}) {
    const badgeText = item.type === "personagens" ? item.role
      : item.type === "series" ? "Série" : (PHASES.find(p => p.key === item.phase)?.title.split("—")[0].trim() || "");
    // Tenta carregar covers/<id>.jpg → .jpeg → .png → .webp; se nenhuma existir,
    // a <img> se remove sozinha e o poster estilizado (gradiente) permanece visível.
    const tryList = COVER_EXTENSIONS.map(ext => `covers/${item.id}.${ext}`).join("|");
    return `
      <div class="poster ${posterClass(item)}">
        <img class="poster__img" alt="Capa de ${item.name}" loading="lazy"
             data-try="${tryList}" data-step="0"
             onerror="mcuTryNextCover(this)" src="covers/${item.id}.jpg">
        <span class="poster__mono" aria-hidden="true">${initials(item.name)}</span>
        <div class="poster__glow" aria-hidden="true"></div>
        <div class="poster__scrim" aria-hidden="true"></div>
        ${badge ? `<span class="poster__badge">${badgeText}</span>` : ""}
        <span class="poster__label">${item.name}</span>
      </div>`;
  }

  // Exposta em window pois é chamada via atributo inline onerror.
  window.mcuTryNextCover = function (img) {
    const list = img.dataset.try.split("|");
    const step = Number(img.dataset.step) + 1;
    if (step < list.length) {
      img.dataset.step = String(step);
      img.src = list[step];
    } else {
      img.remove(); // nenhuma capa encontrada — mantém o poster estilizado
    }
  };

  function cardHTML(item) {
    const meta = item.type === "personagens" ? item.role : `${item.year} · ${(PHASES.find(p=>p.key===item.phase)||{}).title?.split("—")[0].trim() || ""}`;
    return `
      <button class="card" type="button" data-id="${item.id}" data-type="${item.type}" data-phase="${item.phase || ""}">
        ${posterHTML(item, { badge:false })}
        <span class="card-name">${item.name}</span>
        <span class="card-meta">${meta}</span>
      </button>`;
  }

  function featureCardHTML(item, showMore = true) {
    return `
      <button class="feature-card" type="button" data-id="${item.id}" data-type="${item.type}">
        ${posterHTML(item, { badge:true })}
        <div class="feature-card__content">
          <span class="feature-card__name">${item.name}</span>
          ${showMore ? `<span class="feature-card__more">Ver mais →</span>` : ""}
        </div>
      </button>`;
  }

  /* ---------------------------------------------------------------------
     3. RENDER: grids
     --------------------------------------------------------------------- */
  const moviesGrid = document.getElementById("moviesGrid");
  const seriesGrid = document.getElementById("seriesGrid");
  const featureGrid = document.getElementById("featureGrid");
  const charactersGrid = document.getElementById("charactersGrid");
  const phaseList = document.getElementById("phaseList");

  moviesGrid.innerHTML = MOVIES.map(cardHTML).join("");
  seriesGrid.innerHTML = SERIES.map(cardHTML).join("");
  featureGrid.innerHTML = [MOVIES[5], MOVIES[6]].map(m => featureCardHTML(m, true)).join("");
  charactersGrid.innerHTML = CHARACTERS.slice(0, 2).map(c => featureCardHTML(c, false)).join("");

  phaseList.innerHTML = PHASES.map(p => `
    <div class="phase-item ${p.cls}">
      <span class="phase-num">${String(p.n).padStart(2, "0")}</span>
      <div>
        <h3 class="phase-title">${p.title}</h3>
        <span class="phase-years">${p.years}</span>
        <p class="phase-desc">${p.desc}</p>
        <div class="phase-titles">${p.titles.map(t => `<span class="phase-chip">${t}</span>`).join("")}</div>
      </div>
    </div>`).join("");

  /* ---------------------------------------------------------------------
     4. HERO CAROUSEL
     --------------------------------------------------------------------- */
  const HERO_ITEMS = [MOVIES[6], MOVIES[5], MOVIES[3], SERIES[1]];
  const heroTrack = document.getElementById("heroTrack");
  const heroDots = document.getElementById("heroDots");
  let heroIndex = 0, heroTimer = null;

  heroTrack.innerHTML = HERO_ITEMS.map(item => {
    const meta = item.type === "series" ? "Série original" : `${item.year} · Filme`;
    return `
      <div class="hero-slide">
        <div class="hero-slide__bg poster ${posterClass(item)}">
          <img class="poster__img" alt="" loading="lazy"
               data-try="${COVER_EXTENSIONS.map(ext => `covers/${item.id}.${ext}`).join("|")}" data-step="0"
               onerror="mcuTryNextCover(this)" src="covers/${item.id}.jpg">
          <span class="poster__mono" aria-hidden="true">${initials(item.name)}</span>
          <div class="poster__glow" aria-hidden="true"></div>
          <div class="poster__scrim" aria-hidden="true"></div>
        </div>
        <div class="hero-slide__content">
          <span class="hero-slide__eyebrow">${meta}</span>
          <h2 class="hero-slide__title">${item.name}</h2>
          <p class="hero-slide__desc">${item.desc}</p>
          <button class="hero-slide__cta" type="button" data-id="${item.id}" data-type="${item.type}">Ver detalhes</button>
        </div>
      </div>`;
  }).join("");

  heroDots.innerHTML = HERO_ITEMS.map((_, i) =>
    `<button class="hero-dot ${i===0?"is-active":""}" role="tab" aria-label="Ir para destaque ${i+1}" data-i="${i}"></button>`
  ).join("");

  function goToHero(i) {
    heroIndex = (i + HERO_ITEMS.length) % HERO_ITEMS.length;
    heroTrack.style.transform = `translateX(-${heroIndex * 100}%)`;
    heroDots.querySelectorAll(".hero-dot").forEach((d, idx) => d.classList.toggle("is-active", idx === heroIndex));
  }
  function restartHeroTimer() {
    clearInterval(heroTimer);
    heroTimer = setInterval(() => goToHero(heroIndex + 1), 6000);
  }

  document.getElementById("heroNext").addEventListener("click", () => { goToHero(heroIndex + 1); restartHeroTimer(); });
  document.getElementById("heroPrev").addEventListener("click", () => { goToHero(heroIndex - 1); restartHeroTimer(); });
  heroDots.addEventListener("click", (e) => {
    const btn = e.target.closest(".hero-dot");
    if (!btn) return;
    goToHero(Number(btn.dataset.i));
    restartHeroTimer();
  });
  restartHeroTimer();

  // pause autoplay on hover/focus for accessibility & UX
  const heroSection = document.querySelector(".hero");
  heroSection.addEventListener("mouseenter", () => clearInterval(heroTimer));
  heroSection.addEventListener("mouseleave", restartHeroTimer);

  /* ---------------------------------------------------------------------
     5. MENU MOBILE
     --------------------------------------------------------------------- */
  const menuToggle = document.getElementById("menuToggle");
  const mainNav = document.getElementById("mainNav");
  menuToggle.addEventListener("click", () => {
    const open = mainNav.classList.toggle("is-open");
    menuToggle.setAttribute("aria-expanded", String(open));
    menuToggle.setAttribute("aria-label", open ? "Fechar menu" : "Abrir menu");
  });
  mainNav.querySelectorAll(".nav-link").forEach(link => {
    link.addEventListener("click", () => {
      mainNav.classList.remove("is-open");
      menuToggle.setAttribute("aria-expanded", "false");
    });
  });

  /* ---------------------------------------------------------------------
     6. BUSCA + "MAIS OPÇÕES"
     --------------------------------------------------------------------- */
  const moreBtn = document.getElementById("moreOptionsBtn");
  const morePanel = document.getElementById("moreOptionsPanel");
  moreBtn.addEventListener("click", () => {
    const isHidden = morePanel.hasAttribute("hidden");
    if (isHidden) { morePanel.removeAttribute("hidden"); moreBtn.setAttribute("aria-expanded", "true"); }
    else { morePanel.setAttribute("hidden", ""); moreBtn.setAttribute("aria-expanded", "false"); }
  });
  document.addEventListener("click", (e) => {
    if (!e.target.closest(".search-bar")) morePanel.setAttribute("hidden", "");
  });

  const searchInput = document.getElementById("searchInput");
  function applySearch() {
    const q = searchInput.value.trim().toLowerCase();
    const scopes = [...morePanel.querySelectorAll("input[type=checkbox]")]
      .filter(c => c.checked).map(c => c.dataset.scope);

    let anyVisible = { filmes:false, series:false, personagens:false };

    document.querySelectorAll(".card, .feature-card").forEach(card => {
      const id = card.dataset.id;
      const item = ALL_ITEMS.find(i => i.id === id);
      if (!item) return;
      const matchesQuery = !q || item.name.toLowerCase().includes(q);
      const matchesScope = scopes.includes(item.type);
      const visible = matchesQuery && matchesScope;
      card.hidden = !visible;
      if (visible) anyVisible[item.type] = true;
    });

    toggleEmptyState(moviesGrid, anyVisible.filmes || moviesGrid.children.length === 0);
    toggleEmptyState(seriesGrid, anyVisible.series || seriesGrid.children.length === 0);
  }

  function toggleEmptyState(grid, hasVisible) {
    let empty = grid.querySelector(".empty-state");
    const someCards = grid.querySelectorAll(".card").length > 0;
    if (!hasVisible && someCards) {
      if (!empty) {
        empty = document.createElement("div");
        empty.className = "empty-state";
        empty.textContent = "Nenhum resultado encontrado.";
        grid.appendChild(empty);
      }
    } else if (empty) {
      empty.remove();
    }
  }

  searchInput.addEventListener("input", applySearch);
  morePanel.addEventListener("change", applySearch);

  /* ---------------------------------------------------------------------
     7. FILTRO POR CATEGORIA (chips: fases)
     --------------------------------------------------------------------- */
  const chipRow = document.getElementById("chipRow");
  chipRow.addEventListener("click", (e) => {
    const chip = e.target.closest(".chip");
    if (!chip) return;
    chipRow.querySelectorAll(".chip").forEach(c => { c.classList.remove("is-active"); c.setAttribute("aria-selected", "false"); });
    chip.classList.add("is-active");
    chip.setAttribute("aria-selected", "true");

    const filter = chip.dataset.filter;
    let visibleCount = 0;
    moviesGrid.querySelectorAll(".card").forEach(card => {
      const show = filter === "todos" || card.dataset.phase === filter;
      card.hidden = !show;
      if (show) visibleCount++;
    });
    toggleEmptyState(moviesGrid, visibleCount > 0);
    document.getElementById("filmes").scrollIntoView({ behavior: "smooth", block: "start" });
  });

  // footer "jump to filter" links
  document.querySelectorAll("[data-jump-filter]").forEach(link => {
    link.addEventListener("click", (e) => {
      e.preventDefault();
      const key = link.dataset.jumpFilter;
      const chip = chipRow.querySelector(`[data-filter="${key}"]`);
      if (chip) chip.click();
    });
  });

  /* ---------------------------------------------------------------------
     8. MODAL DE DETALHES
     --------------------------------------------------------------------- */
  const modalOverlay = document.getElementById("modalOverlay");
  const modalPoster = document.getElementById("modalPoster");
  const modalEyebrow = document.getElementById("modalEyebrow");
  const modalTitle = document.getElementById("modalTitle");
  const modalMeta = document.getElementById("modalMeta");
  const modalDesc = document.getElementById("modalDesc");
  let lastFocused = null;

  function openModal(item) {
    if (!item) return;
    lastFocused = document.activeElement;
    modalPoster.innerHTML = posterHTML(item, { badge:false });
    modalEyebrow.textContent = item.type === "personagens" ? "Personagem"
      : item.type === "series" ? "Série" : "Filme";
    modalTitle.textContent = item.name;
    modalMeta.textContent = item.type === "personagens"
      ? item.role
      : `${item.year} · ${(PHASES.find(p => p.key === item.phase) || {}).title || ""}`;
    modalDesc.textContent = item.desc;
    modalOverlay.hidden = false;
    document.body.style.overflow = "hidden";
    document.getElementById("modalClose").focus();
  }

  function closeModal() {
    modalOverlay.hidden = true;
    document.body.style.overflow = "";
    if (lastFocused) lastFocused.focus();
  }

  document.addEventListener("click", (e) => {
    const trigger = e.target.closest("[data-id]");
    if (!trigger || trigger.closest(".modal")) return;
    const item = ALL_ITEMS.find(i => i.id === trigger.dataset.id);
    if (item) openModal(item);
  });

  document.getElementById("modalClose").addEventListener("click", closeModal);
  modalOverlay.addEventListener("click", (e) => { if (e.target === modalOverlay) closeModal(); });
  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape" && !modalOverlay.hidden) closeModal();
  });

  /* ---------------------------------------------------------------------
     9. HEADER: sombra ao rolar
     --------------------------------------------------------------------- */
  const header = document.getElementById("siteHeader");
  window.addEventListener("scroll", () => {
    header.style.boxShadow = window.scrollY > 8 ? "0 8px 24px rgba(0,0,0,.35)" : "none";
  }, { passive: true });

})();
