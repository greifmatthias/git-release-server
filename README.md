# GitHub Release Server

## Setup
1. `npm i`
1. Create `.env` file in root of project:
    * GITHUB_TOKEN: Generate a token on GitHub under `Developer Settings/Personal Access Tokens` with the repo scope enabled
    * GITHUB_USERNAME: Owner of the Github Repo
    * GITHUB_REPO: Repository to target
1. `npm run start`

## Endpoints
* /ping ~ Just returns a pong

* /versions ~ Lists all the Releases