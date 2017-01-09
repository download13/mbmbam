const express = require('express');
const {getEpisodes, getEpisode} = require('./data');
const request = require('request');

const app = express();

app.use(express.static('dist/public'));

app.get('/', (req, res) => {
  res.sendFile(__dirname + '/views/index.html');
});

app.get('/list/:name', (req, res, next) => {
  getEpisodes(req.params.name).then(
    episodes => res.send(episodes),
    err => res.status(404).send('Feed not found')
  );
});

app.get('/episodes/:name/:index/image', (req, res) => {
  const {name, index} = req.params;

  getEpisode(name, index).then(
    episode => {
      if(episode) {
        sendRemoteFile(req, res, episode.imageUrl);
      } else {
        res.status(404).send('Episode not found');
      }
    },
    err => {
      console.error(err);
      res.status(404).send('Feed not found');
    }
  );
});

app.get('/episodes/:name/:index/audio', (req, res) => {
  const {name, index} = req.params;

  getEpisode(name, index).then(
    episode => {
      if(episode) {
        sendRemoteFile(req, res, episode.audioUrl);
      } else {
        res.status(404).send('Episode not found');
      }
    },
    err => {
      console.error(err);
      res.status(404).send('Feed not found');
    }
  );
});

const listener = app.listen(process.env.PORT || 80, () => {
  console.log('Your app is listening on port ' + listener.address().port);
});


function sendRemoteFile(req, res, url) {
  const headers = {};

  if(req.headers.range) {
    headers.Range = req.headers.range;
  }

  request({url, headers})
  .on('response', ({statusCode, headers}) => {
    res.status(statusCode);
    if(headers['content-type']) {
      res.append('Content-Type', headers['content-type']);
    }
    if(headers['content-length']) {
      res.append('Content-Length', headers['content-length']);
    }
    if(headers['content-range']) {
      res.append('Content-Range', headers['content-range']);
    }
  })
  .pipe(res, {end: true});
}
