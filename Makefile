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
                    -v $(PWD):/project \
                    -v /dev/shm:/dev/shm \
                    testcafe/testcafe firefox /project/tests/clusterTest.ts
                    RESULT=$?

.PHONY:
				run