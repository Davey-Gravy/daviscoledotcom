document.addEventListener('DOMContentLoaded', function () {
  if (typeof renderMathInElement !== 'undefined') {
    renderMathInElement(document.body, {
      delimiters: [
        { left: '$', right: '$', display: false },
        { left: '$$', right: '$$', display: true },
      ],
    });
  }
});

function toggleTheme() {
  const html = document.documentElement;
  const current = html.getAttribute('data-theme');
  const next = current === 'dark' ? 'light' : 'dark';
  html.setAttribute('data-theme', next);
  localStorage.setItem('theme', next);
}

window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', (e) => {
  if (!localStorage.getItem('theme')) {
    document.documentElement.setAttribute('data-theme', e.matches ? 'dark' : 'light');
  }
});

function toggleSidebar() {
  const sidebar = document.querySelector('.sidebar');
  const overlay = document.querySelector('.sidebar-overlay');
  sidebar.classList.toggle('open');
  overlay.classList.toggle('active');
  document.body.style.overflow = sidebar.classList.contains('open') ? 'hidden' : '';
}

document.addEventListener('keydown', (e) => {
  if (e.key === 'Escape') {
    const sidebar = document.querySelector('.sidebar');
    if (sidebar && sidebar.classList.contains('open')) {
      toggleSidebar();
    }
  }
});

document.addEventListener('DOMContentLoaded', function () {
  document.querySelectorAll('.sidebar .nav-link:not(.nav-section-toggle)').forEach((link) => {
    link.addEventListener('click', () => {
      const sidebar = document.querySelector('.sidebar');
      if (sidebar.classList.contains('open')) {
        toggleSidebar();
      }
    });
  });
});

(function () {
  const input = document.getElementById('site-search');
  const results = document.getElementById('search-results');
  if (!input || !results) return;

  let index = null;
  let pending = false;

  function loadIndex() {
    if (index || pending) return;
    pending = true;
    fetch('/index.json')
      .then((r) => (r.ok ? r.json() : []))
      .then((data) => { index = Array.isArray(data) ? data : []; })
      .catch(() => { index = []; })
      .finally(() => { pending = false; });
  }

  function escapeHtml(s) {
    return String(s).replace(/[&<>"']/g, (c) => ({
      '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;',
    }[c]));
  }

  let activeIndex = -1;

  function options() {
    return results.querySelectorAll('li[role="option"]');
  }

  function close() {
    results.hidden = true;
    results.innerHTML = '';
    activeIndex = -1;
    input.setAttribute('aria-expanded', 'false');
    input.removeAttribute('aria-activedescendant');
  }

  function setActive(i) {
    const opts = options();
    if (!opts.length) return;
    opts.forEach((li, idx) => {
      const on = idx === i;
      li.classList.toggle('is-active', on);
      li.setAttribute('aria-selected', on ? 'true' : 'false');
    });
    activeIndex = i;
    const el = opts[i];
    if (el) {
      input.setAttribute('aria-activedescendant', el.id);
      el.scrollIntoView({ block: 'nearest' });
    }
  }

  function move(delta) {
    const opts = options();
    if (!opts.length) return;
    let i = activeIndex;
    i = i === -1 ? (delta > 0 ? 0 : opts.length - 1)
                 : (i + delta + opts.length) % opts.length;
    setActive(i);
  }

  function run(query) {
    const q = query.toLowerCase().trim();
    if (!q || !index) { close(); return; }

    const matches = index.filter((p) =>
      (p.title && p.title.toLowerCase().includes(q)) ||
      (p.summary && p.summary.toLowerCase().includes(q)) ||
      (p.content && p.content.toLowerCase().includes(q))
    ).slice(0, 8);

    activeIndex = -1;
    input.removeAttribute('aria-activedescendant');

    if (!matches.length) {
      results.innerHTML = '<li class="search-empty">No results</li>';
    } else {
      results.innerHTML = matches.map((m, i) =>
        '<li id="search-opt-' + i + '" role="option" aria-selected="false"><a href="' + m.url + '">' +
        '<span class="search-result-title">' + escapeHtml(m.title) + '</span>' +
        '<span class="search-result-section">' + escapeHtml(m.section) + '</span>' +
        '</a></li>'
      ).join('');
    }
    results.hidden = false;
    input.setAttribute('aria-expanded', 'true');
  }

  input.addEventListener('focus', loadIndex, { once: true });
  input.addEventListener('input', () => run(input.value));
  input.addEventListener('keydown', (e) => {
    if (e.key === 'ArrowDown') {
      e.preventDefault();
      move(1);
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      move(-1);
    } else if (e.key === 'Enter') {
      const link = results.querySelector('li.is-active a');
      if (link) { e.preventDefault(); link.click(); }
    } else if (e.key === 'Escape') {
      input.value = '';
      close();
      input.blur();
    }
  });
  results.addEventListener('mousemove', (e) => {
    const li = e.target.closest('li[role="option"]');
    if (!li) return;
    const idx = Array.prototype.indexOf.call(options(), li);
    if (idx !== -1 && idx !== activeIndex) setActive(idx);
  });
  document.addEventListener('click', (e) => {
    if (!input.contains(e.target) && !results.contains(e.target)) close();
  });
})();
