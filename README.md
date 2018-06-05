# meraki-mews-splash

> A Cisco Meraki demo splash page with Mews API integration

## Configure App

Open the config file and apply your settings
`./config/merakiConfigs.js`

### Defaults

```
 {
        apiKey: '2f301bccd61b6c642d250cd3f76e5eb66ebd170f', // Sandbox Demo
        apiUrl: 'https://api.meraki.com/api/v0',
        orgId: '549236',
        groupPolicyId: '100', // 100 verifiedUser
        remoteLoggingUrl: 'https://merakidemo.internetoflego.com/mews/log' // Node-RED Demo
    }
```

## Configure Meraki

- SSID: Authorization --> Click-through
- Access Control: Walled Garden --> Your server IP/domain

For more details on the Captive Portal and Dashboard API

https://create.meraki.io

## Test

Use this URL to test your local instance without needing a Meraki AP. The entire flow will not complete, but you can atleast work with the theoretical parameters.

http://localhost:8080/?base_grant_url=https%3A%2F%2Fn143.network-auth.com%2Fsplash%2Fgrant&user_continue_url=http%3A%2F%2Fask.com%2F&node_id=149624921787028&node_mac=88%3A15%3A44%3A50%3A0a%3A94&gateway_id=149624921787028&client_ip=10.110.154.195&client_mac=60%3Ae3%3Aac%3Af7%3A48%3A08%3A22

(you might need to adjust the localhost and port to your server)

## NodeJS server & Webpack

Webpack is configured to proxy all requests to the included express `server.js`.

## Heroku

Create a Heroku application, login and then push the app. Webpack is configured to handle the startup script.

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

## Build Setup

```bash
# install dependencies
npm install

# serve with hot reload at localhost:8080
npm run dev

# build for production with minification
npm run build

# build for production and view the bundle analyzer report
npm run build --report
```

For a detailed explanation on how things work, check out the [guide](http://vuejs-templates.github.io/webpack/) and [docs for vue-loader](http://vuejs.github.io/vue-loader).

# Sample

![login](/screenshots/splash-mews-login.jpeg)
