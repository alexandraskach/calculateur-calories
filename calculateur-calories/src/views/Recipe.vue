<script>
import { useRoute } from "vue-router";

export default {
  // eslint-disable-next-line vue/multi-word-component-names
  name: 'Recipe',
  data() {
    return {
      recette: {}
    }
  },
  mounted() {
    const route = useRoute();
    console.log(route.params.receiptId);
    this.getRecipeById(route.params.receiptId,2)
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
          console.log(data)
          this.recette = data[0]
          console.log('this.recette', this.recette)
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
      </div>
  </main>
</template>

<style lang="scss">

</style>