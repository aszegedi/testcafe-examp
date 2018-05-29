/**
 * Optimized for Linux environment!
 *
 * If your CHROME_BIN is not on the defined path, you cannot run your tests with this. Please check the CHROME_BIN variable, and adjust if it is needed for you.
 */

import { CHROME_BIN } from './environment/environment';
import * as fs from 'fs';

const testcafeBrowserTools = require('testcafe-browser-tools');
const createTestCafe       = require('testcafe');
const stream               = fs.createWriteStream('result.xml');
let chromeInfo             = null;
let testcafe               = null;

testcafeBrowserTools
    .getBrowserInfo(`${CHROME_BIN}`)
    .then(browserInfo => {
        chromeInfo = browserInfo;

        chromeInfo.cmd = `${chromeInfo.cmd} --disable-web-security`;
    })
    .then(() => createTestCafe(null, 1337, 1338))
    .then(tc => {
        console.log(chromeInfo);

        testcafe = tc;
        const runner = testcafe.createRunner();

        return runner
            .src([
                './tmp/tests/loginTest.js',
                './tmp/tests/baseTest.js',
                './tmp/tests/credentialTest.js',
                './tmp/tests/clusterTest.js',
                './tmp/tests/storageTest.js'
            ])
            .browsers(chromeInfo)
            .reporter('spec')
            .reporter('xunit', stream)
            .screenshots('results/screenshots', true)
            .run({
                selectorTimeout: 20000,
                assertionTimeout: 120000,
                pageLoadTimeout: 60000,
                speed: 0.5
            })
            .then(failedCount => {
                console.log('Tests failed: ' + failedCount);
                return testcafe.close();
            });
    });

