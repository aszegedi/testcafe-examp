ENVFILE=utils/testenvironment

refresh-image:
		docker pull testcafe/testcafe

run-on-jenkins:
		./scripts/e2e-gui-test.sh

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
            aszegedi/testcafe testcafe 'chromium --no-sandbox' /testcafe/project/tests/clusterTest.ts -r spec,xunit:/testcafe/project/result.xml -S -s /testcafe/project/results/screenshots
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
            aszegedi/testcafe yarn test-with-runner
            RESULT=$?

.PHONY:
		build
