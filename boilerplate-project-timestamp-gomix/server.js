// server.js
// where your node app starts

// init project
var express = require('express');
var app = express();



// enable CORS (https://en.wikipedia.org/wiki/Cross-origin_resource_sharing)
// so that your API is remotely testable by FCC 
var cors = require('cors');
app.use(cors({optionsSuccessStatus: 200}));  // some legacy browsers choke on 204

app.get('/api/:date', (req,res)=>{

  //Test if in normal date format
  let test1 = /\d{4}[-]\d{2}[-]\d{2}|\s/;
  //Test if in Unix date format
  let test2 = /\d{10}/;

  let myDate = req.params.date

  if(test2.test(myDate)){
    let unixToInt = parseInt(myDate)
    let utc = new Date(unixToInt).toUTCString()
    res.json({'unix':unixToInt,'utc':utc})
  }
  else if(test1.test(myDate)){
    let date = new Date(myDate)
    let utc = date.toUTCString()
    let unix = date.getTime()
    res.json({'unix':unix,'utc':utc})
  }
  else{
    res.json({error:'Invalid Date'}) 
  }
})

app.get('/api', (req,res)=>{
    let unix = new Date().getTime()
    let utc = new Date(unix).toUTCString()
    res.json({'unix':unix,'utc':utc})
  })

// http://expressjs.com/en/starter/static-files.html
app.use(express.static('public'));

// http://expressjs.com/en/starter/basic-routing.html
app.get("/", function (req, res) {
  res.sendFile(__dirname + '/views/index.html');
});


// your first API endpoint... 
app.get("/api/hello", function (req, res) {
  res.json({greeting: 'hello API'});
});



// listen for requests :)
//  var listener = app.listen(process.env.PORT, function () {
//    console.log('Your app is listening on port ' + listener.address().port);
//  });
app.listen(3000)