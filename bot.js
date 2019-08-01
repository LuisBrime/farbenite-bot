var Twit = require('twit');
var config = require('./config');

var T = new Twit(config);

tweet();


function tweet() {
    let t = {
        status: 'Save my world'
    };

    T.post('statuses/update', t, function(err, data, response) {
        if (err) {
            console.log('Cannot tweet, ', err);
        } else {
            console.log('Success, ', data);
        }
    });
}