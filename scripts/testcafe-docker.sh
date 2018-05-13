#!/bin/sh
set -x

cd $HOME
chmod -Rf 777 $HOME

yarn install
yarn check

dbus-daemon --session --fork
Xvfb :1 -screen 0 1920x1080x24 >/dev/null 2>&1 &
export DISPLAY=:1.0
fluxbox >/dev/null 2>&1 &
sleep 20

sudo -E -u testcafe node_modules/.bin/testcafe --ports 1337,1338 "$@"
export RESULT=$?

rm -rf .config .local .pki .dbus .gconf .mozilla .yarn .fluxbox

exit $RESULT
