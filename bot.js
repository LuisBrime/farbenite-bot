var Twit = require('twit');
var config = require('./config');
var fs = require('fs');

var T = new Twit(config);

tweet();


function tweet() {
    let t = {
        status: 'Save my world'
    };

    /*
    fs.readFile('./utils/palettes.json', 'utf8', function(err, data) {
        if (err) {
            console.log(err);
        } else {
            let obj = JSON.parse(data);
            obj.palettes.push({ name: "holi" });
            const json = JSON.stringify(obj);
            fs.writeFile('./utils/palettes.json', json, 'utf8', null);
        }
    });
    */

    T.post('statuses/update', t, function(err, data, response) {
        if (err) {
            console.log('Cannot tweet, ', err);
        } else {
            console.log('Success, ', data);
        }
    });
}