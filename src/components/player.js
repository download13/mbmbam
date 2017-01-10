import {h, Component} from 'preact';


export default class Player extends Component {
  constructor(props) {
    super(props);

    this.state = {
      currentPodcast: 'mbmbam',
      currentAudioUrl: 'about:blank',
      episodes: [],
      index: 0,
      position: 0,
      duration: 0,
      autoplay: true,
      offline: false,
      hasData: false
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

  render(props, {
    currentAudioUrl,
    currentPodcast,
    index,
    episodes,
    autoplay,
    offline,
    position,
    duration,
    hasData
  }) {
    const {title, imageUrl, audioUrl, status} = episodes[index] || {};

    let downloadIcon = 'icon-download';
    let downloadTitle = 'Download Episode';
    if(status === 'downloading') {
      downloadIcon = 'icon-spin';
      downloadTitle = 'Downloading...'
    } else if(status === 'downloaded') {
      downloadIcon = 'icon-ok';
      downloadTitle = 'Downloaded to Device';
    }

    return <div class="player">
      <h1 class="title">{title}</h1>
      <img class="image" src={`/episodes/${currentPodcast}/${index}/image`}/>
      <audio
        class="audio"
        ref={el => this.audioEl = el}
        controls
        autoplay={autoplay}
        preload="auto"
        src={currentAudioUrl}
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
        <button onClick={() => this.cacheEpisode()} title={downloadTitle}>
          <span class={downloadIcon}></span>
        </button>
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
    const {currentPodcast, episodes, currentAudioUrl} = this.state;
    const episodeUrl = getEpisodeUrl(currentPodcast, index);

    caches.open('episodes')
    .then(cache => cache.match(episodeUrl))
    .then(res => {
      if(res && res.ok) {
        return res.blob();
      }
      return null;
    })
    .then(blob => {
      if(currentAudioUrl) {
        URL.revokeObjectURL(currentAudioUrl);
      }

      this.setEpisodeStatus(index, blob ? 'downloaded' : null);
      this.setState({
        index,
        currentAudioUrl: blob ? URL.createObjectURL(blob) : getEpisodeUrl(currentPodcast, index)
      });
      document.title = episodes[index].title;
    });
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

  cacheEpisode() {
    const {currentPodcast, index, episodes} = this.state;
    const episode = episodes[index];

    if(episode.status) return;

    this.setEpisodeStatus(index, 'downloading');

    cacheEpisode(currentPodcast, index, episode.size)
    .then(() => {
      this.setEpisodeStatus(index, 'downloaded');
    });
  }

  setEpisodeStatus(index, status) {
    const {episodes} = this.state;
    const episode = episodes[index];

    episodes.splice(index, 1, {...episode, status});

    this.setState({episodes: episodes.slice()});
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

function cacheEpisode(podcastName, index, fileSize, onProgress) {
  const episodeUrl = getEpisodeUrl(podcastName, index);

  return Promise.all([
    caches.open('episodes'),
    getRemoteFile(episodeUrl, onProgress)
  ])
  .then(([cache, buffer]) => cache.put(episodeUrl, new Response(buffer)));
}

function getRemoteFile(url, onProgress) {
  return new Promise((resolve, reject) => {
    const x = new XMLHttpRequest();
    x.responseType = 'arraybuffer';
    if(onProgress) {
      x.onprogress = e => onProgress(Math.floor(e.loaded / e.total));
    }
    x.onerror = reject;
    x.onload = () => {
      if(x.status === 200) {
        resolve(x.response);
      } else {
        reject(new Error('Got ' + x.status + ' from ' + url))
      }
    };
    x.open('GET', url, true);
    x.send();
  });
}

function getEpisodeUrl(podcastName, index) {
  return `/episodes/${podcastName}/${index}/audio`;
}

function clamp(n, min, max) {
  return Math.max(Math.min(n, max), min);
}
