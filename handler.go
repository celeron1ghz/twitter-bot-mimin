package main

import (
	"encoding/base64"
	"encoding/json"
	"fmt"
	"io/ioutil"
	"net/url"
	"os"

	"github.com/ChimeraCoder/anaconda"
	"github.com/aws/aws-lambda-go/events"
	"github.com/aws/aws-lambda-go/lambda"
)

type GithubParam struct {
	Ref    string            `json:"ref"`
	Before string            `json:"before"`
	After  string            `json:"after"`
	Sender GithubParamSender `json:"sender"`
}

type GithubParamSender struct {
	Login string `json:"login"`
}

func CreateTwitterClient() *anaconda.TwitterApi {
	anaconda.SetConsumerKey(os.Getenv("MIMIN_TWITTER_COMSUMER_KEY"))
	anaconda.SetConsumerSecret(os.Getenv("MIMIN_TWITTER_COMSUMER_SECRET"))
	return anaconda.NewTwitterApi(os.Getenv("MIMIN_TWITTER_ACCESS_TOKEN"), os.Getenv("MIMIN_TWITTER_ACCESS_TOKEN_SECRET"))
}

func handler(req events.APIGatewayProxyRequest) (events.APIGatewayProxyResponse, error) {
	var githubParam GithubParam
	json.Unmarshal([]byte(req.Body), &githubParam)

	if githubParam.Sender.Login != "niltea" {
		fmt.Println("You are not mimin")
		return events.APIGatewayProxyResponse{Body: "OK", StatusCode: 200}, nil
	}

	client := CreateTwitterClient()

	b, err := ioutil.ReadFile("mimin_ga_mi.jpg")

	if err != nil {
		return events.APIGatewayProxyResponse{Body: "OK", StatusCode: 200}, nil
	}

	media, err := client.UploadMedia(base64.StdEncoding.EncodeToString(b))

	if err != nil {
		return events.APIGatewayProxyResponse{Body: "OK", StatusCode: 200}, nil
	}

	p := url.Values{}
	p.Add("media_ids", media.MediaIDString)

	hash := githubParam.After[0:7]
	tweet := fmt.Sprintf("みみんがみ (%s)", hash)
	client.PostTweet(tweet, p)

	return events.APIGatewayProxyResponse{Body: "OK", StatusCode: 200}, nil
}

func main() {
	lambda.Start(handler)
}
