<template>
  <div id="app">
    <div class="container">
      <router-view/>
    </div>

    <footer class="container-fluid">
      <nav class="navbar fixed-bottom footer">
        <a href="https://meraki.io">Meraki.io</a>
      </nav>
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
  background-color: #f5f5f5;
}

.img-fluid {
  max-width: 100%;
  height: auto;
}
</style>

