const express=require("express");
const bodyParser= require("body-parser");
//const https =require("https");
//const request=require("request");
const mailchimp = require("@mailchimp/mailchimp_marketing");

const app=express();

app.use(bodyParser.urlencoded({extended:true}));
app.use(express.static("public"));

mailchimp.setConfig({
  apiKey: "98aeb33e5031d14e1f059f6911d4f17e-us2",
  server: "us2"
});
app.get("/",function(req,res)
{
  res.sendFile(__dirname+"/signup.html");
});

app.post("/",function(req,res)
{
  const fname=req.body.firstname;
  const lname=req.body.lastname;
  const email=req.body.email;
  console.log(fname, lname, email);
  async function run() {
    const response = await mailchimp.lists.addListMember("943ceced46", {

        email_address:email,
        status:"sbscribed",
        merge_fields:{
          FNAME:fname,
          LNAME:lname
        }

      });
    console.log("successfully suscribed");

  };

  run();

})

app.listen(3000,function()
{
  console.log("my server is running");
})
