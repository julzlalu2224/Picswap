// Placeholder for service worker
// This file is required by the project configuration but not actively used
// For production PWA features, implement caching strategies here

self.addEventListener('install', event => event.waitUntil(self.skipWaiting()));
self.addEventListener('activate', event => event.waitUntil(self.clients.claim()));
