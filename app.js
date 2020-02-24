
const express = require("express");

const app = express();
const port = process.env.PORT || "8000";

const aws = require('aws-sdk');
const lambda = new aws.Lambda({
    region: 'us-east-1'
});

app.get("/", (req, res) => {
    res.status(200).send("Test EC2");

    const params = {
        FunctionName: 'shasta-dev-sms'
    };

    return lambda.invoke(params, (err, data) => {
        if (err) console.log('ERROR', err);
        else console.log('SUCCESS', data);
    });
});

app.listen(port, () => {
    console.log(`Listening to requests on http://localhost:${port}`);
});