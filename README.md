# twitter-bot-mimin
渋澤タカシ[@niltea](https://twitter.com/niltea) がGithubにpushした時に下記の **みみんがみ** の画像をTwitterに投稿します。

![みみんがみ](./mimin_ga_mi.jpg)


## SETUP
```
## 必要な値をcredstashでセットしておく
credstash -r ap-northeast-1 put -a MIMIN_CONSUMER_KEY ...
credstash -r ap-northeast-1 put -a MIMIN_CONSUMER_SECRET ...
credstash -r ap-northeast-1 put -a MIMIN_ACCESS_TOKEN_KEY ...
credstash -r ap-northeast-1 put -a MIMIN_ACCESS_TOKEN_SECRET ...

## serverlessでセットアップ
git clone https://github.com/celeron1ghz/twitter-bot-mimin.git
cd twitter-bot-mimin
sls deploy
```

serverless でデプロイ後表示されるURLを GithubのrepoのWebhookに指定してください。`Content-Type` は `application/json` にしてね。


## REQUIRED CREDSTASH VARIABLES
 * `MIMIN_CONSUMER_KEY`: Twitterのconsumer key
 * `MIMIN_CONSUMER_SECRET`: Twitterのconsumer secret
 * `MIMIN_ACCESS_TOKEN_KEY`: Twitterのaccess token
 * `MIMIN_ACCESS_TOKEN_SECRET`: Twitterのaccess secret


## SEE ALSO
 * https://github.com/celeron1ghz/twitter-bot-mimin.git
 * https://twitter.com/niltea
 * https://twitter.com/mimin_ga_mi_bot
