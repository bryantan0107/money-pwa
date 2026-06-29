const CACHE_NAME = "money-pwa-v120";
const APP_SHELL = [
  "./",
  "./index.html",
  "./styles.css?v=allocation-suggestions-1",
  "./sync-config.js?v=category-metadata-1",
  "./app.js?v=allocation-suggestions-1",
  "./manifest.webmanifest",
  "./icon.svg"
];
const STATIC_PATHS = new Set(APP_SHELL);

self.addEventListener("install", event => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(cache => cache.addAll(APP_SHELL))
  );
});

self.addEventListener("activate", event => {
  event.waitUntil(
    caches.keys()
      .then(keys => Promise.all(keys.filter(key => key !== CACHE_NAME).map(key => caches.delete(key))))
      .then(() => self.clients.claim())
  );
});

self.addEventListener("message", event => {
  if (event.data?.type === "SKIP_WAITING") {
    self.skipWaiting();
  }
});

self.addEventListener("fetch", event => {
  const request = event.request;
  if (request.method !== "GET") return;
  const url = new URL(request.url);

  if (url.origin !== self.location.origin) {
    event.respondWith(fetch(request));
    return;
  }

  if (request.mode === "navigate") {
    event.respondWith(
      fetch(request)
        .then(response => {
          const copy = response.clone();
          caches.open(CACHE_NAME).then(cache => cache.put("./index.html", copy));
          return response;
        })
        .catch(() => caches.match("./index.html"))
    );
    return;
  }

  const appShellKey = `${url.pathname.split("/").pop()}${url.search}`;
  const relativeKey = `./${appShellKey}`;
  if (!STATIC_PATHS.has(relativeKey) && !STATIC_PATHS.has(`.${url.pathname}`)) {
    event.respondWith(fetch(request));
    return;
  }

  event.respondWith(
    caches.match(request)
      .then(cached => cached || fetch(request).then(response => {
        const copy = response.clone();
        caches.open(CACHE_NAME).then(cache => cache.put(request, copy));
        return response;
      }))
  );
});
