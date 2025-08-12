async function killSWAndCaches() {
  try {
    if ('serviceWorker' in navigator) {
      const regs = await navigator.serviceWorker.getRegistrations();
      await Promise.all(regs.map(r => r.unregister()));
    }
    if (window.caches && caches.keys) {
      const names = await caches.keys();
      await Promise.all(names.map(n => caches.delete(n)));
    }
  } catch (e) {
    console.warn('Aviso: não foi possível limpar SW/caches (seguindo mesmo assim).', e);
  }
}

async function loadJSON(name) {
  const bust = (window.__BUILD_ID__ || Date.now());
  const url = `content/${name}.json?v=${bust}`;
  try {
    const response = await fetch(url, { cache: 'no-store', headers: { 'Cache-Control': 'no-cache' } });
    if (!response.ok) throw new Error(`Não foi possível carregar ${name}`);
    return await response.json();
  } catch (e) {
    console.warn(`Falha ao carregar ${name}.json, usando dados padrão se disponíveis.`, e);
    if (window.defaultContent && window.defaultContent[name]) return window.defaultContent[name];
    return null;
  }
}

function debounce(func, delay) {
  let timer;
  return function (...args) {
    clearTimeout(timer);
    timer = setTimeout(() => func.apply(this, args), delay);
  };
}

function applyTheme(theme) {
  const t = { ...theme };
  if (t.primaryColor && !t.primary) t.primary = t.primaryColor;
  if (t.secondaryColor && !t.secondary) t.secondary = t.secondaryColor;
  if (t.backgroundColor && !t.bg) t.bg = t.backgroundColor;
  if (t.textColor && !t.text) t.text = t.textColor;
  if (t.cardColor && !t.card) t.card = t.cardColor;
  if (!t.card && theme.card) t.card = theme.card;
  if (t.buttonColor && !t.button) t.button = t.buttonColor;

  const root = document.documentElement;
  if (t.primary)   root.style.setProperty('--primary', t.primary);
  if (t.secondary) root.style.setProperty('--secondary', t.secondary);
  if (t.bg)        root.style.setProperty('--bg', t.bg);
  if (t.card)      root.style.setProperty('--card', t.card);
  if (t.text)      root.style.setProperty('--text', t.text);
  if (t.button)    root.style.setProperty('--button', t.button);

  const brand = document.getElementById('brandText');
  const cta = document.getElementById('headerCta');
  if (brand && t.brandText) brand.textContent = t.brandText;
  if (cta && t.headerCta) {
    cta.textContent = t.headerCta.label || '';
    cta.href = t.headerCta.href || '#';
  }

  if (t.button) {
    const forceBtnStyles = () => {
      document.querySelectorAll('.header-cta, .product-cta').forEach(el => {
        el.style.background = `var(--button)`;
        el.style.borderColor = `var(--button)`;
        el.style.color = '#fff';
      });
      document.querySelectorAll('.size-button.active, .category-button.active').forEach(el => {
        el.style.background = `var(--button)`;
        el.style.borderColor = `var(--button)`;
        el.style.color = '#fff';
      });
      document.querySelectorAll('.size-button, .category-button').forEach(el => {
        el.style.borderColor = `var(--button)`;
      });
    };
    forceBtnStyles();
    setTimeout(forceBtnStyles, 0);
  }
}

function buildHero(data) {
  const section = document.createElement('section');
  section.className = 'hero';
  section.id = 'hero';

  if (data && data.image) {
    const img = document.createElement('img');
    img.src = data.image;
    img.alt = data.title || '';
    img.loading = 'lazy';
    section.appendChild(img);
  }

  const overlay = document.createElement('div');
  overlay.className = 'overlay';
  overlay.style.background =
    (data && data.overlay) ||
    'linear-gradient(135deg, rgba(0,0,0,0.5), rgba(0,0,0,0.2))';

  const raw = (typeof data?.overlayOpacity === 'number')
    ? data.overlayOpacity
    : (typeof data?.opacity === 'number')
      ? data.opacity
      : 60;

  overlay.style.opacity = Math.max(0, Math.min(1, raw / 100));
  section.appendChild(overlay);

  const container = document.createElement('div');
  container.className = 'hero-content';
  const title = document.createElement('h1');
  title.className = 'hero-title';
  title.textContent = (data && data.title) || '';
  const subtitle = document.createElement('p');
  subtitle.className = 'hero-subtitle';
  subtitle.textContent = (data && data.subtitle) || '';
  container.appendChild(title);
  container.appendChild(subtitle);

  if (data && data.cta) {
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

function buildAbout(data) {
  const section = document.createElement('section');
  section.className = 'about';
  section.id = 'about';
  const grid = document.createElement('div');
  grid.className = 'about-grid';
  const textWrapper = document.createElement('div');
  textWrapper.className = 'about-text-wrapper';
  const title = document.createElement('h2');
  title.className = 'about-title';
  title.textContent = data?.title || '';
  const text = document.createElement('p');
  text.className = 'about-text';
  text.textContent = data?.text || '';
  textWrapper.appendChild(title);
  textWrapper.appendChild(text);

  let imageEl = null;
  if (data?.image) {
    const img = document.createElement('img');
    img.className = 'about-image';
    img.src = data.image;
    img.alt = data.title || 'Sobre';
    img.loading = 'lazy';
    imageEl = img;
  }
  grid.appendChild(textWrapper);
  if (imageEl) grid.appendChild(imageEl);
  section.appendChild(grid);

  if (data?.features && Array.isArray(data.features) && data.features.length) {
    const featuresWrapper = document.createElement('div');
    featuresWrapper.className = 'features-row';
    data.features.forEach((item) => {
      const el = document.createElement('div');
      el.className = 'feature-item';
      if (item.icon && (item.icon.includes('/') || item.icon.includes('.'))) {
        const imgIcon = document.createElement('img');
        imgIcon.src = item.icon;
        imgIcon.alt = item.title || '';
        imgIcon.loading = 'lazy';
        el.appendChild(imgIcon);
      } else {
        const spanIcon = document.createElement('span');
        spanIcon.textContent = item.icon || '';
        spanIcon.className = 'icon-text';
        el.appendChild(spanIcon);
      }
      const ftTitle = document.createElement('h3');
      ftTitle.textContent = item.title || '';
      const ftText = document.createElement('p');
      ftText.textContent = item.text || '';
      el.appendChild(ftTitle);
      el.appendChild(ftText);
      featuresWrapper.appendChild(el);
    });
    section.appendChild(featuresWrapper);
  }
  return section;
}

function buildMenu(categories, products) {
  const section = document.createElement('section');
  section.className = 'menu-section';
  section.id = 'menu';

  const title = document.createElement('h2');
  title.className = 'menu-title';
  title.textContent = 'Escolha Seu Bolo Ideal';
  section.appendChild(title);

  const subtitle = document.createElement('p');
  subtitle.className = 'menu-subtitle';
  subtitle.textContent = 'Defina o sabor e o tamanho';
  section.appendChild(subtitle);

  const sizeSelector = document.createElement('div');
  sizeSelector.className = 'size-selector';
  const sizeLabel = document.createElement('span');
  sizeLabel.textContent = 'Tamanho:';
  sizeLabel.className = 'size-label';
  sizeSelector.appendChild(sizeLabel);
  ['P', 'M', 'G'].forEach((sz) => {
    const btn = document.createElement('button');
    btn.className = 'size-button';
    btn.textContent = sz;
    btn.dataset.size = sz;
    sizeSelector.appendChild(btn);
  });
  section.appendChild(sizeSelector);

  const searchContainer = document.createElement('div');
  searchContainer.className = 'search-container';
  const searchInput = document.createElement('input');
  searchInput.type = 'search';
  searchInput.placeholder = 'Buscar bolo...';
  searchInput.className = 'search-input';
  searchInput.setAttribute('aria-label', 'Buscar produto');
  searchContainer.appendChild(searchInput);
  section.appendChild(searchContainer);

  const filterContainer = document.createElement('div');
  filterContainer.className = 'category-filters';
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

  const infoContainer = document.createElement('div');
  infoContainer.className = 'category-info';
  const descPara = document.createElement('p');
  descPara.className = 'category-description';
  infoContainer.appendChild(descPara);
  const sizesWrapper = document.createElement('div');
  sizesWrapper.className = 'category-sizes';
  infoContainer.appendChild(sizesWrapper);
  section.appendChild(infoContainer);

  const grid = document.createElement('div');
  grid.className = 'product-grid';
  section.appendChild(grid);

  let currentCategory = 'Todos';
  let currentSearch = '';
  let currentSize = 'P';

  const renderProducts = (catFilter, searchTerm) => {
    grid.innerHTML = '';
    descPara.textContent = '';
    sizesWrapper.innerHTML = '';
    infoContainer.style.display = 'none';

    const term = (searchTerm || '').toLowerCase();
    const filtered = (products?.items || []).filter((item) => {
      if (!item.active) return false;
      const matchesCategory = catFilter === 'Todos' || item.category === catFilter;
      const textToSearch = `${item.name} ${item.description} ${(item.tags || []).join(' ')}`.toLowerCase();
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

      const imgWrap = document.createElement('div');
      imgWrap.className = 'product-image';
      if (product.image) {
        const img = document.createElement('img');
        img.src = product.image;
        img.alt = product.name;
        img.loading = 'lazy';
        imgWrap.appendChild(img);
      } else {
        imgWrap.style.background = '#f4f2ef';
        const span = document.createElement('span');
        span.textContent = product.name.charAt(0);
        span.style.fontSize = '2rem';
        span.style.color = 'var(--secondary)';
        imgWrap.appendChild(span);
      }
      card.appendChild(imgWrap);

      const info = document.createElement('div');
      info.className = 'product-info';
      const nameEl = document.createElement('h3');
      nameEl.className = 'product-name';
      nameEl.textContent = product.name;
      const descEl = document.createElement('p');
      descEl.className = 'product-description';
      descEl.textContent = product.description || '';

      const tagsEl = document.createElement('div');
      tagsEl.className = 'product-tags';
      (product.tags || []).forEach((tag) => {
        const t = document.createElement('span');
        t.className = 'product-tag';
        t.textContent = tag;
        tagsEl.appendChild(t);
      });

      info.appendChild(nameEl);
      info.appendChild(descEl);

      const priceEl = document.createElement('div');
      priceEl.className = 'product-price';
      const servesEl = document.createElement('div');
      servesEl.className = 'product-serves';

      let basePrice = product.price || '';
      let serveInfo = product.serves || '';

      if (product.sizeTable && product.sizeTable.length) {
        const entry = product.sizeTable.find((entry) => {
          const sizeLetter = (entry.size || '').split(' ')[0];
          return sizeLetter === currentSize;
        });
        if (entry) {
          basePrice = entry.price || basePrice;
          serveInfo = entry.serves || serveInfo;
        } else {
          basePrice = product.sizeTable[0].price || basePrice;
          serveInfo = product.sizeTable[0].serves || serveInfo;
        }
      }

      priceEl.textContent = basePrice || '';
      servesEl.textContent = serveInfo || '';

      info.appendChild(priceEl);
      info.appendChild(servesEl);
      info.appendChild(tagsEl);

      if (product.cta) {
        const ctaEl = document.createElement('a');
        ctaEl.className = 'product-cta';
        ctaEl.textContent = product.cta.label || '';
        ctaEl.href = product.cta.href || '#';
        ctaEl.setAttribute('aria-label', product.cta.label || 'Pedir');
        info.appendChild(ctaEl);
      }

      card.appendChild(info);

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

  function renderCategoryInfo() {
    descPara.textContent = '';
    sizesWrapper.innerHTML = '';
    infoContainer.style.display = 'none';
  }

  filterContainer.addEventListener('click', (e) => {
    if (e.target && e.target.matches('.category-button')) {
      filterContainer.querySelectorAll('.category-button').forEach((b) => b.classList.remove('active'));
      e.target.classList.add('active');
      currentCategory = e.target.dataset.category;
      renderProducts(currentCategory, currentSearch);
    }
  });

  const onSearch = debounce((e) => {
    currentSearch = e.target.value;
    renderProducts(currentCategory, currentSearch);
  }, 300);
  searchInput.addEventListener('input', onSearch);

  sizeSelector.addEventListener('click', (e) => {
    if (e.target && e.target.matches('.size-button')) {
      sizeSelector.querySelectorAll('.size-button').forEach((b) => b.classList.remove('active'));
      e.target.classList.add('active');
      currentSize = e.target.dataset.size;
      renderProducts(currentCategory, currentSearch);
    }
  });

  const defaultSizeBtn = sizeSelector.querySelector('.size-button');
  if (defaultSizeBtn) defaultSizeBtn.classList.add('active');
  renderProducts(currentCategory, currentSearch);

  return section;
}

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

function buildDecorations(data) {
  if (!data || !data.items || data.items.length === 0) return null;
  const section = document.createElement('section');
  section.className = 'decorations';
  section.id = 'decorations';
  const title = document.createElement('h2');
  title.className = 'decorations-title';
  title.textContent = data.title || '';
  section.appendChild(title);
  if (data.subtitle) {
    const subtitle = document.createElement('p');
    subtitle.className = 'decorations-subtitle';
    subtitle.textContent = data.subtitle;
    section.appendChild(subtitle);
  }
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

function buildPolicies(data) {
  if (!data || !data.items || !data.items.length) return null;
  const section = document.createElement('section');
  section.className = 'policies';
  section.id = 'policies';
  const title = document.createElement('h2');
  title.className = 'policies-title';
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
    (item.items || []).forEach((li) => {
      const liEl = document.createElement('li');
      liEl.textContent = li;
      ul.appendChild(liEl);
    });
    card.appendChild(h4);
    card.appendChild(ul);
    grid.appendChild(card);
  });
  section.appendChild(grid);
  return section;
}

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

async function initSite() {
  await killSWAndCaches();

  const theme       = await loadJSON('theme');
  if (theme) applyTheme(theme);

  const hero        = await loadJSON('hero');
  const about       = await loadJSON('about');
  const categories  = await loadJSON('categories');
  const products    = await loadJSON('products');
  const gallery     = await loadJSON('gallery');
  const custom      = await loadJSON('custom');
  const policies    = await loadJSON('policies');
  const faq         = await loadJSON('faq');
  const decorations = await loadJSON('decorations');

  const main = document.getElementById('main');

  const order = (theme && theme.sectionsOrder) || ['hero','about','menu','gallery','custom','policies','faq'];
  const enabled = (theme && theme.sectionsEnabled) || {};

  order.forEach((sectionName) => {
    if (enabled.hasOwnProperty(sectionName) && !enabled[sectionName]) return;
    let el = null;
    switch (sectionName) {
      case 'hero':        el = buildHero(hero); break;
      case 'about':       el = buildAbout(about); break;
      case 'menu':        el = buildMenu(categories, products); break;
      case 'decorations': el = buildDecorations(decorations); break;
      case 'gallery':     el = buildGallery(gallery); break;
      case 'custom':      el = buildCustom(custom); break;
      case 'policies':    el = buildPolicies(policies); break;
      case 'faq':         el = buildFAQ(faq); break;
      default: break;
    }
    if (el) main.appendChild(el);
  });

  const footerText = document.getElementById('footerText');
  if (footerText) {
    const brand = theme && theme.brandText ? theme.brandText : '';
    const year = new Date().getFullYear();
    footerText.textContent = `${brand} © ${year}`;
  }
}

document.addEventListener('DOMContentLoaded', initSite);
