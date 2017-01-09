import {h, render} from 'preact';
import Player from './components/player';


render(<Player/>, document.getElementById('player-mount'));

if(navigator.serviceWorker) {
  navigator.serviceWorker.register('/sw.js');
}
