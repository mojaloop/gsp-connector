# Typescript Project Template

<!-- ACTION: REPLACE <repo-name> placeholders in this document -->
[![Git Commit](https://img.shields.io/github/last-commit/mojaloop/<repo-name>.svg?style=flat)](https://github.com/mojaloop/<repo-name>/commits/master)
[![Git Releases](https://img.shields.io/github/release/mojaloop/<repo-name>.svg?style=flat)](https://github.com/mojaloop/<repo-name>/releases)
[![Npm Version](https://img.shields.io/npm/v/@mojaloop/<repo-name>.svg?style=flat)](https://www.npmjs.com/package/@mojaloop/<repo-name>)
[![NPM Vulnerabilities](https://img.shields.io/snyk/vulnerabilities/npm/@mojaloop/<repo-name>.svg?style=flat)](https://www.npmjs.com/package/@mojaloop/<repo-name>)
[![CircleCI](https://circleci.com/gh/mojaloop/<repo-name>.svg?style=svg)](https://circleci.com/gh/mojaloop/<repo-name>)

A project template for new mojaloop services and libraries that uses Typescript.

## Contributing

Refer to [CONTRIBUTING.md](./CONTRIBUTING.md) for information on how to contribute, committing changes, releases and snapshots.

<!-- ACTION: REPLACE THIS SECTION START -->
## Template Setup \<REMOVE SECTION\>

This project provides a decent starting point for a new mojaloop library using typescript.

<!-- NOTE: setup steps for this repo -->
1. Go to <https://github.com/new> to create a new repo
2. Select the "mojaloop/template-typescript-public" template
3. Find and replace all instances of `<repo-name>` globally across the whole project with your new project's name
4. Update the package name and version to match in `package.json`:

    ```json
      "name": "@mojaloop/repo-name",
      "version": "0.1.0", 
      ...
    ```

5. Copy the necessary circle ci config from the templates.

    ```bash
    cp ./.circleci/config.example.yml ./.circleci/config.yml
    rm -f ./.circleci/config.example.*
    ```

    If the project is a **Library**:

    Make sure to read comments and replace the applicable `publish` & `publish-snapshot` jobs with the NPM Publish job variants.

<!-- ACTION: REPLACE THIS SECTION END -->

## Pre-requisites

### Install dependencies

```bash
npm install
```

## Build

Command to transpile Typescript into JS:

```bash
npm run build
```

Command to LIVE transpile Typescript into JS live when any changes are made to the code-base:

```bash
npm run watch
```

## Run

```bash
npm start
```

## Tests

```bash
npm test
```