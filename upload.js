require('dotenv').config();
const fs = require('fs');
const https = require('https');

const files = fs.readdirSync('./dist');

let modules = {};
files.forEach(file => {
  const moduleName = file.split('.js')[0];
  const content = fs.readFileSync('./dist/' + file).toString();
  modules = { ...modules, [moduleName]: content };
});

const data = {
  branch: 'default',
  modules,
};

var req = https.request({
  hostname: 'screeps.com',
  port: 443,
  path: '/api/user/code',
  method: 'POST',
  headers: {
    'Content-Type': 'application/json; charset=utf-8',
    'X-Token': 'b25e2994-fb7c-404b-aefd-dff17c9ecd45',
  },
});

req.write(JSON.stringify(data));
req.end();
