
const Mews = require('../mews-service');

const mewsOptions = {
    ClientToken: "E0D439EE522F44368DC78E1BFB03710C-D24FB11DBE31D4621C4817E028D9E1D",
    AccessToken: "C66EF7B239D24632943D115EDE9CB810-EA00F8FD8294692C940F6B5A8F9453D",
    baseUrl: "https://demo.mews.li"
}

const mews = new Mews(mewsOptions);
//console.log(mews);

/*
const data = {
    "TimeFilter": "Created",
    "Emails": [
    "john@doe.com"
]};


mews.getAllByEmails(data).then(
    res => {
        console.log(res);
    },
    err => {
        console.log('Error in getAllByEmails: ',err);
    }
);
*/

/*
const email = "john@doe.com";
mews.authEmail({email}).then( res => console.log(res));
*/

/*
mews.searchCustomer({Name:"Doe"}).then(res => console.log(res.data));
*/


const options = {
    Name: "doe",
    RoomNumber: "A388-4"
};
mews.authNameRoom(options).then(res => console.log(res));

