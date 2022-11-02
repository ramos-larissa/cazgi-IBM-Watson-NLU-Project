const express = require('express');

const dotenv = require("dotenv");

dotenv.config();

const app = new express();

app.use(express.static('client'))

const cors_app = require('cors');

app.use(cors_app());

app.get("/", (req, res) => {
    res.render('index.html');
});

app.get("/url/emotion", (req, res) => {
    getNLUInstance('emotion','url', req.query.url, res);
});

app.get("/url/sentiment", (req, res) => {      
    getNLUInstance('sentiment','url', req.query.url, res);
});

app.get("/text/emotion", (req, res) => {
    getNLUInstance('emotion', 'text', req.query.text, res);
});

app.get("/text/sentiment", (req, res) => {
    getNLUInstance('sentiment','text', req.query.text, res);
});

let server = app.listen(8080, () => {
    console.log('Listening', server.address().port)
});


function getNLUInstance(v1, v2, rest, res) {

    let api_key = process.env.API_KEY;
    let api_url = process.env.API_URL;


    const NaturalLanguageUnderstandingV1 = require('ibm-watson/natural-language-understanding/v1');
    const { IamAuthenticator } = require('ibm-watson/auth');

    const naturalLanguageUnderstanding = new NaturalLanguageUnderstandingV1({
        version: '2021-08-01',
        authenticator: new IamAuthenticator({
            apikey: api_key,
        }),
        serviceUrl: api_url,
    });

    const analyzeParams = checkSentimentEmotion(v1,v2,rest);

    naturalLanguageUnderstanding.analyze(analyzeParams)
        .then(analysisResults => {
            res.send(JSON.stringify(analysisResults, null, 2))
            console.log(JSON.stringify(analysisResults, null, 2));
        })
        .catch(err => {
            res.send(err.toString())
            console.log('error:', err);
        });

}

function checkSentimentEmotion(val1, val2, result) {
    if (val1 === "sentiment" && val2 === "url") {
        return {
            'url': result,
            'features': {
                'entities': {
                    'emotion': false,
                    'sentiment': true,
                    'limit': 1,
                },
                'keywords': {
                    'emotion': false,
                    'sentiment': true,
                    'limit': 1,
                },
            },
        };
    } else if (val1 === "sentiment" && val2 === "text") {
        return {
            'text': result,
            'features': {
                'entities': {
                    'emotion': false,
                    'sentiment': true,
                    'limit': 1,
                },
                'keywords': {
                    'emotion': false,
                    'sentiment': true,
                    'limit': 1,
                },
            },
        };
    } else if (val1 === "emotion" && val2 === "url") {
        return {
            'url': result,
            'features': {
                'entities': {
                    'emotion': true,
                    'sentiment': false,
                    'limit': 1,
                },
                'keywords': {
                    'emotion': true,
                    'sentiment': false,
                    'limit': 1,
                },
            },
        }

    } else {

        return {
            'text': result,
            'features': {
                'entities': {
                    'emotion': true,
                    'sentiment': false,
                    'limit': 1,
                },
                'keywords': {
                    'emotion': true,
                    'sentiment': false,
                    'limit': 1,
                },
            },
        }

    }
}