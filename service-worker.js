const CACHE_NAME = 'cst-juego-cache-v1';
const ASSETS = [
  './',
  './index.html',
  './manifest.webmanifest',
  './assets/logo.svg',
  './scripts/main.js',
  './scripts/questions.js',
  './scripts/cases.js'
];

self.addEventListener('install', (e) => {
  e.waitUntil(
    caches.open(CACHE_NAME).then((cache) => cache.addAll(ASSETS))
  );
});

self.addEventListener('activate', (e) => {
  e.waitUntil(
    caches.keys().then((keys) => Promise.all(keys.map((k) => k !== CACHE_NAME ? caches.delete(k) : null)))
  );
});

self.addEventListener('fetch', (e) => {
  e.respondWith(
    caches.match(e.request).then((cached) => cached || fetch(e.request))
  );
});
