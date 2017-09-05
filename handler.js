'use strict';

const fs = require('fs');
const vo = require('vo');
const cred = require('credstash-promise');
const twitter = require('twitter');

module.exports.main = (event, context, callback) => {
    vo(function*(){
        const client  = new twitter({
            consumer_key:        yield cred.fetchCred('MIMIN_CONSUMER_KEY'),
            consumer_secret:     yield cred.fetchCred('MIMIN_CONSUMER_SECRET'),
            access_token_key:    yield cred.fetchCred('MIMIN_ACCESS_TOKEN_KEY'),
            access_token_secret: yield cred.fetchCred('MIMIN_ACCESS_TOKEN_SECRET'),
        });

        let hash;

        const param = JSON.parse(event.body);

        if (param.sender.login != "niltea") {
            throw Error("You are not mimin");
        }

        hash = param.after ? `(${param.after.substr(0,7)})` : "[unknown]";

        const image = fs.readFileSync('mimin_ga_mi.jpg');
        const media = yield client.post('media/upload', { media: image });
        const ret   = yield client.post('statuses/update', { status: `みみんがみ ${hash}`, media_ids: media.media_id_string });

        callback(null, { statusCode: 200, body: "OK" });
    })
    .catch(err => {
        console.log("Error happen:", err);
        callback(null, { statusCode: 200, body: "ERROR" });
    });
};
