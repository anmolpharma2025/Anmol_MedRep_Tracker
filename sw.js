const CACHE='medrep-v4';
const ASSETS=['./','./app.html','./admin.html','./firebase-config.js','./manifest.json','./icons/icon-192x192.png','./icons/icon-512x512.png'];
self.addEventListener('install',e=>{e.waitUntil(caches.open(CACHE).then(c=>c.addAll(ASSETS)));self.skipWaiting();});
self.addEventListener('activate',e=>{e.waitUntil(caches.keys().then(keys=>Promise.all(keys.filter(k=>k!==CACHE).map(k=>caches.delete(k)))));self.clients.claim();});
self.addEventListener('fetch',e=>{const u=e.request.url;if(u.includes('firebase')||u.includes('googleapis')||u.includes('gstatic'))return;e.respondWith(caches.match(e.request).then(c=>c||fetch(e.request).catch(()=>caches.match('./app.html'))));});
