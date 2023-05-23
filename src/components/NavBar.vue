<template>
<div class="nav-bar">
    
    <div class="logo-wrap">
        <router-link to="/products" class="products-link">
        <img :src="logo" :style="{height:'200px', width:'200px'}"/>
    </router-link>
    </div>
<router-link to="/cart" class="cart-link">
    <button>Shopping Cart</button>
    </router-link>
</div>
</template>


<script>
import logo from '@/assets/Ceramic-Dreams.png'
export default {
    name: "NavBar",
    data(){
        return{
            logo,
        }
    }
}
</script>