const CACHE = "ponto-fly-v1";

self.addEventListener("install", (e) => {
  // No pre-caching: avoids locking in stale product/page content
  self.skipWaiting();
});

self.addEventListener("activate", (e) => {
  e.waitUntil(
    caches
      .keys()
      .then((keys) =>
        Promise.all(keys.filter((k) => k !== CACHE).map((k) => caches.delete(k)))
      )
      .catch(() => {})
  );
  self.clients.claim();
});

self.addEventListener("fetch", (e) => {
  const { request } = e;
  if (request.method !== "GET") return;

  const { pathname, origin } = new URL(request.url);

  // Only intercept same-origin requests
  if (origin !== self.location.origin) return;

  // Never intercept: API routes, Next.js image optimisation, RSC data requests
  // This keeps Shopify cart, product data and checkout always network-only
  if (
    pathname.startsWith("/api/") ||
    pathname.startsWith("/_next/image") ||
    pathname.startsWith("/_next/data/")
  ) return;

  // Cache-first for Next.js build output — filenames are content-hashed so
  // entries are immutable and will never conflict with a new deployment
  if (pathname.startsWith("/_next/static/")) {
    e.respondWith(
      caches.match(request).then(
        (cached) =>
          cached ||
          fetch(request).then((res) => {
            if (res.status === 200) {
              caches.open(CACHE).then((c) => c.put(request, res.clone()));
            }
            return res;
          })
      )
    );
    return;
  }

  // Network-first for site assets (images, icons, manifest)
  // Always fetches fresh when online; cached version is offline fallback only
  if (
    pathname.startsWith("/assets/") ||
    pathname === "/icon.svg" ||
    pathname === "/manifest.json"
  ) {
    e.respondWith(
      fetch(request)
        .then((res) => {
          if (res.status === 200) {
            caches.open(CACHE).then((c) => c.put(request, res.clone()));
          }
          return res;
        })
        .catch(() => caches.match(request))
    );
    return;
  }

  // All page navigations (/, /produtos, /produtos/[handle], checkout, etc.):
  // No SW interception — always straight to the network.
  // Shopify product data, prices and cart must never be served from cache.
});
