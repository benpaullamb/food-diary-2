# Food Diary 2.0

![status: in progress](https://img.shields.io/badge/status-in--progress-green)

## About this Project

A full-stack, upgraded, live version of Food Diary 1.0

### Built with

- Nuxt.js
- BootstrapVue
- Amazon Cognito
- AWS Lambda
- Amazon DynamoDB

## Getting Started

### Prerequisites

- Node

### Installation

1. Install the dependencies.

```
npm i
```

2. Run the app locally with hot reloading.

```
npm run dev
```

Go to http://localhost:3000

## Deployment

This project is hosted on GitHub pages.

1. Build the static pages.

```
npm run generate
```

2. Commit to the GitHub repo that has GitHub pages setup for the `/docs` directory.

```
git push
```

See usage

## Usage

TBD

## Roadmap

- [ ] Replace email with the `sub` (subject unique ID) of the user's ID token, [first verifying the ID JWT](https://docs.aws.amazon.com/cognito/latest/developerguide/amazon-cognito-user-pools-using-tokens-verifying-a-jwt.html) (maybe storing the `userPoolId` in SSM param store)
- [ ] Paste OCR ingredients text which is then separated
- [ ] Account page with delete account/data option, change password or name
- [x] Re-create user pool and identity in London region (from eu-west-1/Ireland)
- [x] Lamb Sign-in System (AWS Cognito)
- [x] Store food diary in Dynamo (via Lambda)

## Release History

- v0.3.0
  - Serverless Lambdas with Dynamo for CRUD food diaries
- v0.2.0
  - Cognito updated to use library
- v0.1.0
  - Cognito user pool setup
