import {h, render} from 'preact';
import Player from './components/player';


render(<Player/>, document.getElementById('player-mount'));

if(navigator.serviceWorker) {
  navigator.serviceWorker.register('/sw.js');
}

function cacheEpisode(index) {
  const chan = new MessageChannel();

  const r = new Promise((resolve, reject) => {
    chan.port1.onmessage = e => {
      resolve(e.data);
    };
  });

  navigator.serviceWorker.getRegistration()
  .then(reg => reg.active)
  .then(controller => controller.postMessage({
    type: 'cache-episode',
    audioUrl: player.episodes[index].audioUrl,
    imageUrl: player.episodes[index].imageUrl
  }, [chan.port2]));

  return r;
}
