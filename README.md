# twitter-bot-mimin
渋澤タカシ[@niltea](https://twitter.com/niltea) がGithubにpushした時に下記の **みみんがみ** の画像をTwitterに投稿します。

![みみんがみ](./mimin_ga_mi.jpg)


## SETUP
### 環境変数の設定
下記の値をEC2 Parameter Storeに設定する。

 * `MIMIN_CONSUMER_KEY`: Twitterのconsumer key
 * `MIMIN_CONSUMER_SECRET`: Twitterのconsumer secret
 * `MIMIN_ACCESS_TOKEN_KEY`: Twitterのaccess token
 * `MIMIN_ACCESS_TOKEN_SECRET`: Twitterのaccess secret

### serverlessでセットアップ
```
git clone https://github.com/celeron1ghz/twitter-bot-mimin.git
cd twitter-bot-mimin
sls deploy
```

### GithubのWebhookに指定
serverless でデプロイ後表示されるURLを GithubのrepoのWebhookに指定してください。`Content-Type` は `application/json` にしてね。


## SEE ALSO
 * https://github.com/celeron1ghz/twitter-bot-mimin.git
 * https://twitter.com/niltea
 * https://twitter.com/mimin_ga_mi_bot
