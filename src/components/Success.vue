<template>
    <h2>Welcome home {{firstName}}</h2>

</template>

<script>
export default {
    name: "Success",
    props:['customer'],
    data() {
        return {
            firstName: ''
        }
    },
    created(){
        console.log('success page, customer', this.customer);
        this.firstName = this.customer['FirstName'];
    }
}
</script>

<style>

</style>
