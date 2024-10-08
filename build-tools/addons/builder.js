const fs = require('fs');
const jsdom = require('jsdom');
const { JSDOM } = jsdom;
const path = require('path');
var figlet = require('figlet');

const BUILD_PATH = '/dist';
const JS_PATH = '/js';
const jsURL = BUILD_PATH + JS_PATH + '/si-main-chunk.js';
const rootDir = process.cwd();

const ensureDirectoryExistence = (filePath) => {
  const dirname = path.dirname(filePath);
  if (fs.existsSync(dirname)) {
    return true;
  }
  ensureDirectoryExistence(dirname);
  fs.mkdirSync(dirname);
};

// Read the HTML file
fs.readFile(rootDir + BUILD_PATH + '/index.html', 'utf8', (err, html) => {
  if (err) {
    console.error('Error reading HTML file:', err);
    return;
  }

  //load JS scripts dynamically
  function createLoadJSScripts() {
    const { document } = new JSDOM(html).window;
    const allScripts = Array.from(document.querySelectorAll('script[src]'));
    return allScripts.map((script) => `gamingLoadJS("${script.src}");`).join('\n');
  }

  const loadJsScript = `
        var gamingLoadJS = function (path) {
            var script = document.createElement('script');
            script.src = path;
            script.type = 'text/javascript';
            document.body.appendChild(script);
        }
        ${createLoadJSScripts()}
    `;

  ensureDirectoryExistence(rootDir + jsURL);

  fs.writeFile(rootDir + jsURL, loadJsScript, (err) => {
    if (err) {
      console.error('Error writing JavaScript file:', err);
      return;
    }
    figlet('SI', function (err, data) {
      if (err) {
        console.log('Something went wrong...');
        console.dir(err);
        return;
      }
      console.log(data);
    });
    console.log('\x1b[32msi-main-chunk file created successfully.\x1b[0m');
  });
});
