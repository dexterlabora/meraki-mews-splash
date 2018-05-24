
const axios = require("axios");

function _handleError(e) {
    console.log("error in Mews API call: ", e);
    if (e.message) { e = e.message }
    if (e.response) {
        console.log(e.response)
        e = e.response;
    } 
    console.log(e);
    return e;
  }

/**
 * Mews Hospitality Open API Service
 * @class
 * @module Mews
 */
class Mews {
    
    constructor({ClientToken, AccessToken, baseUrl}){
        console.log('initMew baseUrl', baseUrl);
        this._baseUrl = baseUrl;

        this.mews = axios.create({
            baseUrl,
            headers: { 
              'Content-Type': "application/json" 
            }
        });
        this.mews.defaults.data = {}
        this.mews.defaults.data['ClientToken'] = ClientToken;
        this.mews.defaults.data['AccessToken'] = AccessToken;

        this.mews.interceptors.response.use(
        res => {
            //console.log('Mews Service:', res.request.path, res.status)
            return res;           
        },
        error => {
            return _handleError(error);
        }
        );
    }
   
    getAllByEmails({TimeFilter, Emails}){
        const data = {TimeFilter, Emails};
        console.log("getAllByEmails: data", data);
        return this.mews.post(`${this._baseUrl}/api/connector/v1/customers/getAllByEmails`,data).then(res => res );
    }

    searchCustomer({Name}){
        const data = {Name};
        console.log('searchCustomer', data);
        return this.mews.post(`${this._baseUrl}/api/connector/v1/customers/search`,data).then(res => res );
    }


    // Custom API Methods
    authNameRoom({Name, RoomNumber}){

        return this.searchCustomer({Name}).then(res => {
            //console.log('authNameNumber res', res.data);
            console.log('supplied Name,', Name);
            const customers = res.data['Customers'];
            for(let c of customers){
                console.log('supplied RoomNumber,', RoomNumber);
                console.log('c.RoomNumber', c.RoomNumber);
                if (c.RoomNumber == RoomNumber){
                    console.log("authNameNumber room number verified")
                    return {authorized: true, customer: c}
                }
            }
            return {authenticated: false}
        })
    }


    // authenticate using email address
    authEmail({email}){
        console.log("Auth Email: ", email)
        const options = {
            TimeFilter: "Created",
            Emails: [email]
        }
        return this.getAllByEmails(options).then(res => {
            if(!res.data.Customers){return}
            console.log('getAllByEmails res', res.data.Customers.length);
            
            const customers = res.data.Customers;
            try{
                if(customers.length > 0){
                    console.log("email found: authorization SUCCESS");

                    return res.data = {authorized: true, customer: customers[0]};
                }else{
                    console.log("email not found: authorization FAIL");
                    return res.data = {authorized: false};
                }
            }catch(e){
                return e;
            }          
        });
    }
}

module.exports = Mews;