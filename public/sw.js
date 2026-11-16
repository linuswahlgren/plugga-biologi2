/*
 * Plugga service worker (hosted site only; the backup file has none).
 * Network first for everything, so new material arrives as soon as there is a connection;
 * the cache is the fallback offline. version.json always goes to the network.
 * The whole app is one HTML file, so caching the page, the manifest and the icons is enough.
 */
const CACHE = "plugga-v1";
const CORE = ["./", "./index.html", "./manifest.webmanifest", "./icons/icon-192.png", "./icons/icon-512.png"];

self.addEventListener("install", (event) => {
  event.waitUntil(
    caches
      .open(CACHE)
      .then((cache) => cache.addAll(CORE))
      .then(() => self.skipWaiting()),
  );
});

self.addEventListener("activate", (event) => {
  event.waitUntil(
    caches
      .keys()
      .then((keys) => Promise.all(keys.filter((key) => key !== CACHE).map((key) => caches.delete(key))))
      .then(() => self.clients.claim()),
  );
});

self.addEventListener("fetch", (event) => {
  const request = event.request;
  if (request.method !== "GET") return;
  const url = new URL(request.url);
  if (url.origin !== self.location.origin || url.pathname.endsWith("/version.json")) return;
  // Pages are revalidated with the server, so a new version is never held back by the HTTP cache.
  event.respondWith(
    fetch(request, request.mode === "navigate" ? { cache: "no-cache" } : undefined)
      .then((response) => {
        if (response.ok) {
          const copy = response.clone();
          caches.open(CACHE).then((cache) => cache.put(request, copy));
        }
        return response;
      })
      .catch(() =>
        caches
          .match(request, { ignoreSearch: true })
          .then((hit) => hit || (request.mode === "navigate" ? caches.match("./") : Response.error())),
      ),
  );
});
