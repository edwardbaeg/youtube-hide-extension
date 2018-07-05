const YT_VIDEO_URL = 'https://www.googleapis.com/youtube/v3/videos';

$(document).ready(function() {
  console.log('YOUTUBE HIDE extension start!');

  // TODO: check current URL for 'results?search'
  // TODO: use regex after `=` and before optional `&`
  // on the results page, get video titles' href prop
  $("[id=video-title]").each(function() {
    // console.log(this);
    let videoId = $(this).attr('href');
    videoId = videoId.slice(9, 20);
    fetchStats(videoId, (videos, context) => {
      printRating(videos, context);
    }, this);

  });

  /**
   * Can also get all the stats with just one ajax requst
   * Submit videoids as a string separated by commas
   */
  // let videoIds = [];
  // videoIds.push(videoId);
  // videoIdString = videoIds.join(',');
  // fetchStats(videoIdString, printRatings);

});

// TODO: move functions to a different file?
// this context is the video title
const printRatings = (videos) => {
  for (let vid of videos) {
    let {likeCount, dislikeCount} = vid.statistics;
    console.log('likeCount', likeCount, 'dislikeCount', dislikeCount);
    console.log('percentage: ', +likeCount / (+likeCount + +dislikeCount));
  }
};

const printRating = (vid, context) => {
  let {likeCount, dislikeCount} = vid[0].statistics;
  let percentage = +likeCount / (+likeCount + +dislikeCount) * 100;
  console.log(context);
  console.log($(context).attr('title'));
  console.log('likeCount', likeCount, 'dislikeCount', dislikeCount, 'percentage', percentage);
  if (percentage < 80) {
    $(context).css('color', 'lightgrey');
  }
};

const fetchStats = function(videoId, cb, context) {
  $.get({
    url: YT_VIDEO_URL,
    data: {
      id: videoId,
      part: 'statistics',
      key: window.YT_API_KEY
    },
    success(results) {
      // console.log('success!', results);
      cb(results.items, context);
    },
    error() {
      console.error('error');
    }
  });
};
