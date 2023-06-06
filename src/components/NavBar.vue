<template>
  <ul class="menu">
    <div class="menu-item-left">
      <li class="menu-item" v-for="link in leftLinks" :key="link.id">
        <a
          :href="link.route"
          class="menu-link"
          :class="link.id === selectedIndex ? 'active' : null"
        >
          <i class="menu-icon" :class="link.icon"></i>
          <span>{{ link.text }}</span>
        </a>
      </li>
    </div>
    <div class="searchBar"></div>
    <div class="menu-item-right">
      <li v-for="link in rightLinks" :key="link.id">
        <a
          :href="link.route"
          class="menu-link"
          :class="link.id === selectedIndex ? 'active' : null"
        >
          <i class="menu-icon" :class="link.icon"></i>
          <span>{{ link.text }}</span>
        </a>
      </li>
      <button @click="signOut" v-if="user">Sign Out</button>
    </div>
  </ul>
  <img class="image" :src="logo" />
</template>

<script>
import { getAuth, signOut } from "firebase/auth";
import logo from "@/assets/Ceramic-Dreams.png";
export default {
  name: "NavBar",
  props: ["user"],
  data() {
    return {
      logo,
      sliderPosition: 0,
      selectedElementWidth: 0,
      selectedIndex: 0,
      leftLinks: [
        {
          id: 1,
          icon: "fab fa-react",
          text: "Home",
          route: "/products",
        },
        {
          id: 2,
          icon: "fab fa-angular",
          text: "About",
          route: "/about",
        },
      ],
      rightLinks: [
        {
          id: 3,
          icon: "fab fa-js",
          text: "Shopping List",
          route: "/cart",
        },
      ],
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

<style>
:root {
  --active-color: #ffee93;
  --link-text-color: #f1faee;
  --menu-background-color: #8b4513;
  --active-background-color: #132238;
}

.menu {
  padding: 0;
  margin: 0;
  width: 100%;
  position: relative;
  background-color: var(--menu-background-color);
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  border-radius: 4px;
  list-style-type: none;
  overflow: hidden;
}

.menu-item {
  display: inline-flex;
}
.image {
  width: 200px;
  height: 200px;
}
.menu-item-right {
  display: inline-flex;
  justify-content: flex-end;
}

.menu-link {
  padding: 0.75rem 1rem;
  display: inline-flex;
  align-items: center;
  color: var(--link-text-color);
  text-decoration: none;
}
/* .searchBar{
    width: 40%;
} */
.menu-link:hover,
.menu-link:active {
  color: var(--active-color);
  background-color: var(--active-background-color);
}
.menu-icon {
  height: 1.5rem;
  width: 1.5rem;
  justify-content: center;
  align-items: center;
  display: inline-flex;
  margin-right: 0.2rem;
}
</style>
