<template>
  <meta name="viewport"
        content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no">
  <div id="nav">
    <router-link to="/"></router-link> 
  </div>
  <router-view/>
</template>
<script>
  export default {
    name: 'App',
    provide(){
      return{
        reload:this.reload
      }
    },

    data(){
      return{
        isRouterAlive:true
      }
    },

    methods:{
      reload(){
        this.isRouterAlive = false;
        this.$nextTick(function () {
          this.isRouterAlive = true;
        });
      }
    },
  }
</script>
<style>
* {
	margin: 0px;
	padding: 0px;
	
}
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

#nav {
  /* padding: 30px; */
}

#nav a {
  font-weight: bold;
  color: #2c3e50;
}

#nav a.router-link-exact-active {
  color: #42b983;
}
</style>
