// import { create, Client } from '@open-wa/wa-automate';
const wa = require('@open-wa/wa-automate');
const fs = require('fs')


wa.create().then(client => start(client));

function start(client) {
  client.onMessage(async message => {
    switch (message.body) {
      case "Hi":
        await client.sendText(message.from, '👋 Hello! Berikut yang bisa saya lakukan:');
        client.sendText(message.from, '!Absenkesehatan = isi absen kesehatan harian di pgn.id/AbsenKesehatan');
        break;

      case "!AbsenKesehatan":
       await client.sendText(message.from, 'Siap Bos! Kita isi absen kesehatanmu :)');
        const spawn = require("child_process").spawn;
        const abKes = spawn('python3', ["autoAbkes.py"]);

        abKes.stdout.on('data', function(data) {
            client.sendText(message.from, 'Lapor! Selesai mengisi absen kesehatan, ini buktinya bos!');
            try {
              client.sendImage(message.from, 'screenshot.png');
              
              client.sendImage(message.from, 'screenshot1.png');
              
              client.sendImage(message.from, 'screenshot2.png');

              fs.unlinkSync('screenshot.png');
              fs.unlinkSync('screenshot1.png');
              fs.unlinkSync('screenshot2.png');
            }catch(err){
              client.sendText(message.from, 'Maaf bos, lagi error nih :/');
              //client.sendText(message.from, err.text);
              console.log(err)
            }
        });
        break;
      }
  });
}
