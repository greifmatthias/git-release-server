# Git-Release-Server
Simple API for providing OTA updates to applications based on GitHub Releases.

## Setup
### Environment
*Localhost*

You should make a `.env` in the root of the project:
* GITHUB_TOKEN: Generate a token on GitHub under `Developer Settings/Personal Access Tokens` with the repo scope enabled
* GITHUB_USERNAME: Owner of the Github repository to target
* GITHUB_REPO: Repository to target
* PORT: (optional) specifies the port the API will be available at, default is 3000
---
If you intend to run on *Docker*, these vars can also be set in the `docker-compose` file. If you specified a different port, keep in mind to also change those vars at `docker-compose.yml` and `Dockerfile` 

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
* `GET ~/ping` simply returns a pong

* `GET ~/v1/versions` lists all Releases
    * These results can be further reduced:
        * `GET ~/v1/versions?after={VERSION}` will only return results of Releases after a specific version. `{VERSION}` can be any string **(\*)** that acts as a minimum required version eg. `0.3.4` or `1.8.0-alpha`, ..


## Side notes
**(\*) Versions MUST be formatted according to the SemVer specifications, else sh\*\* may not work, also in the GitHub Release's TagName**
