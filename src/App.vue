<template>
  <div id="app">
    <shopping-cart></shopping-cart>
  </div>
</template>

<script>
import shoppingCart from "./components/shoppingCart/shoppingCart"
export default {
  name: 'app',
  components:{
    shoppingCart
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
  background-color: #eeeeee;
  font-size: 14px;
}
</style>
