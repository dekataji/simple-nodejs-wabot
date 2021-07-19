// import { create, Client } from '@open-wa/wa-automate';
const wa = require('@open-wa/wa-automate');
const fs = require('fs');
const mime = require('mime-types');
var nodeCleanup = require('node-cleanup');
var fork = require('child_process').fork;



wa.create({
  useChrome: true,

}).then(client => start(client));
async function start(client) {
  client.sendText('6281225510541.c.us',"test");
}
 