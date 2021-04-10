# Food Diary 2.0

![status: in progress](https://img.shields.io/badge/status-in--progress-green)

## About this Project

A full-stack, upgraded, live version of Food Diary 1.0

### Built with

- Nuxt.js
- BootstrapVue
- AWS Cognito
- AWS Lambda
- AWS Dynamo

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

- [ ] Re-create user pool and identity in London region (from eu-west-1/Ireland)
- [ ] Replace email with identity ID in Dynamo
- [ ] Paste OCR ingredients text which is then separated
- [x] Lamb Sign-in System (AWS Cognito)
- [x] Store food diary in Dynamo (via Lambda)

## Release History

- v0.3.0
  - Serverless Lambdas with Dynamo for CRUD food diaries
- v0.2.0
  - Cognito updated to use library
- v0.1.0
  - Cognito user pool setup
