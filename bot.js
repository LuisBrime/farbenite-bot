var Twit = require('twit');
var config = require('./config');
var axios = require('axios');
var exec = require('child_process').exec;
var fs = require('fs');

var T = new Twit(config);

var cmd = './farbenite/farbenite ';
const params = {
    method: 'post',
    url: 'http://colormind.io/api/',
    data: {
        model: 'default'
    }
};

tweetImage();
setInterval(tweetImage, 1000*60*60*24);

var stream = T.stream('statuses/filter', { track: ['@farbenite'] });

var secondStream = T.stream('statuses/filter', { track: ['color', 'palette'] });

stream.on('tweet', mention);
secondStream.on('tweet', goAndFollow);

function tweetImage(replyTo, username) {
    axios(params)
        .then(response => {
            console.log('––– COLORMIND REQUEST SUCCESS –––\n\t', response.data.result);
            const colors = response.data.result;
            let hexs = [];

            for (var i = 0; i < colors.length; i++) {
                hexs[i] = fullRGB2HEX(colors[i][0], colors[i][1], colors[i][2]);
            }

            cmd += colors[0][0] + ' ' + colors[0][1] + ' ' + colors[0][2] + ' '
                + colors[1][0] + ' ' + colors[1][1] + ' ' + colors[1][2] + ' '
                + colors[2][0] + ' ' + colors[2][1] + ' ' + colors[2][2] + ' '
                + colors[3][0] + ' ' + colors[3][1] + ' ' + colors[3][2] + ' ' 
                + colors[4][0] + ' ' + colors[4][1] + ' ' + colors[4][2] + ' '
                + hexs[0] + ' ' + hexs[1] + ' ' + hexs[2] + ' ' + hexs[3] + ' ' + hexs[4];
            
            exec('sudo nohup Xvfb :1 -screen 0 1024x768x24 &', function() {
                exec('export DISPLAY=":1"', function() {
                    exec(cmd, function() {
                        console.log('––– PROCESSING IMAGE ENDED –––');
                        const filename = './farbenite/output.png';
                        var en = { encoding: 'base64' };
                        var b64 = fs.readFileSync(filename, en);
        
                        T.post('media/upload', { media_data: b64 }, uploaded);
                        function uploaded(err, data, response) {
                            console.log('––– MEDIA UPLOADED –––');
                            var id = data.media_id_string;
                            var tuit;
                            if (!replyTo) {
                                tuit = {
                                    media_ids: [id]
                                };
                            } else {
                                tuit = {
                                    media_ids: [id],
                                    in_reply_to_status_id: replyTo,
                                    status: '@' + username
                                };
                            }
                            
                            tweet(tuit);
                        }
                    });
                });
            });
        });
}

function tweet(tuit) {
    T.post('statuses/update', tuit, tweeted);

    function tweeted(err, data, response) {
        if (err) {
            console.log('Error, ', err);
        } else {
            console.log('––– SUCCESS –––');
        }
    }
}

function mention(tweet) {
    let inReplyTo = tweet.in_reply_to_screen_name;
    if (inReplyTo === 'farbenite') {
        console.log('––– MENTIONED –––', tweet.text, tweet.user.screen);
        let id = tweet.id_str;
        let username = tweet.user.screen_name;

        T.post('favorites/create', { id });
        //tweetImage(id, username);
    }
}

function goAndFollow(tweet) {
    let username = tweet.user.screen_name;
    T.post('friendships/create', { screen_name: username });
}

const rgbToHex = (rgb) => {
    var hex = Number (rgb).toString(16);
    if (hex.length < 2) {
        hex = '0' + hex;
    }
    return hex;
}

const fullRGB2HEX = (r, g, b) => {
    var red = rgbToHex(r).toUpperCase();
    var green = rgbToHex(g).toUpperCase();
    var blue = rgbToHex(b).toUpperCase();
    return red+green+blue;
}
