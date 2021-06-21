// import { create, Client } from '@open-wa/wa-automate';
const wa = require('@open-wa/wa-automate');
const fs = require('fs')
var nodeCleanup = require('node-cleanup');
var fork = require('child_process').fork;




wa.create().then(client => start(client));

function start(client) {
  var chatSessions = [];


  client.onMessage(async message => {
    if(chatSessions.includes(message.from) == false){
      client.sendText(message.from, `👋 Hai! Terima kasih atas kepercayaan menjadi pelanggan setia PGN.
Berikut informasi yang dapat anda temukan melalui WA ini, silahkan kirim perintah dengan format berikut:
ℹ️ *!CatatMeter* -> Informasi mengenai Prosedur Catat Meter oleh petugas PGN, dan Catat Meter Mandiri yang dapat dilakukan oleh pelanggan.
ℹ️ *!JaminanPembayaran*  -> Informasi mengenai kebijakan Jaminan Pembayaran yang diterapkan oleh PGN
ℹ️ *!Denda*  -> Informasi mengenai denda dan ketentuan keterlambatan pembayaran tagihan Gas

📋 *!Menu* -> Menampilkan list perintah ini kembali
    `);
    chatSessions.push(message.from);
    }
    switch (message.body) {
      //Info Catat Meter
      case "!CatatMeter" :
        await client.sendText(message.from, `Terdapat 2 sistem cara pencatatan meter pelanggan di PGN.
        1. *Pencatatan meter oleh petugas yang dilakukan 3 bulan sekali.* Setiap wilayah di Area Lampung memiliki  jadwal catat meter yang berbeda beda beda.
        2. *Catat Meter Mandiri* yang dilakukan oleh pelanggan setiap bulan.
        `);
        client.sendText(message.from, `*Apa itu Catat Meter Mandiri?*
_Catat Meter Mandiri adalah kegiatan pelaporan foto meter yang dilakukan pelanggan setiap bulan._
Periode pencatatan adalah di *tanggal 1 s.d.  20 setiap bulannya*.
        `);
        client.sendText(message.from, `*Kemana dan bagaimana cara pengiriman foto untuk catat meter?*
_Foto meter dapat dikirimkan ke nomor WA terpusat *083820341177*_
Pada caption foto tuliskan: _(ID Reff Pelanggan)_ # _(Angka Meter)_
Contoh : *018123456#0000*
        `);
        client.sendContact(message.from, '6283820341177@c.us');
        client.sendImage(message.from, './cmm/cmm_tutorial.jpeg','cmm_tutorial',`TULISAN 018123456#0000 *Harus menjadi caption foto*, sehingga foto dan tulisan 018123456#0000 _terkirim dalam 1 chat_. 
Jika format pengiriman benar akan mendapat jawaban otomatis.`);

        client.sendImage(message.from, './cmm/cmm_salah.jpeg','cmm_salah', `CONTOH SALAH.
Jika foto dulu baru dikirimkan baru dilanjut tulisan 018123456#0000 maka hasil cmm akan menjadi berikut`);
        client.sendText(message.from, `Silahkan ketik *!Menu* untuk Menampilkan list perintah`)
        break;

      //Info Menu
      case "!Menu":
        await client.sendText(message.from, `👋Berikut informasi yang dapat anda temukan melalui WA ini, silahkan kirim perintah dengan format berikut:
        ✅ *!CatatMeter* -> Informasi mengenai Prosedur Catat Meter oleh petugas PGN, dan Catat Meter Mandiri yang dapat dilakukan oleh pelanggan.
        ✅ *!JaminanPembayaran*  -> Informasi mengenai kebijakan Jaminan Pembayaran yang diterapkan oleh PGN
        ✅ *!Denda*  -> Informasi mengenai denda dan ketentuan keterlambatan pembayaran tagihan Gas
        📋 *!Menu* -> Menampilkan list perintah ini kembali`);
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


nodeCleanup(function (exitCode, signal) {
    if (child !== null && signal === 'SIGINT')
        return false; // don't exit yet
    // release resources here before node exits
});
