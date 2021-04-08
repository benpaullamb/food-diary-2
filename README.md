# Food Diary 2.0

![status: in progress](https://img.shields.io/badge/status-in--progress-green)

## About this Project

A full-stack, upgraded, live version of Food Diary 1.0

Refactor auth, add sign-out, run thru all

### Built with

- Nuxt.js
- BootstrapVue
- AWS Cognito
- AWS Dynamo
- AWS Lambda

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

- [ ] Lamb Sign-in System (AWS Cognito)
- [ ] Paste OCR ingredients text which is then separated
- [ ] Store food diary in Dynamo (via Lambda?)

## Release History

- v0.1.0
  - Cognito user pool setup
