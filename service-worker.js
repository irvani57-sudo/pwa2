// ✅ اسم کش
const CACHE_NAME = "omidepay-cache-v1";

// ✅ اینجااااا 👇
// دقیقاً اینجا باید FILES_TO_CACHE باشه
const FILES_TO_CACHE = [
  "/pwa2/",
  "/pwa2/index.html",
  "/pwa2/manifest.json",
  "/pwa2/icons/icon-192.png",
  "/pwa2/icons/icon-512.png"
];

// ✅ موقع نصب
self.addEventListener("install", event => {
  event.waitUntil(
    caches.open(CACHE_NAME).then(cache => {
      return cache.addAll(FILES_TO_CACHE);
    })
  );
  self.skipWaiting();
});

// ✅ موقع فعال شدن
self.addEventListener("activate", event => {
  event.waitUntil(
    caches.keys().then(keys =>
      Promise.all(
        keys.map(key => {
          if (key !== CACHE_NAME) {
            return caches.delete(key);
          }
        })
      )
    )
  );
  self.clients.claim();
});

// ✅ هندل درخواست‌ها
self.addEventListener("fetch", event => {
  event.respondWith(
    caches.match(event.request).then(response => {
      return response || fetch(event.request);
    })
  );
});
