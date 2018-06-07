# meraki-mews-splash

> A Cisco Meraki demo splash page with Mews API integration.

## Features

- Splash Page using the Cisco Meraki Captive Portal API
- Authenticate against the Mews API, serving as a hospitality PMS
- Log and trigger workflows using a `/log` path
- Built with VueJS

## More Info

- [Meraki](https://meraki.cisco.com/)
- [Meraki API](https://create.meraki.io/api-docs/)
- [Mews Connector API](https://mews-systems.gitbook.io/connector-api/)
- [VueJS](https://vuejs.org/)
- [Meraki-Service](https://dexterlabora.github.io/meraki-service/)

## Configure Meraki

First you must have a Meraki wireless network setup to direct your clients to.

### Access Control:

- (select ssid)
- Authorization --> Click-through
- Walled Garden --> Your server's IP or domain

### Splash Page

- Custom splash URL --> Your server

Note, your server address can be localhost if on a bridged wireless network. Be sure to update the server locations if you publish this to a new site such as Heroku or remote server.

For more details on the Captive Portal and Dashboard API

https://create.meraki.io

## Install App

```
git clone https://github.com/dexterlabora/meraki-mews-splash.git
cd meraki-mews-splash
npm install
```

## Configure App

Open the config file and apply your settings
`./config/merakiConfigs.js`

```
 {
        apiKey: '2f301bccd61b6c642d250cd3f76e5eb66ebd170f', // Sandbox Demo
        apiUrl: 'https://api.meraki.com/api/v0',
        orgId: '549236',
        groupPolicyId: '100', // 100 verifiedUser
        remoteLoggingUrl: 'https://merakidemo.internetoflego.com/mews/log' // Node-RED Demo. Use your own location to send a POST message with the session details.
    }
```

If you are unclear of the `orgId` and `groupPolicyId`, you can just configure your `apiKey` and save your changes. Then, run the included script to display the details of your organizations, networks and group policies.

```
node meraki-summary-tool.js
```

## Run and Test

Launch the application in development mode.

```
npm run dev
```

A Node server will first start, which is used in production as well. It serves the built web app and also provides the API services for Meraki and Mews.

```
initMew baseUrl https://demo.mews.li
Server Running on:      http://localhost:8088
Meraki API Proxy:       http://localhost:8088/api
Meraki API Endpoint:    https://api.meraki.com/api/v0
```

A webpack hot-reload server will then launch on a different port. Use this for testing your front-end changes. All API requests will be proxied to the Node server.

_Note: the port could be unique to your instance_

```
Your application is running here: http://localhost:8083
```

Use this URL to test your local instance without needing a Meraki AP. The entire flow will not complete, but you can atleast work with the theoretical parameters.

http://localhost:8083/?base_grant_url=https%3A%2F%2Fn143.network-auth.com%2Fsplash%2Fgrant&user_continue_url=http%3A%2F%2Flocalhost:8083/success%2F&node_id=149624921787028&node_mac=88%3A15%3A44%3A50%3A0a%3A94&gateway_id=149624921787028&client_ip=10.110.154.195&client_mac=60%3Ae3%3Aac%3Af7%3A48%3A08%3A22

(you might need to adjust the localhost and port to your server)

## Heroku (optional)

Create a [Heroku](https://dashboard.heroku.com/) application, login and then push the app. Webpack is configured to handle the startup script.

```
npm run build
git add .
git commit -m 'heroku'
git push heroku master
```

```
remote: -----> Compressing...
remote:        Done: 32.9M
remote: -----> Launching...
remote:        Released v21
remote:        https://meraki-mews-splash.herokuapp.com/ deployed to Heroku
remote:
remote: Verifying deploy... done.
To https://git.heroku.com/meraki-mews-splash.git
   4166003..8c91581  master -> master
```

# Sample

![login](/screenshots/splash-mews-login.jpeg)

# Mews

Mews is a Property Management System for providing cloud based hospitatliy services.

Use these [instructions](https://mews-systems.gitbook.io/connector-api/guidelines) to login to the Mews sandbox dashboard. This will allow you to create customers, reservations and explore the API further.

In order for a customer to login with a lastname and room number, the customer must be checked-in to the reservation.

The demo is configured to use the sandbox credtials and URL by default. You can easily update these settings in the `./config/mewsConfigs.js` file.

```
// Mews Connector API environment variables.
// Using demo settings for default.
module.exports = {
  ClientToken:
    "E0D439EE522F44368DC78E1BFB03710C-D24FB11DBE31D4621C4817E028D9E1D",
  AccessToken:
    "C66EF7B239D24632943D115EDE9CB810-EA00F8FD8294692C940F6B5A8F9453D",
  baseUrl: "https://demo.mews.li"
};
```

# Enjoy!

Hopefully this project helps demonstrate what's possible cloud managed networking. Feel free to fork this or use this for inspiration.

## Disclaimer

This code is intended for example purposes only and is provided by Cisco Meraki “as is” without any warranty or support of any kind. We do not represent or warrant that this code is suitable for production use, will operate properly, is accurate or complete, or is without error or defect. This page also contains links to third party code repositories not associated with Cisco Meraki. We provide these links merely as a convenience and the inclusion of such links does not imply any endorsement of their content. All use is at your own risk.

## License

Apache-2.0
