'use strict';

const fs = require('fs');
const vo = require('vo');
const aws = require('aws-sdk');
const ssm = new aws.SSM();
const twitter = require('twitter');

module.exports.main = (event, context, callback) => {
    vo(function*(){
        const client  = new twitter({
            consumer_key:        (yield ssm.getParameter({ Name: '/mimin/consumer_key',        WithDecryption: true }).promise() ).Value,
            consumer_secret:     (yield ssm.getParameter({ Name: '/mimin/consumer_secret',     WithDecryption: true }).promise() ).Value,
            access_token_key:    (yield ssm.getParameter({ Name: '/mimin/access_token_key',    WithDecryption: true }).promise() ).Value,
            access_token_secret: (yield ssm.getParameter({ Name: '/mimin/access_token_secret', WithDecryption: true }).promise() ).Value,
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
