#!/bin/bash

#Exit on error
set -oe pipefail

if [[ -n $(git status --porcelain) ]]; then
    echo "Repo is dirty" && \
    echo "Please stash or commit your changes before releasing" && \
    exit 1;
fi

# current Git branch
branch=$(git rev-parse --abbrev-ref HEAD)


function switch_to() {
    echo "Switching to $1"
    git checkout --quiet "$1"
}

function update() {
    echo "Pulling latest $1"
    git pull --rebase --quiet
}

# major|minor|patch
[ -z "$1" ] && echo "Please speficy version (major|minor|patch)" && exit 1

# establish branch and tag name variables

#Fetch remote trackers for releasing
echo "Fetching remote branches (git fetch)"
git fetch --quiet

switch_to master
current_commit="$(git rev-parse HEAD)"


function clean () {
    echo "Encountered error on line $LINENO, reverting changes"
    git reset --hard "$current_commit"
    git checkout . # Remove unstaged tracked files
    git clean -f   # Remove unstaged untracked files
    switch_to "$branch"
}

trap 'clean $LINENO' ERR

update master

#Bump version up
version=$(npm version --prefix frontend/hay-ui  "$1" --no-git-tag-version)
echo "Bumped version to $version"

# commit version number increment
git commit -am "$version"

# create tag for new version from -master
git tag "$version"


#Atomic ensures nothing is pushed if any of the repos fails to push
git push --atomic origin master "$version"

#switch back to branch you started
switch_to "$branch"

