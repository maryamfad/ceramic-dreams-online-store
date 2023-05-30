<template>
  <NavBar :user="user"/>
  <div class="page-wrap"><router-view :user="user"></router-view></div>
</template>

<script>
import {getAuth, onAuthStateChanged} from 'firebase/auth'
import NavBar from './components/NavBar.vue';
export default {
  name: "App",
  components: {
    NavBar,
  },
  data(){
    return{
      user:null,
    }
  },
  created(){
const auth = getAuth()
onAuthStateChanged(auth, user=>{
  this.user = user;
})
  }
};
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
