ENVFILE=utils/testenvironment

pull:
		docker pull aszegedi/testcafe-examp

run-on-jenkins:
		./scripts/run-e2e-tests.sh

build:
		docker build -t aszegedi/testcafe .

run-with-cli:
		docker run -it \
            --privileged \
            --rm \
            --net=host \
            --name testcafe-e2e-runner \
            --env-file $(ENVFILE) \
            -v $(PWD):/testcafe/project \
            -v /dev/shm:/dev/shm \
            aszegedi/testcafe-examp testcafe chromium /testcafe/project/tests/clusterTest.ts -r spec,xunit:/testcafe/project/result.xml -S -s /testcafe/project/results/screenshots
            RESULT=$?

run-with-script:
		docker run -it \
            --privileged \
            --rm \
            --net=host \
            --name testcafe-e2e-runner \
            --env-file $(ENVFILE) \
            -v $(PWD):/testcafe/project \
            -v /dev/shm:/dev/shm \
            aszegedi/testcafe-examp yarn test-with-runner
            RESULT=$?

.PHONY:
		build
