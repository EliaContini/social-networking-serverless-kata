# Set Node.js environment variables for local development

https://www.serverless.com/framework/docs/environment-variables/

# Set Node.js environment variables on AWS Lamda

For a function https://www.serverless.com/framework/docs/providers/aws/guide/functions/#environment-variables

For the solution https://www.serverless.com/examples/aws-node-env-variables
https://github.com/serverless/examples/tree/master/aws-node-env-variables

# MongoDB Atlas: Best Practices Connecting from AWS Lambda

https://docs.atlas.mongodb.com/best-practices-connecting-to-aws-lambda/

    context.callbackWaitsForEmptyEventLoop = false;

# Define functions

https://www.serverless.com/framework/docs/providers/aws/guide/functions/

https://www.serverless.com/examples/aws-node-simple-http-endpoint

event.body JSON.parse(event.body)
event.pathParameters :id
event.queryStringParameters ?prop=value

# Testing

https://www.serverless.com/framework/docs/providers/aws/guide/testing/