/* ***************** /
Meraki Dashoard API Express Server

Supports redirects with custom recursive request function.

/ ****************** */


// Environment 

// External Configuration File
var configs = require('./config/merakiConfigs.js');


/* Local Configuration alternative
var configs = {
    apiKey: 'YourAPIKey',
    apiUrl: 'https://api.meraki.com/api/v0'
};
*/

/* ****************** */
var port = process.env.PORT || 8088;
var express = require('express');
//var request = require('request'); // Does not properly handle Meraki redirects
var requestMeraki = require('./request-meraki');
var path = require('path');
var serveStatic = require('serve-static');
var bodyParser = require('body-parser');
var history = require('connect-history-api-fallback');
var axios = require('axios');
var app = module.exports = express();
var jsonParser = bodyParser.json();



// Development Tools
/*
var morgan = require('morgan');
app.use(morgan('dev'))

var globalLog = require('global-request-logger');
globalLog.initialize();

globalLog.on('success', function(request, response) {
  console.log('SUCCESS');
  console.log('Request', request);
  console.log('Response', response);
});
 
globalLog.on('error', function(request, response) {
  console.log('ERROR');
  console.log('Request', request);
  console.log('Response', response);
});
*/


// ********
// MEWS API
// ********

// Email auth
app.post('/mews/auth/email', function (req, res) {
  console.log('mews/auth body',req.body);
  // verify mews.emailAuth().then...
  res.send('POST request to the homepage')
})

// Last name and room number

// Loyalty

// ********
// Meraki API
// ********



const meraki = axios.create({
  baseURL: 'http://localhost:' +port+'/api', // use api proxy  //'http://localhost:8088/api', //configs.apiUrl,
  headers: { 
    'X-Cisco-Meraki-API-Key': configs.apiKey,
    'Content-Type': "application/json"
   }
});

// Meraki Error Handler (parses the error message within responses)
function _handleError(e) {
  console.log("error in Meraki API call: ", e);
  if (e.message) { e = e.message }
  if (e.response) {
    if (e.response.data) {
      // Meraki specific error message
      if (e.response.data.errors) {
        console.log(e.response.data.errors[0]);
        e = e.response.data.errors[0];
      }
    } else {
      console.log(e.response)
      e = e.response;
    }
  } else {
    console.log(e);
  }
  return e;
}

meraki.interceptors.response.use(
  res => {
    console.log('meraki response', res.status)
    return res;
  },
  error => {
    return _handleError(error);
  }
);


async function getNetworkId(orgId, mac){
  return await getOrgDevices(orgId).then((res) =>{
    //console.log('Org devices, ',res);
    const network = [] = res.filter(function( obj ) {
      return obj.mac == mac;
    });
    console.log('filtered network ', network);
    console.log('filtered network ID ', network[0].networkId);
    return network[0].networkId;
  });
  //console.log("getNetworkId device", device)
  //return device.networkId;
}

async function getOrgDevices(orgId) {
  return await meraki.get('organizations/' + orgId + '/deviceStatuses').then((res) => { return res.data });
}

  // PUT Policies for a Client in a Network
async function updateClientPolicy(netId, clientMac, timespan, data) {
    return await meraki.put('networks/' + netId + '/clients/' + clientMac + '/policy?timespan=' + timespan, data).then((res) => { 
      console.log('updateClientPolicy res', res.data);
      return res.data 
    });
}
/*
app.get('/meraki/network', function (req, res) {
  const orgId = configs.orgId;
  const mac = req.body.deviceMac;
  res.send(getNetworkId(orgId, mac));
});
*/

app.put('/meraki/policy',jsonParser, function (req, res) {
  // API parameters
  console.log('/meraki/policy req.body ', req.body);
  const clientMac = req.body.clientMac;
  const deviceMac = req.body.deviceMac;
  const orgId = configs.orgId;
  //const groupPolicyId = req.body.groupPolicyId; 
  //const devicePolicy = req.body.devicePolicy 
  
 getNetworkId(orgId, deviceMac)
  .then(data => {
    const networkId = data;
    
    const policy = {
      "devicePolicy": "group",
      "groupPolicyId": configs.groupPolicyId
    }
    
    //const policy = { "devicePolicy": devicePolicy, "groupPolicyId": groupPolicyId };
    console.log('getNetworkId ', networkId);
    console.log('policy to apply',policy);

    updateClientPolicy(networkId, clientMac, 2592000, policy)
    .then((data)=>{
      console.log('policy updated', data);    
      res.send(data);
      res.end();
    });  
  });  
});

// API Proxy Route - Will be proxied through Meraki Dashboard API

app.use('/api', jsonParser, function (req, res){
  console.log('API request ', req.url);
  console.log('request body, ', req.body);

  var options = {
    qs: req.query,
    url: configs.apiUrl + req.url,
    method: req.method,
    body: JSON.stringify(req.body), 
    //followAllRedirects: true, // Does not work as intended with PUT,POST,DELETE (returns a [GET] on final location)
    headers: {
        'X-Cisco-Meraki-API-Key': req.headers['x-cisco-meraki-api-key'] || configs.apiKey, // Use client API key first, then server
        'Content-Type': 'application/json'
    } 
  }

  requestMeraki(options, function(err, response, data){
    //console.log('requestMeraki req.headers ',req.headers);
    console.log('requestMeraki options ',options);
    if(err){
        console.log("requestMeraki err ", err)
        res.send(err);
    }
    if(!response){
      console.log('no response from server')
      return
    }
    console.log('FINAL res.statusCode ',response.statusCode);
    console.log('FINAL res.body ',response.body);

    res.setHeader('content-type', response.headers['content-type']);
    res.status(response.statusCode).send(data);
  });

});


// Home page, default route

/*
app.get('/', function(req, res) {
    res.sendFile(path.join(__dirname + '.dist/index.html'));
});
*/
//app.use(express.static(path.join(__dirname, './dist')));
app.use(history());
app.use(serveStatic(__dirname + "/dist"));

// handle every other route with index.html, which will contain
// a script tag to your application's JavaScript file(s).
app.get('*', function (request, response) {
  response.sendFile(path.resolve(__dirname, 'index.html'));
});

// Start server
var server = app.listen(port, () => {
  console.log('Server Running on:      http://localhost:'+port);
  console.log('Meraki API Proxy:       http://localhost:'+port+'/api');
  console.log('Meraki API Endpoint:   ', configs.apiUrl);
});

