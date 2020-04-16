<template>
  <div id="app">
    <!-- <img src="./assets/logo.png">
    <h1>app.vue - home</h1>
    <p>{{msgs}}</p> -->
    
    <router-view/>   
  </div>
</template>

<script>
export default {
  name: 'App',
  data: function() {
    return {
      msgs: 'bassA'
    }
  }
}
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
