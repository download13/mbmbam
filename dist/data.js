const FeedParser = require('feedparser');
const request = require('request');
const AsyncCache = require('async-cache');


const feedburner = new AsyncCache({
  max: 1,
  maxAge: 1000 * 60 * 5,
  load(feedname, cb) {
    const episodes = [];

    const fp = new FeedParser();
    fp.on('readable', () => {
      let item;
      while(item = fp.read()) {
        episodes.unshift({
          index: episodes.length,
          title: item.title,
          imageUrl: item.image.url,
          audioUrl: item.enclosures[0].url
        });
      }
    })
    .on('end', () => cb(null, episodes))
    .on('error', cb);

    request('https://feeds.feedburner.com/' + feedname).pipe(fp, {end: true});
  }
});

exports.getEpisodes = (feedname) => {
  return new Promise((resolve, reject) => {
    feedburner.get(feedname, (err, episodes) => {
      if(err) reject(err);
      else resolve(episodes);
    });
  });
};

exports.getEpisode = (feedname, index) => {
  return exports.getEpisodes(feedname)
  .then(episodes => episodes[index]);
};

function secureLibsynUrl(url) {
  return url.replace(/^http:\/\/static\.libsyn\.com/, 'https://ssl-static.libsyn.com');
}

function secureUrl(url) {
  return url.replace(/^http:/, 'https:');
}
