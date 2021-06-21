// import { create, Client } from '@open-wa/wa-automate';
const wa = require('@open-wa/wa-automate');
const fs = require('fs')
var nodeCleanup = require('node-cleanup');
var fork = require('child_process').fork;


//TODO:
//filter pesan CMM


wa.create().then(client => start(client));

function start(client) {
  var chatSessions = [];


  client.onMessage(async message => {
    if(chatSessions.includes(message.from) == false){
      client.sendText(message.from, `👋 Hai! Terima kasih atas kepercayaan Anda menjadi pelanggan setia PGN.
    `);
    chatSessions.push(message.from);
    }
    switch (message.body.toLowerCase()) {
      
      //Info Catat Meter
      case "1":
      case "!catatmeter" :
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
      //Info Jaminan Pembayaran
      case "2":
      case "!jaminanpembayaran":
        await client.sendText(message.from, `*Apa itu Jaminan Pembayaran?*
_Jaminan Pembayaran adalah komitmen yang disediakan Pelanggan kepada PGN dalam bentuk uang uang tunai._
        `);
        client.sendText(message.from, `📝 Berikut pertanyaan yang sering muncul mengenai Jaminan Pembayaran:
4️⃣ atau *!Tagihan* -> Kenapa tagihan gas sekarang naik?
5️⃣ atau *!Siapa*  -> Siapa saja pelanggan yang dikenakan Jaminan Pembayaran?
6️⃣ atau *!UntukApa*  -> Digunakan untuk apa dana Jaminan Pembayaran tersebut?
7️⃣ atau *!Berapa*  -> Berapa nilai Jaminan Pembayaran yang harus dibayar Pelanggan?
8️⃣ atau *!Manfaat* -> Apa manfaat Jaminan Pembayaran bagi Pelanggan?
        `);
        client.sendText(message.from, `Silahkan ketik *!Menu* untuk Menampilkan list perintah`)
        break;

      //Siapa yang kena JP?
      case "5":
      case "!siapa":
        await client.sendText(message.from, `*Siapa saja pelanggan yang dikenakan Jaminan Pembayaran?*
  _Jaminan Pembayaran berlaku bagi:_
  a.	Calon Pelanggan yang mengajukan permohonan berlangganan Gas.
  b.	Pelanggan eksisting yang:
      i.	*Terlambat membayar* (lebih dari periode pembayaran tanggl 1 s.d. 20 setiap bulannya)
      ii.	*Memiliki tunggakan tagihan*
        `);
        break;

      //JP Untuk apa?
      case "6":
      case "!untukapa":
        await client.sendText(message.from,`*Digunakan untuk apa dana Jaminan Pembayaran tersebut?*
_Jaminan Pembayaran tersebut digunakan sebagai *dana talangan* apabila pelanggan *terlambat membayar atau memiliki tunggakan*._
*Selama dana Jaminan Pembayaran masih mencukupi* untuk menjadi dana talangan, maka setiap terjadi keterlambatan pembayaran, Jaminan Pembayaran tersebut akan dikurangi sebesar tagihan bulan berjalan.
        `);
        break;

      //Berapa JP?
      case "7":
      case "!berapa":
        await client.sendText(message.from,`*Berapa nilai Jaminan Pembayaran yang harus dibayar Pelanggan?*
_Nilai Jaminan Pembayaran yang dibayarkan *berbeda* untuk setiap  pelanggan. Karena nilai Jaminan Pembayaran didasarkan pada rata-rata pemakaian pelanggan dalam 1 tahun._ 
Adapun rumus perhitungan Jaminan Pembayatan adalah :
*Rata-rata Pemakaian gas 1 tahun x 2 bulan x Harga Gas*
_Misalnya Pemakaian rata-rata 25 M3/bulan, maka 25 M3 x 2 bulan x Rp. 6.200 M3/bulan = Rp. 310.000,-_        
        `);
        break;

      //Manfaat JP?
      case "8":
      case "!manfaat":
        await client.sendText(message.from, `*Apa manfaat Jaminan Pembayaran bagi Pelanggan?*
a.	Mengurangi resiko pelanggan *_terkena denda_* saat ada keterlambatan pembayaran.
b.	Mengurangi resiko meter *_disegel_* apabila memiliki tunggakan pembayaran 2 bulan.
c.	Mengurangi resiko meter *_dicabut_* apabila memiliki tunggakan pembayaran 3 bulan.
Jaminan Pembayaran *akan dikembalikan saat pelanggan berhenti berlangganan.*
      `);
        break;

      case "3":
      case "!denda":
        await client.sendText(message.from,`
      <TODO>`);
      client.sendText(message.from, `Silahkan ketik *!Menu* untuk Menampilkan list perintah`);

      //Info Menu
      default:
      case 0:
      case "!menu":
        await client.sendText(message.from, `📝 Berikut informasi yang dapat anda temukan melalui WA ini, silahkan kirim perintah dengan format berikut:
1️⃣ atau *!CatatMeter -> Informasi mengenai Prosedur Catat Meter oleh petugas PGN, dan Catat Meter Mandiri yang dapat dilakukan oleh pelanggan.
2️⃣ atau *!JaminanPembayaran*  -> Informasi mengenai kebijakan Jaminan Pembayaran yang diterapkan oleh PGN
3️⃣ atau *!Denda*  -> Informasi mengenai denda dan ketentuan keterlambatan pembayaran tagihan Gas
        
4️⃣ atau *!Tagihan* -> Kenapa tagihan gas sekarang naik?
5️⃣ atau *!Siapa*  -> Siapa saja pelanggan yang dikenakan Jaminan Pembayaran?
6️⃣ atau *!UntukApa*  -> Digunakan untuk apa dana Jaminan Pembayaran tersebut?
7️⃣ atau *!Berapa*  -> Berapa nilai Jaminan Pembayaran yang harus dibayar Pelanggan?
8️⃣ atau *!Manfaat* -> Apa manfaat Jaminan Pembayaran bagi Pelanggan?
        
*_Untuk pertanyaan dan keluhan lainnya silahkan menghubungi contact center PGN di 1500-645_*
        
0️⃣ atau *!Menu* -> Menampilkan list perintah ini kembali
        `);
        break;

      //Info Tagihan Naik
      case "4":
      case "!tagihannaik":
        await client.sendText(message.from,`*Kenapa tagihan gas sekarang naik?*
Kenaikan tagihan gas pelanggan bisa diakibatkan oleh beberapa hal, salah satunya adalah biaya Jaminan Pembayaran.
        `);
        break;
      }
  });
}


nodeCleanup(function (exitCode, signal) {
    if (child !== null && signal === 'SIGINT')
        return false; // don't exit yet
    // release resources here before node exits
});

nodeCleanup();