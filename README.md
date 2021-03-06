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
1. Simply run `npm run start` to start the server at `localhost:3000` (default)
---
Or deploy on *Docker* with:
* `docker-compose build`
* `docker-compose up`
* Available at `localhost:3000` (default)

## Endpoints
* `GET ~/ping` simply returns a pong

* `GET ~/v1/releases` lists all Releases
    * These results can be further reduced:
        * `GET ~/v1/releases?after={VERSION}` will only return results of Releases after a specific version. `{VERSION}` can be any string **(\*)** that acts as a minimum required version
            * eg. `GET ~/v1/releases?after=0.3.4`
        * `GET ~/v1/releases/{VERSION}` will return details for a Release, with a specific version
            * eg. `GET ~/v1/releases/0.3.4`
        * `GET ~/v1/releases/latest` will return details for the latest Release (this cannot and should not point to a Release version because this is not a SemVer)


*NOTE: To make this work, Assets need to contain this information, for this we use the semver spec: {LABEL}-{VERSION}-{PLATFORM}-{ARCHITECTURE}.{EXTENSION} eg.: AwesomeApp-7.1.1-win-x86_64.exe, AnotherApp-4.5.0-alpha-osx.dmg, CoolApp-v1.2.1-linux-x86.deb*
* `GET ~/v1/assets` lists all Assets. These Assets are grouped by the Release in semver-format. When a Release has no Assets (default or with filtering), this Release will not be displayed.
    * These results can be further reduced:
        * `GET ~/v1/assets?platform={PLATFORM}` will only list Assets for a specific platform: osx, win, linux.
        * `GET ~/v1/assets?dist={DISTRIBUTION}` will filter Assets by a specific distribution. This parameter is mainly intended to support listings for a specific Linux distribution. Officially ossible values: dmg, exe, snap, deb, rpm, appimage. But all extensions can be used, it will be compared to the extension of the Asset.
        * `GET ~/V1/ASSETS?arch={ARCHITECTURE}` will filter Assets by there architecture: x86, x64.


---
**(\*) Versions (those used to query, and used as GitHub Release tagnames) MUST be formatted according to the SemVer specifications, else sh\*\* may not work**
