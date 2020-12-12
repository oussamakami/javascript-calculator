const cacheName = 'js-calculator-v1';
const assets = [
  './',
  './index.html',
  './styles.css',
  './script.js',
  './imgs/favicon.png'
];
self.addEventListener('install', async () => {
  const cache = await caches.open(cacheName);
  await cache.addAll(assets);
  return self.skipWaiting();
});
self.addEventListener('activate', () => {
  self.clients.claim();
});
self.addEventListener("fetch", async (event) => {
  const request = event.request;
  const url = new URL(request.url);

  if (url.origin === location.origin) {
    event.respondWith(cacheFirst(request));
  } else {
    event.respondWith(networkAndCache(request));
  }
});
async function cacheFirst(request) {
  const cache = await caches.open(cacheName);
  const cached = await cache.match(request);
  return cached || fetch(request);
}
async function networkAndCache(request) {
  const cache = await caches.open(cacheName);
  try {
    const fresh = await fetch(request);
    await cache.put(request, fresh.clone());
    return fresh;
  } catch (e) {
    const cached = await cache.match(request);
    return cached;
  }
}