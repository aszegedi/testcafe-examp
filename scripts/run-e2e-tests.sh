#!/bin/sh
set -x

: ${BASE_URL:? required}
: ${ENVFILE:=./utils/testenvironment}

if [[ "$(docker images -q aszegedi/testcafe 2> /dev/null)" == "" ]]; then
 echo "Build the Test Runner Docker image"
 docker build -t aszegedi/testcafe .
fi

export TEST_CONTAINER_NAME=testcafe-e2e-runner

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
    echo "BASE_URL: " $BASE_URL
    echo "USERNAME: " $USERNAME
    echo "PASSWORD: " $PASSWORD
    echo "OS_USERNAME: " $OS_USERNAME
    echo "OS_PASSWORD: " $OS_PASSWORD
    echo "OS_TENANT_NAME: " $OS_TENANT_NAME
    echo "OS_AUTH_URL: " $OS_AUTH_URL
    echo "OS_APIFACING: " $OS_APIFACING
    echo "CLUSTER_NAME: " $CLUSTER_NAME
    echo "AMBARI_USER: " $AMBARI_USER
    echo "AMBARI_PASSWORD" $AMBARI_PASSWORD
    echo "SSH_KEY_NAME" $SSH_KEY_NAME
    echo "SSH_KEY: " $SSH_KEY

    docker run -i \
    --privileged \
    --rm \
    --net=host \
    --name $TEST_CONTAINER_NAME \
    --env-file $ENVFILE \
    -v $(pwd):/testcafe/project \
    -v /dev/shm:/dev/shm \
    aszegedi/testcafe firefox /testcafe/project/tests/*.ts -r spec,xunit:/testcafe/project/result.xml -S -s /testcafe/project/results/screenshots
    RESULT=$?
fi

sudo chown -R jenkins .

exit $RESULT