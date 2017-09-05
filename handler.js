'use strict';

const fs = require('fs');
const twitter = require('twitter');
const client  = new twitter({
    consumer_key:        process.env.MIMIN_CONSUMER_KEY,
    consumer_secret:     process.env.MIMIN_CONSUMER_SECRET,
    access_token_key:    process.env.MIMIN_ACCESS_TOKEN_KEY,
    access_token_secret: process.env.MIMIN_ACCESS_TOKEN_SECRET,
});

module.exports.main = (event, context, callback) => {
    let hash;

    Promise.resolve()
        .then(data => {
            const param = JSON.parse(event.body);

            if (param.sender.login != "niltea") {
                console.log("You are not niltea, ignore...");
                throw Error("You are not mimin");
            }

            hash = param.after ? `(${param.after.substr(0,7)})` : "[unknown]";
        })
        .then(data => {
            const image = fs.readFileSync('mimin_ga_mi.jpg');
            return client.post('media/upload', { media: image });
        })
        .then(data => {
            return client.post('statuses/update', { status: `みみんがみ ${hash}`, media_ids: data.media_id_string })
        })
        .then(data => {
            callback(null, { statusCode: 200, body: "OK" });
        })
        .catch(err => {
            console.log("Error happen:", err);
            callback(null, { statusCode: 200, body: "ERROR" });
        });
};
