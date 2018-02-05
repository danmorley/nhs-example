# PHE One You Site

## Purpose of this repository

This repository contains the source code for the Public Health England - One You site and CMS version 2.

The tool is composed of an end user frontend UI (React) and a CMS / API backend (Django/Wagtail), with the data being held in an MSSQL database. 


## Table Of Contents

<!-- vim-markdown-toc GitLab -->

* [Production services](#production-services)
* [Project directory structure](#project-directory-structure)
* [Getting Started with development](#getting-started-with-development)
  * [Versioning](#versioning)
  * [Developing features](#developing-features)
  * [Bug fixes](#bug-fixes)
  * [Hotfix](#hotfix)
  * [Release management](#release-management)

<!-- vim-markdown-toc -->


## Production services

HAY is built to run as a collection of Docker containers in production. Services created are as follows:

- TO BE DEFINED

## Project directory structure

```
.
├── docker-compose.yml        # Docker compose configuration simulating production setup //TODO
├── Dockerfile                # Main docker image file for all services. //TODO
├── frontend/                 # Front-end React app code base
├── .gitlab-ci.yml            # Gitlab CI pipeline configuration //TODO
├── oneYou2/                  # Wagtail CMS/API
├── rancher-config/           # Production docker services configuration with rancher  //TODO
├── README.md 
└── scripts/                  # CI scripts for deployment
```

## Getting Started with development

Run the following from the command line to download the repository and change into the directory:


```
git clone ssh://git@git.nhschoices.net:8222/digital_campaigns_experimental/oneyou-web2.git

cd oneyou-web2
```

Django app is under folder `oneYou2` and is developed indepent from front-end codebase which is under folder `frontend`


[See backend](./oneyou)

[See frontend](./frontend)


### Versioning

[Semantic Versioning](https://semver.org/) is used for release management for this project. 

Git tag format for versions is `v<Major>.<Minor>.<Patch>`

Main integration branch is `master`

### Developing features

- Branch of from `master` to start working on a new feature:

```
git checkout -b feature/<feature-name>
```

- Publish your feature:

```
git push -u origin feature/<feature-name>
```

- Create a merge request on Gitlab. You can do so using Gitlab Web UI by loggin into https://git.nhschoices.net/NHSChoices/oneyou-hay3/merge_requests  or using your preferred Gitlab client.

- Once approved by your peer merge or rebase your branch into master:

```
git checkout master
```

```
git pull
```

```
git merge feature/<feature-name>
git push
```

During a release if any features are merged into master branch, minor number in the version should be incremented.

### Bug fixes

- Branch of from master using `fix` prefix

```
git checkout -b fix/<fix-name>
```

- Publish your fix:

```
git push -u origin fix/<fix-name>
```

- Create a merge request on Gitlab. You can do so using Gitlab Web UI by loggin into https://git.nhschoices.net/NHSChoices/oneyou-hay3/merge_requests  or using your preferred Gitlab client.

- Once approved by your peer merge or rebase your branch into master:

```
git checkout master
```

```
git pull
```

```
git merge fix/<feature-name>
git push
```

During a release if `master` only contains fixes, patch number should be incremented in the version. If there are any features merged in minor should be incremented instead.

These are used for tracking status of and deploying to the related environments.


### Hotfix

A hotfix strategy has not been discussed as of this point, as the project is not live yet.

### Release management

When a release is to be made with all features and fixes merged into integration branch (master). You can run `scripts/release.sh` in project root directory to perform a release. 

If repo is dirty (there are unstaged/uncommited changes), script will not progress with the release displaying a message indicating the repo is dirty. In this case either stash your changes or commit your changes to perform the release.

- Run `scripts/release.sh minor` using command line in any branch to perform a release with minor version number bump. 

- Run `scripts/release.sh patch` using command line in any branch to perform a release with patch version number bump. 

The script will perform following operations:

- Switch to master branch
- Pull latest master
- Bump given version and commit
- Tag code with the version. (e.g. v3.10.1)
- Push code to remote `origin`
- Switch back to  working branch 

In case of error, changes are reverted back.

