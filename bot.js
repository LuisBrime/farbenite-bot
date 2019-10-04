var Twit = require('twit');
var config = require('./config');
var axios = require('axios');
var fs = require('fs');
const { exec } = require('child_process');

var T = new Twit(config);

// Example command for Processing to create palette image.
// ./farbenite/farbenite 0 0 0 1 1 1 2 2 2 3 3 3 4 4 4 F F F F F
var cmd = 'xvfb-run ./farbenite/farbenite ';

// params to make the request to get the palette's colors.
const params = {
    method: 'post',
    url: 'http://colormind.io/api/',
    data: {
        model: 'default'
    }
};

// Tweet a image and set an interval to tweet.
tweetImage();
setInterval(tweetImage, 1000*60*60*5);

// Create a stream that will track all events where '@farbenite' appears.
var stream = T.stream('statuses/filter', { track: ['@farbenite'] });
// When a tweet with '@farbenite' appears, do the mention function.
stream.on('tweet', mention);

// Tweet an image given a palette.
function tweetImage() {
    // Make the request to Colormind.
    axios(params)
        .then(response => {
            console.log('––– COLORMIND REQUEST SUCCESS –––\n\t', response.data.result);
            // RGB colors
            const colors = response.data.result;

            // Turn those RGB colors to HEX.
            let hexs = [];
            for (var i = 0; i < colors.length; i++) {
                hexs[i] = fullRGB2HEX(colors[i][0], colors[i][1], colors[i][2]);
            }

            // Add the colors to the command for Processing.
            cmd += colors[0][0] + ' ' + colors[0][1] + ' ' + colors[0][2] + ' '
                + colors[1][0] + ' ' + colors[1][1] + ' ' + colors[1][2] + ' '
                + colors[2][0] + ' ' + colors[2][1] + ' ' + colors[2][2] + ' '
                + colors[3][0] + ' ' + colors[3][1] + ' ' + colors[3][2] + ' ' 
                + colors[4][0] + ' ' + colors[4][1] + ' ' + colors[4][2] + ' '
                + hexs[0] + ' ' + hexs[1] + ' ' + hexs[2] + ' ' + hexs[3] + ' ' + hexs[4];
            
            exec(cmd, function(err, stdout, stderr) {
                if (err) {
                    console.error(`exec error: ${err}`);
                }

                console.log('––– PROCESSING IMAGE ENDED –––');
                // Enocde image to upload it
                const filename = './farbenite/output.png';
                var en = { encoding: 'base64' };
                var b64 = fs.readFileSync(filename, en);

                // Upload image and then tweet it.
                T.post('media/upload', { media_data: b64 }, uploaded);
                function uploaded(err, data, response) {
                    console.log('––– MEDIA UPLOADED –––');
                    var id = data.media_id_string;
                    var tuit = {
                            media_ids: [id]
                    };
                    
                    tweet(tuit);
                }
                });
        });
}

// Function to tweet any given tweet.
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

// Function to respond to a tweet mention to '@farbenite'.
function mention(tweet) {
    let inReplyTo = tweet.in_reply_to_screen_name;
    if (inReplyTo === 'farbenite') {
        console.log('––– MENTIONED –––', tweet.text, tweet.user.screen);
        let id = tweet.id_str;
        let username = tweet.user.screen_name;

        // Favorite mention tweet.
        T.post('favorites/create', { id });
    }
}

/*
 *
 *
 * UTILITY FUNCTIONS
 * 
 * 
*/
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
