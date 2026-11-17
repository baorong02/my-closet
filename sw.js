const CACHE_NAME = "my-closet-shell-v3";

self.addEventListener("install", event => {

  event.waitUntil(self.skipWaiting());

});

self.addEventListener("activate", event => {

  event.waitUntil((async () => {

    const keys = await caches.keys();

    await Promise.all(

      keys

        .filter(key =>

          key.startsWith("my-closet-shell-") &&

          key !== CACHE_NAME

        )

        .map(key => caches.delete(key))

    );

    await self.clients.claim();

  })());

});

self.addEventListener("fetch", event => {

  if (event.request.method !== "GET") return;

  if (event.request.mode === "navigate") {

    event.respondWith(

      fetch(event.request, { cache: "no-store" })

        .then(response => response)

        .catch(() => caches.match(event.request))

    );

  }

});
