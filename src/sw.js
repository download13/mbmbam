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

router.get('/', precacheNetworkFirst);
router.get('/style.css', precacheNetworkFirst);
router.get('/media-embedded.css', precacheNetworkFirst);
router.get('/client.js', precacheNetworkFirst);
router.get('/list/mbmbam', precacheNetworkFirst);

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
