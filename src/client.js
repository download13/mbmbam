import {h, render} from 'preact';
import Player from './components/player';


if(location.protocol === 'http:') {
  location.replace('https://' + location.host + location.pathname);
}

render(<Player/>, document.getElementById('player-mount'));

if(navigator.serviceWorker) {
  navigator.serviceWorker.register('/sw.js');
}
