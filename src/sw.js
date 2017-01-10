import {
    on,
    cacheAll,
    createRouter,
    networkFirst
} from 'swkit';


const router = createRouter();

const precacheNetworkFirst = networkFirst('precache');

router.get('/', precacheNetworkFirst);
router.get('/style.css', precacheNetworkFirst);
router.get('/icons.css', precacheNetworkFirst);
router.get('/icons.woff', precacheNetworkFirst);
router.get('/client.js', precacheNetworkFirst);
router.get('/list/mbmbam', precacheNetworkFirst);

on('fetch', router.dispatch);

on('install', e => {
  e.waitUntil(
    cacheAll('precache', ['/', '/style.css', '/icons.css', '/icons.woff', '/client.js', '/list/mbmbam'])
    .then(skipWaiting())
  );
});

on('activate', e => {
  e.waitUntil(clients.claim());
});
