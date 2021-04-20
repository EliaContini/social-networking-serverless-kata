# This branch contains the first attempt to use AWS Lambda and Serverless Framework. It is not compliant with the AWS Lambda. Refers to the main branch for a compliant code.


# Social Networking Serverless Kata

This is a solution for the [Social Networking Serverless Kata](https://github.com/petecocoon/Social-Networking-Serverless-Kata).

It is written in JavaScript/Node.js using these libraries:

-   [Fastify](https://www.fastify.io/)
-   [aws-lambda-fastify](https://github.com/fastify/aws-lambda-fastify/)
-   [Dotenv](https://github.com/motdotla/dotenv#readme)
-   [Tap](https://node-tap.org/)

and deployed on AWS Lambda using [Serverless](https://www.serverless.com/) Framework.

## Available endpoints

| HTTP Method | Endpoint                      | Descriprion                               |
| :---------- | :---------------------------- | :---------------------------------------- |
| GET         | /posts/                       | Retrieves the post of all users           |
| GET         | /posts/?username=elia.contini | Retrieves the post of `elia.contini`      |
| POST        | /posts/                       | Create a post                             |
| DELETE      | /posts/:id/                   | Delete the post with `_id` equal to `:id` |

To create a post the payload must have this shape:

    {
        "message": "My 1 post",
        "username": "elia.contini"
    }

## Prepare development environment

I used [Visual Studio Code](https://code.visualstudio.com/). The folder
`.vscode` contains the configuration for development and debugging operations.

### Serverless Framework

Install the last version of [Serverless framework](https://www.serverless.com/framework/docs/providers/aws/guide/installation#installing-the-serverless-framework).

### MongoDB Atlas

You need a [MongoDB Atlas](https://www.mongodb.com/) account. [Setup a cluster](https://www.freecodecamp.org/news/get-started-with-mongodb-atlas/)
that accepts connection from anywhere. Rename `sample.env` in `.env` and set
your `MONGO_URI`.

### AWS

You need an AWS account. Create a IAM user and setup credentials for Serverless Framework following this [guide](https://www.serverless.com/framework/docs/providers/aws/guide/credentials#creating-aws-access-keys).

### Install project dependecies

To install project dependecies type on the terminal:

    $ npm install

## Running the application and the test suite on the local machine

To run the application type on the terminal:

    $ npm start

To run tests type on the terminal:

    $ npm test

Test script is configured in watcher mode.

## Deploying the solution on AWS Lambda using Serverless Framework

To deploy on AWS Labda type on the terminal:

    $ serverless deploy -v
