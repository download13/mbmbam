import {
    on,
    cacheAll,
    createRouter
} from 'swkit';


const router = createRouter();

//router.get('/', toolbox.networkFirst);
//router.get('/style.css', toolbox.networkFirst);
//router.get('/media-embedded.css', toolbox.networkFirst);
//router.get('/client.js', toolbox.networkFirst);
router.get('/episode/:episode', (request, params) => {
  // TODO Range request a certain cached item
});

router.serveCache('precache');

on('install', e => {
  e.waitUntil(
    cacheAll('precache', ['/', '/style.css', '/media-embedded.css', '/client.js'])
    .then(skipWaiting())
  );
});

on('activate', e => {
  e.waitUntil(clients.claim());
});

on('message', e => {
  switch(e.data.type) {
    case 'cache-episode':
      cacheAll('episodes', [e.data.audioUrl, e.data.imageUrl])
      .then(() => {
        e.ports[0].postMessage(true);
      });
      break;
  }
});
