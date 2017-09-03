const exec = require('child_process').execSync;

module.exports.kms = () => {
    const ret = {};

    [ 'MIMIN_CONSUMER_KEY', 'MIMIN_CONSUMER_SECRET', 'MIMIN_ACCESS_TOKEN_KEY', 'MIMIN_ACCESS_TOKEN_SECRET' ].forEach(key => {
        const cred = exec(`credstash -r ap-northeast-1 get ${key}`).toString().replace("\n", "");
        ret[key] = cred;
    })

    return ret;
};
