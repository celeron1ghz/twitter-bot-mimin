'use strict';

const fs = require('fs');
const twitter = require('twitter');
const crypto = require('crypto');

module.exports.main = async (event, context, callback) => {
  try {
    const header = event.headers ? event.headers['X-Hub-Signature'] || '' : '';
    const given = header.split('=')[1];
    const calc = crypto.createHmac('sha1', process.env.MIMIN_TOKEN).update(event.body).digest('hex');

    if (given !== calc) {
      console.log(`VALIDATION_ERROR: calc='${calc}', given='${given}'`);
      return callback(null, { statusCode: 400, body: "INVALID_TOKEN" });
    }

    const client  = new twitter({
      consumer_key:        process.env.MIMIN_TWITTER_COMSUMER_KEY,
      consumer_secret:     process.env.MIMIN_TWITTER_COMSUMER_SECRET,
      access_token_key:    process.env.MIMIN_TWITTER_ACCESS_TOKEN,
      access_token_secret: process.env.MIMIN_TWITTER_ACCESS_TOKEN_SECRET,
    });

    const param = JSON.parse(event.body);

    if (param.sender.login != "niltea") {
      throw Error("You are not mimin");
    }

    const hash  = param.after ? `(${param.after.substr(0,7)})` : "[unknown]";
    const image = fs.readFileSync('mimin_ga_mi.jpg');
    const media = await client.post('media/upload', { media: image });
    const ret   = await client.post('statuses/update', { status: `みみんがみ ${hash}`, media_ids: media.media_id_string });

    callback(null, { statusCode: 200, body: "OK" });
  } catch(err) {
    console.log("Error happen:", err.message);
    callback(null, { statusCode: 200, body: "ERROR" });
  }
};
