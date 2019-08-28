const fs = require('fs-extra');
const concat = require('concat');

(async function build() {
  const files = [
    './dist/hello-without-router/runtime-es2015.js',
    './dist/hello-without-router/polyfills-es2015.js',
    './dist/hello-without-router/scripts.js',
    './dist/hello-without-router/main-es2015.js'
  ];

  await fs.ensureDir('elements');
  await concat(files, 'elements/hellojs/hello-app.js');
})();
