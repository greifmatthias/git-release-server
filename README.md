# Git-Release-Server
Simple API for providing OTA updates to applications based on GitHub Releases.

## Setup
### Environment
*Localhost*

You should make a `.env` in the root of the project:
* GITHUB_TOKEN: Generate a token on GitHub under `Developer Settings/Personal Access Tokens` with the repo scope enabled
* GITHUB_USERNAME: Owner of the Github repository to target
* GITHUB_REPO: Repository to target
---
If you intend to run on *Docker*, these vars can also be set in the `docker-compose` file

### Run API
*Localhost*
1. `npm i`
1. Simply run `npm run start` to start the server at `localhost:3000`
---
Or deploy on *Docker* with:
* `docker-compose build`
* `docker-compose up`
* Available at `localhost:3000`

## Endpoints
* `GET ~ /ping` simply returns a pong

* `GET ~ /v1/versions` lists all Releases
