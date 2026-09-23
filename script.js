(() => {
  'use strict';
  const toggle = document.querySelector('.menu-toggle');
  const nav = document.querySelector('#main-nav');
  const setMenu = (open) => {
    toggle.setAttribute('aria-expanded', String(open));
    toggle.setAttribute('aria-label', open ? 'Fechar menu' : 'Abrir menu');
    nav.classList.toggle('is-open', open);
  };
  toggle.addEventListener('click', () => setMenu(toggle.getAttribute('aria-expanded') !== 'true'));
  nav.querySelectorAll('a').forEach((link) => link.addEventListener('click', () => setMenu(false)));
  document.addEventListener('keydown', (event) => {
    if (event.key === 'Escape' && toggle.getAttribute('aria-expanded') === 'true') {
      setMenu(false);
      toggle.focus();
    }
  });
  document.addEventListener('click', (event) => {
    if (!nav.contains(event.target) && !toggle.contains(event.target)) setMenu(false);
  });
  const desktop = window.matchMedia('(min-width: 701px)');
  desktop.addEventListener('change', () => setMenu(false));
  document.querySelector('#year').textContent = new Date().getFullYear();

  // Fotos reais dos profissionais. Na ausência de uma foto, mantém as iniciais.
  const content = window.LAMONT_CONTEUDO || {};
  const professionals = content.profissionais || {};
  document.querySelectorAll('[data-professional]').forEach((frame) => {
    const data = professionals[frame.dataset.professional];
    if (!data || typeof data.foto !== 'string' || !data.foto.trim()) return;
    const photo = new Image();
    photo.alt = frame.getAttribute('aria-label');
    photo.loading = 'lazy';
    photo.decoding = 'async';
    photo.style.objectPosition = data.posicao || 'center top';
    photo.addEventListener('load', () => frame.classList.add('has-photo'));
    photo.addEventListener('error', () => {
      photo.remove();
      frame.classList.remove('has-photo');
    });
    photo.src = data.foto;
    frame.append(photo);
  });
  if (typeof professionals.julia?.registro === 'string' && professionals.julia.registro.trim()) {
    const registration = document.querySelector('[data-professional-register="julia"]');
    registration.textContent = professionals.julia.registro;
    registration.hidden = false;
  }

  // Galeria: textos são inseridos com textContent, sem interpretar HTML.
  const gallery = document.querySelector('#results-gallery');
  const empty = document.querySelector('#results-empty');
  const cases = Array.isArray(content.casos) ? content.casos.filter((item) => (
    item && typeof item.antes === 'string' && item.antes.trim() &&
    typeof item.depois === 'string' && item.depois.trim()
  )) : [];
  const element = (tag, className, text) => {
    const node = document.createElement(tag);
    if (className) node.className = className;
    if (text) node.textContent = text;
    return node;
  };

  cases.forEach((item, index) => {
    const title = item.titulo || `Registro ${index + 1}`;
    const card = element('article', 'result-card');
    const headingId = `case-title-${index + 1}`;
    card.setAttribute('aria-labelledby', headingId);
    const comparison = element('div', 'comparison');
    comparison.style.setProperty('--position', '50%');
    const after = new Image();
    const before = new Image();
    after.className = 'comparison-image comparison-after';
    before.className = 'comparison-image comparison-before';
    after.alt = item.altDepois || `${title}: depois do tratamento`;
    before.alt = item.altAntes || `${title}: antes do tratamento`;
    after.style.objectPosition = item.posicaoDepois || 'center';
    before.style.objectPosition = item.posicaoAntes || 'center';
    const beforeTag = element('span', 'comparison-tag tag-before', 'ANTES');
    const afterTag = element('span', 'comparison-tag tag-after', 'DEPOIS');
    const divider = element('span', 'comparison-divider');
    divider.setAttribute('aria-hidden', 'true');
    divider.append(element('span', 'comparison-handle', '↔'));
    const range = element('input', 'comparison-range');
    range.type = 'range';
    range.min = '0';
    range.max = '100';
    range.value = '50';
    range.step = '1';
    range.setAttribute('aria-label', `Comparar antes e depois: ${title}`);
    const setPosition = () => {
      const position = Number(range.value);
      comparison.style.setProperty('--position', `${position}%`);
      range.setAttribute('aria-valuetext', `Antes: ${position}%. Depois: ${100 - position}%.`);
    };
    range.addEventListener('input', setPosition);
    setPosition();
    const caption = element('div', 'result-caption');
    const heading = element('h3', '', title);
    heading.id = headingId;
    caption.append(heading);
    if (item.descricao) caption.append(element('p', 'result-description', item.descricao));
    const professional = [item.profissional, item.registro].filter(Boolean).join(' · ');
    if (professional) caption.append(element('p', 'result-professional', professional));
    const hint = element('p', 'comparison-hint', 'Arraste para comparar · Use as setas do teclado');
    hint.id = `case-hint-${index + 1}`;
    range.setAttribute('aria-describedby', hint.id);
    const unavailable = element('p', 'comparison-unavailable', 'Registro indisponível no momento.');
    unavailable.hidden = true;
    let loaded = 0;
    let failed = false;
    const fail = () => {
      failed = true;
      comparison.classList.remove('comparison-ready');
      comparison.classList.add('comparison-failed');
      unavailable.hidden = false;
      range.disabled = true;
      hint.hidden = true;
    };
    [before, after].forEach((photo) => {
      photo.loading = 'lazy';
      photo.decoding = 'async';
      photo.addEventListener('load', () => {
        loaded += 1;
        if (loaded === 2 && !failed) comparison.classList.add('comparison-ready');
      });
      photo.addEventListener('error', fail);
    });
    comparison.append(after, before, beforeTag, afterTag, divider, range, unavailable);
    caption.append(hint);
    card.append(comparison, caption);
    gallery.append(card);
    before.src = item.antes;
    after.src = item.depois;
  });
  empty.hidden = cases.length > 0;
  gallery.hidden = cases.length === 0;
})();
