<template>
  <div id="app">
    <div >
      <img src="./assets/transparent_legos-192px.png">
      <router-view/>
    </div>
    <footer class="page-footer font-small blue-grey lighten-5 pt-0 footer">
        <a href="https://meraki.io">Meraki.io</a>
    </footer>

  </div>
</template>

<script>
export default {
  name: "App"
};
</script>

<style>
#app {
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
  margin-bottom: 10px;
}
.container {
  height: 90%;
}
.bg {
  /* The image used */
  background-image: url("./assets/beach.jpg");

  /* Full height */
  height: 100%;

  /* Center and scale the image nicely */
  background-position: center;
  background-repeat: no-repeat;
  background-size: cover;
}

.footer {
  position: absolute;
  bottom: 0;
  width: 100%;
  /* Set the fixed height of the footer here */
  height: 60px;
  line-height: 60px; /* Vertically center the text there */
  background-color: #f5f5f5;
}
</style>
