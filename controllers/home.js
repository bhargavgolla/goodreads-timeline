/**
 * GET /
 * Home page.
 */
const goodreads = require('goodreads');

const goodreads_client = new goodreads.client({
  'key': process.env.GOODREADS_KEY,
  'secret': process.env.GOODREADS_SECRET
});

exports.index = (req, res) => {
  var reviews = new Array();
  if (req.user && req.user.goodreads) {
    goodreads_client.getSingleShelf({
      userID: req.user.goodreads,
      shelf: 'read',
      sort: 'date_read',
      order: 'd',
      page: 1,
      per_page: 20,
      v: 2
    }, function(json) {
      if (json) {
        reviews = json.GoodreadsResponse.reviews[0].review;
        res.render('home', {
          title: 'Home',
          reviews: reviews
        });
      }
    });
  } else {
    res.redirect('/login');
  }
};
