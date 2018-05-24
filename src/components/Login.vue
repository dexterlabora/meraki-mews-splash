<template>
<div>
  
  <!-- Card -->
  <div v-if="!authenticated" class="col-sm-10 offset-sm-1 offset-md-4 col-md-4 text-center">
    <div class="card mx-md-4">

        <!-- Card body -->
        <div class="card-body">

            <!-- Default form subscription -->
            <form @submit.prevent="onSubmit">
                <p class="h4 text-center py-4">WiFi Access</p>

                <label for="lastName" class="grey-text font-weight-light">Last Name</label>
                <input type="text" id="lastName" v-model="form.lastName" class="form-control" placeholder="Doe">
                
                <br>

                <label for="roomNumber" class="grey-text font-weight-light">Room Number</label>
                <input type="text" id="roomNumber" v-model="form.roomNumber" class="form-control" placeholder="A388-4">
                <hr>
                <p><i><b>or</b></i></p>
                <br>
                <label for="email" class="grey-text font-weight-light">Email</label>
                <input type="email" id="email" v-model="form.email" placeholder="john@doe.com">
                <br>
                <hr>
                <label for="terms" ><a href="/terms">Agree to T&S</a></label>
                <input type="checkbox" required=true id="terms" v-model="form.terms">

                <div class="text-center py-4 mt-3">
                    <button class="btn btn-outline-primary" type="submit">Login<i class="fa fa-paper-plane-o ml-2"></i></button>
                </div>
            </form>
            <!-- Default form subscription -->

        </div>
        <!-- Card body -->

    </div>
  <!-- Card -->
  </div> 

  <div v-if="authenticated" class="col-sm-10 offset-sm-1 offset-md-4 col-md-4 text-center">
    <h1>Authenticated</h1>
    <success-page :customer="customer.customer"></success-page>
    <p>You are being logged into the network. If you have a pop-up blocker, click <a :href="loginUrl">here</a>.</p>
  </div>

  <p><label>Client MAC: </label>{{ clientMac }}</p>

</div>
 
</template>

<script>
//const Success = require('./Success');
import Success from './Success'
export default {
  name: "Login",
  components:{
    'success-page':Success
  },
  data() {
    return {
      clientMac: "",
      baseGrantUrl: "",
      userContinueUrl: "",
      successUrl: "/success",
      clientIp: "",
      nodeMac: "",
      customer: {},
      form: {
        lastName: "",
        room: "",
        email: "",
        terms: false
      }
    };
  },
  computed: {
    loginUrl() {
      return this.baseGrantUrl + "?continue_url=" + this.successUrl+"&first_name="+this.customer.FirstName;
    },
    authenticated(){
      return this.customer.authorized;
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
            this.login();
          } else {
            console.log("mewAuthEmail failed. Aborting login");
          }
        });
      }else if(this.form.lastName){
        console.log('authenticating with name and room');
        this.mewsAuthNameRoom().then(res => {
          // assign group policy and login client
          console.log('mewsAuthNameRoom res', res.data);
          const customer = res.data;
          this.customer = customer; // save a copy
          if (customer.authenticated) {
            console.log("mewsAuthNameRoom success");
            this.login();
          } else {
            console.log("mewAuthNameRoom failed. Aborting login");
          }
        })
      }


    },
    mewsAuthEmail() {
      return this.axios
        .post("/mews/authEmail", { email: this.form.email })
        .then(res => {return res});
    },
    mewsAuthNameRoom() {
      return this.axios
        .post("/mews/authNameRoom", {
          lastName: this.form.lastName,
          roomNumber: this.form.roomNumber
        })
        .then(res => {return res});
    },
    merakiLogin() {
      console.log("Form data submitted");

      if (!this.baseGrantUrl) {
        console.log("login failed, no base grant url");
        return;
      }
      // ** Login to Meraki by redirecting client to the base_grant_url **
      console.log("Redirecting to base_grant_url: ", this.loginUrl);
      //window.location.href = this.loginUrl; //proper way
      window.open(this.loginUrl, '_blank', 'location=yes,height=570,width=520,scrollbars=no,status=yes');
    },  
    async merakiPolicy() {
      const policy = {
        clientMac: this.clientMac,
        deviceMac: this.nodeMac
      };
      return await this.axios.put("/meraki/policy", policy).then(
        res => {
          console.log("Policy applied", res);
          return res;
        },
        err => {
          console.log("Error: Could not apply policy: ", err);
        }
      );
    },
    async login() {
      //const mewsEmailVerify = await this.mewsEmail();
      const policy = await this.merakiPolicy();
      this.merakiLogin();
    }
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
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

</style>
