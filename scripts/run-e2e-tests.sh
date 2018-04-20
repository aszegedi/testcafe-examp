#!/usr/bin/env bash

: ${BASE_URL:? required}
: ${ENVFILE:=./utils/testenvironment}

echo "Refresh the Test Runner Docker image"
docker pull testcafe/testcafe

export TEST_CONTAINER_NAME=e2e-runner

echo "Checking stopped containers"
if [[ -n "$(docker ps -a -f status=exited -f status=dead -q)" ]]; then
  echo "Delete stopped containers"
  docker rm $(docker ps -a -f status=exited -f status=dead -q)
else
  echo "There is no Exited or Dead container"
fi

echo "Checking " $TEST_CONTAINER_NAME " container is running"
if [[ "$(docker inspect -f {{.State.Running}} $TEST_CONTAINER_NAME 2> /dev/null)" == "true" ]]; then
  echo "Delete the running " $TEST_CONTAINER_NAME " container"
  docker rm -f $TEST_CONTAINER_NAME
fi

BASE_URL_RESPONSE=$(curl -k --write-out %{http_code} --silent --output /dev/null $BASE_URL/sl)
echo $BASE_URL " HTTP status code is: " $BASE_URL_RESPONSE
if [[ $BASE_URL_RESPONSE -ne 200 ]]; then
    echo $BASE_URL " Web GUI is not accessible!"
    RESULT=1
else
    docker run -i \
    --privileged \
    --rm \
    --name $TEST_CONTAINER_NAME \
    --env-file $ENVFILE \
    -v $(pwd):/project \
    -v /dev/shm:/dev/shm \
    testcafe/testcafe all /project/tests/test.ts
    RESULT=$?
fi

exit $RESULT