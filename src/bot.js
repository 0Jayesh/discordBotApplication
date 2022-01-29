require('dotenv').config();

var datab = [
    {
        "email" : "dummy10@gmail.com",
        "roleid" : 12999,
        "channel": 0,
        "enabled_disabled" : 1
    },
    {
        "email" : "dummy11@gmail.com",
        "roleid" : 13000,
        "channel": 0,
        "enabled_disabled" : 1
    },
    {
        "email" : "dummy12@gmail.com",
        "roleid" : 13001,
        "channel": 0,
        "enabled_disabled" : 0
    },
    {
        "email" : "dummy13@gmail.com",
        "roleid" : 13002,
        "channel": 0,
        "enabled_disabled" : 1
    },
    {
        "email" : "dummy14@gmail.com",
        "roleid" : 13003,
        "channel": 0,
        "enabled_disabled" : 0
    },
] 


const { GoogleSpreadsheet } = require('google-spreadsheet');

const fs = require('fs');


const Response_sheet_id = '10790b-qbTqnda9KWUFGn5QP1zYXxrj4EHq12VzgLLNM';

const Response_sheet_id2 = '1u4RHUS1MbiQ7_y6qz1inrDc2xpNw_01ye7I3MPcRumg';

const doc = new GoogleSpreadsheet(Response_sheet_id)
const doc2 = new GoogleSpreadsheet(Response_sheet_id2)

const Credentials = JSON.parse(fs.readFileSync('secretfile.json'))


const getRows = async (rows) => {
    
await doc.useServiceAccountAuth({
    client_email : Credentials.client_email,
    private_key: Credentials.private_key
});

await doc.loadInfo();
console.log(doc.title)

const sheet = doc.sheetsByIndex[0];

var rows = await sheet.getRows();

for(let index=0;index<rows.length;index++) {
    const row = rows[index];
        console.log(row.email)
        console.log(row.channel)
};
};

//add row to the sheet1
//LINK : "https://docs.google.com/spreadsheets/d/10790b-qbTqnda9KWUFGn5QP1zYXxrj4EHq12VzgLLNM/edit?usp=sharing"

const addRow = async (rows) => {
    
    await doc.useServiceAccountAuth({
        client_email : Credentials.client_email,
        private_key: Credentials.private_key
    });
    
    await doc.loadInfo();
    
    const sheet = doc.sheetsByIndex[0];

    
    for(let index=0;index<rows.length;index++) {
        const row = rows[index];
        await sheet.addRow(row);
    };
    };

// add row to the sheet2
//LINK : "https://docs.google.com/spreadsheets/d/1u4RHUS1MbiQ7_y6qz1inrDc2xpNw_01ye7I3MPcRumg/edit?usp=sharing"

const addRow2 = async (rows) => {
    
    await doc2.useServiceAccountAuth({
        client_email : Credentials.client_email,
        private_key: Credentials.private_key
    });
    
    await doc2.loadInfo();
    
    const sheet = doc2.sheetsByIndex[0];

    
    for(let index=0;index<rows.length;index++) {
        const row = rows[index];
        await sheet.addRow(row);
    };
    };
    

/*
    let r1 =[
        {
            email: "add@thistoo.com",
            roleid: "0000000000001111111111",
            channel: "000000009999999999"
        }
    ]

*/

const fs1 = require('fs')
const fs2 = require('fs')

const channelIDs = { channel1 : "936291346128445550", channel2 : "936291373613719593"  }


function checkChannelAvailable(name){
        for(let c in channelIDs)
        {
            if(c === name)
                {
                    return 1;
                }
        }
        return 0
}


function hasEmail(temp){
    for(var z=0;z<datab.length;z++)
        if(datab[z].email == temp)
            return 1;
        return 0;
}

var channelID;
function enabled_disabledd(temp){
    var q=0;
    if(hasEmail(temp) == 0)
        return 0;
    while(datab[q].email != temp)
        q++;
    if(datab[q].enabled_disabled == 1)
        return 1;
    return 0;
}

function getRoleID(temp)
{
    var q=0;
    while(datab[q].email != temp)
        q++;
    return datab[q].roleid
}

//console.log(getRoleID("dummy12@gmail.com"))

/*
function setChannelID(temp,channelID){
    var q=0;
    while(datab[q].email != temp)
        q++;
    datab[q].channel = channelID;
}
*/

var s1=1;
var s2=1;

const commonNameS1="channel1DB"
const commonNameS2="channel2DB"

/*
var str="name"
console.log(str)
var nnnn = 7;
str += s1;
console.log(str)
*/
//var dont=0;
var username=""
var myObj = Object.create({})
myObj["email"] = "";
myObj["roleid"] = 0;
myObj["channelid"] = 0;

const { Client,Intents, DiscordAPIError, Interaction, Application } = require('discord.js');
const client = new Client({ intents: [Intents.FLAGS.GUILDS, Intents.FLAGS.GUILD_MESSAGES] });

client.on('ready', () => {
    console.log(`${client.user.username} has logged in`);
})

client.on('messageCreate', async (message,guild) => {

    if(message.author.bot) return;
    var contentt = message.content.substring(0,6)
    console.log(contentt)
    if(contentt === "!join_")
        var checkingChannel = message.content.slice(6)
   // if(message.content === "!join_channel1" || message.content === "!join_channel2")
   if(checkChannelAvailable(checkingChannel))
        {
            if(message.author.bot) return;
            username = message.author.username
            message.reply("Please check your DM to verify your email id");
            var channelName = message.content.slice(6);
            const botmessage = await message.author.send("Please provide your registered emailID");
            const filter = (m) => {m.author.id === message.author.id};
            //the bot takes input from general channel not dm,could not figure this out
            const collector = message.channel.createMessageCollector(filter,{
                user : message.author.id,
                max : 1,
                time :300 * 1000 //5 minutes wait time
            });
            console.log("collector started..")
            collector.on('collect',msg => {
                var email = msg.content
                var rolee = 0; 
                var isPresent = hasEmail(msg.content)
                if(isPresent === 0 && contentt != "!join_")
                {
                    message.author.send("Sorry!,this email ID is not registered with us.Please enter a valid email address with which you registered.Type the commands again in bot channel to start the verification process again")
                    return;
                }
                else if(isPresent === 1) 
                {
                    message.author.send(`Please give me a minute,I am checking status...`)
                    if(enabled_disabledd(email) == 0)  
                        {
                        message.author.send("Sorry,cannot add to the group,try again later.")
                        return;
                        }
                    else
                    {
                        message.author.send("Congrats!,you are being added to the channel..")
                        rolee = getRoleID(email)
                        channelID = channelIDs[channelName]
                        console.log(channelID)
                        myObj.email = email;
                        myObj.roleid = rolee;
                        myObj.channelid = channelID;
                        console.log(myObj)
                        let jsonData = JSON.stringify(myObj,null,2);

                        if(channelName == "channel1")
                        {
                            /*
                            //every time name of json file will be different
                            var presentFileName = commonNameS1+s1;        
                            fs1.writeFile(presentFileName+'.json',jsonData,(err) => {
                                if(err)
                                return;
                             })
                             s1 += 1;
                             */
                             let r1=[];
                             r1[0] = myObj;
                             addRow(r1)
                             return
                        }

                        else 
                        {
                            /*
                            var presentFileName = commonNameS2+s2;
                            fs2.writeFile(presentFileName,jsonData,(err) => {
                                if(err)
                                return;
                             })
                             s2 += 1;
                             */
                             let r2=[];
                             r2[0] = myObj;
                             addRow2(r2)
                             return
                        }
                        
                        message.author.send("You data is added!!!")
                        const channel = client.channels.cache.find(channel => channel.name === channelName)
                        channel.send(`Welcome ${username} to the channel!!`)
                        return;
                    }
                    return;
                }
            })
        }
        /* some logical error
        else if(checkChannelAvailable(checkingChannel) == 0 && message.content.substring(0,6) === "!join_")
        {
            if(dont == 1)
                return
            message.reply("No such channel exists in the database!!")
            return
        }
        */
        
})

client.login(process.env.DISCORDJS_BOT_TOKEN);