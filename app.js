 const express = require("express");
 const bodyParser = require("body-parser");
 
 const https = require("https");
 const app = express();
 app.use(bodyParser.urlencoded({extended: true}));
 app.get("/",function (req,res){
     res.sendFile(__dirname + "/index.html");
  });

  app.post("/",function (req,res){
   const city = req.body.city;
   const url = "https://api.openweathermap.org/data/2.5/weather?q="+ city + "&appid=ff12519989eb3e804c502ba8891fc593&units=metric";
   https.get(url,function (response){
     
       console.log(response.statusCode);

       response.on("data",function (data){

            const weatherdata = JSON.parse(data);
            const temp = weatherdata.main.temp;
            const weatherdescription = weatherdata.weather[0].description;
            const icon = weatherdata.weather[0].icon;
            const Imageurl = "https://openweathermap.org/img/wn/" + icon +"@2x.png"; 
            res.write("<p> The weather is  " + weatherdescription + "</p>");
            res.write("<h1> The temperature of "+ city + " is " + temp + " degree celcius.</h1>"); 
            res.write("<img src =" + Imageurl+ ">");
            res.send();
       });
   });
  })
 app.listen("3000",function (){ 
    console.log("Server Initiated at port 3000");
 });