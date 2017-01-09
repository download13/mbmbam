import {
    on,
    cacheAll,
    matchCache,
    createRouter,
    networkFirst,
    cacheFirst
} from 'swkit';


const router = createRouter();

const precacheNetworkFirst = networkFirst('precache');
const episodesCacheFirst = cacheFirst('episodes');

router.get('/', precacheNetworkFirst);
router.get('/style.css', precacheNetworkFirst);
router.get('/media-embedded.css', precacheNetworkFirst);
router.get('/client.js', precacheNetworkFirst);
router.get('/list/mbmbam', precacheNetworkFirst);

router.get('/list/:name', (request, params) => {
  // TODO Range request a certain cached item
  return fetch(request);
});

router.get('/episodes/:name/:index/image', episodesCacheFirst);

router.get('/episodes/:name/:index/audio', episodesCacheFirst);

on('fetch', router.dispatch);

on('install', e => {
  e.waitUntil(
    cacheAll('precache', ['/', '/style.css', '/media-embedded.css', '/client.js', '/list/mbmbam'])
    .then(skipWaiting())
  );
});

on('activate', e => {
  e.waitUntil(clients.claim());
});

on('message', e => {
  console.log('message', e.data)
  switch(e.data.type) {
    case 'cache-episode':
      const {name, index} = e.data;
      const imageUrl = `/episodes/${name}/${index}/image`;
      const audioUrl = `/episodes/${name}/${index}/audio`;

      Promise.all([
        caches.open('episodes'),
        fetch(imageUrl),
        fetch(audioUrl)
      ])
      .then(([cache, imageResponse, audioResponse]) => {
        return Promise.all([
          cache.put(imageUrl, imageResponse),
          cache.put(audioUrl, audioResponse)
        ]);
      })
      .then(() => {
        e.ports[0].postMessage(true);
      });
      break;
  }
});
