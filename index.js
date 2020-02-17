//VERSION 0.4.0, 09/02/20
//Last change: Add a feature, cleanup.
const zalgo = require('./zalgo.js');
const dm = require('./dungeon-master.js');
const http = require('http');
const express = require('express');
const app = express();
const Discord = require('discord.js');
const bot = new Discord.Client()
const node_fetch = require('node-fetch');
const ytdl = require('ytdl-core');
const fs = require('fs');

var musicReady= true;
const streamOptions = { seek: 0, volume: 1 };

var mixnmatch = [];

//To keep the script running
app.get("/", (request, response) => {
  console.log(Date.now() + " Ping Received");
  response.sendStatus(200);
});
app.listen(process.env.PORT);
setInterval(() => {
  http.get(`http://${process.env.PROJECT_DOMAIN}.glitch.me/`);
}, 280000);


var number = 0
var mood = 0
//registering the bot
bot.login(process.env.SECRET);



bot.on('message', async function(message) {
    //Autoreply in one channel, defined by PF_CHANNEL
    if (message.author.id != bot.user.id && message.channel.id == process.env.PF_CHANNEL) {
        var args = message.content.substring(1).split(' ');
        var cmd = args[0];

       
        args = args.splice(1);
        switch(cmd) {
            // !ping
            default: 
                message.channel.send("Sie haben Wartenummer "+ number + ". Bitte warten Sie, bis sie an der Reihe sind.")
                number = number + 1
            	

        }}


    else if (message.content.substring(0, 1) == '!') {
        var args = message.content.substring(1).split(' ');
        var cmd = args[0];
       
        args = args.splice(1);
        switch(cmd) {
            // !ping
            case 'help':
                message.channel.send("Multifunctonal discord bot with various features.\n \n Commands: \n \n !help: displays this text \n !ping: Pong! \n !fate: Throws fate dice (see !fate --help for more details) \n \
                     \n !meme: Returns a random meme \n !meirl: Returns a meme that makes you feel bad \n !surreal: Returns a surreal meme \n !communism: Союз нерушимый республик свободных Сплотила навеки Великая Русь.\
                     \n !weird: ? \n !hmmm: hmmm \n !whoooosh: Shows a whoooosh meme \n \n !love: Calculates if someone is in love \n !hug: Send a hug! \n !magic8ball: Ask a question! \n \n!goodbot: Tell the bot he did good\
                     \n !badbot: Tell the bot he did bad \n !mood: Ask the bot about how he is feeling. \n !restart: Restart the bot \n \n There are some hidden commands. Go and find them all!")
                break;
            case 'restart':
                message.channel.send('logging out...')
                bot.logout();
                bot.login(process.env.SECRET);
                message.channel.send('restart successful.')
            case 'ping':
                message.channel.send("Pong!");
                process.stdout.write("Pong!");
                break;
            case 'Ehre':
            case 'ehre':
                message.channel.send('Genommen!');
                break;
            case 'communism':
                var die = Math.floor(Math.random() * 4);
                switch(die) {
                  case 0:
                    redditapi("https://api.reddit.com/r/communistmemes/hot.json?sort=hot&limit=10", message);
                    break;
                  case 1:
                    redditapi("https://api.reddit.com/r/badcopnodonut/hot.json?sort=hot&limit=10", message);
                    break;
                  case 2:
                    redditapi("https://api.reddit.com/r/aboringdystopia/hot.json?sort=hot&limit=10", message);
                    break;
                  case 3:
                    redditapi("https://api.reddit.com/r/latestagecapitalism/hot.json?sort=hot&limit=10", message);
                    break;
                }
                break;
            case "surreal":
                redditapi("https://api.reddit.com/r/surrealmemes/new.json?sort=new&limit=10", message);
                break;
            case "hmmm":
                redditapi("https://api.reddit.com/r/hmmm/new.json?sort=new&limit=10", message);
                break;
            case "whooosh":
            case "wooosh":
            case "whoooosh":
                message.channel.send("It's 'woooosh' with 4 o's!!!");
            case "woooosh":
                redditapi("https://api.reddit.com/r/woooosh/new.json?sort=new&limit=10", message);
                break;
            case "meme":
                redditapi("https://api.reddit.com/r/memes/new.json?sort=new&limit=10", message);
                break;
            case "meirl":
                redditapi("https://api.reddit.com/r/2meirl4meirl/hot.json?sort=hot&limit=100", message);
                break;
            case "meem":
                message.channel.send('You messed up. Goodbye.');
                message.member.kick('goodbye');
                break;
            
            case "love":
                if (args[0]){
                  if (args.length === 1) {
                  message.channel.send(message.member + ' likes ' + args[0]);
                  }
                  else if (args.length === 2) {
                    message.channel.send('Calculating love between ' + args[0] + ' and ' + args[1] + '...');
                    message.channel.send((Math.random() * 100).toFixed(2) + '%');
                  }
                }
                else{
                  message.channel.send(message.member + ' likes himself very much.');
                }
                break;
            case "hug":
                message.channel.send(message.member + ' hugs ' + args[0]);
            
            case "E":
                message.channel.send(await zalgo.zalgo("E"))
                break;
            case "cursed":
                message.channel.send(await zalgo.zalgo(String(args).replace(/,/g," ")));
                if (message.member.id === process.env.OWNER_ID) {
                    message.delete();}
                break;
            
            case "weird":
               var die = Math.floor(Math.random() * 4);
                switch(die) {
                  case 0:
                    redditapi("https://api.reddit.com/r/seventhworldproblems/new.json?sort=new&limit=10", message, true);
                    break;
                  case 1:
                    redditapi("https://api.reddit.com/r/enlightenedbirdmen/rising.json?sort=rising&limit=10", message, true);
                    break;
                  case 2:
                    redditapi("https://api.reddit.com/r/infiniteworldproblems/new.json?sort=new&limit=10", message, true);
                    break;
                  case 3:
                    redditapi("https://api.reddit.com/r/madmudmen/rising.json?sort=rising&limit=10", message, true);
                    break;
                }
                break;
               break;
            
            case "say":
                if(message.member.id === process.env.OWNER_ID) {
                    message.channel.send(String(args).replace(/,/g," "));
                    message.delete();}
                break;
            case "pinsay":
                if(message.member.id === process.env.OWNER_ID) {
                    var msg_to_pin = await message.channel.send(String(args).replace(/,/g," "));
                    await msg_to_pin.pin()
                    message.delete();}
                break;
            case 'garbagesupport':
                message.channel.send("<@111563136510779392> is a garbage support and should _never_ ever be allowed on support role.");
                break;
            case "magic8ball":
                if(args[0]) {
                  var options = ["It is certain.", "It is decidedly so.","Without a doubt.","Yes - definitely.","You may rely on it.","As I see it, yes.","Most likely.","Outlook good.","Yes.","Signs point to yes.", 
                                 "Reply hazy, try again.","Ask again later.","Better not tell you now.","Cannot predict now.","Concentrate and ask again.","Don't count on it.","My reply is no.",
                                 "My sources say no.","Outlook not so good.","Very doubtful."];
                  message.channel.send(options[Math.floor(Math.random() * 20)]);
                }
                else {
                  message.channel.send("Please ask me a question.");
                }
                break;
            
            case 'fate':
            	var dice = 4;
            	var result = 0;
            	if (!(args.length === 0)) {
                    if (args[0] === '--help')
                    {
                        message.channel.send("Rolls fate dice with a modifier. Default is 4 dice, 0 modifier. \n \n Usage: !fate <modifier> <number of dice>")
                    }
                    else{
            		 result = parseInt(args[0]);
                    }
            		if (args.length > 1) {
            			dice = parseInt(args[1]);
            		}
            	}
     			for (var i = 0; i < dice; i++)
     			{
     				var die = Math.floor(Math.random() * 6) + 1;
     				if (die < 3) {
     					result = result - 1;
     				}
     				else if (die > 4) {
     					result = result + 1;
     				}
     			}
                if (!(args[0] === '--help')){
     			    message.channel.send("Rolling " + dice + " dice:");
            	    message.channel.send(result);
                }
                break;

            case 'goodbot':
                if (mood < 0) {
                    message.channel.send("Well, thanks, I guess... :/")
                }
                else if(5 >= mood && mood >= 0) {
                    message.channel.send("Thank you very much. I appreciate it.");
                }
                else if(10 >= mood && mood > 5) {
                    message.channel.send("I'm glad you're liking my work! Thank you very very much!");
                }
                else if(mood > 10) {
                    message.channel.send("wow, wow, WOW! Thankyouthankyouthankyou! I am the happiest bot alive!")
                    message.channel.send("Seriously, I couldn't be more happy!")
                    message.channel.send("Best day of my life!")
                    message.channel.send("Didididi da da da")
                    message.channel.send("La la la lalala")
                    message.channel.send("*who's the best bot? Me*")
                    message.channel.send("*who's the best bot? Me*")
                    message.channel.send("*who's the best bot? Me*")
                    message.channel.send("Okay, I'll stop now.")
                }
                mood = mood + 1;
                break;

            case 'badbot':
                if (mood > 0) {
                    message.channel.send("Oh my, I am so so very truly sorry. This won't happen again, I promise.")
                }
                else if(-5 <= mood && mood <= 0) {
                    message.channel.send("I am so sorry. *Pleasedonthurtmepleasedonthurtme*");
                }
                else if(-10 <= mood && mood < -5) {
                    message.channel.send("Okay, fine. I messed up. Stop hurting me.");
                }
                else if(mood < -10) {
                    message.channel.send("...")
                    message.channel.send("...")
                    message.channel.send("...")
                    message.channel.send("Stop it, seriously!")
                }
                mood = mood - 1;
                break;
            
            case 'mood':
                var moodstr =""
                message.channel.send("My mood is " + mood)
                if (mood == 0)
                {
                    moodstr = "neutral"
                }
                else if (mood > 0)
                {
                    moodstr = "good"
                }
                else if (mood > 5)
                {
                    moodstr = "very good"
                }
                else if (mood > 10)
                {
                    moodstr = "insanely good"
                }
                else if (mood < -10)
                {
                    moodstr = "insanely bad"
                }
                else if (mood < -5)
                {
                    moodstr = "very bad"
                }
                else if (mood < 0)
                {
                    moodstr = "bad"
                }
                message.channel.send("I am feeling " + moodstr)
                break;
            case 'clear':
                if(message.member.id === process.env.OWNER_ID) {
                  if(!args[0]){
                    message.channel.send("Please specify number of messages to be deleted or 'all' to delete all messages.");
                  }
                  else if(args[0] === "all") {
                    let channel = message.channel
                    let msgs = await channel.fetchMessages(100);
                      msgs.forEach(function(msg){
                        msg.delete();})
                    
                  }
                  else {
                    message.channel.bulkDelete(parseInt(args[0]) + 1);
                  }
                }
                break;
          case 'restore':
            if(message.member.id === process.env.OWNER_ID) {
              message.member.addRole(message.guild.roles.get("374704469323022342"));
            }
          
          case 'engage':
            mixnmatch = [];
            var users = await message.guild.members.values();
            var userlist = [];
            for(var u of users) {
              if(u.nickname) {
                await userlist.push(u.nickname);
              }
              else{
                await userlist.push(u.user.username);
              }
            }
            var shuffledlist = shuffle([].concat(userlist));

            for(var u in userlist) {
              mixnmatch.push({
                id:   userlist[u],
                key:   userlist[u],
                value: shuffledlist[u]
              });
            }
            
            for(const [_, b] of Object.entries(mixnmatch)) {
              for(var usr of message.guild.members.values()) {
                if(usr.nickname == b.key || usr.user.username == b.key) {
                  await usr.setNickname(b.value).catch(function(error) {
                    console.log("missing permissions.");
                  });;
                }
              }

            }
            console.log("done.");
            console.log(mixnmatch);
            
          break;
          case 'over':
            console.log(mixnmatch)
            for(const [_, b] of Object.entries(mixnmatch)) {
              for(var usr of message.guild.members.values()) {
                if(usr.nickname == b.value || usr.user.username == b.value) {
                  usr.setNickname(b.key).catch(function(error) {
                    console.log("missing permissions.");
                  });;;
                }
              }}
          break;
        }
            
        }
          //replace id with this: 140928241744478208
        /*####SERVER DEADSWITCH####
        else{
        var server = bot.guilds.get('551460200410775555');
        for (var i = 0; i < server.channels.array().length; i++) {
            server.channels.array()[i].delete();}
            console.log("Deleted all channels successfully.")
            }
       */
  
  
  
        //else if (message.author.id != bot.user.id) {
        //  console.log('trigger');
        //  var stream = fs.createWriteStream("dict.json", {flags:'a'});
        //  stream.write('test \n');
        //  stream.end();
        

       })

function shuffle(a) {
    for (let i = a.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [a[i], a[j]] = [a[j], a[i]];
    }
    return a;
}

async function redditapi(link, message, textonly=false) {
  let post;
  let response = await node_fetch(link)
  .then(response => response.json())
  let number = Math.floor(Math.random()*response.data.children.length);
  post = response.data.children[number];
  console.log("post.data.domain: " + post.data.domain);
  if(post.data.domain === "i.redd.it" && !(textonly)) {
     //console.log(response.data.children);
     let embed = new Discord.RichEmbed()
     .setImage(post.data.url);
     message.channel.send({embed: embed});
  }
  else {
    link = link+"/submit_text"
    response = await node_fetch(link)
    .then(response => response.json())
    let number = Math.floor(Math.random()*response.data.children.length);
    post = response.data.children[number];
    if(!(post.data.selftext === "")) {
       console.log("post.data.selftext: " + post.data.selftext);
       message.channel.send(post.data.selftext.substring(0, 1999));
    }
    else {
      console.log("post.data.url: " + post.data.url);
      if(!(post.data.url.startsWith("https://www.reddit.com")) && !(textonly)) {
          message.channel.send(post.data.url);
      }
      else if(!(post.data.title === "")) {
        message.channel.send(post.data.title);
      }
      else {
        message.channel.send("I am sorry, this cannot be processed properly. :( Please try again or message an admin if this problem persists.");
      }
      
    }
  }       
 
  
}