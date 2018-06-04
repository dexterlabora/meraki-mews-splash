<template>
<div>

    <div class="card">
        <h2>Welcome home {{customer.FirstName}}</h2>
        <img src="/static/bedBeachView.jpg" height="100%" width="100%" alt="Hotel Room"/>
    </div>
</div>
</template>

<script>
export default {
  name: "Success",
  //props: ["customer"],
  data() {
    return {
      customers: []
    };
  },
  computed: {
    customer() {
      if (this.customers.Customers) {
        return this.customers.Customers[0];
      } else {
        return {};
      }
    },
    customerId() {
      return this.$route.params.customerId;
    }
  },
  methods: {
    fetchCustomer() {
      this.axios.get(`/mews/customer/${this.customerId}`).then(res => {
        this.customers = res.data;
      });
    }
  },
  created() {
    this.fetchCustomer();
  }
};
</script>

<style>
</style>
