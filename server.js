/* ***************** /
Meraki Dashoard API Express Server

Supports redirects with custom recursive request function.

/ ****************** */

// Environment

// External Configuration File
var configs = require("./config/merakiConfigs.js");

/* Local Configuration alternative
var configs = {
    apiKey: 'YourAPIKey',
    apiUrl: 'https://api.meraki.com/api/v0'
};
*/

/* ****************** */
var port = process.env.PORT || 8088;
var express = require("express");
//var request = require('request'); // Does not properly handle Meraki redirects
//var requestMeraki = require('./request-meraki');
var path = require("path");
var serveStatic = require("serve-static");
var bodyParser = require("body-parser");
var history = require("connect-history-api-fallback");
var axios = require("axios");
var app = (module.exports = express());
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
const Mews = require("./mews-service");
const mewsOptions = require("./config/mewsConfigs");

const mews = new Mews(mewsOptions);

// Email auth
app.post("/mews/authEmail", jsonParser, function(req, res) {
  console.log("mews/authEmail req.body", req.body);
  const options = {
    email: req.body.email
  };
  mews.authEmail(options).then(response => {
    console.log("sendint authEmail success response", response);
    res.send(response);
    res.end();
  });
});

// Last name and room number
app.post("/mews/authNameRoom", jsonParser, function(req, res) {
  console.log("mews/authNameRoom req.body", req.body);
  const options = {
    Name: req.body.Name,
    RoomNumber: req.body.RoomNumber
  };
  console.log("/mews/authNameRoom options", options);
  mews.authNameRoom(options).then(response => {
    res.send(response);
    res.end();
  });
});

app.get("/mews/customer/:id", function(req, res) {
  const data = {
    CustomerIds: [req.params.id]
  };
  mews.getAllByIds(data).then(response => {
    console.log("getAllbyIds:", response);
    res.send(response);
    res.end();
  });
});
// Loyalty

// ********
// Meraki API
// ********
//const Meraki = require('./meraki-service');
const Meraki = require("meraki-service");
const meraki = new Meraki(configs.apiKey, "http://localhost:" + port + "/api");

app.put("/meraki/policy", jsonParser, function(req, res) {
  // API parameters
  console.log("/meraki/policy req.body ", req.body);
  const clientMac = req.body.clientMac;
  const deviceMac = req.body.deviceMac;
  const orgId = configs.orgId;
  //const groupPolicyId = req.body.groupPolicyId; // less secure
  //const devicePolicy = req.body.devicePolicy; // less secure
  meraki.getNetworkIdForDeviceMac(orgId, deviceMac).then(response => {
    const networkId = response;

    const policy = {
      devicePolicy: "group",
      groupPolicyId: configs.groupPolicyId
    };

    //const policy = { "devicePolicy": devicePolicy, "groupPolicyId": groupPolicyId };
    console.log("getNetworkId ", networkId);
    console.log("policy to apply", policy);

    meraki
      .updateClientPolicy(networkId, clientMac, 2592000, policy)
      .then(response => {
        if (response.errors) {
          console.log("policy update error", response.errors);
          res.send(response.errors[0]);
          res.end();
          return;
        } else {
          console.log("policy updated", response);
          res.send(response);
          res.end();
        }
      })
      .catch(err => {
        console.log("policy update error", err);
      });
  });
});

// API Proxy Route - Will be proxied through Meraki Dashboard API
app.use("/api", jsonParser, function(req, res) {
  console.log(
    "API request ",
    req.method,
    req.url,
    req.method != "GET" ? req.body : ""
  );
  var options = {
    qs: req.query,
    url: configs.apiUrl + req.url,
    method: req.method,
    body: JSON.stringify(req.body)
  };

  meraki.proxy(options).then(response => {
    res.send(response);
    res.end();
  });
});

// Remote Session Logging
app.post("/log", jsonParser, function(req, res) {
  axios.post(configs.remoteLoggingUrl, req.body).then(response => {
    res.send(response.data);
    res.end();
  });
});

app.use(history());
app.use(serveStatic(__dirname + "/dist"));

// handle every other route with index.html, which will contain
// a script tag to your application's JavaScript file(s).
app.get("*", function(request, response) {
  response.sendFile(path.resolve(__dirname, "index.html"));
});

// Start server
var server = app.listen(port, () => {
  console.log("Server Running on:      http://localhost:" + port);
  console.log("Meraki API Proxy:       http://localhost:" + port + "/api");
  console.log("Meraki API Endpoint:   ", configs.apiUrl);
});
