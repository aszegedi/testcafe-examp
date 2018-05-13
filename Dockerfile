FROM alpine:edge

RUN apk --no-cache --repository http://dl-3.alpinelinux.org/alpine/edge/testing/ add \
 nodejs nodejs-npm chromium firefox xwininfo xvfb dbus eudev ttf-freefont fluxbox gawk yarn sudo

RUN adduser -D testcafe && \
    rm -rf /tmp/*

COPY /scripts/testcafe-docker.sh /scripts/testcafe-docker.sh
RUN chmod +x /scripts/testcafe-docker.sh

WORKDIR /testcafe/
ENV HOME=/testcafe/project

RUN yarn global add \
    testcafe \
    typescript && \
    npm update

EXPOSE 1337 1338

ENTRYPOINT ["/scripts/testcafe-docker.sh"]