const { create, Client} = require('@open-wa/wa-automate');
const { default: PQueue } = require("p-queue");

const queue = new PQueue({
  concurrency: 4,
  autoStart:false
   });

var unread =[];
var unique=[]

const proc = async (message) => {
  //do something with the message here
    //console.log(client);
    //console.log(message);
    //await client.sendText(message.from, 'Acknowledged');
    return String(message.from);
    //unread.push(String(message.from));
    //unique.push(unread[unread.length - 1]);
    //unique = unique.filter((v,i,a) => a.indexOf(v) === i);
    
}

const cobasend = async (message) =>{
  //await client.sendText(message.from, "tes");
  //console.log("pesan" + message.body)
  await client.sendText(message.from, "halo tes");
}

const processMessage = (message) => queue.add(()=>proc(message));

async function start(client) {
  const unreadMessages = await client.getAllUnreadMessages();
  client.unreadMessages.forEach((processMessage));
  
  
  
 
  
 

  //unread.forEach(cobasend);
  //await client.onMessage(processMessage);
  queue.start();
}

create().then(client => start(client));