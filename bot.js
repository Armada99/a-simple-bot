const Discord = require('discord.js');
const client = new Discord.Client();
var x="with your life";

client.on('ready', () => {
    client.user.setActivity(x); 
    console.log(`Logged in as ${client.user.tag}!`);
 });

client.on('message', msg => {

if(msg.author.bot) return;

if (msg.content === '!ping'){
    msg.channel.send("Pinging...").then(m =>{
        var ping = m.createdTimestamp - msg.createdTimestamp;
        
        m.edit(`:ping_pong: Pong!\nServer Ping : ${ping}ms\nAPI Ping : ${client.ws.ping}ms`); 
    }); return;
}
    
if(msg.content.startsWith('!repeat')&&msg.member.hasPermission("ADMINISTRATOR")){
    msg.delete();
    for (var i=1;i<=20;i=i+1)
    msg.channel.send(msg.content.substring(8));
}
	
if(msg.content.startsWith('!status')){
    console.log(`${msg.channel.name} : ${msg.author.username} - ${msg.content}`);
     if(!msg.member.hasPermission('ADMINISTRATOR')){
         msg.reply("No Perms Bro");
         return;
     }
    x = msg.content.substring(8);
    msg.channel.send("changed status to "+x);
    client.user.setActivity(x);
}

//if(msg.content.startsWith('!react')){
//    msg.member.lastMessage.react("a:blob:723014183645478912");
//}

if(msg.content.startsWith('!rules')){
    let rules= new Discord.MessageEmbed()
    .setColor('PINK')
    .setTitle('Please click me senpai , UwU')
    .setURL('https://discord.com/channels/667897677752696878/668242828006129664/684955600894951494');
    msg.channel.send(rules);
}


if(msg.content.startsWith('!spam')&&msg.author.id==='280745369707610114'){
    msg.delete();
    for (let i = 0;i<10;i++)
    msg.mentions.members.first().send(msg.content.substring(6));
    console.log('Finshed spamming '+msg.mentions.members.first().username+' with '+msg.content.substring(6));
}

if(msg.content.startsWith('!joinpos')){
    var pos=0;
    if(msg.content==='!joinpos')
        pos=JoinPos(msg.guild.members.cache,msg.author.id);
        else
        pos=JoinPos(msg.guild.members.cache,msg.mentions.members.first().id);
        
    msg.channel.send("Your Join Position is = "+pos);
}
function JoinPos(arr1,ID){
  
    arr1.sort((a, b) => a.joinedAt - b.joinedAt);
    const arr = arr1.keyArray();
    var pos=arr.indexOf(ID) + 1;
    return pos;
}
	
if(msg.content.startsWith(';ban')&&(msg.member.hasPermission('BAN_MEMBERS')||msg.author.id=='394964599801380865')){
    if(msg.mentions.users.first()==undefined) return;
    let em = new Discord.MessageEmbed()
        .setDescription(`<:Check:722874534210043934> ** ${msg.mentions.users.first().username}#${msg.mentions.users.first().discriminator} was banned** | ${msg.content.split(" ").slice(2).join(" ")}`)
        .setColor('GREEN'); 
    msg.channel.send(em);
}

if(msg.content==='!restart'&& msg.author.id==owner.id){
    msg.channel.send('Restarted.').then(() => {
  process.exit(1);
    })
}
});

client.login(process.env.BOT_TOKEN);
