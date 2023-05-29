<template>
  <div v-if="product">
    <div class="img-wrap">
      <div class="product-details">
        <img :src="product.imageURL" />
        <h1>{{ product.name }}</h1>
        <h3 class="price">{{ product.price }}</h3>
        <button @click="addToCart" class="add-to-cart" v-if="!isItemInCart">Add to cart</button>
        <button class="grey-button" v-if="isItemInCart">Item is already in cart!</button>
      </div>
    </div>
  </div>
  <div v-else>
    <NotFoundPage />
  </div>
</template>

<script>
import axios from "axios";
import NotFoundPage from "./NotFoundPage.vue";
export default {
  name: "ProductDetailPage",
  data() {
    return {
      product: {},
      cartItems: [],
    };
  },
  computed: {
    isItemInCart() {
      return this.cartItems.some(
        (item) => item.id === this.$route.params.productId
      );
    },
  },
  methods: {
    async addToCart() {
      await axios.post("/api/users/12345/cart", {
        id: this.$route.params.productId,
      });
      alert("Successfully added item to the cart!");
    },
  },
  components: {
    NotFoundPage,
  },
  async created() {
    const response = await axios.get(
      `/api/products/${this.$route.params.productId}`
    );
    const product = response.data;
    this.product = product;

    const cartResponse = await axios.get("/api/users/12345/cart");
    const cartItems = cartResponse.data;
    this.cartItems = cartItems;
  },
};
</script>
