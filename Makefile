ENVFILE=utils/testenvironment

refresh-image:
				docker pull testcafe/testcafe

run-on-jenkins:
				./scripts/e2e-gui-test.sh

run:

				docker run -it \
                    --privileged \
                    --rm \
                    --net=host \
                    --name e2e-runner \
                    --env-file $(ENVFILE) \
                    -v $(PWD):/testcafe/project \
                    -v /dev/shm:/dev/shm \
                    testcafe/testcafe chromium /testcafe/project/tests/*.ts -r spec,xunit:/testcafe/project/result.xml -S -s /testcafe/project/results/screenshots
                    RESULT=$?

.PHONY:
				run