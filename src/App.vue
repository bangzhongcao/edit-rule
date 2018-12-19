<template>
  <div id="app">
    <top-bar></top-bar>
    <div class="content">
      <router-view></router-view>
    </div>
  </div>
</template>

<script>
  import topBar from 'base/topBar'
  export default {
    components:{topBar},
    data(){
      return{

      }
    }
  }
</script>

<style lang="less">
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  // text-align: center;
  color: #2c3e50;
  min-width: 1200px;
  box-sizing: border-box;
  padding-top:62px; 
  height: 100%;
  .content{
    box-sizing: border-box;
    min-height: 100%;
    // border-bottom: 15px solid @colorBackground;
    margin: 15px;
    background-color: #fff; 
  }
}
</style>
