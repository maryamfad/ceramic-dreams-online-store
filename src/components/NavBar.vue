<template>
  <div class="nav-bar">
    <div class="logo-wrap">
      <router-link to="/products" class="products-link">
        <img :src="logo" :style="{ height: '200px', width: '200px' }" />
      </router-link>
    </div>
    <div class="nav-buttons-wrap">
      <button @click="signOut" v-if="user">Sign Out</button>
      <router-link to="/cart">
        <button>Shopping Cart</button>
      </router-link>
    </div>
  </div>
</template>

<script>
import { getAuth, signOut } from "firebase/auth";
import logo from "@/assets/Ceramic-Dreams.png";
export default {
  name: "NavBar",
  props:['user'],
  data() {
    return {
      logo,
    };
  },
  methods: {
    signOut() {
      const auth = getAuth();
      signOut(auth);
    },
  },
};
</script>
