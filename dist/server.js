const express = require('express');
const data = require('./data');
const request = require('request');

const app = express();

app.use(express.static('dist/public'));

app.get("/", (request, response) => {
  response.sendFile(__dirname + '/views/index.html');
});

app.get('/list/:name', (req, res, next) => {
  data.getEpisodes(req.params.name).then(
    episodes => res.send(episodes),
    err => next(err)
  );
});

app.get('/proxyfile', (req, res, next) => {
  const {url} = req.query;

  // TODO: Pass on range headers
  request.get({
    url,
    headers: {
      Range: req.headers.range
    }
  })
  .on('response', response => {
    res.status(response.statusCode);
    res.append('Content-Type', response.headers['content-type']);
    res.append('Content-Length', response.headers['content-length']);
    res.append('Content-Range', response.headers['content-range']);
  })
  .pipe(res, {end: true});
});

const listener = app.listen(process.env.PORT || 80, () => {
  console.log('Your app is listening on port ' + listener.address().port);
});
