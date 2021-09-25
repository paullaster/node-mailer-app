//import express
const express = require("express");
const fs = require("fs");
const csv = require("csv-parser");
const nodemailer = require("nodemailer");
const xoauth2 = require("xoauth2");

//import local modules
const config = require("./config");

//Initialize App
const app = express();

//App variables
const PORT = 343434;
const registeredMembers= [];

//Auth email service
let transporter = nodemailer.createTransport({
    service: 'gmail',
    tls: {
        rejectUnauthorized: false
    },
    auth: {
        user: config.User,
        pass: config.Password,
    }
});
//Read from csv file
fs.createReadStream('MMU_Hackathon_2021 (Responses) - Form Responses 1 (2).csv')
.pipe(csv())
.on('data', (data) => registeredMembers.push(data))
.on('end', ()=>{
    for (let i of registeredMembers){
        //console.log(i.Name, i.Email)
        //Initiate sender email
        let mailOptions = {
            from: config.User,
            to: i.Email,
            subject: `<h1>UNIQUE CODE FOR MMU DATA SCIENCE HACKATHON 2021</h1>`,
            text: `<h2>Dear ${i.Name}</h2>
                    <p>We are honestly grateful for dedicating your time to <br>
                    participate in <b>MMU DATA SCIENCE HACKATHON 2021</b>.<br>
                    Now that the time has come to grow your knowledge further by <br>
                    solving a real world challenge to immence your confidence, <br>
                    we want to wish you all the best! <br> Please <b>NOTE:</b> <br>
                    <ol>
                    <li>This challenge was only open to MMU students</li>
                    <li><b>DO NOT SHARE THE CODE TO THIS CHALLENGE TO ANYBODY!</b> <br> If you share the CODE you'll be disqualified from the competition</li>
                    <li>Read the instructions to the challenge carefully on <br> <a href=\"https://zindi.africa/hackathons/vehicle-insurance-claim-hackathon\"></a> </li>
                    <li><b> THE SECRET CODE TO THE HACKATHON IS : ${config.HackathonPass}</b></li>
                    </ol>
                    We wish you all the best! <br>
                    
                    <b>Regars,</b>,<br>
                    <b>Paullaster Okoth (0700258098)</b><br>
                    <b>On Behalf of the entire Organizing team</b>
                    </p>

                    <h3>Proudly brought to you by: ZINDI Africa and MMU CIT CLUB</h3>`
    
        };
        transporter.sendMail(mailOptions, (error, info)=>{
            if(error){
                console.log(error);
            }else{
                console.log(`Email sent ${info.response}\t ${i.Email} \t ${i.Name}`)
            }
        });
    }
})
//listening on the port
app.listen(() =>{
    console.log(`Hackathon Node Mailer APP is running on PORT ${PORT}`);
});