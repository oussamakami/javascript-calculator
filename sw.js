const cacheName = "js-calculator-v1";
const assets = [
  "./",
  "./index.html",
  "./styles.css",
  "./script.js",
  "./imgs/favicon.png"
];
self.addEventListener("install", async (event) => {
  const cache = await caches.open(cacheName);
  await cache.addAll(assets);
});
self.addEventListener("activate", (event) => {
  self.clients.claim();
});
self.addEventListener("fetch", (event) => {
  const request = event.request;

  if (/.*(json)$/.test(request.url)) {
    event.respondWith(networkFirst(request));
  } else {
    event.respondWith(cacheFirst(request));
  }
});
async function networkFirst(request) {
  const cache = await caches.open(cacheName);
  try {
    const fresh = await fetch(request);
    cache.put(request, fresh.clone());
    return fresh;
  } catch (e) {
    const cachedResponse = await cache.match(request);
    return cachedResponse;
  }
}
async function cacheFirst(request) {
  const cache = await caches.open(cacheName);
  const cachedResponse = await cache.match(request);
  return cachedResponse || networkFirst(request);
}
