<template>
<div>

  <div v-if="!mewsAuthenticated" class="col-sm-10 offset-sm-2 col-md-8  offset-md-2 col-lg-8 offset-lg-2 text-center">
    <b-card 
    title="Hotel Solutions"
    >
    <center><img src="/static/transparent_legos-192px.png" class="d-none d-md-block" alt="Logo image"></center>
    
    <p class="card-text">
      Enjoy your stay with complimentary WiFi.
    </p>

        <b-card-body class="card-body">

            <b-form @submit.prevent="onSubmit">
              
                <label for="lastName" class="grey-text font-weight-light">Last Name</label>
                <b-form-input type="text" id="lastName" v-model="form.lastName" class="form-control" placeholder="Doe"/>

                <label for="roomNumber" class="grey-text font-weight-light">Room Number</label>
                <b-form-input type="text" id="roomNumber" v-model="form.roomNumber" class="form-control" placeholder="A388-4"/>
                <hr>
                <p><i><b>or</b></i></p>
                <label for="email" class="grey-text font-weight-light">Email</label>
                <b-form-input type="email" id="email" v-model="form.email" placeholder="john@doe.com"/>
                <br>
                <hr>

                <b-form-checkbox id="checkbox1"
                     v-model="form.terms"
                     value="accepted"
                     required
                     unchecked-value="not_accepted">
                I accept the <a href="/terms">terms.</a>
                </b-form-checkbox>

                <div class="text-center py-4 mt-2">
                    <b-button variant="outline-primary" type="submit">Login<i class="fa fa-paper-plane-o ml-2"></i></b-button>
                </div>
            </b-form>
    

        </b-card-body>


    </b-card>
  </div> 
  <div v-if="mewsAuthenticated" class="col-sm-10 offset-sm-1 offset-md-1 col-md-8 text-center">
    <div class="card">
      <h4>Hi {{customer.customer.FirstName}}!</h4>
      <!--<success-page :customer="customer.customer"></success-page>-->
      <p>You are being logged into the network now.</p>
      <!--
      <iframe 
      :src="loginUrl" 
      width="50%" 
      height="50%" 
      frameborder="0" 
      style="position:relative;z index:999" 
      ref="frame">
      </iframe>
      -->
    </div>
    <p class="details"><label>Client MAC | </label> {{ clientMac }}</p>
  </div>

</div>
 
</template>

<script>
//const Success = require('./Success');
import Success from "./Success";
export default {
  name: "Login",
  components: {
    "success-page": Success
  },
  data() {
    return {
      clientMac: "",
      baseGrantUrl: "",
      userContinueUrl: "",
      clientIp: "",
      nodeMac: "",
      customer: {
        customer: {
          id: ""
        }
      },
      form: {
        lastName: "",
        room: "",
        email: "",
        terms: false
      },
      policy: {},
      mewsAuthenticated: false,
      merakiAuthenticated: false
    };
  },
  computed: {
    loginUrl() {
      return this.baseGrantUrl + "?continue_url=" + this.successUrl;
    },

    successUrl() {
      /*
      let url = encodeURI(
        this.userContinueUrl + "&customerId=" + this.customer.customer["Id"]
      );
      */
      return `${window.location.protocol}//${window.location.hostname}:${
        window.location.port
      }/success/${this.customer.customer["Id"]}`;
    }
  },
  created() {
    console.log("route query", this.$route.query);
    this.clientMac = this.$route.query.client_mac;
    this.baseGrantUrl = this.$route.query.base_grant_url;
    this.userContinueUrl = this.$route.query.user_continue_url;
    this.clientIp = this.$route.query.client_ip;
    this.nodeMac = this.$route.query.node_mac;
  },
  methods: {
    onSubmit() {
      // verify data

      // authorize client (search DB)
      if (this.form.email) {
        this.mewsAuthEmail().then(res => {
          // assign group policy and login client
          const customer = res.data;
          this.customer = customer; // save a copy
          if (customer.authorized) {
            console.log("mewsAuthEmail success");
            this.mewsAuthenticated = true;
            this.login();
          } else {
            console.log("mewAuthEmail failed. Aborting login");
          }
        });
      } else if (this.form.lastName) {
        console.log("authenticating with name and room");
        this.mewsAuthNameRoom().then(res => {
          // assign group policy and login client
          console.log("mewsAuthNameRoom res", res.data);
          const customer = res.data;
          this.customer = customer; // save a copy
          if (customer.authenticated) {
            console.log("mewsAuthNameRoom success");
            this.mewsAuthenticated = true;
            this.login();
          } else {
            console.log("mewAuthNameRoom failed. Aborting login");
          }
        });
      }
    },
    mewsAuthEmail() {
      return this.axios
        .post("/mews/authEmail", { email: this.form.email })
        .then(res => {
          return res;
        });
    },
    mewsAuthNameRoom() {
      return this.axios
        .post("/mews/authNameRoom", {
          lastName: this.form.lastName,
          roomNumber: this.form.roomNumber
        })
        .then(res => {
          return res;
        });
    },
    merakiLogin() {
      console.log("Form data submitted");

      if (!this.baseGrantUrl) {
        console.log("login failed, no base grant url");
        return;
      }
      this.log();
      // ** Login to Meraki by redirecting client to the base_grant_url **
      console.log("Redirecting to base_grant_url: ", this.loginUrl);
      window.location.href = this.loginUrl; //proper way
      /* fails: CORS
      this.axios.get(this.loginUrl).then(res => {
        console.log("logging into meraki", res);
      });
      */
      // works
      /*
      window.open(
        this.loginUrl,
        "_blank",
        "location=yes,height=570,width=520,scrollbars=no,status=yes"
      );
      */
    },
    async merakiPolicy() {
      const policy = {
        clientMac: this.clientMac,
        deviceMac: this.nodeMac,
        form: this.form
      };
      return await this.axios.put("/meraki/policy", policy).then(
        res => {
          console.log("Policy applied", res);
          return res.data;
        },
        err => {
          console.log("Error: Could not apply policy: ", err);
        }
      );
    },
    async login() {
      //const mewsEmailVerify = await this.mewsEmail();
      this.policy = await this.merakiPolicy();
      this.merakiLogin();
    },
    log() {
      const data = {
        customer: this.customer,
        clientMac: this.clientMac,
        clientIp: this.clientIp,
        nodeMac: this.nodeMac,
        policy: this.policy,
        userContinueUrl: this.userContinueUrl
      };
      console.log("log data", data);
      this.axios
        .post("/log", data)
        .then(res => console.log("remote session logging", res));
    }
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style>
h1,
h2 {
  font-weight: normal;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}

.details {
  background-color: #b8b8b8bb;
}
</style>
