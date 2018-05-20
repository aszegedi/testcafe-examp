import { CHROME_BIN } from './environment/environment';
import * as fs from 'fs';

const testcafeBrowserTools = require('testcafe-browser-tools');
const createTestCafe       = require('testcafe');
const stream               = fs.createWriteStream('result.xml');
let runner                 = null;
let chromeInfo             = null;

testcafeBrowserTools
    .getBrowserInfo(`${CHROME_BIN}`)
    .then(res => {
        chromeInfo = res;

        console.log(chromeInfo);
        chromeInfo.cmd = `${chromeInfo.cmd} --no-sandbox --disable-web-security --start-maximized`;
    })
    .then(() => createTestCafe()).then(testcafe => {
        runner = testcafe.createRunner();

        return runner.src([
            './tmp/tests/loginTest.js',
            './tmp/tests/baseTest.js',
            './tmp/tests/credentialTest.js',
            './tmp/tests/clusterTest.js',
            './tmp/tests/storageTest.js'
        ]).browsers(chromeInfo)
          .reporter('xunit', stream)
          .screenshots('results/screenshots', true)
          .run({
            selectorTimeout: 50000,
            assertionTimeout: 7000,
            pageLoadTimeout: 8000,
            speed: 0.5
        }).then(failedCount => {
            console.log('Tests failed: ' + failedCount);
            testcafe.close();
        });

});
