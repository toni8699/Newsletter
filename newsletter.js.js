//jshint esversion:6
const express = require('express');
const parser = require('body-parser');
const https = require("https");
const request= require('request');


const bodyParser = require('body-parser');
const { json } = require('body-parser');
const { response } = require('express');



const app= express();
app.use(express.static('public'));

app.use(parser.urlencoded({extended:true}));

app.get('/', function(req,res){


        res.sendFile(__dirname+'/index.html');});



app.post('/', function(req,res){
    const fName = req.body.firstName;
    const lName = req.body.lastName;
    const email = req.body.email;
    
    const data = {
        members: [
            {
            email_address:email,
            status:"subscribed",
            merge_fields:{
                FNAME:fName,
                LNAME:lName,
            }
        }
      ]
    };
    const jsonData = JSON.stringify(data);
    const url ="https://us10.api.mailchimp.com/3.0/lists/bcb1f519ba"
    const options ={
        method:"POST",
        auth:"tonyle:b421cd97d043dc02141fc8c123478579-us10"
    }


   const request= https.request(url,options,function(response){
       if( response.statusCode ===200){
           res.sendFile(__dirname+"/success.html");
       }else{
           res.sendFile(__dirname+"/failure.html");
       }

        response.on('data', function(data){
            console.log(JSON.parse(data));
        });
  });
  request.write(jsonData);
  request.end();
});
app.post('/failure',function(req,res){
    res.redirect('/');});

    app.post('/success',function(req,res){
        res.redirect('/');});    

app.listen(process.env.PORT ||3000,function(){
    console.log("running on port 3000")
})

//API KEY b421cd97d043dc02141fc8c123478579-us10
//list id bcb1f519ba