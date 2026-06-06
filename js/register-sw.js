(() => {
  if (!('serviceWorker' in navigator)) return;

  window.addEventListener('load', () => {
    const base = typeof BasePath !== 'undefined' ? BasePath.get() : '';
    const prefix = base ? `${base}/` : '/';
    navigator.serviceWorker
      .register(`${prefix}sw.js`, { scope: prefix })
      .catch(() => {});
  });
})();
