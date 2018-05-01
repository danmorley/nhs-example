#!/bin/bash

bash ./scripts/ci-deployment/common/generate-answers.sh

IMAGE_TAG="$1"

# EXPORT ALL THE VARIABLES FROM THE GENERATED ANSWERS FILE
set -o allexport
# shellcheck source=/dev/null
source answers.txt
set +o allexport

docker login -u "$DOCKER_USERNAME" -p "$DOCKER_PASSWORD"
docker build -t "phedct/${CI_PROJECT_NAME}:${IMAGE_TAG}" --build-arg PUBLIC_ENV="$REACT_APP_PUBLIC_URL" .
docker push "phedct/${CI_PROJECT_NAME}:${IMAGE_TAG}"
