// testmeraki.js

const Meraki = require('./meraki-service');

const meraki = new Meraki('2f301bccd61b6c642d250cd3f76e5eb66ebd170f','http://localhost:1880/meraki/proxy');

meraki.getOrganizations().then(res => {
    console.log('Organizations: ', res);
});




