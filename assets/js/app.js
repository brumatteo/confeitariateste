/*
 * Script principal responsável por carregar o conteúdo em JSON, aplicar o tema
 * e construir as seções do site dinamicamente. O objetivo é que todo o
 * conteúdo seja editável via CMS, sem necessidade de tocar neste código.
 */

// Função utilitária para carregar arquivos JSON do diretório /content
async function loadJSON(name) {
  try {
    const response = await fetch(`content/${name}.json`);
    // In many browsers, fetch() fails on the file protocol. If that happens, we'll fall back below.
    if (!response.ok) throw new Error(`Não foi possível carregar ${name}`);
    return await response.json();
  } catch (e) {
    // Log the error once but gracefully degrade to default content if available
    console.warn(`Falha ao carregar ${name}.json, usando dados padrão se disponíveis.`);
    if (window.defaultContent && window.defaultContent[name]) {
      return window.defaultContent[name];
    }
    return null;
  }
}

// Debounce simples para a busca
function debounce(func, delay) {
  let timer;
  return function (...args) {
    clearTimeout(timer);
    timer = setTimeout(() => {
      func.apply(this, args);
    }, delay);
  };
}

// Aplica as cores e textos definidos no tema
function applyTheme(theme) {
  const root = document.documentElement;
  if (theme.primary) root.style.setProperty('--primary', theme.primary);
  if (theme.secondary) root.style.setProperty('--secondary', theme.secondary);
  if (theme.bg) root.style.setProperty('--bg', theme.bg);
  if (theme.card) root.style.setProperty('--card', theme.card);
  if (theme.text) root.style.setProperty('--text', theme.text);
  const brand = document.getElementById('brandText');
  const cta = document.getElementById('headerCta');
  if (brand && theme.brandText) brand.textContent = theme.brandText;
  if (cta && theme.headerCta) {
    cta.textContent = theme.headerCta.label || '';
    cta.href = theme.headerCta.href || '#';
  }
}

// Constrói a seção Hero
function buildHero(data) {
  const section = document.createElement('section');
  section.className = 'hero';
  section.id = 'hero';

  // Imagem de fundo
  if (data.image) {
    const img = document.createElement('img');
    img.src = data.image;
    img.alt = data.title || '';
    img.loading = 'lazy';
    section.appendChild(img);
  }
  // Overlay
  const overlay = document.createElement('div');
  overlay.className = 'overlay';
  // Define gradiente e opacidade conforme JSON
  overlay.style.background = data.overlay || 'linear-gradient(135deg, rgba(0,0,0,0.5), rgba(0,0,0,0.2))';
  overlay.style.opacity = data.opacity != null ? data.opacity : 0.5;
  section.appendChild(overlay);

  const container = document.createElement('div');
  container.className = 'hero-content';
  const title = document.createElement('h1');
  title.className = 'hero-title';
  title.textContent = data.title || '';
  const subtitle = document.createElement('p');
  subtitle.className = 'hero-subtitle';
  subtitle.textContent = data.subtitle || '';
  container.appendChild(title);
  container.appendChild(subtitle);
  // CTA
  if (data.cta) {
    const cta = document.createElement('a');
    cta.className = 'hero-cta';
    cta.textContent = data.cta.label || '';
    cta.href = data.cta.href || '#';
    cta.setAttribute('aria-label', data.cta.label || 'Chamada para ação');
    container.appendChild(cta);
  }
  section.appendChild(container);
  return section;
}

// Constrói a seção Sobre
function buildAbout(data) {
  const section = document.createElement('section');
  section.className = 'about';
  section.id = 'about';
  // Grid com texto e imagem
  const grid = document.createElement('div');
  grid.className = 'about-grid';
  // Texto
  const textWrapper = document.createElement('div');
  textWrapper.className = 'about-text-wrapper';
  const title = document.createElement('h2');
  title.className = 'about-title';
  title.textContent = data.title || '';
  const text = document.createElement('p');
  text.className = 'about-text';
  text.textContent = data.text || '';
  textWrapper.appendChild(title);
  textWrapper.appendChild(text);
  // Imagem
  let imageEl = null;
  if (data.image) {
    const img = document.createElement('img');
    img.className = 'about-image';
    img.src = data.image;
    img.alt = data.title || 'Sobre';
    img.loading = 'lazy';
    imageEl = img;
  }
  // Adiciona elementos ao grid
  grid.appendChild(textWrapper);
  if (imageEl) grid.appendChild(imageEl);
  section.appendChild(grid);
  // Lista de features/icon separada abaixo do grid
  if (data.features && Array.isArray(data.features) && data.features.length) {
    const featuresWrapper = document.createElement('div');
    featuresWrapper.className = 'features-row';
    data.features.forEach((item) => {
      const itemEl = document.createElement('div');
      itemEl.className = 'feature-item';
      // Ícone: imagem ou texto
      if (item.icon && (item.icon.includes('/') || item.icon.includes('.'))) {
        const imgIcon = document.createElement('img');
        imgIcon.src = item.icon;
        imgIcon.alt = item.title || '';
        imgIcon.loading = 'lazy';
        itemEl.appendChild(imgIcon);
      } else {
        const spanIcon = document.createElement('span');
        spanIcon.textContent = item.icon || '';
        spanIcon.className = 'icon-text';
        itemEl.appendChild(spanIcon);
      }
      const ftTitle = document.createElement('h3');
      ftTitle.textContent = item.title || '';
      const ftText = document.createElement('p');
      ftText.textContent = item.text || '';
      itemEl.appendChild(ftTitle);
      itemEl.appendChild(ftText);
      featuresWrapper.appendChild(itemEl);
    });
    section.appendChild(featuresWrapper);
  }
  return section;
}

// Constrói a seção de cardápio
function buildMenu(categories, products) {
  const section = document.createElement('section');
  section.className = 'menu-section';
  section.id = 'menu';
  const title = document.createElement('h2');
  title.className = 'menu-title';
  title.textContent = 'Escolha Seu Bolo Ideal';
  section.appendChild(title);
  // Subtítulo explicativo de como escolher o bolo (sabor/tamanho)
  const subtitle = document.createElement('p');
  subtitle.className = 'menu-subtitle';
  subtitle.textContent = 'Defina o sabor e o tamanho';
  section.appendChild(subtitle);
  // Seletor de tamanho (P, M, G)
  const sizeSelector = document.createElement('div');
  sizeSelector.className = 'size-selector';
  const sizeLabel = document.createElement('span');
  sizeLabel.textContent = 'Tamanho:';
  sizeLabel.className = 'size-label';
  sizeSelector.appendChild(sizeLabel);
  const sizes = ['P', 'M', 'G'];
  sizes.forEach((sz) => {
    const btn = document.createElement('button');
    btn.className = 'size-button';
    btn.textContent = sz;
    btn.dataset.size = sz;
    sizeSelector.appendChild(btn);
  });
  section.appendChild(sizeSelector);
  // Barra de busca
  const searchContainer = document.createElement('div');
  searchContainer.className = 'search-container';
  const searchInput = document.createElement('input');
  searchInput.type = 'search';
  searchInput.placeholder = 'Buscar bolo...';
  searchInput.className = 'search-input';
  searchInput.setAttribute('aria-label', 'Buscar produto');
  searchContainer.appendChild(searchInput);
  section.appendChild(searchContainer);
  // Filtros de categoria
  const filterContainer = document.createElement('div');
  filterContainer.className = 'category-filters';
  // Botão para todos
  const allBtn = document.createElement('button');
  allBtn.className = 'category-button active';
  allBtn.textContent = 'Todos';
  allBtn.dataset.category = 'Todos';
  filterContainer.appendChild(allBtn);
  if (categories && Array.isArray(categories.items)) {
    categories.items.forEach((cat) => {
      const btn = document.createElement('button');
      btn.className = 'category-button';
      btn.textContent = cat;
      btn.dataset.category = cat;
      filterContainer.appendChild(btn);
    });
  }
  section.appendChild(filterContainer);
  // Informação da categoria (descrição) - esconder inicialmente; preços não são mais exibidos aqui

  // Informações da categoria (descrição e tabela de tamanhos)
  const infoContainer = document.createElement('div');
  infoContainer.className = 'category-info';
  // Descrição da categoria
  const descPara = document.createElement('p');
  descPara.className = 'category-description';
  infoContainer.appendChild(descPara);
  // Tabela de tamanhos
  const sizesWrapper = document.createElement('div');
  sizesWrapper.className = 'category-sizes';
  infoContainer.appendChild(sizesWrapper);
  section.appendChild(infoContainer);
  // Grid de produtos
  const grid = document.createElement('div');
  grid.className = 'product-grid';
  section.appendChild(grid);

  // Função para renderizar produtos com base em filtros
  const renderProducts = (catFilter, searchTerm) => {
    // Limpa grid
    grid.innerHTML = '';
    // Atualiza info de categoria
    renderCategoryInfo(catFilter);
    // Normaliza entrada
    const term = (searchTerm || '').toLowerCase();
    const filtered = products.items.filter((item) => {
      if (!item.active) return false;
      const matchesCategory = catFilter === 'Todos' || item.category === catFilter;
      const textToSearch = `${item.name} ${item.description} ${item.tags ? item.tags.join(' ') : ''}`.toLowerCase();
      const matchesSearch = term === '' || textToSearch.includes(term);
      return matchesCategory && matchesSearch;
    });
    if (!filtered.length) {
      const empty = document.createElement('p');
      empty.textContent = 'Nenhum produto encontrado.';
      empty.style.textAlign = 'center';
      grid.appendChild(empty);
      return;
    }
    filtered.forEach((product) => {
      const card = document.createElement('div');
      card.className = 'product-card';
      // Imagem
      const imgWrap = document.createElement('div');
      imgWrap.className = 'product-image';
      if (product.image) {
        const img = document.createElement('img');
        img.src = product.image;
        img.alt = product.name;
        img.loading = 'lazy';
        imgWrap.appendChild(img);
      } else {
        // Placeholder simples
        imgWrap.style.background = '#f4f2ef';
        const span = document.createElement('span');
        span.textContent = product.name.charAt(0);
        span.style.fontSize = '2rem';
        span.style.color = 'var(--secondary)';
        imgWrap.appendChild(span);
      }
      card.appendChild(imgWrap);
      // Conteúdo
      const info = document.createElement('div');
      info.className = 'product-info';
      const nameEl = document.createElement('h3');
      nameEl.className = 'product-name';
      nameEl.textContent = product.name;
      const descEl = document.createElement('p');
      descEl.className = 'product-description';
      descEl.textContent = product.description;
      // Preço e porções individuais foram removidos do card principal. As três
      // opções de tamanho (P/M/G) são exibidas abaixo da descrição através de
      // product.sizeTable.
      // Tags
      const tagsEl = document.createElement('div');
      tagsEl.className = 'product-tags';
      if (product.tags && product.tags.length) {
        product.tags.forEach((tag) => {
          const t = document.createElement('span');
          t.className = 'product-tag';
          t.textContent = tag;
          tagsEl.appendChild(t);
        });
      }
      info.appendChild(nameEl);
      info.appendChild(descEl);
      // Preço e porções baseados no tamanho selecionado (P/M/G)
      const priceEl = document.createElement('div');
      priceEl.className = 'product-price';
      const servesEl = document.createElement('div');
      servesEl.className = 'product-serves';
      let basePrice = product.price || '';
      let serveInfo = product.serves || '';
      if (product.sizeTable && product.sizeTable.length) {
        // Procura entrada que comece com o tamanho atual (ex.: "P" em "P 15cm")
        const entry = product.sizeTable.find((entry) => {
          const sizeLetter = (entry.size || '').split(' ')[0];
          return sizeLetter === currentSize;
        });
        if (entry) {
          basePrice = entry.price || basePrice;
          serveInfo = entry.serves || serveInfo;
        } else {
          // fallback para primeira entrada
          basePrice = product.sizeTable[0].price || basePrice;
          serveInfo = product.sizeTable[0].serves || serveInfo;
        }
      }
      priceEl.textContent = basePrice ? `${basePrice}` : '';
      servesEl.textContent = serveInfo || '';
      info.appendChild(priceEl);
      info.appendChild(servesEl);
      info.appendChild(tagsEl);
      // CTA
      if (product.cta) {
        const ctaEl = document.createElement('a');
        ctaEl.className = 'product-cta';
        ctaEl.textContent = product.cta.label || '';
        ctaEl.href = product.cta.href || '#';
        ctaEl.setAttribute('aria-label', product.cta.label || 'Pedir');
        info.appendChild(ctaEl);
      }
      card.appendChild(info);
      // Badges
      if (product.bestseller) {
        const badge = document.createElement('div');
        badge.className = 'product-badge';
        badge.textContent = 'Mais vendido';
        card.appendChild(badge);
      } else if (product.new) {
        const badge = document.createElement('div');
        badge.className = 'product-badge';
        badge.textContent = 'Novo';
        card.appendChild(badge);
      }
      grid.appendChild(card);
    });
  };

  /**
   * Renderiza as informações específicas da categoria selecionada (descrição e tamanhos).
   * Caso nenhuma categoria específica esteja selecionada (Todos), o bloco é escondido.
   * @param {string} catFilter categoria atual selecionada
   */
  function renderCategoryInfo(catFilter) {
    // Sempre esconde o container de descrição e preços para evitar duplicação
    descPara.textContent = '';
    sizesWrapper.innerHTML = '';
    infoContainer.style.display = 'none';
    return;
  }
  // Estado atual
  let currentCategory = 'Todos';
  let currentSearch = '';
  // Tamanho selecionado (P, M ou G). Default: P
  let currentSize = 'P';
  // Eventos de filtros
  filterContainer.addEventListener('click', (e) => {
    if (e.target && e.target.matches('.category-button')) {
      const buttons = filterContainer.querySelectorAll('.category-button');
      buttons.forEach((b) => b.classList.remove('active'));
      e.target.classList.add('active');
      currentCategory = e.target.dataset.category;
      renderProducts(currentCategory, currentSearch);
    }
  });
  // Busca com debounce
  const onSearch = debounce((e) => {
    currentSearch = e.target.value;
    renderProducts(currentCategory, currentSearch);
  }, 300);
  searchInput.addEventListener('input', onSearch);
  // Evento para seletor de tamanho
  sizeSelector.addEventListener('click', (e) => {
    if (e.target && e.target.matches('.size-button')) {
      const btns = sizeSelector.querySelectorAll('.size-button');
      btns.forEach((b) => b.classList.remove('active'));
      e.target.classList.add('active');
      currentSize = e.target.dataset.size;
      renderProducts(currentCategory, currentSearch);
    }
  });
  // Define tamanho padrão como ativo
  const defaultSizeBtn = sizeSelector.querySelector('.size-button');
  if (defaultSizeBtn) defaultSizeBtn.classList.add('active');
  // Render inicial
  renderProducts(currentCategory, currentSearch);
  return section;
}

// Constrói a galeria
function buildGallery(data) {
  if (!data || !data.items || data.items.length === 0) return null;
  const section = document.createElement('section');
  section.id = 'gallery';
  const title = document.createElement('h2');
  title.className = 'gallery-title';
  title.textContent = 'Galeria';
  section.appendChild(title);
  const grid = document.createElement('div');
  grid.className = 'gallery-grid';
  data.items.forEach((imgPath) => {
    const img = document.createElement('img');
    img.src = imgPath;
    img.alt = 'Foto de bolo';
    img.loading = 'lazy';
    grid.appendChild(img);
  });
  section.appendChild(grid);
  return section;
}

// Constrói a seção de decorações (escolha sua decoração)
function buildDecorations(data) {
  if (!data || !data.items || data.items.length === 0) return null;
  const section = document.createElement('section');
  section.className = 'decorations';
  section.id = 'decorations';
  // Título
  const title = document.createElement('h2');
  title.className = 'decorations-title';
  title.textContent = data.title || '';
  section.appendChild(title);
  // Subtítulo
  if (data.subtitle) {
    const subtitle = document.createElement('p');
    subtitle.className = 'decorations-subtitle';
    subtitle.textContent = data.subtitle;
    section.appendChild(subtitle);
  }
  // Grid de imagens
  const grid = document.createElement('div');
  grid.className = 'decorations-grid';
  data.items.forEach((imgPath) => {
    const img = document.createElement('img');
    img.src = imgPath;
    img.alt = 'Decoração de bolo';
    img.loading = 'lazy';
    grid.appendChild(img);
  });
  section.appendChild(grid);
  return section;
}

// Constrói o bloco sob medida
function buildCustom(data) {
  if (!data) return null;
  const section = document.createElement('section');
  section.className = 'custom';
  section.id = 'custom';
  const title = document.createElement('h2');
  title.className = 'custom-title';
  title.textContent = data.title || '';
  const text = document.createElement('p');
  text.className = 'custom-text';
  text.textContent = data.text || '';
  section.appendChild(title);
  section.appendChild(text);
  if (data.cta) {
    const cta = document.createElement('a');
    cta.className = 'custom-cta';
    cta.textContent = data.cta.label || '';
    cta.href = data.cta.href || '#';
    cta.setAttribute('aria-label', data.cta.label || 'Sob medida');
    section.appendChild(cta);
  }
  return section;
}

// Constrói a seção de políticas/informações
function buildPolicies(data) {
  if (!data || !data.items || !data.items.length) return null;
  const section = document.createElement('section');
  section.className = 'policies';
  section.id = 'policies';
  // Título e introdução
  const title = document.createElement('h2');
  title.className = 'policies-title';
  // Usa introTitle se existir, senão fallback
  title.textContent = data.introTitle || 'Informações & Políticas';
  section.appendChild(title);
  if (data.introText) {
    const intro = document.createElement('p');
    intro.className = 'policies-intro';
    intro.textContent = data.introText;
    section.appendChild(intro);
  }
  const grid = document.createElement('div');
  grid.className = 'policies-grid';
  data.items.forEach((item) => {
    const card = document.createElement('div');
    card.className = 'policy-card';
    const h4 = document.createElement('h4');
    h4.textContent = item.title || '';
    const ul = document.createElement('ul');
    if (item.items && item.items.length) {
      item.items.forEach((li) => {
        const liEl = document.createElement('li');
        liEl.textContent = li;
        ul.appendChild(liEl);
      });
    }
    card.appendChild(h4);
    card.appendChild(ul);
    grid.appendChild(card);
  });
  section.appendChild(grid);
  return section;
}

// Constrói a seção FAQ
function buildFAQ(data) {
  if (!data || !data.items || !data.items.length) return null;
  const section = document.createElement('section');
  section.className = 'faq';
  section.id = 'faq';
  const title = document.createElement('h2');
  title.className = 'faq-title';
  title.textContent = 'Perguntas Frequentes';
  section.appendChild(title);
  data.items.forEach((item) => {
    const wrapper = document.createElement('div');
    wrapper.className = 'faq-item';
    const q = document.createElement('div');
    q.className = 'faq-question';
    q.textContent = item.q;
    const a = document.createElement('div');
    a.className = 'faq-answer';
    a.textContent = item.a;
    wrapper.appendChild(q);
    wrapper.appendChild(a);
    q.addEventListener('click', () => {
      wrapper.classList.toggle('open');
    });
    section.appendChild(wrapper);
  });
  return section;
}

// Inicialização: carrega o conteúdo e monta as seções
async function initSite() {
  const theme = await loadJSON('theme');
  if (theme) applyTheme(theme);
  const hero = await loadJSON('hero');
  const about = await loadJSON('about');
  const categories = await loadJSON('categories');
  const products = await loadJSON('products');
  const gallery = await loadJSON('gallery');
  const custom = await loadJSON('custom');
  const policies = await loadJSON('policies');
  const faq = await loadJSON('faq');
  const decorations = await loadJSON('decorations');
  const main = document.getElementById('main');
  // Define ordem de seções
  const order = (theme && theme.sectionsOrder) || ['hero','about','menu','gallery','custom','policies','faq'];
  const enabled = (theme && theme.sectionsEnabled) || {};
  order.forEach((sectionName) => {
    if (enabled.hasOwnProperty(sectionName) && !enabled[sectionName]) return;
    let el = null;
    switch (sectionName) {
      case 'hero':
        el = buildHero(hero);
        break;
      case 'about':
        el = buildAbout(about);
        break;
      case 'menu':
        el = buildMenu(categories, products);
        break;
      case 'decorations':
        el = buildDecorations(decorations);
        break;
      case 'gallery':
        el = buildGallery(gallery);
        break;
      case 'custom':
        el = buildCustom(custom);
        break;
      case 'policies':
        el = buildPolicies(policies);
        break;
      case 'faq':
        el = buildFAQ(faq);
        break;
      default:
        break;
    }
    if (el) {
      main.appendChild(el);
    }
  });
  // Footer texto
  const footerText = document.getElementById('footerText');
  if (footerText) {
    const brand = theme && theme.brandText ? theme.brandText : '';
    const year = new Date().getFullYear();
    footerText.textContent = `${brand} © ${year}`;
  }
}

// Executa após carregar o DOM
document.addEventListener('DOMContentLoaded', initSite);