<script>
import { useRoute } from "vue-router";
import { storeToRefs } from 'pinia'
import { useAuthStore } from '../stores/auth.store'

export default {
  // eslint-disable-next-line vue/multi-word-component-names
  name: 'Recipe',
  data() {
    return {
      recette: {},
      user:'',
      ingredients: Array
    }
  },
  mounted() {
    const route = useRoute();
     console.log(route.params);
      const authStore = useAuthStore();
    const { user: authUser } = storeToRefs(authStore);
    console.log(authUser);
    this.user = authUser;
    console.log(this.user.user)
    this.getRecipeById(route.params.receiptId,this.user.user.userId)
  },
  methods: {
    getRecipeById(receiptId,userId) {
      fetch(`http://localhost:8080/api/get-receipt-by-id-receipt-and-id-user/${receiptId}/user/${userId}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json'
        }
      })
        .then((response) => {
          console.log(response)
          return response.json()
        })
        .then((data) => {
          console.log(data);
          this.recette = data[0];
          this.ingredients = this.recette.ingredients;
          console.log('this.recette', this.recette);
        })
        .catch((err) => {
          console.log(err)
        })
    }
  }
}

</script>

<template>
  <main class="container">
   <div class="card">
      <h2 class="body-semibold">{{ recette.receiptName }}</h2>
        <p>{{ recette.receiptDescription }}</p>
        <p>Ingredients :</p>
        <ul v-for="ingredient in ingredients" :key="ingredient.ingredientsId">
          <li>{{ ingredient.ingredientsName }} - {{ ingredient.ingredientsWeight }} {{ ingredient.unity }}</li>
        </ul>
      </div>
  </main>
</template>

<style lang="scss">

</style>