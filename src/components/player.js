import {h, Component} from 'preact';


export default class Player extends Component {
  constructor(props) {
    super(props);

    this.state = {
      currentPodcast: 'mbmbam',
      episodes: [],
      index: 0,
      position: 0,
      duration: 0,
      autoplay: true,
      offline: false
    };
  }

  componentDidMount() {
    const {audioEl} = this;

    getEpisodes(this.state.currentPodcast).then(episodes => {
      this.setState({episodes});
      this.load();
    });

    audioEl.ontimeupdate = () => {
      this.setState({position: audioEl.currentTime});
    };

    audioEl.ondurationchange = () => {
      this.setState({duration: audioEl.duration});
    };

    window.onbeforeunload = () => this.save();

    window.addEventListener('keyup', e => {
      if(e.code === 'Space') {
        e.preventDefault();
        this.togglePlaying();
      }
    });
  }

  render(props, {currentPodcast, index, episodes, autoplay, offline, position, duration}) {
    const episode = episodes[index] || {};
    const {title, imageUrl, audioUrl} = episode;

    return <div class="player">
      <h1 class="title">{title}</h1>
      <img class="image" src={`/episodes/${currentPodcast}/${index}/image`}/>
      <audio
        class="audio"
        ref={el => this.audioEl = el}
        controls
        autoplay={autoplay}
        preload="auto"
        src={`/episodes/${currentPodcast}/${index}/audio`}
        onPause={() => this.save()}
        onEnded={() => this.episodeEnded()}
      ></audio>
      <div class="time">{formatTime(position) + ' / ' + formatTime(duration)}</div>
      <div class="seek">
        <button onClick={() => this.seekBackward(30)} title="Back 30 Seconds">
          <span class="icon-fast-bw"></span> 30
        </button>
        <button onClick={() => this.seekBackward(5)} title="Back 5 Seconds">
          <span class="icon-fast-bw"></span> 5
        </button>
        <button onClick={() => this.seekForward(5)} title="Forward 5 Seconds">
          5 <span class="icon-fast-fw"></span>
        </button>
        <button onClick={() => this.seekForward(30)} title="Forward 30 Seconds">
          30 <span class="icon-fast-fw"></span>
        </button>
      </div>
      <div class="nav">
        <button onClick={() => this.previousEpisode()} title="Previous Episode">
          <span class="icon-to-start-alt"></span>
        </button>
        <input type="number" onKeyUp={e => this.gotoIndexOnEnter(e)} onInput={e => this.gotoIndex(e)} value={index + 1}/>
        <button onClick={() => this.nextEpisode()} title="Next Episode">
          <span class="icon-to-end-alt"></span>
        </button>
      </div>
      <div class="options">
        <span>
          <input type="checkbox" id="autoplay_opt" checked={autoplay} onChange={e => this.setAutoplay(e.target.checked)}/>
          <label for="autoplay_opt">Autoplay</label>
        </span>
        {/* <span>
          <input type="checkbox" id="offline_opt" checked={offline} onChange={e => this.setOffline(e.target.checked)}/>
          <label for="offline_opt">Offline Mode</label>
        </span> */}
      </div>
      <button onClick={() => this.cacheEpisode(currentPodcast, index)}>Download</button>
    </div>;
  }

  previousEpisode() {
    const {index} = this.state;

    this.selectEpisode(Math.max(index - 1, 0));
  }

  nextEpisode() {
    const {index, episodes} = this.state;

    this.selectEpisode(Math.min(index + 1, episodes.length - 1));
  }

  selectEpisode(index) {
    this.setState({index});
    document.title = this.state.episodes[index].title;
  }

  seekBackward(seconds) {
    this.audioEl.currentTime -= seconds;
  }

  seekForward(seconds) {
    this.audioEl.currentTime += seconds;
  }

  togglePlaying() {
    const {audioEl} = this;

    if(audioEl.paused) {
      audioEl.play();
    } else {
      audioEl.pause();
    }
  }

  setAutoplay(autoplay) {
    this.setState({autoplay});
  }

  setOffline(offline) {
    this.setState({offline});
  }

  gotoIndexOnEnter(e) {
    if(e.key === 'Enter') {
      this.gotoIndex(e);
    }
  }

  gotoIndex(e) {
    const {episodes} = this.state;
    const index = parseInt(e.target.value);

    if(typeof index === 'number' && !isNaN(index)) {
      this.selectEpisode(clamp(index - 1, 0, episodes.length - 1));
    }
  }

  episodeEnded() {
    const {index, episodes} = this.state;

    if(index < episodes.length - 1) {
      this.selectEpisode(index + 1);
    }
  }

  save() {
    const {index, position, autoplay} = this.state;
    localStorage.setItem('place', JSON.stringify({
      index,
      position,
      autoplay
    }));
  }

  load() {
    let place;
    try {
      const {index, position, autoplay} = JSON.parse(localStorage.getItem('place'));
      this.audioEl.currentTime = position;
      this.setState({autoplay});
      this.selectEpisode(index);
    } catch(e) {
      console.log('Invalid saved JSON');
    }
  }

  cacheEpisode(podcastName, index) {
    const episode = this.state.episodes[index];
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
      name: podcastName,
      index
    }, [chan.port2]));

    return r;
  }
}

function formatTime(n) {
  let hours = Math.floor(n / 60);
  if(hours < 10) hours = '0' + hours;

  let minutes = Math.floor(n % 60);
  if(minutes < 10) minutes = '0' + minutes;

  return hours + ':' + minutes;
}

function getEpisodes(name) {
  return new Promise((resolve, reject) => {
    const x = new XMLHttpRequest();
    x.open('GET', '/list/' + name, true);
    x.onload = () => resolve(JSON.parse(x.responseText));
    x.onerror = reject;
    x.send();
  });
}

function clamp(n, min, max) {
  return Math.max(Math.min(n, max), min);
}
