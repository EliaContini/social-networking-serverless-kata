"use strict";

const awsLambdaFastify = require("aws-lambda-fastify");
const server = require("./server");

const proxy = awsLambdaFastify(server);

//exports.app = proxy;

exports.app = (event, context) => {
    //
    // executing
    //
    //      $ serverless invoke -f app -l
    //
    // I got the error "Task timed out after 6.01 seconds"
    //
    // https://forum.serverless.com/t/task-timed-out-after-6-00-seconds/728
    //
    // https://docs.aws.amazon.com/lambda/latest/dg/nodejs-context.html
    //
    context.callbackWaitsForEmptyEventLoop = false;

    return proxy(event, context);
};
