const YT_VIDEO_URL = 'https://www.googleapis.com/youtube/v3/videos';

$(document).ready(function() {
  console.log('Hi YouTube!');

  // results page
  $("[id=video-title]").each(function() {
    // console.log(this);
  });
  fetchStats('1GrNv3ow9H8',printRatings);
});

const printRatings = (videos) => {
  for (let vid of videos) {
    let {likeCount, dislikeCount} = vid.statistics;
    console.log('likeCount', likeCount);
    console.log('dislikeCount', dislikeCount);
    console.log('percentage: ', +likeCount / (+likeCount + +dislikeCount));
  }
};

const fetchStats = function(videoId, cb) {
  $.get({
    url: YT_VIDEO_URL,
    data: {
      id: videoId,
      part: 'statistics',
      key: window.YT_API_KEY
    },
    success(results) {
      console.log('success!', results);
      cb(results.items);
    },
    error() {
      console.error('error');
    }
  });
};
