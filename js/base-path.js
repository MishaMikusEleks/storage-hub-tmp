const BasePath = (() => {
  function fromStylesheet() {
    const link = document.querySelector('link[rel="stylesheet"][href*="style.css"]');
    if (!link) return '';
    try {
      const path = new URL(link.href, location.origin).pathname;
      const match = path.match(/^(.*)\/css\/style\.css$/);
      return match ? match[1].replace(/\/$/, '') : '';
    } catch {
      return '';
    }
  }

  function get() {
    if (typeof CONFIG !== 'undefined' && CONFIG.BASE_PATH != null && CONFIG.BASE_PATH !== '') {
      return String(CONFIG.BASE_PATH).replace(/\/$/, '');
    }

    const pathname = location.pathname;
    if (pathname.endsWith('/index.html')) {
      return pathname.slice(0, -'/index.html'.length).replace(/\/$/, '');
    }
    if (pathname.endsWith('/notepad.html')) {
      return pathname.slice(0, -'/notepad.html'.length).replace(/\/$/, '');
    }

    return fromStylesheet();
  }

  function url(path = '') {
    const base = get();
    const clean = path.startsWith('/') ? path : `/${path}`;
    return base ? `${base}${clean}` : clean;
  }

  return { get, url, fromStylesheet };
})();
