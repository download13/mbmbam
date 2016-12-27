const FeedParser = require('feedparser');
const request = require('request');
const AsyncCache = require('async-cache');


const feedburner = new AsyncCache({
  max: 1,
  maxAge: 1000 * 60 * 5,
  load(feedname, cb) {
    request('https://feeds.feedburner.com/' + feedname, (err, res, body) => {
      if(err) {
        console.error(err);
        cb(err);
      } else {
        const fp = new FeedParser();
        const episodes = [];
        fp.on('readable', () => {
          let item;
          while(item = fp.read()) {
            episodes.unshift({
              title: item.title,
              imageUrl: secureLibsynUrl(item.image.url),
              audioUrl: secureUrl(item.enclosures[0].url)
            });
          }
        });
        fp.on('end', () => {
          cb(null, episodes);
        });
        fp.end(body);
      }
    });
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

function secureLibsynUrl(url) {
  return url.replace(/^http:\/\/static\.libsyn\.com/, 'https://ssl-static.libsyn.com');
}

function secureUrl(url) {
  return url.replace(/^http:/, 'https:');
}