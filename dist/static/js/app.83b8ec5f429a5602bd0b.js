webpackJsonp([1],{"1/oy":function(t,e){},"9M+g":function(t,e){},CozZ:function(t,e){},GfHa:function(t,e){},Id91:function(t,e){},Jmt5:function(t,e){},NHnr:function(t,e,o){"use strict";Object.defineProperty(e,"__esModule",{value:!0});var s=o("7+uW"),n={render:function(){var t=this.$createElement,e=this._self._c||t;return e("div",{attrs:{id:"app"}},[e("div",{staticClass:"container"},[e("router-view")],1),this._v(" "),this._m(0)])},staticRenderFns:[function(){var t=this.$createElement,e=this._self._c||t;return e("footer",{staticClass:"container-fluid"},[e("nav",{staticClass:"navbar fixed-bottom footer"},[e("a",{attrs:{href:"https://meraki.io"}},[this._v("Meraki.io")])])])}]};var r=o("VU/8")({name:"App"},n,!1,function(t){o("g0GF")},null,null).exports,i=o("/ocq"),a=o("Xxa5"),c=o.n(a),l=o("exGp"),u=o.n(l),m={render:function(){var t=this.$createElement,e=this._self._c||t;return e("div",[e("div",{staticClass:"card"},[e("h2",[this._v("Welcome home "+this._s(this.customer.FirstName))]),this._v(" "),e("img",{attrs:{src:"/static/bedBeachView.jpg",height:"100%",width:"100%",alt:"Hotel Room"}})])])},staticRenderFns:[]};var h=o("VU/8")({name:"Success",data:function(){return{customers:[]}},computed:{customer:function(){return this.customers.Customers?this.customers.Customers[0]:{}},customerId:function(){return this.$route.params.customerId}},methods:{fetchCustomer:function(){var t=this;this.axios.get("/mews/customer/"+this.customerId).then(function(e){t.customers=e.data})}},created:function(){this.fetchCustomer()}},m,!1,function(t){o("mk+3")},null,null).exports,f={name:"Login",components:{"success-page":h},data:function(){return{clientMac:"",baseGrantUrl:"",userContinueUrl:"",clientIp:"",nodeMac:"",customer:{customer:{id:""}},form:{lastName:"",room:"",email:"",terms:!1},policy:{},mewsAuthenticated:!1,merakiAuthenticated:!1}},computed:{loginUrl:function(){return this.baseGrantUrl+"?continue_url="+this.successUrl},successUrl:function(){return window.location.protocol+"//"+window.location.hostname+":"+window.location.port+"/success/"+this.customer.customer.Id}},created:function(){console.log("route query",this.$route.query),this.clientMac=this.$route.query.client_mac,this.baseGrantUrl=this.$route.query.base_grant_url,this.userContinueUrl=this.$route.query.user_continue_url,this.clientIp=this.$route.query.client_ip,this.nodeMac=this.$route.query.node_mac},methods:{onSubmit:function(){var t=this;this.form.email?this.mewsAuthEmail().then(function(e){var o=e.data;t.customer=o,o.authorized?(console.log("mewsAuthEmail success"),t.mewsAuthenticated=!0,t.login()):console.log("mewAuthEmail failed. Aborting login")}):this.form.lastName&&(console.log("authenticating with name and room"),this.mewsAuthNameRoom().then(function(e){console.log("mewsAuthNameRoom res",e.data);var o=e.data;t.customer=o,o.authenticated?(console.log("mewsAuthNameRoom success"),t.mewsAuthenticated=!0,t.login()):console.log("mewAuthNameRoom failed. Aborting login")}))},mewsAuthEmail:function(){return this.axios.post("/mews/authEmail",{email:this.form.email}).then(function(t){return t})},mewsAuthNameRoom:function(){return this.axios.post("/mews/authNameRoom",{lastName:this.form.lastName,roomNumber:this.form.roomNumber}).then(function(t){return t})},merakiLogin:function(){console.log("Form data submitted"),this.baseGrantUrl?(this.log(),console.log("Redirecting to base_grant_url: ",this.loginUrl),window.location.href=this.loginUrl):console.log("login failed, no base grant url")},merakiPolicy:function(){var t=this;return u()(c.a.mark(function e(){var o;return c.a.wrap(function(e){for(;;)switch(e.prev=e.next){case 0:return o={clientMac:t.clientMac,deviceMac:t.nodeMac,form:t.form},e.next=3,t.axios.put("/meraki/policy",o).then(function(t){return console.log("Policy applied",t),t.data},function(t){console.log("Error: Could not apply policy: ",t)});case 3:return e.abrupt("return",e.sent);case 4:case"end":return e.stop()}},e,t)}))()},login:function(){var t=this;return u()(c.a.mark(function e(){return c.a.wrap(function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,t.merakiPolicy();case 2:t.policy=e.sent,t.merakiLogin();case 4:case"end":return e.stop()}},e,t)}))()},log:function(){var t={customer:this.customer,clientMac:this.clientMac,clientIp:this.clientIp,nodeMac:this.nodeMac,policy:this.policy,userContinueUrl:this.userContinueUrl};console.log("log data",t),this.axios.post("/log",t).then(function(t){return console.log("remote session logging",t)})}}},d={render:function(){var t=this,e=t.$createElement,o=t._self._c||e;return o("div",[t.mewsAuthenticated?t._e():o("div",{staticClass:"col-sm-10 offset-sm-2 col-md-8  offset-md-2 col-lg-8 offset-lg-2 text-center"},[o("b-card",{attrs:{title:"Hotel Solutions"}},[o("center",[o("img",{staticClass:"d-none d-md-block",attrs:{src:"/static/transparent_legos-192px.png",alt:"Logo image"}})]),t._v(" "),o("p",{staticClass:"card-text"},[t._v("\n      Enjoy your stay with complimentary WiFi.\n    ")]),t._v(" "),o("b-card-body",{staticClass:"card-body"},[o("b-form",{on:{submit:function(e){return e.preventDefault(),t.onSubmit(e)}}},[o("label",{staticClass:"grey-text font-weight-light",attrs:{for:"lastName"}},[t._v("Last Name")]),t._v(" "),o("b-form-input",{staticClass:"form-control",attrs:{type:"text",id:"lastName",placeholder:"Doe"},model:{value:t.form.lastName,callback:function(e){t.$set(t.form,"lastName",e)},expression:"form.lastName"}}),t._v(" "),o("label",{staticClass:"grey-text font-weight-light",attrs:{for:"roomNumber"}},[t._v("Room Number")]),t._v(" "),o("b-form-input",{staticClass:"form-control",attrs:{type:"text",id:"roomNumber",placeholder:"A388-4"},model:{value:t.form.roomNumber,callback:function(e){t.$set(t.form,"roomNumber",e)},expression:"form.roomNumber"}}),t._v(" "),o("hr"),t._v(" "),o("p",[o("i",[o("b",[t._v("or")])])]),t._v(" "),o("label",{staticClass:"grey-text font-weight-light",attrs:{for:"email"}},[t._v("Email")]),t._v(" "),o("b-form-input",{attrs:{type:"email",id:"email",placeholder:"john@doe.com"},model:{value:t.form.email,callback:function(e){t.$set(t.form,"email",e)},expression:"form.email"}}),t._v(" "),o("br"),t._v(" "),o("hr"),t._v(" "),o("b-form-checkbox",{attrs:{id:"checkbox1",value:"accepted",required:"","unchecked-value":"not_accepted"},model:{value:t.form.terms,callback:function(e){t.$set(t.form,"terms",e)},expression:"form.terms"}},[t._v("\n                I accept the "),o("a",{attrs:{href:"/terms"}},[t._v("terms.")])]),t._v(" "),o("div",{staticClass:"text-center py-4 mt-2"},[o("b-button",{attrs:{variant:"outline-primary",type:"submit"}},[t._v("Login"),o("i",{staticClass:"fa fa-paper-plane-o ml-2"})])],1)],1)],1)],1)],1),t._v(" "),t.mewsAuthenticated?o("div",{staticClass:"col-sm-10 offset-sm-1 offset-md-1 col-md-8 text-center"},[o("div",{staticClass:"card"},[o("h4",[t._v("Hi "+t._s(t.customer.customer.FirstName)+"!")]),t._v(" "),o("p",[t._v("You are being logged into the network now.")])]),t._v(" "),o("p",{staticClass:"details"},[o("label",[t._v("Client MAC | ")]),t._v(" "+t._s(t.clientMac))])]):t._e()])},staticRenderFns:[]};var p=o("VU/8")(f,d,!1,function(t){o("CozZ")},null,null).exports,v={render:function(){this.$createElement;this._self._c;return this._m(0)},staticRenderFns:[function(){var t=this.$createElement,e=this._self._c||t;return e("div",{staticClass:"hello"},[e("h1",[this._v("Terms of Serice")]),this._v(" "),e("ul",[e("li",[this._v("Don't do anything bad")]),this._v(" "),e("li",[this._v("We respect your privacy")])])])}]};var g=o("VU/8")({name:"HelloWorld",data:function(){return{}}},v,!1,function(t){o("m1b2")},"data-v-c660e5ba",null).exports;s.a.use(i.a);var _=new i.a({mode:"history",routes:[{path:"/",name:"Login",component:p},{path:"/terms",name:"Terms",component:g},{path:"/success/:customerId",name:"Success",component:h,parameters:!0}]}),b=o("mtWM"),w=o.n(b),y=o("Rf8U"),C=o.n(y),x=o("e6fC");o("Jmt5"),o("9M+g");s.a.use(x.a),s.a.use(C.a,w.a),s.a.config.productionTip=!1,new s.a({el:"#app",router:_,components:{App:r},template:"<App/>"})},g0GF:function(t,e){},m1b2:function(t,e){},"mk+3":function(t,e){},zj2Q:function(t,e){}},["NHnr"]);
//# sourceMappingURL=app.83b8ec5f429a5602bd0b.js.map