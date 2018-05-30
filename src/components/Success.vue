<template>
<div>

    <div class="card">
        <h2>Welcome home {{firstName}}</h2>
        <img src="@/assets/bedBeachView.jpg" height="100%" width="100%" alt="Hotel Room"/>
    </div>
</div>
</template>

<script>
export default {
  name: "Success",
  props: ["customer"],
  data() {
    return {
      firstName: ""
    };
  },
  created() {
    console.log("success page, customer", this.customer);
    this.firstName = this.customer["FirstName"];
  }
};
</script>

<style>
</style>
