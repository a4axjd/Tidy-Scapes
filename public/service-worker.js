// This is a placeholder service worker file.
// In a real application, you would add logic for caching assets for offline use
// and handling push notifications.

self.addEventListener('install', (event) => {
  console.log('Service Worker installing.');
  // Pre-cache assets here if needed
  self.skipWaiting();
});

self.addEventListener('activate', (event) => {
  console.log('Service Worker activating.');
  // Clean up old caches here
  event.waitUntil(self.clients.claim());
});

self.addEventListener('fetch', (event) => {
  // This service worker doesn't intercept network requests.
  // It's primarily for notifications.
});

// NOTE: This is a simplified notification setup.
// It requires the admin panel to be open in a browser tab to receive notifications.
// A more robust solution for background notifications would involve Firebase Cloud Messaging (FCM),
// which is beyond the scope of this implementation.
// However, this setup avoids the need for paid Cloud Functions.
self.addEventListener('message', (event) => {
    if (event.data && event.data.type === 'NEW_MESSAGE') {
        const message = event.data.payload;
        self.registration.showNotification('New TidyScapes Message', {
            body: `From: ${message.name}\nService: ${message.service}`,
            icon: '/icons/icon-192x192.png',
        });
    }
});
