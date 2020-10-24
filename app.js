const express=require("express");
const bodyParser=require("body-parser");
const request=require("request");
const https=require("https");
const app=express();

app.use(bodyParser.urlencoded({extended:true}));
app.use(express.static("public"));
app.get("/",function(req,res)
{
  //res.send("yes it is running");
   res.sendFile(__dirname+"/signup.html");
});

app.post("/",function(req,res)
{
  const fname=req.body.firstname;
  const lname=req.body.lastname;
  const email=req.body.email;
  console.log(fname ,lname ,email);

  const data = {
  members: [
    {
      email_address:email,
      status:"sbscribed",
      merge_fields:{
        FNAME:fname,
        LNAME:lname
      }
    }
    ]
  };
  const url="https://server.api.mailchimp.com/3.0/lists/9a0cf73c25"

  const option={

    method:"POST",
    auth:"ritika:738c25ef41af019c90c39e1088723925-us2"
   }
//console.log("3");
  const jsonData=JSON.stringify(data);
const request=  https.request(url,option,function(response)
{//console.log("2");
  // if(response.statusCode===200)
  // {
  //   res.sendFile(__dirname+"/success.html");
  // }
  // else {
  //   res.sendFile("__dirname+"/failure.html);
  //
  //   }

response.on("data",function(data)
{ //console.log("1");
//console.log("dyewgywegdwje");
  console.log(JSON.parse(data));
})
})
request.write(jsonData);
request.end();
});


app.post("/failure",function(req,res)
{
  res.redirect("/");
})

app.listen(2000,function(){
  console.log("my server is running on the port 3000");
});
// 38c25ef41af019c90c39e1088723925-us2
// 9a0cf73c25
//9a0cf73c25
// 1baa29bf10c00201bdb9da2283a3bb40-us2
