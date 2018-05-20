FROM alpine:edge

RUN apk --no-cache --repository http://dl-3.alpinelinux.org/alpine/edge/testing/ add \
 nodejs nodejs-npm chromium nss chromium-chromedriver firefox xwininfo xvfb dbus eudev ttf-freefont fluxbox gawk yarn sudo tzdata

ENV TZ=Europe/Berlin
RUN cp /usr/share/zoneinfo/$TZ /etc/localtime && \
    echo $TZ > /etc/timezone && \
    apk del tzdata

COPY /scripts/testcafe-docker.sh /scripts/testcafe-docker.sh
RUN chmod +x /scripts/testcafe-docker.sh

RUN yarn global add \
    testcafe \
    typescript && \
    npm update

RUN adduser -D testcafe && \
    rm -rf /tmp/* \
    /var/cache/apk/* \
    /root/.npm \
    /root/.node-gyp \
    /usr/lib/node_modules/npm/man \
    /usr/lib/node_modules/npm/doc \
    /usr/lib/node_modules/npm/html \
    /usr/share/man

WORKDIR /testcafe/
ENV HOME=/testcafe/project
ENV CHROME_BIN=/usr/bin/chromium-browser
ENV CHROME_DRIVER_BIN=/usr/bin/chromedriver
ENV PATH=$PATH:/usr/bin/chromedriver

EXPOSE 1337 1338

ENTRYPOINT ["/scripts/testcafe-docker.sh"]