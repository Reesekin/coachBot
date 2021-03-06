var sqlite3 = require('sqlite3').verbose();
var db = new sqlite3.Database('boomers.sqlite3');
var list = '';
db.serialize(function() {
  db.run("CREATE TABLE IF NOT EXISTS boomer (tag TEXT, id TEXT)");
  db.run("CREATE TABLE IF NOT EXISTS admins (tag TEXT, id TEXT)");

  console.log('\nCoach bot by :: Reesekin\n')
  console.log('Boomer list loaded:\n' 
            + '---------------------')
  db.all('SELECT tag FROM boomer', function(err, rows)
          {
            rows.forEach(function(row){
              console.log(row.tag);
            })
          })
  db.all('SELECT tag FROM boomer', function(err, rows)
          {
            rows.forEach(function(row){
              list += ", " + row.tag;
            })
          });


const token = '';
var Discord = require('discord.js');
var bot = new Discord.Client();
var isReady = true;
var opus = require('opusscript');
var samplingRate = 48000;
var frameDuration = 20;
var channels = 2;
const PREFIX = '$';

bot.on("ready", () => {
  bot.user.setActivity(`Left 4 Dead 2`);
});


bot.on('message', message  => {

  if (message.content === 'php') {
    message.reply('Watch out, boomer!');
  }


    if (message.content === '$op')   
    {
      if (message.member.hasPermission('KICK_MEMBERS', false, false)) {
      var admin = false;

      db.all('SELECT id FROM admins', function(err, rows)
      {
        rows.forEach(function(row){
          if (message.member.id == row.id) {
            admin = true;
          }
        })

        if (admin) {
          message.reply('you are already an admin')
        }

        else if (!admin){
          atmt.run(message.member.user.username, message.member.id);
          atmt.finalize();
          message.reply(' is now an admin!');
          console.log(message.member.user.username + ' is now an admin!');
        }

      });
    } 
    else if (message.member.id != '657004855956602930') { message.reply('Insufficient permissions!');}
  }


//reactions
  if (message.content !== ''){
  var chat = Math.floor((Math.random() * 100) + 1);
  if (chat < 20){
    db.all('SELECT id FROM boomer', function(err, rows)
          {
            rows.forEach(function(row){
              if (message.member.id === row.id)
                message.react('🆗')
                  .then(() => message.react('🅱'))
                  .then(() => message.react('🅾️'))
                  .then(() => message.react('🇴'))
                  .then(() => message.react('🇲'))
                  .then(() => message.react('🇪'))
                  .then(() => message.react('🇷'));
            });
          });
  }
}
  let args = message.content.substring(PREFIX.length).split(" ")

  let fMent = message.mentions.users.first()
  var stmt = db.prepare("INSERT INTO boomer VALUES (?, ?)");
  var atmt = db.prepare("INSERT INTO admins VALUES (?, ?)");

 
  if (args[1] == undefined && args[0] != 'boomer-list' && args[0].charAt(0) == '$') {}
    else {

      var admin = false;

      db.all('SELECT id FROM admins', function(err, rows)
      {
        rows.forEach(function(row){
          if (message.member.id == row.id) {
            admin = true;
          }
        })

      if (admin) {
    
    switch(args[0]){
      case 'boomerify':

      var vibeCheck = false;

      db.all('SELECT id FROM boomer', function(err, rows)
        {
          rows.forEach(function(row){
            if (fMent.id == row.id) {
              vibeCheck = true;
            }
          })
        if(!vibeCheck){
                list += ", " + fMent.username;
                stmt.run(fMent.username, fMent.id);
                stmt.finalize();
                message.reply('Boomer ' +  fMent.username + ' is added to the database of boomers!');
                console.log('Boomer ' +  fMent.username + ' is added to the database of boomers!');
              }
        else if (vibeCheck){
            message.reply('Boomer ' +  fMent.username + ' is already in the database of boomers!');
            console.log('Boomer ' +  fMent.username + ' is already in the database of boomers!');
        }
      })
        break;
      
      case 'boomer-list':
        message.reply('List of Boomers' + list);
        console.log(list);
        break;
      case 'boomer-remove':
        list = ''
        db.run("DELETE FROM boomer WHERE id = " + fMent.id);
        db.all('SELECT tag FROM boomer', function(err, rows)
        {
          rows.forEach(function(row){
            list += ", " + row.tag;
          })
        });
        message.reply( fMent.username + ' has been removed from the database of boomers.')
        break;
      case 'admin':
        
        var vibeCheck = false;

        db.all('SELECT id FROM admins', function(err, rows)
        {
          rows.forEach(function(row){
            if (fMent.id == row.id) {
              vibeCheck = true;
            }
          })
        if (vibeCheck){
          message.reply(fMent.username + ' is already an admin!');
            console.log(fMent.username + ' is already an admin!');
        }
        else if (!vibeCheck){
                atmt.run(fMent.username, fMent.id);
                atmt.finalize();
                message.reply(fMent.username + ' is now an admin!');
                console.log(fMent.username + ' is now an admin!');
            }
      });
      break;

      case 'remove-admin':
        db.run("DELETE FROM admins WHERE id = " + fMent.id);
        message.reply( fMent.username + ' has been removed from admins.')
        break;

      case 'help':
        message.reply( '```' + '🤮 Boomer bot written by Reesekin 🤢\n\n 📜Description: A bot that calls out boomers who join 🎤Voice Channels\n\n 💻Commands:\n\t $boomerify @name - adds boomer to the boomer-list\n\t $boomer-list - lists the boomers \n\t $boomer-remove @name - removes a person from the boomer list \n\t $admin @name - adds user to admin list \n\t $remove-admin @name - removes admin privileges ' + '```')
        break;
    }
  } else { if (message.member.id == '657004855956602930' && message.author.bot ){} else if ( !message.author.bot && message.content == '$' ) {message.reply('Insufficient permissions!')};}
});
}





  if (isReady && message.content === 'Boomer' && message.member.voiceChannel !== undefined)
  {
  isReady = false;
  var x = Math.floor((Math.random() * 4) + 1);
  console.log('Audio file:' + x);
  var voiceChannel = message.member.voiceChannel;
  voiceChannel.join().then(connection =>
  {
     const dispatcher = connection.playFile('./sounds/boomer' + x + '.mp3');
     dispatcher.on("end", end => {
        voiceChannel.leave();
       });
   }).catch(err => console.log(err));
   isReady = true;
  }
});

bot.on('voiceStateUpdate', async (oldMember, newMember) => {
  let newUserChannel = newMember.voiceChannel
  let oldUserChannel = oldMember.voiceChannel


  if(oldUserChannel === undefined && newUserChannel !== undefined) {

     // User Joins a voice channel
     db.all('SELECT id FROM boomer', function(err, rows)
     {
       rows.forEach(function(row){
         if(oldMember.id === row.id){
           console.log('\nBoomer detected! : ' + newMember.user.username);
          if (isReady)
            {
            isReady = false;
            var x = Math.floor((Math.random() * 4) + 1);
            console.log('\nAudio file:' + x);
            var voiceChannel = bot.channels.get(newMember.voiceChannelID);
            voiceChannel.join().then(connection =>
            {
             const dispatcher = connection.playFile('./sounds/boomer' + x + '.mp3');
             dispatcher.on("end", end => {
                voiceChannel.leave();
               });
           }).catch(err => console.log(err));
           isReady = true;
          }
         }
       })
     })
 

  } else if(newUserChannel !== undefined && oldUserChannel !== newUserChannel ){

    // User leaves a voice channel
    db.all('SELECT id FROM boomer', function(err, rows)
    {
      rows.forEach(function(row){
        if(oldMember.id === row.id){
          console.log('\nBoomer detected! : ' + newMember.user.username);
         if (isReady)
           {
           isReady = false;
           var x = Math.floor((Math.random() * 4) + 1);
           console.log('\nAudio file:' + x);
           var voiceChannel = bot.channels.get(newMember.voiceChannelID);
           voiceChannel.join().then(connection =>
           {
            const dispatcher = connection.playFile('./sounds/boomer' + x + '.mp3');
            dispatcher.on("end", end => {
               voiceChannel.leave();
              });
          }).catch(err => console.log(err));
          isReady = true;
         }
        }
      })
    })

  }
})

list = '';
bot.login(token);
});
